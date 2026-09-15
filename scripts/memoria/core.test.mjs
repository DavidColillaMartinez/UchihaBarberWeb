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
import path from "node:path";
import {
  scan,
  check,
  changes,
  validate,
  git,
  json,
  excluded,
  snapshot,
} from "./core.mjs";

function fixture(t) {
  const tempParent = path.join(process.cwd(), "node_modules");
  mkdirSync(tempParent, { recursive: true });
  const root = mkdtempSync(path.join(tempParent, ".memoria-test-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (file, text) => {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), text);
  };
  for (const file of [
    "AGENTS.md",
    "PRODUCT.md",
    "openspec/config.yaml",
    "memoria/README.md",
    "memoria/protocolo.md",
    "memoria/integraciones.md",
    "memoria/mapa.md",
    "memoria/roadmap.md",
    "memoria/sesiones/uno.md",
  ])
    write(file, "Contexto\n");
  const state = {
    schema: 1,
    faseActiva: "UB-001",
    ultimoRelevo: "memoria/sesiones/uno.md",
    fases: [
      {
        id: "UB-001",
        titulo: "Prueba",
        estado: "en_revision",
        dependeDe: [],
        autorizacion: "Prueba",
        openspec: null,
        criterios: ["Verificar"],
        evidencias: ["memoria/sesiones/uno.md"],
      },
    ],
  };
  write("memoria/estado.json", json(state));
  write(
    "memoria/relaciones.json",
    json({
      schema: 1,
      areas: [
        { id: "web", prefijos: ["src/"], documentos: ["memoria/mapa.md"] },
      ],
    }),
  );
  write("src/index.txt", "base\n");
  write(".gitignore", "node_modules/\n.env*\n*.local.*\nmemoria/generado/\n");
  git(root, ["init", "-q"]);
  git(root, ["config", "core.hooksPath", ".no-hooks"]);
  git(root, ["config", "user.name", "Prueba local"]);
  git(root, ["config", "user.email", "test@example.invalid"]);
  git(root, ["config", "commit.gpgsign", "false"]);
  git(root, ["add", "."]);
  git(root, ["commit", "-qm", "Base de prueba"]);
  return { root, write, state };
}

test("escaneo determinista y check de solo lectura; sin autorreferencia tras commit", (t) => {
  const { root, write } = fixture(t);
  scan(root);
  const before = readFileSync(
    path.join(root, "memoria/generado/estado.json"),
    "utf8",
  );
  scan(root);
  assert.equal(
    readFileSync(path.join(root, "memoria/generado/estado.json"), "utf8"),
    before,
  );
  assert.equal(check(root).resultado, "vigente");
  assert.equal(git(root, ["status", "--porcelain"]), "");
  write("src/index.txt", "nuevo\n");
  scan(root);
  const base = JSON.parse(
    readFileSync(path.join(root, "memoria/generado/estado.json")),
  ).baseCommit;
  git(root, ["add", "src/index.txt"]);
  git(root, ["add", "-f", "memoria/generado"]);
  git(root, ["commit", "-qm", "Cambio"]);
  assert.notEqual(git(root, ["rev-parse", "HEAD"]).trim(), base);
  assert.equal(check(root).resultado, "vigente");
  scan(root);
  assert.equal(
    JSON.parse(readFileSync(path.join(root, "memoria/generado/estado.json")))
      .baseCommit,
    base,
  );
});

test("detecta altas, modificaciones, bajas e impacto documental", (t) => {
  const { root, write } = fixture(t);
  write("src/borrar.txt", "antes");
  scan(root);
  write("src/index.txt", "modificado");
  write("src/nuevo.txt", "nuevo");
  rmSync(path.join(root, "src/borrar.txt"));
  const result = changes(root);
  assert.deepEqual(result.altas, ["src/nuevo.txt"]);
  assert.deepEqual(result.modificaciones, ["src/index.txt"]);
  assert.deepEqual(result.bajas, ["src/borrar.txt"]);
  assert.deepEqual(result.documentosARevisar, ["memoria/mapa.md"]);
  assert.equal(check(root).resultado, "desactualizado");
});

test("excluye configuración privada aunque esté seguida, sin leer su contenido", (t) => {
  const { root, write } = fixture(t);
  write(".impeccable/config.local.json", "consentimiento de prueba");
  write(".env", "SECRETO_FICTICIO=prueba");
  write("node_modules/ignorado.txt", "salida");
  git(root, ["add", "-f", ".impeccable/config.local.json"]);
  scan(root);
  const content = readFileSync(
    path.join(root, "memoria/generado/archivos.json"),
    "utf8",
  );
  assert.ok(
    !content.includes("config.local.json") &&
      !content.includes("SECRETO") &&
      !content.includes("ignorado.txt"),
  );
  assert.deepEqual(check(root).seguimientoNoPermitido, [
    ".impeccable/config.local.json",
  ]);
  git(root, ["rm", "--cached", "--", ".impeccable/config.local.json"]);
  assert.equal(
    readFileSync(path.join(root, ".impeccable/config.local.json"), "utf8"),
    "consentimiento de prueba",
  );
  assert.equal(check(root).resultado, "vigente");
  assert.ok(!excluded(".env.example"));
});

test("no sigue symlinks ni permite referencias documentales fuera del repo", (t) => {
  const { root, write, state } = fixture(t);
  try {
    symlinkSync("../PRODUCT.md", path.join(root, "src/enlace"));
  } catch (e) {
    if (["EPERM", "EACCES", "ENOSYS"].includes(e.code)) {
      t.skip("Sistema sin permiso para crear symlink");
      return;
    }
    throw e;
  }
  const file = snapshot(root).inventory.archivos.find(
    (f) => f.ruta === "src/enlace",
  );
  assert.equal(file.tipo, "enlace");
  assert.equal(file.bytes, Buffer.byteLength("../PRODUCT.md"));
  state.ultimoRelevo = "../fuera.md";
  write("memoria/estado.json", json(state));
  assert.throws(() => validate(root), /Referencia no válida/);
});

test("rechaza ciclos, referencias faltantes y JSON inválido", (t) => {
  const { root, write, state } = fixture(t);
  const second = { ...state.fases[0], id: "UB-002", dependeDe: ["UB-001"] };
  state.fases[0].dependeDe = ["UB-002"];
  state.fases.push(second);
  write("memoria/estado.json", json(state));
  assert.throws(() => validate(root), /Ciclo/);
  state.fases[0].dependeDe = [];
  state.ultimoRelevo = "memoria/falta.md";
  write("memoria/estado.json", json(state));
  assert.throws(() => validate(root));
  write("memoria/estado.json", "{");
  assert.throws(() => validate(root));
});

test("sin Git o con inventario alterado no certifica vigencia", (t) => {
  const { root, write } = fixture(t);
  scan(root);
  write(
    "memoria/generado/estado.json",
    json({ schema: 1, baseCommit: "0".repeat(40), huella: "incorrecta" }),
  );
  assert.equal(check(root).resultado, "desactualizado");
  rmSync(path.join(root, ".git"), { recursive: true, force: true });
  assert.throws(() => scan(root));
});
