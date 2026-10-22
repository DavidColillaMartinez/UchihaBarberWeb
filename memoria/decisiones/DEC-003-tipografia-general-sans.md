# DEC-003 — General Sans como tipografía vigente

Estado: adoptada por instrucción directa del responsable del proyecto.

## Decisión

- La web utiliza General Sans, de Indian Type Foundry, como familia tipográfica única y autoalojada.
- Los archivos se sirven desde `public/fonts/general-sans/` y se declaran en `src/styles/global.css` con sus pesos reales.
- La procedencia y licencia se conservan junto al proyecto en `public/fonts/general-sans/LICENSE.txt`. Referencias oficiales: `https://www.fontshare.com/fonts/general-sans` y `https://www.fontshare.com/licenses/itf-ffl`.

## Jerarquía de uso

- Bold `700`: titulares y nombres de gran escala.
- Medium `500`: botones, navegación y llamadas a la acción.
- Regular `400`: nombres, etiquetas y lectura general.
- Semibold `600`: énfasis y precios.
- Semibold Italic `600`: textos especiales que necesiten una señal expresiva.
- Light `300`: descripciones informativas, avisos legales y copias secundarias grandes; no usarlo en texto pequeño o información crítica cuando reduzca la legibilidad.

La jerarquía puede ajustarse por sección mediante escala, espaciado, alineación y contraste, pero no se introduce otra familia ni se modifican los archivos de fuente por iniciativa propia.

## Procedencia

Esta decisión sustituye la nota provisional de Inter/Archivo de `PRODUCT.md`, `memoria/estado.json` y los estilos globales. No reabre las composiciones aprobadas de las secciones de inicio; solo actualiza el fundamento tipográfico compartido.
