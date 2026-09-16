# OpenCode, OpenSpec e Impeccable

## Conexión

Entrada común: `AGENTS.md`. Impeccable conserva `PRODUCT.md` y su marcador de esquema. OpenSpec recibe referencias a esas fuentes y a memoria mediante `config.yaml`; sus reglas y operations orientan el flujo sin reemplazar las instrucciones ni los estados de la CLI.

Los comandos `/opsx-*` están en `.opencode/commands/`; hay skills OpenSpec en `.agents/skills/` y `.opencode/skills/`. No mantener una tercera copia ni reescribirlos manualmente. Tras una actualización oficial, revisar diferencias, preservar el contexto y comprobar que la CLI lo transmite. No ejecutar inicializadores sin necesidad.

## Flujo por cambio

1. Consultar `openspec context --json`; usar su raíz y respetar el store seleccionado. Sin CLI funcional o raíz, registrar el problema, sin fingir artefactos ni reinit automático.
2. Explorar para análisis; proponer con comando/skill instalado para planificación, enlazando el ID de fase. Crear cambios mediante CLI, no inventando carpetas/YAML.
3. Aplicar cuando esté autorizado y el flujo lo permita. Consultar `status` e `instructions apply`; leer `contextFiles`, contexto y guía. Un estado listo no amplía la autorización.
4. Verificar tareas y actualizar memoria/relevo. Las tareas viven solo en OpenSpec; marcar casillas cuando se complete su comportamiento.
5. Sincronizar specs y archivar mediante sus flujos cuando proceda; actualizar referencias al archivo. No reemplazar specs consolidadas por un delta ni archivar trabajo parcial para silenciarlo.

Concretar criterios al llegar el turno de cada sección. El esqueleto completó el primer ciclo real de OpenSpec. El mantenimiento documental directo debe identificarse como tal, sin inventar un cambio previo; no dar por terminado un bloque si sus specs vigentes contradicen decisiones aprobadas.

## Impeccable

El usuario dirige el diseño. Una auditoría no autoriza rediseños; mostrar ubicación, motivo e impacto de sus observaciones y separar correcciones autorizadas de mejoras pendientes. No elegir fuentes, material, patrones o textos por defecto.

El original contiene consentimiento local y hooks de Codex con rutas de máquina. Eso no prueba que Impeccable esté operativo en todos los entornos. Se conservan localmente y se excluyen de Git. Cada equipo usa la inicialización oficial cuando su propietario lo solicite; no trasladar consentimientos ni inventar rutas.

## Prueba local

Confirmado en el equipo del usuario: la CLI 1.13.0 resuelve la raíz correcta; las instrucciones de artefactos incorporan el `context` del `config.yaml`; y el primer cambio real completó el ciclo `apply`/`archive` con specs consolidadas (`home-skeleton`, `products-page`), ver SES-006. Los relevos de Servicios y Galería registran ejecuciones del detector mecánico de Impeccable sin hallazgos. Esa evidencia se limita a las ejecuciones allí indicadas; no sustituye revisión visual ni demuestra disponibilidad en otro equipo.

No se añaden hooks ni otra configuración de proveedor: se evita duplicar reglas y modificar consentimientos. Si una herramienta no carga AGENTS, pedir expresamente su lectura y la del índice de memoria.

## Coherencia al cerrar y retomar

Aplicar `memoria/cierre.md` y consultar `memoria/bloques.json` en cada bloque, también tras compactar. Antes de declarar terminado un bloque, contrastar decisiones vigentes, implementación, PRODUCT, mapa, specs y evidencia de aceptación. Registrar el relevo y la revisión real; después escanear y comprobar. Los hashes del inventario no sustituyen esa revisión.

La aprobación visual y el cierre documental son hechos separados: conservar una aprobación recibida aunque falte consolidar documentación, pero registrar ese pendiente y no presentar el bloque como completamente cerrado. El registro por bloques referencia las tareas de OpenSpec, no las copia. Los identificadores los gestiona la IA sin pedir al usuario que los memorice.
