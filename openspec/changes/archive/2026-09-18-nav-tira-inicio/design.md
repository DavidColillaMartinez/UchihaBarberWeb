## Context

Ver `proposal.md` — Why. Estado técnico relevante:

- `SiteNav.astro` localiza el nav por `aria-label`, calcula tema por luminancia (`data-theme`), activa el chip de desenfoque (`data-blur`) y gobierna el desvanecimiento con GSAP ScrollTrigger (visible al principio, oculto al bajar, reaparición con retardo). `SiteNav.module.css` define hover con fondo invertido y el chip `backdrop-filter`.
- `Cabecera.astro` monta el vídeo de fondo, un `h1` con dos líneas y el CTA `BookingLink` con la clase local `.cita`. En el árbol hay cambios sin commit de otra sesión: retirada de «Uchiha Barber» del nav (queda `<li>` vacío), alta de `BookingLink` sin estilo en el nav, h1 de cabecera sin texto, CTA retirado, `filter` del vídeo eliminado, más ajustes en Galería/Servicios y una licencia tipográfica nueva. Este cambio parte de ese estado y no pisa lo ajeno.
- `BookingLink.astro` es la única fuente de la URL y del comportamiento externo de reservas.
- Los tokens `--color-bg`/`--color-fg` están en `src/styles/global.css`; la cabecera ya invierte sobre ellos.

## Goals / Non-Goals

- Objetivo: sustituir el modelo de nav (tema por luminancia + chip + hover con fondo) por tira negra con ampliación de texto; añadir la barra de inicio con desplegable accesible; retirar nombre y CTA de la cabecera dejando el encabezado accesible.
- No objetivo: adaptación móvil específica (UB-006), contenido comercial, tipografías definitivas, otras secciones y los retoques sin commit ajenos (Galería, Servicios, fuentes).
- No objetivo: fijar los valores visuales finales (opacidad exacta, factor de ampliación); se implementan con los valores propuestos y quedan a revisión del responsable.

## Decisions

1. **Componente de barra separado**: nuevo `src/components/navigation/BarraInicio.astro` con su CSS Module, renderizado por `Cabecera` dentro de la sección (sobre el vídeo). Alternativa considerada: integrarlo como variante de `SiteNav`; se descarta porque la barra es parte de la página (no fija) y su ciclo de vida depende del hero. De este modo las rutas del bloque «navegación» de `memoria/bloques.json` (`src/components/navigation/`) ya cubren el código nuevo.
2. **Tira negra sin lógica de tema**: se elimina el script de luminancia y el `data-blur` de `SiteNav`; la tira visible es siempre negra de extremo a extremo con opciones claras. Alternativa descartada: conservar el tema por sección; la tira lo hace innecesario y era la fuente de complejidad y del chip ya retirado por decisión del responsable.
3. **Visibilidad en portada**: el nav recibe un indicador de portada (`data-home`); con el scroll en el umbral superior de la portada no se muestra (lo sustituye la barra), y al reaparecer con scroll hacia arriba lo hace como tira. En el resto de páginas se mantiene visible arriba. Se conserva GSAP/ScrollTrigger, ya en uso; sin JS el CSS deja el nav visible (degradación segura).
4. **Ampliación de texto en hover/foco**: transición de `transform: scale()` sobre el enlace, sin fondo; se mantiene el foco visible con el tratamiento global. Alternativa descartada: animar `font-size` (provoca reflow y desplaza la tira). Sin animación con movimiento reducido.
5. **CTA del nav con el CSS de la cabecera**: `BookingLink` recibe la clase del nav; el recuadro copia `.cita` de `Cabecera.module.css` (relleno `0.9rem 2.5rem`, borde de 1 px con `--color-bg`, inversión al hover). Al retirarse el CTA de la cabecera, esta pasa a ser su única presencia visual, con el mismo comportamiento de componente compartido.
6. **Desplegable como máscara fija**: al abrir, una capa `position: fixed` cubre el viewport restante con el mismo negro translúcido de la barra (≈80 %), por debajo de la barra en `z-index`; las opciones se listan con interlineado amplio. La barra abre con un `<button>` con `aria-expanded` y `aria-controls`; el foco permanece en orden natural del documento (botón → opciones → CTA), sin trampa de foco; Escape cierra y devuelve el foco al botón; clic fuera cierra; navegar cierra. Alternativa descartada: `<details>` (no permite máscara ni control de foco/cierre completo).
7. **Cabecera sin nombre ni CTA visibles**: se retiran el bloque `.contenido`, `.titulo`, `.linea` y `.cita` junto con su animación de entrada; se conserva un `h1` con clase `srOnly` local (patrón ya usado en Servicios) y el `aria-labelledby` de la sección para no perder el nombre accesible ni el único `h1` de la página (requisito de `home-skeleton`). El vídeo mantiene `grayscale(1)` y pierde el desenfoque, coherente con el compromiso de blanco y negro de PRODUCT.
8. **Ajuste del retardo del nav**: este cambio documenta en `site-navigation` el retardo real aprobado en la revisión del nav (≈0,1 s), resolviendo la desviación registrada, sin tocar el comportamiento.

## Risks / Trade-offs

- [La ampliación de texto puede solaparse con opciones vecinas] → `transform: scale()` con origen centrado y separación suficiente (`gap`); verificación visual del responsable.
- [La tira negra sobre vídeo o secciones oscuras reduce el contraste] → la tira es opaca (negro propio) y las opciones claras; el chip translúcido solo existe en la barra sobre el vídeo, con la opacidad a revisar.
- [Sin JavaScript el botón de la barra no abre el desplegable] → el nav fijo queda visible por CSS (GSAP no lo oculta), de modo que las opciones siguen alcanzables.
- [Cambios ajenos sin commit en los mismos archivos (Cabecera, SiteNav)] → tareas releen el archivo antes de editar y conservan los retoques ajenos; se aplica el protocolo de memoria para trabajo paralelo.
- [Retirar el tema puede desafinar el nav en `/productos`] → verificación visual en la página de productos antes de aceptar.
- [El árbol eliminó también el `grayscale` del vídeo] → se restaura/ conserva `grayscale(1)` por el compromiso de blanco y negro; si el responsable quiere el vídeo en color, es un ajuste de una línea en revisión.

## Migration Plan

Sitio estático sin datos persistidos: no hay migración. Despliegue = `npm run build` y publicación autorizada. Reversión: revertir el commit; sin estado ni caché que limpiar. La consolidación de specs y el registro del bloque se hacen al archivar el cambio, según `memoria/cierre.md`.

## Open Questions

- Opacidad exacta de la barra sobre el vídeo (propuesta ≈80 %) y del desplegable; factor de ampliación del texto en hover. Son valores de ajuste fino que se fijan en la revisión visual del responsable sin alterar el enfoque.
- Confirmar que el vídeo se mantiene en blanco y negro al retirar el desenfoque (el árbol quitó el `filter` completo; se asume blanco y negro por PRODUCT).
