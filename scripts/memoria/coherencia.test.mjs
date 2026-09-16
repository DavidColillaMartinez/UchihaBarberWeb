import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdirSync,
  mkdtempSync,
  writeFileSync,
  readFileSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { structure, record, checkCoherence } from "./coherencia.mjs";
import { createHandoff } from "./relevo.mjs";

const summary =
  "Comparados el bloque, su código, requisitos vigentes y decisiones documentadas.";
function fixture(t) {
  const parent = path.join(process.cwd(), "node_modules");
  mkdirSync(parent, { recursive: true });
  const root = mkdtempSync(path.join(parent, ".coherencia-test-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (file, value) => {
    const p = path.join(root, file);
    mkdirSync(path.dirname(p), { recursive: true });
    writeFileSync(
      p,
      typeof value === "string" ? value : JSON.stringify(value, null, 2) + "\n",
    );
  };
  const relevo = "memoria/sesiones/SES-021.md";
  const state = {
    ultimoRelevo: relevo,
    fases: [{ id: "UB-004", evidencias: [relevo] }],
  };
  const registry = {
    schema: 1,
    bloques: [
      {
        id: "servicios",
        nombre: "Servicios",
        fase: "UB-004",
        estado: "aprobado",
        rutas: ["src/features/home/servicios/"],
        specs: ["openspec/specs/home-servicios/spec.md"],
        cambios: [],
        aceptacion: [relevo],
        pendientes: [],
      },
    ],
  };
  write(relevo, "# Relevo de prueba\nAceptación registrada para el fixture.\n");
  write("memoria/estado.json", state);
  write("memoria/bloques.json", registry);
  write("memoria/relevos-legado.json", { schema: 1, duplicados: {} });
  write("src/features/home/servicios/Servicios.astro", "Contenido de prueba");
  write("openspec/specs/home-servicios/spec.md", "# Requisito de prueba");
  return { root, write, state, registry, relevo };
}

test("cambios posteriores invalidan la revisión; regenerar inventario no la renueva", (t) => {
  const f = fixture(t);
  record(f.root, f.relevo, summary);
  assert.equal(checkCoherence(f.root).resultado, "coherencia-registrada");
  f.write("src/features/home/servicios/Servicios.astro", "Cambio por revisar");
  const before = readFileSync(
    path.join(f.root, "memoria/revision.json"),
    "utf8",
  );
  f.write("memoria/generado/estado.json", { huella: "nuevo inventario" });
  const result = checkCoherence(f.root);
  assert.equal(result.resultado, "revision-desactualizada");
  assert.deepEqual(result.archivosPendientesDeRevision, [
    "src/features/home/servicios/Servicios.astro",
  ]);
  assert.equal(
    readFileSync(path.join(f.root, "memoria/revision.json"), "utf8"),
    before,
  );
});

test("no permite aprobar un bloque sin specs y aceptación", (t) => {
  const f = fixture(t);
  f.registry.bloques[0].specs = [];
  f.write("memoria/bloques.json", f.registry);
  assert.throws(
    () => record(f.root, f.relevo, summary),
    /sin specs o aceptación/,
  );
  f.registry.bloques[0].specs = ["openspec/specs/home-servicios/spec.md"];
  f.registry.bloques[0].aceptacion = [];
  f.write("memoria/bloques.json", f.registry);
  assert.throws(() => structure(f.root), /sin specs o aceptación/);
});

test("detecta borrado de specs, sección nueva sin registrar e IDs duplicados", (t) => {
  const f = fixture(t);
  f.write("src/features/home/galeria/Galeria.astro", "Nueva sección");
  assert.throws(() => structure(f.root), /sin registrar/);
  rmSync(path.join(f.root, "src/features/home/galeria"), { recursive: true });
  f.registry.bloques.push({ ...f.registry.bloques[0] });
  f.write("memoria/bloques.json", f.registry);
  assert.throws(() => structure(f.root), /IDs de bloque/);
  f.registry.bloques.pop();
  f.write("memoria/bloques.json", f.registry);
  rmSync(path.join(f.root, "openspec/specs/home-servicios/spec.md"));
  assert.throws(() => structure(f.root));
});

test("rechaza evidencias duplicadas y una revisión enlazada a otro relevo", (t) => {
  const f = fixture(t);
  f.state.fases[0].evidencias.push(f.relevo);
  f.write("memoria/estado.json", f.state);
  assert.throws(() => structure(f.root), /evidencias/);
  f.state.fases[0].evidencias.pop();
  f.write("memoria/estado.json", f.state);
  f.write("memoria/sesiones/SES-022.md", "# Otro relevo");
  assert.throws(
    () => record(f.root, "memoria/sesiones/SES-022.md", summary),
    /último relevo/,
  );
});

test("conserva las colisiones históricas exactas y rechaza una nueva", (t) => {
  const f = fixture(t);
  const a = "memoria/sesiones/SES-007-cabecera.md",
    b = "memoria/sesiones/SES-007-nav.md";
  f.write(a, "# Histórico");
  f.write(b, "# Histórico");
  f.write("memoria/relevos-legado.json", {
    schema: 1,
    duplicados: { "007": [a, b] },
  });
  structure(f.root);
  f.write("memoria/sesiones/SES-007-otro.md", "# Colisión nueva");
  assert.throws(() => structure(f.root), /duplicado/);
});

test("el generador asigna números exclusivos ante llamadas simultáneas", async (t) => {
  const f = fixture(t);
  const script = fileURLToPath(new URL("./relevo.mjs", import.meta.url));
  const outputs = await Promise.all(
    Array.from({ length: 4 }, (_, i) =>
      promisify(execFile)(process.execPath, [script, `Bloque ${i}`], {
        cwd: f.root,
      }),
    ),
  );
  const ids = outputs.map((o) => JSON.parse(o.stdout).id);
  assert.equal(new Set(ids).size, 4);
  assert.deepEqual(ids.sort(), ["SES-022", "SES-023", "SES-024", "SES-025"]);
  assert.equal(
    JSON.parse(readFileSync(path.join(f.root, "memoria/estado.json")))
      .ultimoRelevo,
    f.relevo,
  );
});

test("un relevo recién creado no sirve como revisión terminada", (t) => {
  const f = fixture(t);
  const next = createHandoff(f.root, "Trabajo pendiente");
  f.state.ultimoRelevo = next.archivo;
  f.write("memoria/estado.json", f.state);
  assert.throws(
    () => record(f.root, next.archivo, summary),
    /Completar el relevo/,
  );
});

test("rechaza referencias fuera del repo y symlinks documentales", (t) => {
  const f = fixture(t);
  f.registry.bloques[0].specs = ["../fuera.md"];
  f.write("memoria/bloques.json", f.registry);
  assert.throws(() => structure(f.root), /Referencia no válida/);
  f.registry.bloques[0].specs = ["openspec/specs/enlace.md"];
  f.write("memoria/bloques.json", f.registry);
  try {
    symlinkSync(
      "home-servicios/spec.md",
      path.join(f.root, "openspec/specs/enlace.md"),
    );
  } catch (e) {
    if (["EPERM", "EACCES", "ENOSYS"].includes(e.code)) {
      t.skip("Sistema sin permiso de symlink");
      return;
    }
    throw e;
  }
  assert.throws(() => structure(f.root), /simbólica/);
});
