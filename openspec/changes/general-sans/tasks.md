## 1. Fundamentos tipográficos

- [x] 1.1 Sustituir en `src/styles/global.css` los `@font-face` provisionales por los seis cortes de General Sans (300/400/500/600/600 cursiva/700) con `font-display: swap`, y añadir `font-synthesis: none`; verificar con `npm run build` que compila sin errores y que los seis WOFF2 aparecen en `dist/fonts/general-sans/`.
- [x] 1.2 Reemplazar los tokens de familia (`--font-base` con General Sans y alias `--font-display`/`--font-text`) y añadir los tokens `--font-weight-*`; comprobar en el CSS generado que los tokens se emiten y que ninguna sección depende de valores literales de familia.

## 2. Pauta de pesos en las secciones

- [x] 2.1 Aplicar Medium a navegación y llamadas: `.list a` y `.cita` en `SiteNav.module.css`, y `.cita` y `.lista a` en `BarraInicio.module.css`, con las alternativas comentadas para la prueba manual; verificar en el bundle generado que los pesos declarados son los previstos.
- [x] 2.2 Aplicar la pauta en `Servicios.module.css` conservando el WIP ajeno (`5svh`, topes `50svh`): `.nombre` y `.descripcion` en Regular, `.precio` en Semibold y `.llamada` en Medium, cada una con sus alternativas comentadas; verificar la transformación al scroll y el hover en la salida generada.
- [x] 2.3 Cambiar la familia de la máscara SVG de la palabra «Servicios» a `General Sans` peso `700` conservando la técnica y el comportamiento; verificar que la máscara sigue presente en el CSS emitido.

## 3. Recursos y documentación

- [x] 3.1 Confirmar con una búsqueda en el checkout que Inter/Archivo no tienen referencias activas fuera de cambios archivados y relevos históricos, y eliminar `public/fonts/inter-800.woff2` y `public/fonts/archivo-600.woff2`; comprobar que `npm run build` sigue generando dos páginas sin errores.
- [x] 3.2 Fusionar las pautas tipográficas en `AGENTS.md`, `PRODUCT.md`, `openspec/config.yaml` y `memoria/integraciones.md`, y añadir `memoria/decisiones/DEC-003-tipografia-general-sans.md`; comparar cada fragmento con el estado actual y no reemplazar decisiones posteriores.
- [x] 3.3 Actualizar `memoria/mapa.md` (fila de `public/`), `memoria/bloques.json` (pendientes sin la referencia a familia provisional) y `memoria/estado.json` (fuera el pendiente de familia y alcance al día), conservando el estado de la sesión paralela.

## 4. Verificación y cierre

- [x] 4.1 Ejecutar `npm run build`, `npm run memoria:test`, `openspec validate --specs` y Prettier solo sobre los archivos tocados; registrar la salida real y confirmar que no quedan referencias activas a Inter/Archivo y que los WOFF2 están en `dist/fonts/general-sans/`.
- [x] 4.2 Crear el relevo con `npm run memoria:relevo`, registrar la revisión real con `memoria:revision` tras el contraste y ejecutar `memoria:scan` y `memoria:check`; dejar constancia de que la revisión visual de pesos y máscara queda pendiente del responsable.
- [x] 4.3 No hacer commit ni push: la publicación queda pendiente de autorización explícita posterior.
