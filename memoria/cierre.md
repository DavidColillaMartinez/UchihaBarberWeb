# Cierre coherente de los bloques

El agente aplica este procedimiento sin que el usuario tenga que recordarlo. Trabajar en una conversación larga o compactarla no elimina estas obligaciones. Los IDs, archivos y comandos los administra la IA; al usuario se le habla por nombres de bloques.

## Al retomar

Leer AGENTS, PRODUCT, estado, último relevo y el bloque pertinente de `bloques.json`. Ejecutar `memoria:check` y leer las diferencias antes de regenerar. El registro de revisión puede estar desactualizado por cambios legítimos: eso exige revisarlos, no deshacerlos automáticamente.

## Antes de dar un bloque por terminado

1. Leer el diff y la instrucción que autorizó el trabajo. Identificar decisiones sustituidas y excepciones nuevas. El código por sí solo no acredita aprobación del usuario.
2. Comparar con PRODUCT (identidad y decisiones vigentes), mapa (arquitectura actual), specs (comportamiento), `bloques.json` (estado, fuentes, aceptación) y relevo. Actualizar la fuente correspondiente o dejar explícitamente que sigue vigente y por qué. No copiar tareas OpenSpec.
3. Revisar efectos compartidos: scroll, navegación, reservas, tipografía, movimiento y componentes comunes. Una excepción local debe reflejarse también en cualquier requisito general incompatible. No cambiar una decisión visual aprobada para satisfacer documentación antigua.
4. Para trabajo SDD, respetar el flujo instalado y sincronizar specs al cerrar. Si queda una consolidación pendiente, registrarla y no declarar cierre completo. Para mantenimiento directo, describir su procedencia sin inventar propuestas, tareas o aprobaciones pasadas.
5. Crear/completar el relevo, enlazarlo desde el estado y actualizar los bloques afectados. Conservar su aceptación visual y sus pendientes por separado. Los relevos históricos no son la fuente de estado actual: la decisión vigente debe ser encontrable sin reconstruir toda la conversación.
6. Formatear y verificar lo tocado. Registrar una revisión real con `memoria:revision`; después ejecutar `memoria:scan`, `memoria:check` y las pruebas pertinentes. Revisar el índice si se ha autorizado commit/push. Si vuelves a modificar código/documentos después de registrar la revisión, hay que revisar esas modificaciones y registrar de nuevo antes del escaneo final.

## Registro de revisión

```sh
npm run memoria:relevo -- "Cierre de Servicios"
# Completar el archivo generado y actualizar estado y bloques.
npm run memoria:revision -- --relevo memoria/sesiones/SES-022.md --resumen "Comparados código, specs, PRODUCT, mapa y decisiones; excepción de scroll reflejada en las fuentes afectadas."
npm run memoria:scan
npm run memoria:check
```

La ruta es ilustrativa: utilizar la que devuelva el comando, nunca un número supuesto. `revision.json` contiene el relevo, un resumen concreto y la huella de los archivos revisados. No contiene el SHA de su propio commit. El comando de revisión no modifica estados de aprobación, specs ni el inventario; exige estructura y referencias válidas antes de registrar.

La huella cubre código textual, herramientas, instrucciones y documentación de proyecto; excluye `revision.json`, `generado/` y recursos binarios. El inventario general sigue cubriendo los recursos. La revisión de contenido/diseño audiovisual corresponde al agente y al usuario cuando proceda; un hash no la sustituye.

## Qué se comprueba automáticamente

- Rutas y fases de los bloques, cobertura de los archivos de `src/features/`, specs y aceptación declarada de los bloques aprobados.
- IDs de bloque únicos, listas de evidencia sin duplicados, referencias existentes y sin escapes del repositorio.
- Numeración de relevos sin nuevas colisiones; las tres colisiones históricas quedan identificadas en `relevos-legado.json` y no se amplían para silenciar errores.
- Cambios desde la revisión registrada: altas, modificaciones y bajas de archivos incluidos en su huella.

## Qué no puede garantizar el control

No entiende lenguaje natural, no comprueba si una aprobación fue auténtica ni ejecuta una revisión visual. Una IA podría registrar una revisión incorrecta: debe justificarla con el relevo y no limitarse a conseguir un check verde. Este mecanismo mejora la detección de omisiones; no promete que nunca vuelva a existir una contradicción. No se añaden hooks, sincronización entre conversaciones ni bloqueos remotos.

## Trabajo paralelo

Preferir ramas/worktrees independientes. En una misma carpeta, el creador de relevos usa creación exclusiva para que dos llamadas no asignen el mismo archivo; no es un bloqueo distribuido entre clones. Antes de integrar, detectar colisiones, actualizar las referencias del relevo aún no publicado y conservar los históricos ya publicados. Releer los archivos compartidos antes de escribir; una revisión de cierre debe corresponder al estado combinado que realmente se vaya a publicar.
