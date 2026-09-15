import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  lstatSync,
  readFileSync,
  readlinkSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

export const generated = "memoria/generado/";
export const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
export const json = (value) => JSON.stringify(value, null, 2) + "\n";
export const git = (root, args) =>
  execFileSync("git", ["-C", root, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 32 * 1024 * 1024,
  });
export const readJSON = (root, file) =>
  JSON.parse(readFileSync(path.join(root, file), "utf8"));

export function safePath(file) {
  return (
    typeof file === "string" &&
    file.length > 0 &&
    !file.includes("\\") &&
    !path.posix.isAbsolute(file) &&
    !/^[A-Za-z]:/.test(file) &&
    !file.split("/").some((p) => p === ".." || p === "." || p === "")
  );
}

export function excluded(file) {
  const parts = file.split("/");
  const name = parts.at(-1);
  return (
    file.startsWith(generated) ||
    parts.some((p) =>
      [
        ".git",
        "node_modules",
        "dist",
        ".astro",
        ".vercel",
        "coverage",
        "test-results",
        "playwright-report",
        ".idea",
      ].includes(p),
    ) ||
    file === ".codex/hooks.json" ||
    file === ".npmrc" ||
    (file.startsWith(".vscode/") && file !== ".vscode/extensions.json") ||
    (name.startsWith(".env") && name !== ".env.example") ||
    /\.local(?:\.|$)|\.(?:pem|key)$|\.log$/.test(name) ||
    name === ".DS_Store"
  );
}

export function context(root) {
  const top = git(root, ["rev-parse", "--show-toplevel"]).trim();
  if (path.resolve(top) !== path.resolve(root))
    throw new Error(
      "Ejecutar desde la raíz de este repositorio, no desde un subdirectorio.",
    );
  return { head: git(root, ["rev-parse", "--verify", "HEAD"]).trim() };
}

export function ancestor(root, commit, head) {
  if (!/^[a-f0-9]{40,64}$/.test(commit ?? "")) return false;
  try {
    git(root, ["merge-base", "--is-ancestor", commit, head]);
    return true;
  } catch {
    return false;
  }
}

function fileRef(root, file) {
  if (!safePath(file) || excluded(file))
    throw new Error(`Referencia no válida: ${file}`);
  // No seguir enlaces simbólicos en ningún componente de una referencia documental.
  let cursor = root;
  for (const part of file.split("/")) {
    cursor = path.join(cursor, part);
    if (lstatSync(cursor).isSymbolicLink())
      throw new Error(`Referencia simbólica no admitida: ${file}`);
  }
  if (!lstatSync(cursor).isFile())
    throw new Error(`Referencia no es archivo: ${file}`);
}

