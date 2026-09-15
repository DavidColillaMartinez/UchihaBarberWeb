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
