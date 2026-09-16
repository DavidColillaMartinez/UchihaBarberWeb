# SES-014 — Navegación de la tira de Galería

Agente: OpenCode (modelo glm-5.3-flash). Fase: UB-004 (turno: galería, ronda 2 — navegación). Modalidad: implementación dirigida por el responsable; sin commit solicitado.

## Instrucción recibida

«Al hacer snapping que aparezca una forma de navegar por la galería: flecha izquierda y flecha derecha sobre los extremos de la tira, ancho ~8 % del viewport y altura completa de `_tira_amlj1_35`, con medio efecto vidrio; al hover, fondo blanco con la flecha visible y algo de transparencia para no perder la coexistencia de la galería». Decidido en la ronda de preguntas (Plan Mode): flecha tenue siempre visible en reposo (recomendado, mejor descubribilidad que el literal «solo al hover») y paso de un panel por clic. El movimiento ligado al scroll no cambia.

## Cambiado (real, solo galería)

- `Galeria.astro`: envoltorio `.bloque` con la escena y dos `<button>` accesibles (fuera del `aria-hidden`), chevron SVG dibujado (`aria-label` «Anterior»/«Siguiente»). Script: registro de ScrollToPlugin; estado compartido de navegación; visibilidad por IntersectionObserver (umbral 25 %, aprox. el encaje por snap) solo si hay desplazamiento posible (escritorio con movimiento normal o tira desbordada en móvil); extremos `disabled` según el progreso del scrub (`onUpdate`) o `scrollLeft` nativo; clic de un panel — escritorio: `gsap.to(window, { scrollTo })` con la distancia de página equivalente a un panel (el scrub sigue siendo la única fuente de verdad), `overwrite: "auto"`; móvil: `scrollBy` del contenedor con `behavior` respetando movimiento reducido.
- `Galeria.module.css`: `.control` absolutos en los extremos, `clamp(2.75rem, 8vw, 8rem)` × 100 % de la altura; reposo: vidrio (`backdrop-filter: blur(10px)` + `-webkit-`, velo `rgb(255 255 255 / 0.06)`) y chevron blanco al 50 %; hover/foco: `rgb(255 255 255 / 0.55)` y chevron negro pleno; transiciones 0.35 s/0.4 s ease-out; aparición con `data-visible` (fade + `visibility`); `disabled` tenue sin hover; sin bordes redondeados.
- OpenSpec `home-galeria` (cambio abierto, sin archivar): nuevo requisito «Navegación de la tira» (5 escenarios), tasks nuevas (sección 3) y nota de decisión en `design.md`; `openspec validate --strict` correcto.
- Surface brief Impeccable actualizado (dirección elegida, FIRST VIEWPORT y «Sin resolver»).

## No tocado

Resto de secciones, nav, estilos globales, layout. Cambios ajenos sin commitear: conservados. `SES-013-cierre-servicios` y `SES-011-correccion-enlaces` (bloques paralelos): no tocados.

## Comprobaciones

- `openspec validate home-galeria --strict`: válido.
- `npm run build`: 0 errores, 0 avisos, 2 páginas; los botones están en `dist/index.html` y el bundle lleva ScrollToPlugin (`name: 'scrollTo'` en el chunk) con la lógica de visibilidad, extremos y paso.
- Detector mecánico Impeccable (`detect --json` sobre los dos archivos): sin hallazgos.
- Prettier aplicado a los archivos tocados. Sin dependencias nuevas (ScrollToPlugin viene en el paquete gsap ya presente).
- Capturas visuales: no verificables en este entorno (sin navegador); revisión visual del vidrio, las opacidades y el paso pendiente del responsable.

## Pendientes del responsable

- Aceptación visual de la navegación (vidrio, transparencia del hover, tamaño de flecha) y de la tira del primer diseño.
- Afinado del umbral de aparición (25 % de partida) si el encaje real lo pide.
- Archivo del cambio OpenSpec `home-galeria` tras la aceptación.

## Estado

UB-004 en curso, turno galería ronda 2 entregada para revisión visual. Cambios sin commit (no solicitado).