export function validate(root) {
  const state = readJSON(root, "memoria/estado.json");
  const relations = readJSON(root, "memoria/relaciones.json");
  const statuses = new Set([
    "pendiente",
    "definicion",
    "lista",
    "en_curso",
    "en_revision",
    "aprobada",
    "bloqueada",
    "diferida",
  ]);
  if (
    state.schema !== 1 ||
    !Array.isArray(state.fases) ||
    state.fases.length === 0 ||
    relations.schema !== 1 ||
    !Array.isArray(relations.areas)
  )
    throw new Error("Esquema de memoria inválido.");
  const ids = new Set(state.fases.map((f) => f.id));
  if (ids.size !== state.fases.length || !ids.has(state.faseActiva))
    throw new Error("IDs duplicados o fase activa inexistente.");
  if (state.fases.filter((f) => f.estado === "en_curso").length > 1)
    throw new Error("Solo una fase en curso.");
  for (const file of [
    "AGENTS.md",
    "PRODUCT.md",
    "openspec/config.yaml",
    "memoria/README.md",
    "memoria/protocolo.md",
    "memoria/integraciones.md",
    "memoria/mapa.md",
    "memoria/roadmap.md",
    state.ultimoRelevo,
  ])
    fileRef(root, file);
  for (const f of state.fases) {
    if (
      !/^UB-\d{3}$/.test(f.id) ||
      !statuses.has(f.estado) ||
      typeof f.titulo !== "string" ||
      !Array.isArray(f.dependeDe) ||
      !Array.isArray(f.criterios) ||
      !f.criterios.length ||
      !f.criterios.every((c) => typeof c === "string" && c.length) ||
      !Array.isArray(f.evidencias)
    )
      throw new Error(`Fase inválida: ${f.id}`);
    if (f.dependeDe.some((id) => !ids.has(id) || id === f.id))
      throw new Error(`Dependencias inválidas: ${f.id}`);
    if (f.estado === "en_curso" && state.faseActiva !== f.id)
      throw new Error("La fase en curso debe ser la activa.");
    if (
      ["en_curso", "aprobada"].includes(f.estado) &&
      (!f.autorizacion || !f.evidencias.length)
    )
      throw new Error(`Falta autorización/evidencia: ${f.id}`);
    if (f.openspec !== null) {
      if (
        typeof f.openspec !== "string" ||
        !f.openspec.startsWith("openspec/changes/")
      )
        throw new Error(`Referencia OpenSpec inválida: ${f.id}`);
      fileRef(root, f.openspec);
    }
    for (const file of f.evidencias) fileRef(root, file);
    if (
      f.estado === "en_curso" &&
      f.dependeDe.some(
        (id) => state.fases.find((x) => x.id === id).estado !== "aprobada",
      ) &&
      !f.excepcionDependencias
    )
      throw new Error(`Dependencia sin aprobar ni excepción: ${f.id}`);
  }
  const visiting = new Set(),
    done = new Set();
  function visit(id) {
    if (visiting.has(id)) throw new Error("Ciclo en dependencias del roadmap.");
    if (done.has(id)) return;
    visiting.add(id);
    state.fases.find((f) => f.id === id).dependeDe.forEach(visit);
    visiting.delete(id);
    done.add(id);
  }
  state.fases.forEach((f) => visit(f.id));
  const areaIds = new Set();
  for (const area of relations.areas) {
    if (
      typeof area.id !== "string" ||
      areaIds.has(area.id) ||
      !Array.isArray(area.prefijos) ||
      !area.prefijos.length ||
      !Array.isArray(area.documentos) ||
      !area.documentos.length
    )
      throw new Error("Área documental inválida.");
    areaIds.add(area.id);
    for (const prefix of area.prefijos)
      if (!safePath(prefix.endsWith("/") ? prefix.slice(0, -1) : prefix))
        throw new Error("Prefijo inválido.");
    area.documentos.forEach((f) => fileRef(root, f));
  }
  return { state, relations };
}

export function snapshot(root) {
  const { head } = context(root);
  const { relations } = validate(root);
  const tracked = git(root, ["ls-files", "-z"]).split("\0").filter(Boolean);
  const candidates = [
    ...new Set(
      git(root, [
        "ls-files",
        "--cached",
        "--others",
        "--exclude-standard",
        "-z",
      ])
        .split("\0")
        .filter(Boolean),
    ),
  ].sort();
  const archivos = [];
  for (const file of candidates) {
    if (!safePath(file)) throw new Error("Git devolvió una ruta no segura.");
    if (excluded(file)) continue;
    // Un directorio reemplazado por un enlace no debe permitir leer fuera del repo.
    let cursor = root,
      parentLink = false;
    for (const part of file.split("/").slice(0, -1)) {
      cursor = path.join(cursor, part);
      try {
        if (lstatSync(cursor).isSymbolicLink()) {
          parentLink = true;
          break;
        }
      } catch (e) {
        if (e.code !== "ENOENT" && e.code !== "ENOTDIR") throw e;
        parentLink = true;
        break;
      }
    }
    if (parentLink) continue;
    let stat;
    try {
      stat = lstatSync(path.join(root, file));
    } catch (e) {
      if (e.code === "ENOENT" || e.code === "ENOTDIR") continue;
      throw e;
    }
    if (!stat.isFile() && !stat.isSymbolicLink())
      throw new Error(`Tipo no soportado en inventario: ${file}`);
    const bytes = stat.isSymbolicLink()
      ? Buffer.from(readlinkSync(path.join(root, file)))
      : readFileSync(path.join(root, file));
    archivos.push({
      ruta: file,
      tipo: stat.isSymbolicLink() ? "enlace" : "archivo",
      bytes: bytes.length,
      sha256: sha(bytes),
    });
  }
  const inventory = { schema: 1, algoritmo: "sha256-bytes", archivos };
  const dependencies = {
    schema: 1,
    metodo: "areas-declaradas-no-ast",
    areas: relations.areas.map((area) => ({
      ...area,
      archivos: archivos
        .filter((f) =>
          area.prefijos.some((p) =>
            p.endsWith("/") ? f.ruta.startsWith(p) : f.ruta === p,
          ),
        )
        .map((f) => f.ruta),
    })),
  };
  const privateTracked = tracked
    .filter((f) => excluded(f) && !f.startsWith(generated))
    .sort();
  return {
    head,
    inventory,
    dependencies,
    privateTracked,
    fingerprint: sha(json(inventory)),
  };
}

