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

Concretar criterios de una sección al llegar su turno; no diseñarlas todas ahora. Esta entrega es mantenimiento directo autorizado de documentación/herramientas: no se ha fabricado un historial OpenSpec. La prueba local es el primer ensayo real de la conexión.

## Impeccable

El usuario dirige el diseño. Una auditoría no autoriza rediseños; mostrar ubicación, motivo e impacto de sus observaciones y separar correcciones autorizadas de mejoras pendientes. No elegir fuentes, material, patrones o textos por defecto.

El original contiene consentimiento local y hooks de Codex con rutas de máquina. Eso no prueba que Impeccable esté operativo en todos los entornos. Se conservan localmente y se excluyen de Git. Cada equipo usa la inicialización oficial cuando su propietario lo solicite; no trasladar consentimientos ni inventar rutas.

## Prueba local pendiente

En OpenCode: leer fuentes, explicar el alcance, ejecutar controles de memoria y `openspec context --json`; confirmar que el contexto devuelto incluye estas referencias. Si la versión no admite campos, consultar su ayuda/esquema y corregir la incompatibilidad dentro del mantenimiento autorizado. No afirmar integración probada solo por YAML válido.

No se añaden hooks ni otra configuración de proveedor: se evita duplicar reglas y modificar consentimientos. Si una herramienta no carga AGENTS, pedir expresamente su lectura y la del índice de memoria.
