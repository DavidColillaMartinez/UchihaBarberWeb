## Why

La web debe ser visual y de diseño: las secciones son pantallas completas y el nav vive encima de ellas, fusionado con el contenido, no como una banda propia. En el esqueleto la navegación quedó estática y con caja propia por decisión provisional; ahora se concreta su comportamiento real y el recorrido de la página. Cambio vinculado a la fase UB-004 del roadmap (`memoria/estado.json`).

## What Changes

- Nav fijo en la parte superior, transparente, sin caja ni borde propio, centrado en horizontal y fusionado con el contenido mediante `mix-blend-mode: difference` (invierte con fondos blancos/negros, incluido el vídeo de cabecera que aportará su sesión).
- Desvanecimiento gradual del nav al hacer scroll hacia abajo y reaparición al subir con retardo de ~0,3 s (dirección de `PRODUCT.md`); plan B documentado: ocultado/reaparición más tosco si la revisión visual lo desmiente.
- Las secciones de inicio pasan a ocupar la altura del viewport como **espacio de scroll** (estructura general de la página, no contenido).
- Scroll libre con ajuste (snap) por proximidad al límite de cada sección, alineando su inicio como el salto de las anclas actuales; Galería quedará con ajuste centrado tipo banner cuando se trabaje su contenido (excepción futura documentada).
- Movimiento reducido: sin desvanecimiento, nav siempre visible.

**Fuera de alcance**: la sección de cabecera (vídeo con blur, otra sesión), contenido y diseño de secciones, la página provisional de productos (salvo el nav compartido), datos, animaciones de sección (transformación de Servicios, transición Servicios–Galería, vídeo en letras) y dependencias nuevas.

## Capabilities

### New Capabilities

- `site-navigation`: comportamiento de la navegación compartida en todo el sitio: fija, fusionada con el fondo, centrada, con desvanecimiento por dirección de scroll.

### Modified Capabilities

- `home-skeleton`: la composición de secciones pasa a espacios de viewport con ajuste por proximidad al límite de sección (recorrido de la página); la navegación deja de ser una banda con borde propio.

## Impact

- `src/components/navigation/SiteNav.astro` + su CSS Module: fijado, centrado, sin caja, blend, y script de desvanecimiento.
- `src/pages/index.astro` + su CSS Module de composición (nuevo): alturas de viewport y puntos de snap de las secciones.
- `src/styles/global.css`: regla de snap del scroller.
- Sin cambios en `src/features/home/cabecera/` (sesión paralela), en contenido de secciones ni en dependencias.
