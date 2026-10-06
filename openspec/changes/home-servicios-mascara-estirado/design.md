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
- **Medición de la tinta en tiempo de ejecución**: canvas con la misma familia, tamaño y peso que el h2 (`actualBoundingBoxAscent/Descent` y métricas de línea) para situar la tinta exactamente entre los bordes del listado; se recalcula en `resize` y `document.fonts.ready`. Alternativa descartada: factor fijo estimado (falla al variar la resolución).
- **Dos estados en un solo transform**: origen `left top`; reposo = escala uniforme a sangre centrada; pausa = ancho de columna y `escala-y` por tinta. GSAP con funciones e `invalidateOnRefresh`; fallback CSS con variables medidas (`--escala-x`, `--escala-y`, `--desplaza-y`). Ajuste fino `--factor-tinta` (CSS, por defecto 1).
- **Fallback**: si el vídeo falla, quedan letras negras; sin JS queda el texto natural (degradado pero legible).

## Risks / Trade-offs

- [El fundido exige fondo blanco bajo el vídeo] → la sección ya es blanca y el grupo lleva el blanco dentro; si el fondo cambiara, hay que revisar el modo de fusión.
- [La medición canvas depende de que la fuente esté cargada] → se recalcula en `document.fonts.ready` y en `resize`; si la medición no estuviera disponible, el estado natural sigue siendo legible.
- [Subir `--factor-tinta` desborda la tinta del listado] → es intencional (ajuste manual); 1 es el encaje exacto.
