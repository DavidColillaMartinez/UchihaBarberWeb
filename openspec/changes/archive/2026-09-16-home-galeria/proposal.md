## Why

La Galería es la tira o banner de extremo a extremo que separa Servicios de Productos en la portada, con la transición del fondo blanco al negro descrita por el responsable en `PRODUCT.md`. Hasta ahora es el esqueleto provisional del cambio `esqueleto-inicio-productos` (título, contenedor vacío y nota provisional); este cambio le da su primer diseño dentro de la fase **UB-004** (`memoria/estado.json`), con los 12 clips de servicios facilitados por el responsable como material demo (carpeta local `ContenidoDemo/`, ignorada por Git, copiada a `public/videos/` para servirlos).

## What Changes

- **Tira a sangre de 12 vídeos**: banner horizontal de extremo a extremo con los 12 clips de servicios (16:9, 1024×576), a una altura aproximada del 35–40 % del viewport, sobre fondo negro. `Video_Head` queda fuera de la tira (el responsable lo retira del material de Galería).
- **Desplazamiento ligado al scroll**: la tira se desplaza lateralmente en función del scroll vertical con GSAP ScrollTrigger (patrón `matchMedia` de Servicios); sin JavaScript o con movimiento reducido queda el estado final compuesto, estático.
- **Transición del fondo blanco al negro**: fundido reversible de ~1 s cuando la sección alcanza ~50 % de entrada en pantalla (valor de partida, a afinar al revisar) y retorno al blanco al abandonarla.
- **Reproducción contenida**: los vídeos solo se reproducen con la sección en pantalla (IntersectionObserver, como en Servicios), silenciados, sin audio, en bucle y con autoplay solo dentro del viewport.
- **Material demo declarado**: los vídeos son provisionales desde el propio sitio; la sustitución por el material del VPS se deja preparada (constante en el componente) y no se inventan recursos ni derechos.

**Fuera de alcance**: el bug del hover de Servicios (`scaleX`/`scaleY` de la barra, reportado aparte), el resto de secciones, la navegación, los estilos globales, la página de productos, el material profesional definitivo del VPS y la publicación.

## Capabilities

### New Capabilities

- `home-galeria`: composición de la tira/banner de Galería, su desplazamiento ligado al scroll, la transición reversible del fondo y el comportamiento de reproducción de sus vídeos.

### Modified Capabilities

Ninguna. `home-skeleton` conserva la composición y el snap genérico; el ajuste centrado tipo banner previsto para Galería queda documentado como excepción futura mientras la sección ocupe todo el viewport.

## Impact

- `src/features/home/galeria/` (componente y CSS Module): tira, transición y comportamiento.
- `public/videos/`: 12 clips demo copiados desde `ContenidoDemo/` (material local facilitado por el responsable).
- Sin dependencias nuevas (GSAP ya está en el stack) y sin tocar otras secciones ni estilos globales.

**Hechos y decisiones**: composición y comportamiento dictados por el responsable (tira, ligada al scroll, ~35–40 % de alto, 50 % reversible); los clips son demo y serán sustituidos por el material del VPS. **Pendiente**: aceptación visual del responsable y ajuste fino del punto de disparo.
