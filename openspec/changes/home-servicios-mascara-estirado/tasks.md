## 1. Palabra con texto real y vídeo fundido

- [x] 1.1 Sustituir la máscara SVG por un `h2` real («Servicios», General Sans Bold) con el `<video>` superpuesto en el mismo grupo; verificar en el HTML compilado que el `h2` contiene la palabra y que el vídeo queda `aria-hidden`
- [x] 1.2 Aplicar `mix-blend-mode: screen` al vídeo con `isolation: isolate` en la sección y fondo blanco dentro del grupo transformado; verificar en el CSS compilado `mix-blend-mode:screen` y la ausencia de `mask-image`
- [x] 1.3 Recortar el fondo del grupo a la banda con `overflow: clip` en `.escena` (sin afectar al crecimiento en flujo del hover); verificar en el CSS compilado que la escena recorta y que cabecera/Galería ya no reciben el recuadro blanco
- [ ] 1.4 Comprobar visualmente con el navegador del responsable que el vídeo solo se ve dentro de las letras y que la palabra queda en General Sans Bold (prototipo validado en `/tmp/opencode/proto-servicios`)

## 2. Composición con proporciones naturales

- [x] 2.1 Medir la palabra real con canvas (misma familia, tamaño y peso) y calcular la escala uniforme y el desplazamiento de reposo y pausa; verificar `actualBoundingBoxAscent` en el bundle
- [x] 2.2 Timeline de GSAP con origen `left top`, escala uniforme en los dos estados (reposo a sangre, pausa en la columna) y `invalidateOnRefresh`; verificar el tramo y las funciones en el bundle
- [x] 2.3 Fallback CSS con las variables medidas (`--escala`, `--desplaza-y`) para el estado pausado sin gsap; verificar que sin gsap la composición se mantiene
- [x] 2.4 Recalcular en `resize` y `document.fonts.ready`; verificar que la composición se mantiene al cambiar de resolución
- [x] 2.5 Sustituir el estirado vertical por escala uniforme y eliminar el factor de ajuste manual; verificar que no quedan `--factor-tinta`, `--escala-x` ni `--escala-y` en el bundle
- [ ] 2.6 Incorporar la tipografía de titular de letras alargadas cuando el responsable la facilite y recalcular sus medidas; verificar el encaje con la nueva familia

## 3. Verificación del cambio

- [x] 3.1 Ejecutar `openspec validate home-servicios-mascara-estirado` y `npm run build` (check incluido) y anotar el resultado real
- [x] 3.2 Pasar el detector mecánico de Impeccable sobre los dos archivos de Servicios y Prettier sobre lo tocado; anotar hallazgos
- [ ] 3.3 Registrar la revisión del responsable (vídeo solo en las letras, tipografía de identidad, tinta de borde a borde del listado en varias resoluciones) en el relevo antes de dar el cambio por implementado; no archivar hasta su aceptación

## 4. Cierre documental

- [ ] 4.1 Al aceptar, archivar el cambio con el flujo OpenSpec para consolidar el delta en `openspec/specs/home-servicios/spec.md`; verificar con `openspec list --specs` y la validación de la spec
- [x] 4.2 Actualizar brief local de superficie, relevo y estado según el protocolo de memoria; ejecutar `memoria:scan` y `memoria:check`
