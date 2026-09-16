# DEC-002 — Cierre coherente sin recordatorios del usuario

Procedencia: revisión del repositorio publicado en `5b45e4ca21b55ba7ee9038d2f6da12f1f81281d2` y petición del responsable «hazme la actualización, con el arreglo de comportamiento para que no suceda más».

La memoria conservaba el trabajo, pero el check de inventario no detectaba contradicciones de significado: Servicios carecía de spec propia, su excepción de snap no figuraba en la spec general y varias fuentes actuales conservaban textos iniciales. Las sesiones paralelas produjeron tres colisiones de numeración y una evidencia duplicada.

Decisión: mantener hashes e histórico, añadir un registro por bloque, un procedimiento de contraste obligatorio y una huella de revisión independiente del escaneo. El check final exige ambos controles. Los nuevos relevos reciben número mediante comando; las rutas históricas publicadas se conservan como legado explícito. No se trasladan decisiones de diseño a la IA ni se pide al usuario administrar IDs.

`home-servicios` consolida comportamiento existente a partir de sus relevos y código; no se fabrica un cambio OpenSpec retrospectivo. La CLI local deberá validar esa consolidación al aplicar el parche. Aprobación visual existente y validación documental pendiente se mantienen separadas.

No se corrige código visual ni se cambia el funcionamiento de la web. Las referencias a material final, tipografía definitiva y evolución del catálogo permanecen pendientes donde corresponda. El control no interpreta significado: detectar cambios pendientes de revisar no demuestra que la revisión sea correcta.
