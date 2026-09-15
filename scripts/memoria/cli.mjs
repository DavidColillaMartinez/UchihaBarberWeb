import { check, changes, scan, json } from "./core.mjs";

const command = process.argv[2];
try {
  if (
    !["scan", "check", "changes"].includes(command) ||
    process.argv.length !== 3
  )
    throw new Error(
      "Uso: node scripts/memoria/cli.mjs scan|check|changes (desde raíz).",
    );
  const result = { scan, check, changes }[command](process.cwd());
  process.stdout.write(json(result));
  if (command === "check" && result.resultado !== "vigente")
    process.exitCode = 1;
} catch (error) {
  process.stderr.write(
    json({ resultado: "no verificable", motivo: error.message }),
  );
  process.exitCode = 2;
}
