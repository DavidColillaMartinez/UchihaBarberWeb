# Acceso a Productos

## Why

El bloque de acceso a Productos de la portada sigue en estado provisional: solo muestra el titular, un enlace sin contexto y un visor vacío, sin la composición que el responsable ya dirigió (40 % de contenido a la izquierda, 60 % de vídeo a la derecha, palabra «Productos» vertical de abajo hacia arriba). Sin desarrollarlo, el recorrido de la portada pierde el contraste de sección que ya resuelven Servicios y Galería, y el catálogo queda sin acceso con contexto.

## What Changes

- Se desarrolla el bloque de acceso a Productos de la portada como sección de pleno derecho, con su composición, su titular vertical, su descripción y su llamada al catálogo.
- El bloque pasa a ser un bloque oscuro de una pantalla, con el vídeo ocupando la mitad derecha y el contenido la izquierda.
- Se incorpora un vídeo demo como material provisional del bloque, con control de reproducción y respeto por la preferencia de movimiento reducido.
- El texto de la descripción se marca explícitamente como demo, pendiente de la redacción definitiva del responsable.
- Se retira la nota de provisionalidad genérica del bloque y se sustituye por la indicación precisa de qué sigue siendo material provisional.
- Fuera de alcance: la página `/productos`, el catálogo, las fichas de producto, la sección de Opiniones y la de Información, y el diseño móvil definitivo (fase UB-006).

## Capabilities

### New Capabilities

- `home-acceso-productos`: composición, contenido y comportamiento del bloque de acceso a Productos de la portada, con el catálogo como destino.

### Modified Capabilities

Ninguna. Los requisitos vigentes de `home-skeleton` (orden de secciones, altura de viewport y enlace interno a `/productos`) siguen siendo válidos tal cual: el bloque los cumple y la página provisional de productos no cambia.

## Impact

- Código: `src/features/home/acceso-productos/` (componente Astro, CSS Module y TypeScript co-localizados).
- Recursos: `public/videos/CorteDePelo1.mp4` como material demo ya presente en el repositorio, más el cartel `public/videos/CorteDePelo1-poster.jpg` derivado de ese mismo clip.
- Sin dependencias nuevas, sin cambios de API, sin servidor y sin tocar otras secciones de la portada.
- Documentación: `PRODUCT.md` (dirección de la sección) y `memoria/` (bloque, mapa, estado y relevo).
