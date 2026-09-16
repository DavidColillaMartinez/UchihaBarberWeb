# SES-012 — Primer diseño de la sección Galería

Agente: OpenCode (modelo glm-5.3-flash). Fase: UB-004 (turno: galería, primer diseño). Modalidad: implementación dirigida por el responsable; sin commit solicitado.

## Instrucción recibida

«Vamos a empezar a trabajar la galería, examina el plan que teníamos establecido con galería, revisa impeccable, y vamos a hacer la primera revisión de código de esta sección». En Plan Mode se revisó el plan (PRODUCT.md, spec `home-skeleton`), el código provisional y el contexto Impeccable; el responsable confirmó alcance «revisión + diseño» y resolvió las decisiones: usar los 12 clips de la carpeta local `ContenidoDemo/` (sin `Video_Head`), tira ligada al scroll, altura ~35–40 %, transición de fondo 50 % reversible, y copiar los vídeos a `public/videos/`.

## Cambiado (real, solo galería)

- `public/videos/`: 12 clips demo copiados desde `ContenidoDemo/` (carpeta local ignorada por Git; `Corte+barba.mp4` y `CorteDePelo1..11.mp4`, h264 1024×576, 3–14 s). Sin inventar recursos ni derechos; material demo sustituible por el VPS.
- Cambio OpenSpec `home-galeria` creado con la CLI (`openspec new change`, schema spec-driven): `proposal.md`, `design.md`, `tasks.md` y delta spec `home-galeria` (4 requisitos, 10 escenarios). `openspec validate` correcto. Cambio **sin archivar**: falta la aceptación visual.
- Surface brief Impeccable nuevo: `.impeccable/surfaces/src-features-home-galeria-galeria-astro.md` (modo Experience).
- `Galeria.astro`: tira de 12 `<video>` (muted, loop, playsinline, `preload="none"`, `tabindex="-1"`, sin autoplay), h2 `Galería` en `srOnly`, nota provisional retirada, lista de demo como constante comentada. Script GSAP: IntersectionObserver que reproduce solo con la sección en pantalla y pausa fuera (nunca con movimiento reducido); `gsap.matchMedia()` con dos ramas — desplazamiento de la tira (escritorio, scrub 0.8, `x` de 0 a −sobrante con `invalidateOnRefresh`) y fundido reversible del fondo (cualquier ancho, `top 50 %`/`bottom 50 %`, `toggleActions: play reverse play reverse`, duración 1 s). Constantes `UMBRAL_COBERTURA` (50) y `DURACION_FUNDIDO` (1) para el ajuste fino.
- `Galeria.module.css`: sección centrada con fondo negro como estado compuesto (sin JS o con movimiento reducido queda negro; con GSAP arranca en blanco), `.escena` con `overflow-x: auto` nativo en móvil (adaptación definitiva pendiente) y `overflow: clip` en escritorio ≥48 rem, `.tira` flex `max-content`, paneles 16:9 a `38svh` con `grayscale(1)`, scrollbar oculto.

## No tocado

Servicios (incluido el bug reportado), cabecera, intro, nav, acceso-productos, opiniones, información, estilos globales, `BaseLayout`, specs de otras secciones. Cambios ajenos sin commitear en el árbol: conservados.

## Observación reportada (fuera de alcance, requiere decisión)

`Servicios.module.css:92-94`: el hover de `.fila` aplica `transform: scaleX(1)` sobre una barra inicial `scaleY(0)` (SES-009 definió `scaleY` de abajo arriba): la barra negra nunca crece y el texto pasa a blanco sobre fondo blanco. No corregido sin autorización (sección ajena a este turno).

## Comprobaciones

- `openspec validate home-galeria --strict`: válido; `openspec status`: 4/4 artefactos.
- `npm run build`: correcto (2 páginas; `dist/videos/` con los 13 vídeos; CSS y JS de galería en el bundle, `IntersectionObserver` y tramos presentes).
- Detector mecánico Impeccable (`detect --json` sobre los dos archivos): sin hallazgos.
- Prettier aplicado a los archivos tocados. Sin dependencias nuevas.
- Capturas visuales: no verificables en este entorno (sin navegador); revisión visual del fundido, el tramo y la tira pendiente del responsable.

## Pendientes del responsable

- Aceptación visual del primer diseño de Galería; ajuste fino del punto de disparo (50 % de partida) y del tramo de scrub.
- Archivo del cambio OpenSpec tras la aceptación.
- Bug del hover de Servicios (`scaleX`/`scaleY`): corrección autorizada pendiente.
- Material profesional del VPS y familia tipográfica definitiva (pendientes ya registrados).

## Estado

UB-004 en curso, turno galería (primer diseño) entregado para revisión visual. Cambios sin commit (no solicitado).
