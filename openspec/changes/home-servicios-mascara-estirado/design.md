## Context

Ver `proposal.md` (Why) y el delta de `home-servicios`. Estado técnico de partida: la palabra se dibujaba con una máscara SVG (data URI) sobre el `<video>`; al ser una imagen, la máscara no carga webfonts y caía al sans del sistema, perdiendo la tipografía de identidad, y el estirado del estado pausado necesitaba compensar el margen interno de la máscara sin poder medirlo. El prototipo en `/tmp/opencode/proto-servicios` validó la alternativa antes de tocar la sección.

## Goals / Non-Goals

**Goals:**

- Vídeo visible solo dentro de las letras con la tipografía de identidad real (General Sans Bold).
- Tinta de las letras de borde a borde del listado, exacta y dinámica en cualquier resolución.
- Un único ajuste fino opcional para subir o bajar el alto de la pausa.

**Non-Goals:**

- Cambiar la franja, el tramo, las filas, el snap, el vídeo o su reproducción.
- Convertir la fuente a contornos o embeberla en la máscara (caminos descartados).

## Decisions

- **Texto real + fundido**: la palabra es un `<h2>` real (General Sans Bold, negro) y el `<video>` se superpone con `mix-blend-mode: screen`. Sobre el blanco de la sección el vídeo desaparece; sobre las letras negras se ve. Alternativas descartadas: máscara data-URI (pierde la tipografía de identidad), woff2 embebida en la máscara (~29 KB de CSS y complejidad), contornos de la fuente (herramienta externa y regeneración), SVG en línea con `getBBox` (soporte irregular de máscaras `url(#)` sobre vídeo).
- **Aislamiento del fundido**: `isolation: isolate` en la sección y fondo blanco dentro del grupo transformado (`.tituloGrupo`), porque cualquier contexto de apilamiento aísla la fusión; así el vídeo se funde con el blanco y el negro de la palabra y no con el resto de la página.
- **Recorte del fondo blanco a la banda**: `overflow: clip` en `.escena` confina el fondo del grupo (que al escalarse es más alto que la franja) exactamente a la banda de la composición; sin él, el recuadro blanco tapaba el vídeo de la cabecera y el fondo negro de Galería. Alternativa descartada: subir cabecera y Galería de capa (toca CSS ajeno y deja el recuadro visible sobre el padding propio). El despliegue del hover no se recorta porque las filas crecen en flujo y la escena crece con ellas. En relaciones de pantalla extremas (más anchas que ~2,4:1 en reposo) la punta del banner podría recortarse; en 21:9 solo se recorta el fondo transparente.
- **Dimensiones explícitas del vídeo**: el `<video>` es un elemento reemplazado: con `inset` y `width/height: auto` conserva su tamaño intrínseco (1024x576) en lugar de ajustarse a la caja, desbordándola (se vio en el navegador: bloque gris fuera de las letras, invadiendo la columna del listado). Sus dimensiones se calculan sobre el contenedor (`top/left: --margen-video` y `width/height: calc(100% - 2 * --margen-video)`), de modo que cubre exactamente la caja del texto. `overflow: clip` en el grupo actúa como red de seguridad.
- **Margen de seguridad entre vídeo y fondo**: el vídeo se detiene 2 px antes del borde del grupo (`--margen-video`), y el grupo reserva ese padding, de modo que el borde del vídeo nunca coincide con el del fondo blanco ni puede escaparse de él. La medición de la palabra descuenta ese margen (`palabra.offsetTop`) para que el centrado siga siendo exacto.
- **Verificación en navegador antes de dar por buena una corrección**: las comprobaciones de compilación no demuestran el aspecto. La revisión se hizo con Firefox (geckodriver) sobre la web local, capturando los tres estados del tramo (reposo, transición y pausa) a 1440x900, 1920x1080, 1280x720 y 390x844, con medición de cajas por script y ampliación de los bordes de la palabra.
- **Medición de la palabra en tiempo de ejecución**: canvas con la misma familia, tamaño y peso que el h2 (`actualBoundingBoxAscent/Descent` y métricas de línea) para situar la palabra y centrarla respecto al listado; se recalcula en `resize` y `document.fonts.ready`. Sirve para que un cambio de familia (la fuente alargada pendiente) se acomode sin tocar el código.
- **Proporciones naturales**: la palabra se escala de forma uniforme en los dos estados (reposo a sangre, pausa en la columna) y no se estira: el estirado artificial no convenció al responsable y se sustituye por una tipografía de titular de letras alargadas cuando esté disponible. Alternativas descartadas: altura de tinta igualada al listado y factor de ajuste manual.
- **Dos estados en un solo transform**: origen `left top`; reposo = escala uniforme a sangre centrada; pausa = ancho de columna y centrado respecto al listado. GSAP con funciones e `invalidateOnRefresh`; fallback CSS con las variables medidas (`--escala`, `--desplaza-y`).
- **Fallback**: si el vídeo falla, quedan letras negras; sin JS queda el texto natural (degradado pero legible).

## Risks / Trade-offs

- [El fundido exige fondo blanco bajo el vídeo] → la sección ya es blanca y el grupo lleva el blanco dentro; si el fondo cambiara, hay que revisar el modo de fusión.
- [La medición canvas depende de que la fuente esté cargada] → se recalcula en `document.fonts.ready` y en `resize`; si la medición no estuviera disponible, el estado natural sigue siendo legible.
- [Con la tipografía vigente la palabra queda más baja que el listado] → es lo esperado hasta que entre la fuente de titular alargada; las medidas se recalculan solas al cambiar la familia.
