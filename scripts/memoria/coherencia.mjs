import { createHash } from "node:crypto";
import { lstatSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const serialize = (value) => JSON.stringify(value, null, 2) + "\n";
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const read = (root, file) =>
  JSON.parse(readFileSync(reference(root, file), "utf8"));
const statuses = new Set([
  "provisional",
  "en_curso",
  "en_revision",
  "aprobado",
]);

function safe(file) {
  return (
    typeof file === "string" &&
    file.length > 0 &&
    !file.includes("\\") &&
    !file.includes(":") &&
    !file.startsWith("/") &&
    !file.split("/").some((p) => ["", ".", ".."].includes(p))
  );
}

export function reference(root, file) {
  if (!safe(file)) throw new Error(`Referencia no válida: ${file}`);
  let current = root;
  for (const part of file.split("/")) {
    current = path.join(current, part);
    if (lstatSync(current).isSymbolicLink())
      throw new Error(`Referencia simbólica no admitida: ${file}`);
  }
  if (!lstatSync(current).isFile())
    throw new Error(`Falta archivo de referencia: ${file}`);
  return current;
}

function walk(root, prefix) {
  let stat;
  try {
    stat = lstatSync(path.join(root, prefix));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  if (stat.isSymbolicLink())
    throw new Error(
      `Ruta simbólica fuera del control de coherencia: ${prefix}`,
    );
  if (stat.isFile()) return [prefix];
  return readdirSync(path.join(root, prefix))
    .sort()
    .flatMap((name) => walk(root, `${prefix}/${name}`));
}

function unique(items, label) {
  if (
    !Array.isArray(items) ||
    items.some((v) => typeof v !== "string") ||
    new Set(items).size !== items.length
  )
    throw new Error(`Lista inválida o duplicada: ${label}`);
}

function references(root, items, label) {
  unique(items, label);
  items.forEach((p) => reference(root, p));
}

export function structure(root) {
  const state = read(root, "memoria/estado.json");
  const registry = read(root, "memoria/bloques.json");
  const legacy = read(root, "memoria/relevos-legado.json");
  if (
    registry.schema !== 1 ||
    !Array.isArray(registry.bloques) ||
    registry.bloques.length === 0 ||
    legacy.schema !== 1 ||
    !legacy.duplicados ||
    typeof legacy.duplicados !== "object" ||
    Array.isArray(legacy.duplicados)
  )
    throw new Error("Registro de bloques o legado inválido.");
  if (!Array.isArray(state.fases)) throw new Error("Estado de fases inválido.");
  references(root, [state.ultimoRelevo], "último relevo");
  for (const phase of state.fases)
    references(root, phase.evidencias, `evidencias de ${phase.id}`);
  unique(
    registry.bloques.map((b) => b.id),
    "IDs de bloque",
  );
  const sourceFiles = walk(root, "src/features");
  const covered = new Set();
  for (const block of registry.bloques) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(block.id) ||
      !statuses.has(block.estado) ||
      !state.fases.some((f) => f.id === block.fase) ||
      typeof block.nombre !== "string" ||
      !block.nombre.trim()
    )
      throw new Error(`Bloque inválido: ${block.id}`);
    unique(block.rutas, `rutas de ${block.id}`);
    if (!block.rutas.length) throw new Error(`Bloque sin rutas: ${block.id}`);
    for (const prefix of block.rutas) {
      const clean = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
      if (!safe(clean) || !clean.startsWith("src/"))
        throw new Error(`Ruta de bloque inválida: ${prefix}`);
      const files = walk(root, clean);
      if (!files.length)
        throw new Error(`Ruta de bloque inexistente o vacía: ${prefix}`);
      for (const file of files) covered.add(file);
    }
    references(root, block.specs, `specs de ${block.id}`);
    if (block.specs.some((s) => !s.startsWith("openspec/specs/")))
      throw new Error(`Specs no consolidadas: ${block.id}`);
    references(root, block.cambios, `cambios de ${block.id}`);
    if (block.cambios.some((s) => !s.startsWith("openspec/changes/")))
      throw new Error(`Cambio fuera de OpenSpec: ${block.id}`);
    references(root, block.aceptacion, `aceptación de ${block.id}`);
    if (
      block.estado === "aprobado" &&
      (!block.specs.length || !block.aceptacion.length)
    )
      throw new Error(`Bloque aprobado sin specs o aceptación: ${block.id}`);
    unique(block.pendientes, `pendientes de ${block.id}`);
  }
  const missing = sourceFiles.filter((f) => !covered.has(f));
  if (missing.length)
    throw new Error(`Código de secciones sin registrar: ${missing.join(", ")}`);
  const groups = new Map();
  for (const file of walk(root, "memoria/sesiones")) {
    const match = path.posix.basename(file).match(/^SES-(\d+)(?:[-.]|$)/);
    if (!match) continue;
    const id = String(Number(match[1])).padStart(3, "0");
    const list = groups.get(id) ?? [];
    list.push(file);
    groups.set(id, list);
  }
  for (const [id, files] of groups) {
    if (files.length < 2) continue;
    const allowed = legacy.duplicados[id];
    if (
      !Array.isArray(allowed) ||
      serialize([...allowed].sort()) !== serialize([...files].sort())
    )
      throw new Error(`Número de relevo duplicado: SES-${id}`);
  }
  for (const [id, files] of Object.entries(legacy.duplicados)) {
    references(root, files, `legado ${id}`);
    if (
      files.length < 2 ||
      serialize([...files].sort()) !==
        serialize([...(groups.get(id) ?? [])].sort())
    )
      throw new Error(`Legado inconsistente: ${id}`);
  }
  return { state, registry };
}

