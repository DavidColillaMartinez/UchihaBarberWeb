# SES-010 — Ajustes de hover, título fijo y snap de Servicios

Agente: OpenCode (modelo glm-5.3-flash). Fase: UB-004 (turno: servicios, tercera ronda). Modalidad: implementación dirigida por el responsable; sin commit solicitado.

## Instrucción recibida

Plan primero y luego implementación, con estas correcciones (confirmadas en la ronda de preguntas):

- El despliegue de las descripciones desplazaba el título «Servicios» y provocaba un salto al snap de la sección (el navegador reevalúa el scroll-snap ante cualquier cambio de layout). El responsable decidió **anular el snap solo en la sección Servicios** y mantener el crecimiento en flujo de las filas.
- Título centrado como lo dejó el responsable, pero **fijo**: que los hovers no lo desplacen.
- Hover: igualar el espacio de la descripción por arriba y por abajo; «Reserva ya» centrado, con más aire respecto a la descripción y con un mini borde blanco (el borde va al span: negro fuera y dentro).
- Detección propia: el hover aún animaba `scaleX(1)` (vestigio de la ronda anterior) mientras la barra define `scaleY`, así que la barra no llegaba a desplegarse.

## Cambiado (real, solo servicios)

- `Servicios.module.css`:
  - `.servicios`: `scroll-snap-align: none` (regla local que gana a `.contenido > *` de la página por orden, sin tocar archivos de página), `overflow-anchor: none` y `overflow-x: clip` (antes `overflow: clip`, que recortaría el crecimiento vertical).
  - `.tituloBloque`: `position: absolute` en la columna izquierda con ancho `calc(50% - 1.5rem)`, `pointer-events: none` y centrado CSS de respaldo (`top 50%` + `translateY(-50%)`); en móvil vuelve al flujo (`position: static`).
  - `.fila`: filas `1fr 0fr → 0fr 1fr` con transición (el nombre colapsa mientras crece la descripción: espacio equivalente arriba/abajo), `column-gap: 2rem`; corregido el hover a `scaleY(1)`.
  - `.precio`, `.llamada`: abarcan las dos filas (`grid-area: 1 / 2 / span 2`) y quedan centradas con el li desplegado. `.llamada` con `border: 1px solid currentColor` y padding `0.4rem 1.1rem` (rectangular).
- `Servicios.astro` (script): `fijarTitulo()` mide la altura de la escena en reposo y fija el `top` del título en píxeles (`centro + altura/2`, compatible con el `translateY(-50%)`); se recalcula en `resize` y `document.fonts.ready`, y en móvil limpia el valor. La transformación al scroll pasa a ser **solo de escala** (origen `left center`), eliminando el tween de `y` y su fórmula.

## No tocado

Resto de secciones, navegación y configuración global del snap (`global.css`, `index.module.css`): intactos. Otros agentes siguen con cambios sin commit en cabecera, nav, layout y global; no se han tocado.

## Comprobaciones

- `npm run build`: correcto (astro check sin errores ni avisos; 2 páginas).
- CSS compilado verificado: `scroll-snap-align: none` local después de la regla de la página, `scaleY(1)` en hover y borde/padding de `.llamada` presentes.
- Detector mecánico Impeccable (`detect --json`): sin hallazgos.
- Prettier: archivos de servicios formateados y correctos.
- Capturas visuales: no verificables en este entorno (sin navegador); pendiente la revisión visual del responsable (centrado fijo, hover y comportamiento del scroll dentro de la sección sin snap).

## Pendientes de decisión/material del responsable

- Revisión visual de la ronda: título fijo, espaciado igual de la descripción, «Reserva ya» centrado con borde, y confirmación de que dentro de Servicios no hay saltos de snap.
- Familia tipográfica definitiva, logo, vídeo final (constante `videoUrl`), enlaces por servicio de Yeasy y decisión de reproducción del vídeo (bucle vs. saltos).

## Estado

UB-004 en curso, turno de servicios en tercera ronda, pendiente de aceptación visual. Cambios sin commit (no solicitado).
