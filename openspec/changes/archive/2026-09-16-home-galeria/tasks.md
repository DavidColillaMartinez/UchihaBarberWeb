## 1. Material y composición

- [x] 1.1 Copiar los 12 clips demo de `ContenidoDemo/` a `public/videos/` (sin `Video_Head` en la tira), declarando su condición de material demo y la sustitución por el VPS en el componente (comprobación: `public/videos/` y comentario de la constante en `Galeria.astro`)
- [x] 1.2 Componer la tira a sangre de 12 paneles 16:9 con altura ~35–40 % del viewport, sin bordes ni tarjetas, con h2 accesible `srOnly` y retirando la nota provisional; contención del ancho con `minmax(0, 1fr)` tras la revisión del responsable (comprobación: salida generada de `dist/index.html` y CSS con la plantilla)

## 2. Comportamiento

- [x] 2.1 Desplazamiento lateral de la tira ligado al scroll con ScrollTrigger (scrub, `invalidateOnRefresh`) dentro de `gsap.matchMedia()` escritorio + movimiento normal, con fallback estático sin JS y con movimiento reducido (comprobación: script generado y revisión del tramo)
- [x] 2.2 Fundido reversible del fondo blanco→negro (~1 s) con disparo a ~50 % de entrada, reversible en ambos sentidos, configurable como constante y con fondo blanco por defecto tras la revisión del responsable (comprobación: CSS generado `background: var(--color-bg)` y revisión del tramo)
- [x] 2.3 Reproducción contenida: autoplay solo con la sección en pantalla, pausa fuera, sin audio, bucle, `playsinline`, `tabindex="-1"` y pausados con movimiento reducido (comprobación: IntersectionObserver en el script generado)

## 3. Navegación de la tira (ronda 2)

- [x] 3.1 Botones-flecha sobre los extremos de la tira (8 % ancho, altura completa), accesibles fuera del `aria-hidden`, con chevron SVG dibujado y estados reposo/hover/foco según lo acordado; visibles en ambos extremos tras la contención (comprobación: salida generada y CSS de `Galeria.module.css`)
- [x] 3.2 Visibilidad fundida al entrar la sección (~25 % de cobertura), ocultas sin JS y fuera de pantalla (comprobación: IntersectionObserver y reglas `data-visible` en el script generado)
- [x] 3.3 Paso de un panel por activación; modelo de extremos deshabilitados sustituido en la ronda 4 por el bucle circular (comprobación: spec ronda 4 y script generado)

## 5. Carrusel continuo con snap (ronda 4)

- [x] 5.1 Reformular el carrusel: posición compartida alimentada por el scroll (ScrollTrigger sin tween, una vuelta por cruce de sección) y por las flechas (± un panel, página quieta), con suavizado en `gsap.ticker` y normalización módulo una vuelta; tira duplicada para el bucle tipo noria en ambos sentidos (comprobación: script generado con `ticker`, sin ScrollToPlugin, 24 paneles en `dist/index.html`)
- [x] 5.2 Restaurar el snap de la Galería y retirar el desplazamiento de página de las flechas (comprobación: CSS generado sin `scroll-snap-align: none` y bundle sin `scrollTo`)
- [x] 5.3 Reproducción limitada a los paneles cercanos al hueco visible (margen de precarga) y primer fotograma cargado con movimiento reducido (comprobación: lógica de reproducción en el script generado)
- [x] 5.4 Verificar en navegador: snap en la sección, flechas sin mover la página, continuidad sin saltos al alternar scroll/flechas y noria por ambos extremos (comprobación: confirmación del responsable «todo listo», registrada en `SES-018-cierre-galeria`)

## 6. Verificación y cierre

- [x] 6.1 Verificación técnica: `npm run build` correcto, detector mecánico Impeccable sin hallazgos sobre los archivos tocados y Prettier aplicado (comprobación: comandos ejecutados en el relevo)
- [x] 6.2 Revisar la salida generada: la tira y sus vídeos están en `dist/`, el resto de secciones queda intacta (comprobación: `dist/index.html` y CSS generado)
- [x] 6.3 Registrar la revisión visual del responsable y el ajuste fino del punto de disparo (comprobación: aceptación visual registrada en `SES-018-cierre-galeria`; el punto de disparo del 50 % quedó aprobado tal cual)
- [x] 6.4 Actualizar memoria afectada (relevo, estado y mapa) y dejar `memoria:check` vigente (comprobación: commits `000a4e1` y `8e256b7`, `npm run memoria:check` vigente)
