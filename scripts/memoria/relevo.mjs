import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export function createHandoff(root, title) {
  if (typeof title !== "string" || !title.trim() || /[\r\n]/.test(title))
    throw new Error("Indicar un título de una línea para el relevo.");
  const folder = path.join(root, "memoria/sesiones");
  mkdirSync(folder, { recursive: true });
  let next =
    Math.max(
      0,
      ...readdirSync(folder).map((name) =>
        Number(name.match(/^SES-(\d+)(?:[-.]|$)/)?.[1] ?? 0),
      ),
    ) + 1;
  for (;;) {
    const id = `SES-${String(next).padStart(3, "0")}`;
    const relative = `memoria/sesiones/${id}.md`;
    const content = `# ${id} — ${title.trim()}\n\nEstado: borrador; no acredita cierre ni aprobación.\n\n## Alcance y procedencia\n\nPendiente: agente, instrucción y base Git real.\n\n## Decisiones vigentes y fuentes contrastadas\n\nPendiente: código, PRODUCT, mapa, specs, registro de bloques y sustituciones.\n\n## Verificaciones\n\nPendiente: comandos, resultados reales y limitaciones.\n\n## Aceptación y siguiente paso\n\nPendiente: aceptación existente, bloqueos y relevo. No anticipar SHA propio ni push.\n`;
    try {
      writeFileSync(path.join(root, relative), content, { flag: "wx" });
      return {
        id,
        archivo: relative,
        aviso:
          "Completar el borrador y actualizar el estado; aún no se ha registrado revisión ni aprobación.",
      };
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      next += 1;
    }
  }
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  try {
    if (process.argv.length !== 3)
      throw new Error('Uso: npm run memoria:relevo -- "Nombre del bloque"');
    process.stdout.write(
      JSON.stringify(createHandoff(process.cwd(), process.argv[2]), null, 2) +
        "\n",
    );
  } catch (error) {
    process.stderr.write(error.message + "\n");
    process.exitCode = 2;
  }
}