export function fingerprint(root) {
  const roots = [
    "src",
    "openspec",
    "memoria",
    "scripts/memoria",
    ".agents",
    ".opencode/commands",
    ".opencode/skills",
    "AGENTS.md",
    "PRODUCT.md",
    "README.md",
    "package.json",
    "package-lock.json",
    "astro.config.mjs",
    "tsconfig.json",
    "skills-lock.json",
    ".gitignore",
    ".prettierignore",
    ".prettierrc",
    ".nvmrc",
  ];
  const paths = [...new Set(roots.flatMap((p) => walk(root, p)))]
    .filter(
      (p) =>
        !p.startsWith("memoria/generado/") && p !== "memoria/revision.json",
    )
    .sort();
  const files = paths.map((file) => ({
    ruta: file,
    sha256: hash(readFileSync(reference(root, file))),
  }));
  return { archivos: files, huella: hash(serialize(files)) };
}

export function record(root, relevo, resumen) {
  const { state } = structure(root);
  if (
    state.ultimoRelevo !== relevo ||
    !/^memoria\/sesiones\/SES-\d+(?:-[^/]+)?\.md$/.test(relevo)
  )
    throw new Error("La revisión debe enlazar el último relevo de sesiones.");
  reference(root, relevo);
  if (
    /^Estado:\s*borrador/im.test(readFileSync(reference(root, relevo), "utf8"))
  )
    throw new Error("Completar el relevo antes de registrar una revisión.");
  if (typeof resumen !== "string" || resumen.trim().length < 30)
    throw new Error(
      "Explicar el contraste realizado; un resultado verde no es una revisión.",
    );
  const snapshot = fingerprint(root);
  const receipt = {
    schema: 1,
    relevo,
    resumen: resumen.trim(),
    alcance: "codigo-y-documentacion-no-aprobacion-visual",
    ...snapshot,
  };
  writeFileSync(path.join(root, "memoria/revision.json"), serialize(receipt));
  return {
    resultado: "revision-declarada",
    relevo,
    huella: snapshot.huella,
    aviso:
      "El agente afirma haber revisado; el comando no comprende el significado de los documentos.",
  };
}

export function checkCoherence(root) {
  const { state, registry } = structure(root);
  const receipt = read(root, "memoria/revision.json");
  if (
    receipt.schema !== 1 ||
    receipt.alcance !== "codigo-y-documentacion-no-aprobacion-visual" ||
    typeof receipt.resumen !== "string" ||
    receipt.resumen.trim().length < 30 ||
    !Array.isArray(receipt.archivos)
  )
    throw new Error("Registro de revisión inválido.");
  reference(root, receipt.relevo);
  const actual = fingerprint(root);
  const old = new Map(receipt.archivos.map((f) => [f.ruta, f.sha256]));
  const now = new Map(actual.archivos.map((f) => [f.ruta, f.sha256]));
  const affected = [...new Set([...old.keys(), ...now.keys()])]
    .filter((f) => old.get(f) !== now.get(f))
    .sort();
  const ok =
    receipt.relevo === state.ultimoRelevo &&
    receipt.huella === actual.huella &&
    serialize(receipt.archivos) === serialize(actual.archivos);
  return {
    resultado: ok ? "coherencia-registrada" : "revision-desactualizada",
    bloques: registry.bloques.length,
    archivosPendientesDeRevision: affected,
    relevoActual: state.ultimoRelevo,
    relevoRevisado: receipt.relevo,
    aviso:
      "Valida estructura y versión revisada, no verdad semántica ni aprobación del usuario.",
  };
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  try {
    const [command, ...args] = process.argv.slice(2);
    let result;
    if (command === "check" && args.length === 0) {
      result = checkCoherence(process.cwd());
      if (result.resultado !== "coherencia-registrada") process.exitCode = 1;
    } else if (
      command === "registrar" &&
      args.length === 4 &&
      args[0] === "--relevo" &&
      args[2] === "--resumen"
    )
      result = record(process.cwd(), args[1], args[3]);
    else
      throw new Error(
        "Uso: coherencia.mjs check | registrar --relevo <ruta> --resumen <contraste realizado>",
      );
    process.stdout.write(serialize(result));
  } catch (error) {
    process.stderr.write(
      serialize({ resultado: "no-verificable", motivo: error.message }),
    );
    process.exitCode = 2;
  }
}
