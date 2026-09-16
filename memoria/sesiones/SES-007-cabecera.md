# SES-007 — Diseño de la cabecera de inicio

Agente: OpenCode (modelo glm-5.3-flash). Fase: UB-004 (turno 1: cabecera). Modalidad: implementación de diseño dirigida por el responsable; sin commit solicitado.

## Instrucción recibida

«Haz un diseño sobre la sección cabecera. No toques ningún otro lado, implementando todas las pautas, y deja un hueco para el background donde va el vídeo.» Proceso con skill Impeccable (contexto + brief de superficie + piso de oficio). Decisiones de composición confirmadas por el responsable en la ronda de preguntas:

- Composición: nombre a sangre en dos líneas apiladas (Uchiha / Barber), vídeo a sangre de fondo.
- Textos: solo nombre y acceso a pedir cita; nada adicional.
- Hueco del vídeo: elemento `<video>` sin `src`, con tratamiento preparado.

## Implementado (real, solo cabecera)

- `src/features/home/cabecera/Cabecera.astro`: cabecera a viewport completo (`100svh`) con hueco de vídeo de fondo (`<video>` sin `src`, `autoplay/muted/loop/playsinline`, `aria-hidden`, pendiente documentado en comentario: material demo desde el VPS, no inventar URLs); nombre como `h1` en dos líneas; enlace «Pedir cita» a la URL confirmada de Yeasy. Se retira el `ProvisionalNote` de esta sección (el pendiente de vídeo queda registrado en el código).
- `Cabecera.module.css`: fondo negro (base B/N), vídeo con `grayscale(1) blur(6px)` y `scale(1.08)` (oculta el halo del desenfoque); título a `min(28vw, 34vh)` con interlineado 0.84 y tracking −0.03em; CTA rectangular con borde blanco que invierte a fondo blanco en hover; entrada única escalonada (dos líneas + CTA, cubic-bezier exponencial, guardada en `no-preference`); estructura adaptable básica (<48rem: padding menor y CTA a ancho completo). Tipografía provisional (var global), familia definitiva sin elegir.
- Script co-localizado: pausa el vídeo y retira `autoplay` si `prefers-reduced-motion: reduce`.
- Brief de superficie Impeccable: `.impeccable/surfaces/src-features-home-cabecera-cabecera-astro.md` (composición elegida y decisiones sin resolver). Directorio `.impeccable/` local; comprobar su estado en `.gitignore`.

## Turno 2: integración del vídeo demo

Instrucción: «tengo el contenido demo, lo sacaremos desde el repositorio en carpeta `ContenidoDemo`; más adelante desde el VPS con contenido real. El vídeo es VideoHead». Fichero real localizado: `ContenidoDemo/Video_Head.mp4` (H.264, 1024×576, 25 fps, 36,6 s, 7,6 MB; compatible con navegadores). Decisión del responsable: ignorar `ContenidoDemo/` en Git y versionar solo el mp4 que usa la web.

- `ContenidoDemo/Video_Head.mp4` → `public/videos/Video_Head.mp4` (asset estático servido tal cual; build lo copia a `dist/videos/`).
- `Cabecera.astro`: constante `videoUrl = "/videos/Video_Head.mp4"` en frontmatter y `src={videoUrl}` en el `<video>`; comentario actualizado (demo desde repo; el cambio a VPS se hace en esa constante). El script de movimiento reducido ya pausaba el vídeo.
- `.gitignore`: añadida la exclusión `ContenidoDemo/` (24 MB de material demo).

## Turno 3: ajuste de composición del h1 (prototipo de intro aprobado)

Instrucción: «movamos el h1 más al centro y un 15% más pequeño». Cambios en `Cabecera.module.css`: `align-items: flex-end → center` (grupo título+CTA centrado verticalmente, alineación izquierda conservada) y `font-size: min(28vw, 34vh) → min(23.8vw, 28.9vh)` (−15%). `npm run build` correcto y Prettier limpio.

Contexto de exploración en paralelo (sin tocar el repo): prototipo desechable de la intro de entrada en `/tmp/opencode/intro-proto/` (overlay SVG con máscara de texto sobre el vídeo demo, iris por el contador de la B de BARBER, cobertura total sin fade al final, 24 fps con blur, una vez por sesión, fuentes Inter/Archivo self-hosted). Decisiones de la intro pendientes de capturar en cambio OpenSpec antes de implementar en `src/features/home/intro/`.

## No tocado

Resto de secciones, navegación, layout, estilos globales, página de productos, specs y demás fuentes: sin cambios salvo memoria y el brief local. ProvisionalNote sigue usándose en las otras secciones.

## Comprobaciones

- `npm run build`: correcto (astro check sin errores, 2 páginas; el mp4 queda copiado en `dist/videos/` tras el turno 2).
- Detector mecánico Impeccable (`detect --json` sobre la cabecera): sin hallazgos.
- Prettier: archivos de la cabecera formateados y correctos.
- Sin dependencias nuevas. `memoria:check` previo vigente.

## Pendientes de decisión/material del responsable

- Archivo de vídeo (demo) para el hueco y su encuadre: turno 2 resuelto con `Video_Head.mp4` demo desde el repo (`public/videos/`, `ContenidoDemo/` ignorado); el src se cambia en la constante `videoUrl` de `Cabecera.astro` al pasar al VPS. Encuadre a juzgar en la revisión visual.
- Aceptación visual de la composición (escala, posición del CTA, entrada); no asumirla.
- Familia tipográfica definitiva (sigue la provisional) y logo (pendiente de facilitar; hoy el nombre es texto).
- Revisión equivalente para hover/táctil del CTA: el hover es un cambio de color con estado estable; accesible por teclado (foco visible global).

## Estado

UB-004 en curso, turno de cabecera implementado y pendiente de aceptación visual. Cambios sin commit (no solicitado); SHA pendiente. Resto de secciones en su turno.
