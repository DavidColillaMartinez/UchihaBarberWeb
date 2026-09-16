## Why

La portada de Uchiha Barber necesita su identidad visual y su entrada: una cabecera con el vídeo de barbería y el nombre como protagonista, tipografías propias y un cruce de entrada que meta al visitante dentro de la marca. Este cambio recoge el bloque de cabecera + cruce de entrada de la fase **UB-004** (`memoria/estado.json`), ya implementado y revisado visualmente por el responsable, que hasta ahora solo vivía en la memoria del proyecto.

## What Changes

- **Cabecera a viewport completo**: vídeo de fondo en blanco y negro con desenfoque (material demo servido desde el propio sitio, sustituible por el VPS con contenido real), nombre en dos líneas apiladas, alineación izquierda, centrado vertical y un 15 % más pequeño que en el primer diseño; acceso «Pedir cita» al sistema externo de reservas confirmado en `PRODUCT.md`.
- **Tipografías propias autoalojadas**: Inter 800 para titulares y Archivo 600 para textos de interfaz, como subconjuntos latinos servidos desde la web (sin CDN externo) y tokens compartidos `--font-display` / `--font-text`. El reparto por elemento lo fija cada sección (juego de mezcla dirigido por el responsable); la familia definitiva sigue pendiente del visto bueno del cliente. La provisional global se conserva como respaldo.
- **Cruce de entrada de la portada**: capa negra con el nombre como máscara negativa por la que se ve el vídeo de la cabecera; al entrar, el texto crece desde diminuto hasta que el hueco de la letra más central cubre la pantalla completa (cobertura total, sin desvanecimiento) y la portada aterriza con su título y su acceso. Ocurre en cada carga de la portada.
- **Comportamiento y robustez del cruce**: 24 fotogramas por segundo con desenfoque de movimiento; bloqueo de scroll solo durante el cruce; con movimiento reducido se omite y el vídeo permanece pausado; sin JavaScript la portada nunca queda bloqueada (salida de seguridad); la capa desaparece del DOM al terminar; la página de productos no lo incluye.

**Fuera de alcance**: la navegación y su comportamiento de scroll, la sección de Servicios y el resto de secciones, la página de productos, los datos comerciales, el encuadre definitivo del material audiovisual del VPS y la publicación.

## Capabilities

### New Capabilities

- `home-cabecera`: composición y contenido de la cabecera de inicio (vídeo de fondo tratado, nombre y acceso a reservas) y la adopción de las tipografías propias con sus tokens compartidos.
- `home-intro`: cruce de entrada de la portada (capa con máscara del nombre sobre el vídeo, condiciones de reproducción, accesibilidad y degradación segura).

### Modified Capabilities

Ninguna. No cambian requisitos de `home-skeleton` (la composición de secciones y su recorrido) ni de `products-page`.

## Impact

- `src/features/home/cabecera/` (componente y CSS Module): composición, vídeo y tipografías.
- `src/features/home/intro/` (componente, CSS Module y TypeScript): capa del cruce y su lógica.
- `src/styles/global.css`: `@font-face` de las fuentes propias y tokens tipográficos compartidos.
- `public/fonts/`: subconjuntos latinos de Inter 800 y Archivo 600.
- `src/layouts/BaseLayout.astro` y `src/pages/index.astro`: marca previa al primer pintado y montaje del cruce solo en la portada.
- Sin dependencias nuevas y sin tocar la navegación, Servicios ni la página de productos.

**Hechos y decisiones**: el material audiovisual es demo desde el repositorio y se servirá desde el VPS propio en su fase; la composición y el cruce fueron dirigidos por el responsable y su aceptación visual quedó registrada el 2026-09-16. **Pendiente ajeno al alcance**: la familia tipográfica definitiva, a expensas del cliente.
