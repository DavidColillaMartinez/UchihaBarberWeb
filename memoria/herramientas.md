# Herramientas de memoria

Ejecutar desde raíz con Node compatible con `package.json`. Solo módulos estándar de Node y Git instalado; no se añaden dependencias. Las pruebas crean repositorios temporales aislados dentro de `node_modules/` y los eliminan al terminar; no hacen commits en el proyecto.

| Comando                   | Resultado                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run memoria:scan`    | Recalcula los tres JSON de `memoria/generado/`                                                   |
| `npm run memoria:check`   | Verifica documentos, relaciones, roadmap, inventario, base Git y archivos excluidos aún seguidos |
| `npm run memoria:changes` | Muestra altas, modificaciones, bajas y documentos sugeridos para revisar                         |
| `npm run memoria:test`    | Pruebas aisladas de consistencia, cambios, privacidad y referencias                              |

`check`: salida 0 = vigente; 1 = desactualizado/seguimiento no permitido; 2 = no verificable/error. `scan` y `changes`: 0 = ejecución correcta, 2 = error. Un scan puede terminar bien y avisar de archivos privados seguidos: no los modifica, y check seguirá fallando hasta retirarlos del índice. Un inventario aún no creado hace que check sea no verificable; revisar primero y generar después.

Las exclusiones se aplican incluso a archivos seguidos: `.git`, dependencias, dist/cachés, salidas de pruebas, `.env*` salvo `.env.example`, configuraciones `*.local.*`, hooks personales, claves PEM/KEY, `.npmrc`, logs y `generado/`. Los comandos/skills compartidos y documentos sí se inventarían. `.env.example` solo puede contener ejemplos sin secretos. No es un detector universal de credenciales: revisar siempre el diff y el índice antes de publicar.

Las relaciones por área se editan en `memoria/relaciones.json`. Los prefijos acabados en `/` abarcan una carpeta; los demás son archivos exactos. Destinos documentales deben existir, ser relativos y no ser symlinks. Un área nueva requiere actualizar relaciones/mapa cuando tenga relevancia; no se crean directorios futuros para satisfacer el inventario.

El validador detecta IDs/estados inválidos, múltiples fases en curso, dependencias inexistentes/cíclicas, falta de referencias y cierta ausencia de evidencia declarada. No interpreta si la evidencia demuestra de verdad los criterios: eso corresponde a la revisión. Tampoco comprueba la versión instalada de OpenSpec, imports ni el remoto.

El escaneo usa el árbol de trabajo; no sustituye `git diff --cached` ni asegura que todo esté incluido en el commit. Archivos nuevos deben añadirse explícitamente al índice al publicar. Tras merge/rebase o cambio de finales de línea, revisar divergencias y regenerar si procede, sin falsear la procedencia.

## Coherencia y relevos

`memoria:check` ahora ejecuta primero el inventario y después `memoria:coherencia`. Este segundo control valida `bloques.json`, las referencias, los duplicados y `revision.json`. Salida 0 indica una revisión registrada para la versión actual; 1 indica cambios posteriores a revisar; 2 indica estructura inválida o datos ausentes. No interpreta el significado del contenido.

`memoria:relevo -- "Nombre"` crea exclusivamente el siguiente `SES-NNN.md` disponible como borrador, sin cambiar estado ni revisión. Completarlo antes de enlazarlo como relevo vigente. La creación exclusiva evita colisiones entre llamadas en la misma carpeta; entre ramas diferentes la integración sigue requiriendo resolverlas.

`memoria:revision -- --relevo <ruta> --resumen "Contraste realizado"` registra la declaración del agente y la huella del código/documentación después de su revisión real. Exige el último relevo y no acepta un borrador recién creado. No aprueba fases, no consolida specs y no renueva el inventario. Escanear tampoco modifica la revisión: son controles distintos. Ver `cierre.md`.

Las pruebas incluyen cambios tras la revisión, specs/aceptación ausentes, secciones sin registrar, duplicados, referencias inseguras y creación concurrente de relevos. No se añaden dependencias. `public/` se mantiene en el inventario general; la huella de revisión cubre archivos textuales de trabajo, no valida el contenido audiovisual.

`memoria/revision.json` se genera con formato determinista y está excluida de Prettier; permanece versionada. No editar su huella manualmente.
