# Protocolo de continuidad

## Inicio

Leer las fuentes del índice y comprobar Git real. Registrar agente, objetivo, fase, rama y commit base en el relevo. Distinguir ZIP de checkout actualizado. Ejecutar `memoria:check` y `memoria:changes`; revisar diferencias antes de regenerar. Ni la fecha ni el recuerdo de una conversación prueban vigencia.

Conservar cambios ajenos y leer sus relevos. Releer una ruta antes de editar cuando pueda haber cambiado. Para trabajo simultáneo usar ramas/worktrees independientes y ámbitos acotados. Resolver conflictos leyendo ambos cambios, no eligiendo por fecha. El estado documental no funciona como bloqueo distribuido.

La continuidad no depende de conversaciones separadas: al comenzar otro bloque de trabajo, retomar una tarea o continuar tras compactar el contexto, releer `memoria/estado.json` y el relevo de `ultimoRelevo` y comprobar diferencias con `memoria:check`. Al terminar cada bloque de trabajo —aunque siga la misma conversación—, registrar decisiones, pruebas y pendientes en memoria, sin esperar a que el usuario lo pida.

Sin Git, commits o documentos indispensables, indicar **no verificable** y qué falta. Se puede leer o preparar una propuesta, pero no afirmar equivalencia con GitHub. Un check desactualizado no impide repararlo dentro del alcance autorizado.

## Trabajo

La instrucción actual del usuario manda sobre decisiones previas del proyecto. Registrar sustituciones con motivo y referencia, conservando el histórico. El código refleja implementación, no redefine la intención: reconciliar discrepancias entre visión, specs y código sin inventar requisitos o aprobación.

El usuario controla composición, fuentes, movimiento y aceptación visual. Resolver detalles técnicos compatibles dentro del alcance. No extender el trabajo a otras secciones ni publicar por iniciativa propia. Una auditoría Impeccable produce observaciones/propuestas; solo corrige lo ya autorizado.

Mantener secretos, consentimientos y rutas de máquina fuera de Git y relevos. Guardar decisiones y evidencia mínima, no conversaciones completas ni logs con credenciales. Los archivos locales excluidos no se copian a entregas.

## Cierre

1. Revisar diff e impacto. Actualizar las fuentes canónicas afectadas y el mapa si cambia la arquitectura. `relaciones.json` sugiere lecturas; no detecta todos los efectos indirectos.
2. Actualizar estado y un relevo en `sesiones/`: objetivo, áreas/archivos, comandos y resultados, decisiones, bloqueos y próximo paso. Separar verificación técnica de aprobación visual. `ultimoRelevo` debe apuntar al relevo real más reciente.
3. Formatear archivos tocados y verificar según AGENTS. Después ejecutar `memoria:scan`, `memoria:check` y revisar sus diferencias. No editar JSON generado a mano ni formatear skills ajenas incidentalmente.
4. Si está solicitado, revisar índice de Git, añadir rutas explícitas y hacer commit. Ejecutar `memoria:check` tras el commit. Publicar solo si está autorizado y comprobar el resultado real.
5. Responder con resultado, pruebas, SHA efectivo si existe y pendientes. No comenzar automáticamente la siguiente fase.

## Hashes y commits

`archivos.json` registra SHA-256 de bytes exactos, tamaño y tipo. Incluye archivos versionados y nuevos no ignorados, excluyendo salidas, secretos y `memoria/generado/`. Comparar inventarios detecta altas, modificaciones y bajas. Los enlaces simbólicos se inventarían por su destino textual sin seguirlos; las referencias documentales deben ser archivos reales. Cambiar finales de línea cambia el hash: revisar el diff antes de escanear, especialmente entre sistemas operativos.

`generado/estado.json` guarda la huella del inventario y el **commit base** de generación. No contiene el ID de su propio commit: aún no existe, y escribirlo dentro provocaría nuevos commits indefinidamente. Si el contenido no cambia, scan conserva una base válida; después del commit, check acepta esa base como ancestro de HEAD. Regenerar no acredita revisión.

Los SHA de commits terminados se anotan en el siguiente relevo o se obtienen con `git log -- memoria/sesiones/` y `git show <sha>`. El primer relevo local deja pendiente el SHA de su propio commit; OpenCode lo devuelve al terminar. La siguiente sesión lo incorpora. No hacer amend ni otro commit de metadata para perseguir un ID autorreferente.

**Vigente**: inventario coincidente, base Git válida y estructura documental comprobada. **Desactualizado**: diferencias o controles pendientes. **No verificable**: faltan datos indispensables o son inválidos. Ninguno demuestra aprobación visual, auditoría exhaustiva de seguridad, equivalencia remota ni funcionamiento del sitio. El resultado y el código de salida se explican en `herramientas.md`.

## Sincronización

Con checkout, inspeccionar ramas/remoto y, cuando corresponda al trabajo autorizado, hacer fetch y comparar historiales. No hacer pull sobre cambios sin resolver ni asumir `origin`. Sin acceso a otra copia o GitHub, señalarlo. Un snapshot sirve para analizar ese momento; hace falta una copia nueva o acceso al repo para conocer cambios posteriores.
