# Normas del roadmap

`estado.json` es la lista única de fases: ID estable, estado, dependencias, criterios, referencia OpenSpec y evidencia. Este documento define el proceso; las tareas detalladas SDD viven solo en OpenSpec.

| Estado      | Significado                                                  |
| ----------- | ------------------------------------------------------------ |
| pendiente   | Conocida, sin comenzar                                       |
| definicion  | Se concreta el alcance que toca                              |
| lista       | Tiene criterios suficientes; no implica permiso automático   |
| en_curso    | Trabajo actual autorizado                                    |
| en_revision | Entregado; faltan comprobaciones o aceptación                |
| aprobada    | Cumple criterios con evidencia de aceptación correspondiente |
| bloqueada   | Impedimento concreto                                         |
| diferida    | Aplazada expresamente, no terminada                          |

Solo una fase `en_curso` y una `faseActiva` principal. El trabajo transversal referencia ese ID y dependencias. Antes de comenzar una sucesora, aprobar sus dependencias; cualquier excepción requiere instrucción y motivo registrados. No avanzar estados automáticamente al escanear, compilar o archivar.

Conservar IDs e histórico aunque cambien nombres. Añadir subfases cuando el usuario concrete su turno. No convertir el índice de inicio en autorización para trabajar toda la web. Una fase aprobada que necesita corrección vuelve a revisión con evidencia del motivo; no borrar su aprobación anterior.

Relacionar criterios con pruebas/relevos reales. Separar verificación técnica de aceptación visual. Herramientas/documentación requieren su prueba local, no aprobación estética; una sección sí requiere visto bueno visual. `autorizacion` describe el alcance actual, no un permiso permanente para publicar.

`openspec` es null mientras no exista cambio real; después es ruta real de su propuesta/artefacto de entrada y se actualiza tras archivar. Los criterios no se consideran satisfechos sin evidencia.

La primera prueba de continuidad (aplicar la entrega, comprobar memoria y contexto OpenSpec, revisar cambios, commit y push) está completada y cerrada: ver `estado.json` (UB-002) y `memoria/sesiones/SES-003-cierre-ub002.md`.

## Coherencia al cerrar y retomar

Aplicar `memoria/cierre.md` y consultar `memoria/bloques.json` en cada bloque, también tras compactar. Antes de declarar terminado un bloque, contrastar decisiones vigentes, implementación, PRODUCT, mapa, specs y evidencia de aceptación. Registrar el relevo y la revisión real; después escanear y comprobar. Los hashes del inventario no sustituyen esa revisión.

La aprobación visual y el cierre documental son hechos separados: conservar una aprobación recibida aunque falte consolidar documentación, pero registrar ese pendiente y no presentar el bloque como completamente cerrado. El registro por bloques referencia las tareas de OpenSpec, no las copia. Los identificadores los gestiona la IA sin pedir al usuario que los memorice.
