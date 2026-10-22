## Why

La familia definitiva ya está elegida por el responsable: General Sans (Fontshare/Indian Type Foundry). Hasta ahora la web servía Inter y Archivo como recursos provisionales con `font-display: block`, sin una jerarquía de pesos declarada y con pesos repetidos a mano en las secciones. Este cambio integra General Sans como familia única autoalojada, declara sus pesos reales y fija la pauta de uso por elemento, sin reabrir composiciones aprobadas.

Fase del roadmap: UB-004 (mantenimiento transversal de tipografía y documentación). Alcance autorizado: fundamentos tipográficos, aplicación de la pauta en los estilos existentes, retirada de los recursos provisionales y documentación/memoria. Fuera de alcance: composiciones, animaciones, secciones, contenidos, catálogo y móvil.

## What Changes

- `src/styles/global.css` declara los seis cortes oficiales de General Sans autoalojada — Light `300`, Regular `400`, Medium `500`, Semibold `600`, Semibold Italic `600` cursiva y Bold `700` — con `font-display: swap`, tokens de familia (`--font-base`, con `--font-display`/`--font-text` como alias) y tokens de peso (`--font-weight-*`), y desactiva la síntesis (`font-synthesis: none`).
- Se aplica la pauta de pesos: Bold para titulares; Medium para botones, navegación y llamadas a la acción; Regular para nombres, etiquetas y lectura general; Semibold para énfasis y precios; Semibold Italic para textos especiales; Light solo para descripciones informativas, avisos legales y copias secundarias suficientemente grandes, nunca si perjudica la legibilidad. En los estilos donde el peso cambia se dejan comentadas las alternativas para la prueba manual del responsable.
- La máscara SVG de la palabra «Servicios» pasa a `General Sans` en peso `700`, conservando su técnica y comportamiento.
- Se retiran `public/fonts/inter-800.woff2` y `public/fonts/archivo-600.woff2` al no quedar referencias activas; las menciones históricas en cambios archivados y relevos se conservan como evidencia.
- `public/fonts/general-sans/` (seis WOFF2 y `LICENSE.txt`, ya presentes con hash idéntico al paquete oficial) queda versionado como recurso de la web.
- Documentación y memoria: se fusionan las pautas en `AGENTS.md`, `PRODUCT.md`, `openspec/config.yaml`, `memoria/integraciones.md`, `memoria/mapa.md`, `memoria/estado.json`, `memoria/bloques.json` y la nueva decisión `memoria/decisiones/DEC-003-tipografia-general-sans.md`, sin reemplazar decisiones posteriores del checkout.

## Capabilities

### New Capabilities

- `tipografia`: gobierno transversal de la tipografía del sitio —familia única autoalojada, pesos reales, ausencia de síntesis, licencia conservada y jerarquía de uso por elemento con la restricción de legibilidad de Light.

### Modified Capabilities

- `home-cabecera`: se retira el requisito «Tipografías propias autoalojadas» de esta capacidad; la familia deja de ser provisional y su gobierno pasa a `tipografia`.

## Impact

- Código: `src/styles/global.css`; `src/components/navigation/SiteNav.module.css` y `BarraInicio.module.css`; `src/features/home/servicios/Servicios.module.css`; `public/fonts/` (alta de General Sans, baja de Inter/Archivo).
- Sin dependencias nuevas ni cambios de comportamiento, composición o datos; el WIP ajeno del árbol (Galería, Servicios, intro/logo) se conserva.
- Accesibilidad: `swap` en lugar de `block` evita texto invisible mientras carga; `font-synthesis: none` garantiza pesos y cursivas reales; la restricción de Light protege la legibilidad.
- Memoria: el cierre debe consolidar la decisión, actualizar `bloques.json` y las fuentes afectadas, y regenerar inventario y revisión con las herramientas del proyecto. Sin commit ni push en esta entrega.