export function differences(previous, current) {
  const before = new Map(previous.archivos.map((f) => [f.ruta, f]));
  const after = new Map(current.archivos.map((f) => [f.ruta, f]));
  return {
    altas: [...after.keys()].filter((p) => !before.has(p)),
    modificaciones: [...after.keys()].filter(
      (p) => before.has(p) && json(before.get(p)) !== json(after.get(p)),
    ),
    bajas: [...before.keys()].filter((p) => !after.has(p)),
  };
}

export function scan(root) {
  const actual = snapshot(root);
  let previous;
  try {
    previous = readJSON(root, generated + "estado.json");
  } catch {
    /* Primera generación. */
  }
  const baseCommit =
    previous?.huella === actual.fingerprint &&
    ancestor(root, previous.baseCommit, actual.head)
      ? previous.baseCommit
      : actual.head;
  mkdirSync(path.join(root, generated), { recursive: true });
  for (const [name, value] of Object.entries({
    "archivos.json": actual.inventory,
    "dependencias.json": actual.dependencies,
    "estado.json": {
      schema: 1,
      baseCommit,
      huella: actual.fingerprint,
      significado: "inventario-no-revision",
    },
  }))
    writeFileSync(path.join(root, generated, name), json(value));
  return {
    resultado: "inventariado",
    baseCommit,
    archivos: actual.inventory.archivos.length,
    seguimientoNoPermitido: actual.privateTracked,
    aviso: "No acredita revisión, aprobación ni sincronización remota.",
  };
}

export function check(root) {
  const actual = snapshot(root);
  const inventory = readJSON(root, generated + "archivos.json");
  const deps = readJSON(root, generated + "dependencias.json");
  const state = readJSON(root, generated + "estado.json");
  const motivos = [];
  if (json(actual.inventory) !== json(inventory))
    motivos.push(
      "Inventario distinto: ejecutar memoria:changes y revisar antes de scan.",
    );
  if (json(actual.dependencies) !== json(deps))
    motivos.push("Relaciones documentales desactualizadas.");
  if (
    state.schema !== 1 ||
    state.huella !== actual.fingerprint ||
    state.significado !== "inventario-no-revision"
  )
    motivos.push("Huella o esquema generado inválido.");
  if (!ancestor(root, state.baseCommit, actual.head))
    motivos.push("Commit base no verificable en la ascendencia de HEAD.");
  if (actual.privateTracked.length)
    motivos.push(
      "Archivos excluidos todavía seguidos por Git; revisar y retirar del índice conservándolos localmente.",
    );
  return {
    resultado: motivos.length ? "desactualizado" : "vigente",
    motivos,
    seguimientoNoPermitido: actual.privateTracked,
    head: actual.head,
    baseCommit: state.baseCommit,
    alcance:
      "Inventario y estructura documental; no aprobación, revisión semántica ni estado remoto.",
  };
}

export function changes(root) {
  const actual = snapshot(root);
  let previous;
  try {
    previous = readJSON(root, generated + "archivos.json");
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
    previous = { archivos: [] };
  }
  const diff = differences(previous, actual.inventory);
  const affected = [...diff.altas, ...diff.modificaciones, ...diff.bajas];
  const documents = new Set();
  for (const area of actual.dependencies.areas)
    if (
      affected.some((file) =>
        area.prefijos.some((p) =>
          p.endsWith("/") ? file.startsWith(p) : file === p,
        ),
      )
    )
      area.documentos.forEach((f) => documents.add(f));
  return {
    ...diff,
    documentosARevisar: [...documents].sort(),
    seguimientoNoPermitido: actual.privateTracked,
    aviso:
      "Sugerencias declaradas por área; no revisión automática ni grafo completo de imports.",
  };
}
