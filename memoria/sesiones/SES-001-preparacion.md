# SES-001 — Preparación de la entrega 1.5–2

Agente: Codex en ChatGPT. Fecha de entorno: 2026-09-15 (no se usa como prueba de vigencia). Fases: UB-001 y UB-002. Modalidad: mantenimiento directo autorizado, entrega ZIP; sin commit/push de este agente ni implementación web.

## Procedencia

Base local recibida en Web.zip y base remota consultada: `d0021062a149336361cab5229bcda72e7b9d7eee`, rama `main`, remoto local `UchihaBarberWeb`. El estado local original no mostraba modificaciones seguidas. La observación remota es de este momento, no una garantía permanente.

Historial anterior observado: `8389229665af423467677fa2496ab168a541a45d` (Initial commit), `06dec9267a8e6c0bc2a9eaefb355d27fa32bc3b9` (StackInicialUchihaBarberWeb), y la base indicada (AGENTS: historial y configuración de Git).

Se leyeron instrucciones del proyecto, PRODUCT, configuración, comandos/skills OpenSpec pertinentes y árbol remoto. El chat compartido adicional no fue accesible: no se afirma haberlo analizado. Se utiliza el contexto explícito de esta conversación y del repositorio.

## Cambios y revisión

AGENTS enlaza el protocolo y corrige la organización a features por página/sección. PRODUCT conserva su esquema Impeccable y visión, actualizando el estado de las herramientas. OpenSpec config recibe contexto/reglas/guías. README ofrece entrada útil. Se añade memoria con fuentes canónicas, estado, decisiones, mapa, relaciones y relevos; scripts Node para inventario SHA-256, detección de diferencias y validación. Sin dependencias nuevas ni cambios de código web/skills instaladas.

Se separan inventario, revisión y aprobación del usuario. La base Git evita autorreferencia del SHA del propio commit. El mapa de dependencias es declarado por área, no un AST. Se excluyen de Git configuración local y salidas; dos archivos personales seguidos deben retirarse del índice con OpenCode, conservándolos en el equipo. No se modifica el historial.

## Verificaciones

- `npm run memoria:test`: 6 pruebas aprobadas, 0 fallos y 0 omitidas, con Node v24.19.0. Incluyen determinismo, commit con inventario versionado sin autorreferencia, altas/cambios/bajas, privacidad, symlinks, referencias, ciclos, JSON inválido y ausencia de Git.
- Prettier local del ZIP original: comprobación de AGENTS, PRODUCT, README, package.json, openspec/config.yaml, memoria y scripts/memoria correcta. Los índices generados usan formato determinista propio y están excluidos de Prettier.
- `git diff --check`: correcto. YAML analizado y referencias del contexto comprobadas; esto no valida por sí solo su ejecución en OpenSpec.
- `memoria:scan`: 72 archivos de entrada inventariados; base Git indicada arriba. El check de la copia de trabajo detecta, como debe, los dos archivos personales todavía seguidos.
- Ensayo aislado sobre copia del ZIP original con la actualización aplicada: check avisa antes de la retirada del índice; después de `git rm --cached` pasa, conserva ambos archivos locales y `memoria:changes` no muestra diferencias. No se hizo commit ni push en esa copia.
- Comparación de bytes: código web, skills/comandos existentes y package-lock.json sin cambios. No se ejecutó build porque el código web y sus dependencias no cambian.
- CLI OpenSpec no disponible en este entorno; ensayo real de OpenCode/Impeccable, commit y push del usuario pendientes. No se declaran fases aprobadas por estas pruebas de preparación.

## Relevo

Aplicar según `memoria/aplicacion.md` y ejecutar el prompt de `memoria/primer-commit.md` en OpenCode. No construir secciones. UB-001/UB-002 permanecen en revisión hasta sus comprobaciones reales. SHA de esta entrega: pendiente del commit local de OpenCode; se registrará en el siguiente relevo, sin fingir un commit ya existente.
