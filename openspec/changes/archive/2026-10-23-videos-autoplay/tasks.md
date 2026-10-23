## 1. Código del bloque de acceso a Productos

- [x] 1.1 Añadir la marca nativa `autoplay` al `<video>` de `src/features/home/acceso-productos/AccesoProductos.astro` y ajustar su comentario sobre el comportamiento sin JavaScript en el elemento.
- [x] 1.2 En `src/features/home/acceso-productos/acceso-productos.ts`, reintentar `play()` desde el evento `loadeddata` cuando la petición aborta pegada a la carga, y retirar la marca con pausa si hay preferencia de movimiento reducido (patrón de cabecera y Servicios).
- [x] 1.3 Verificar en el código compilado que los cuatro `<video>` de la portada cumplen la pauta: cabecera y Servicios con la marca nativa, acceso a Productos con la marca nativa y Galería con inicio automático por visibilidad.

## 2. Documentación del delta abierto de `home-acceso-productos`

- [x] 2.1 Ajustar en `openspec/changes/home-acceso-productos/specs/home-acceso-productos/spec.md` el requisito «Vídeo del bloque» (arranque nativo sin acción del visitante y pausa por visibilidad conservada).
- [x] 2.2 Ajustar en el mismo archivo el escenario «Sin JavaScript» del requisito «Control del movimiento del vídeo», que ya no queda en el cartel sin guion.

## 3. Verificación técnica

- [x] 3.1 Ejecutar `npm run build` (`astro check` sin errores) y Prettier sobre los archivos tocados.
- [x] 3.2 Ejecutar `openspec validate videos-autoplay --strict` y revisar que los cuatro `<video>` mantienen silencio, bucle y reproducción en línea en el HTML compilado.

## 4. Cierre documental

- [x] 4.1 Tras verificar el cambio, archivarlo con el flujo de OpenSpec y consolidar `video-reproduccion` y `home-cabecera`.
- [x] 4.2 Dejar relevo, actualizar el estado y el mapa afectados, registrar la verificación real y ejecutar `memoria:scan` y `memoria:check`; dejar anotada la comprobación móvil real por el responsable como pendiente de su revisión.
