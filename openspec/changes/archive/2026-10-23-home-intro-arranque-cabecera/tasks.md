## 1. Arranque en la cabecera

- [x] 1.1 Fijar la cabecera antes del primer pintado en `BaseLayout` (restauración manual y recordatorio en `scroll`, `load` y `pageshow`) y verificar en el HTML compilado que el script se emite solo con `data-intro-activa`.
- [x] 1.2 Reafirmar la posición en `intro.ts` antes de medir, al arrancar, en `resize` y en `pageshow`; verificar que no altera el cruce cuando la página ya está arriba.
- [x] 1.3 Comprobar que la salida de seguridad, la omisión con movimiento reducido y la liberación si el logo no carga siguen funcionando.

## 2. Verificación técnica

- [x] 2.1 Ejecutar `npm run build` y comprobar que `astro check` termina sin errores.
- [x] 2.2 Sobre la compilación local, verificar con navegador headless: entrada nueva, recarga desde Servicios y recarga con ancla mantienen `scrollY = 0` mientras `data-intro="pendiente"` y el cruce termina sobre el vídeo.
- [x] 2.3 Ejecutar `openspec validate home-intro-arranque-cabecera --strict`.

## 3. Cierre documental

- [x] 3.1 Revisión visual del responsable en local y en la vista previa desplegada, con recarga desde varias secciones.
- [x] 3.2 Actualizar relevo, estado, registro del bloque `entrada`, mapa y referencias; ejecutar `memoria:scan` y `memoria:check`.
- [x] 3.3 Tras la aceptación, archivar el cambio y consolidar `home-intro` con el flujo de OpenSpec.
