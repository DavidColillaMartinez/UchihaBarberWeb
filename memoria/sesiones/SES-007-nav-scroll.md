# SES-007 — Nav fusionado y recorrido con ajuste por sección

Agente: OpenCode (modelo deepseek-v4.1-flash). Fase: UB-004 en curso (bloque: nav y comportamiento general de la index). Cambio OpenSpec: `nav-scroll-inicio`. Sin tocar `src/features/home/cabecera/` ni el resto de archivos de la sesión paralela (SES-007-cabecera): esa sesión implementó la cabecera con vídeo demo en el mismo árbol de trabajo, sin commit y sin conflictos de archivos con este bloque.

## Procedencia

Base Git: `052954b06cab7083aa0173d442a15f09ac97bb8d` (Cierra el esqueleto con su aceptación y archiva el cambio), rama `main`, remoto `UchihaBarberWeb` sincronizado. Sin cambios ajenos. Exploración previa en la misma conversación decidió el alcance con el responsable.

## Decisiones del usuario

- Nav fusionado: fijo arriba, transparente, centrado, sin caja propia; `mix-blend-mode: difference` sobre el contenido.
- Desvanecimiento suave al bajar / reaparición al subir con retardo ~0,3 s; si la revisión visual no convence, plan B más directo (ocultado original de PRODUCT.md).
- Las secciones de inicio ocupan la altura del viewport como espacio de scroll (composición general, no contenido).
- Scroll libre con snap por proximidad al límite de sección, alineando al inicio como las anclas; Galería adoptará ajuste centrado tipo banner en su turno de contenido.
- Alcance: nav + aspectos generales de la index. La cabecera es de otra sesión y no se toca.

## Implementado

- `src/components/navigation/SiteNav.module.css`: overlay fijo, centrado, sin caja, texto blanco con `mix-blend-mode: difference`, `z-index: 50`.
- `src/components/navigation/SiteNav.astro`: script con GSAP ScrollTrigger (ya en dependencias): desvanece al bajar, reaparece al subir con `delay: 0.3`, visible en la parte superior (`umbral 120 px`); `gsap.matchMedia` con `prefers-reduced-motion` mantiene el nav siempre visible; `autoAlpha` retira la interacción al ocultar. Un solo nav por página; el script lo localiza por `aria-label`.
- `src/pages/index.module.css` (nuevo) + `index.astro`: `#contenido > *` con `min-height: 100vh/100svh` y `scroll-snap-align: start` — composición de página, sin tocar módulos de sección.
- `src/styles/global.css`: `scroll-snap-type: y proximity` en el scroller (`html`). En `/productos` no hay puntos de ajuste (una sola sección provisional).

## Comprobaciones realizadas

- `npm run build`: correcto, 2 páginas; `astro check` 0 errores.
- HTML/CSS generado: nav `position:fixed` + `mix-blend-mode:difference`; `100svh` y `scroll-snap-align:start` solo en index; regla de snap en el scroller; script GSAP emitido y enlazado; sin cambios en cabecera (sin blur añadido).
- Prettier correcto en archivos tocados; `openspec validate` correcto.
- Pendiente de revisión visual del usuario: legibilidad del blend sobre grises medios y suavidad del desvanecimiento (plan B documentado en el diseño).

## Pendiente

Revisión visual y aceptación del responsable (tarea 3.3) antes de cerrar el cambio. Excepción futura: snap centrado tipo banner para Galería cuando se trabaje su contenido. Sin dependencias nuevas; lockfile intacto.
