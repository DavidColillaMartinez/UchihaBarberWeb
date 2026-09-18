## Why

La navegación y la cabecera vigentes no responden a la dirección pedida por el responsable: el nav se fusiona con el fondo por tema, invierte con fondo al hover y mantiene un chip de desenfoque sobre la cabecera; la cabecera muestra el nombre y el CTA «Pedir cita». La nueva dirección quiere una navegación más sobria (hover de solo ampliación de texto), una tira negra de extremo a extremo al reaparecer al subir y, en la portada, sustituir el nav convencional por una barra negra con desplegable y «Pedir cita». La cabecera pierde nombre visible y botón: el nombre queda como `h1` accesible y el acceso a reservas pasa al nav y a la barra.

Fase del roadmap: UB-004 (desarrollo individual de las secciones de inicio — bloque de navegación y cabecera). Alcance autorizado: nav compartido, cabecera de inicio y su cabecera visible de la portada. Fuera de alcance: el resto de secciones, la adaptación móvil (UB-006), el material definitivo (UB-007) y cualquier cambio de contenido comercial.

## What Changes

- **BREAKING (comportamiento observado)**: el nav deja de comportarse como hasta ahora. Al reaparecer con scroll hacia arriba lo hace como tira negra de extremo a extremo en todo el sitio, no como texto fusionado con el fondo.
- Hover y foco de las opciones del nav: solo ampliación de texto, sin fondo ni inversión de color.
- «Pedir cita» permanece en el nav con el tratamiento del CTA de cabecera (borde e inversión al hover), copiando su CSS.
- Se retira la opción «Uchiha Barber» del nav y el `<li>` vacío que quedó en el árbol.
- Se retira la lógica de tema por luminancia y el chip de desenfoque del nav (confirmado por el responsable).
- En la portada, el nav convencional desaparece: el vídeo ocupa la pantalla completa y sobre él se añade una barra negra de extremo a extremo, parte de la página (no fija), con opacidad aproximada del 80 % para que el vídeo se intuya por debajo. Extremo izquierdo: botón de tres barritas que abre un desplegable a modo de máscara hasta el pie de la pantalla sobre el vídeo, con las opciones del nav bien espaciadas; al hover la opción se amplía y al hacer clic navega a la sección. Extremo derecho: recuadro «Pedir cita» con borde, como el CTA que tenía la cabecera.
- La cabecera de inicio pierde el nombre visible y el botón; conserva un `h1` oculto para lectores de pantalla y el vídeo a pantalla completa sin desenfoque.
- El cruce de entrada no cambia de mecánica: sigue revelando el vídeo; al terminar, el título y el acceso quedan disponibles de forma accesible (título oculto y CTA en barra/nav), no visibles sobre la cabecera.

## Capabilities

### New Capabilities

(Ninguna: la barra de inicio es comportamiento de navegación y se especifica dentro de `site-navigation`.)

### Modified Capabilities

- `site-navigation`: hover/foco sin fondo (solo ampliación de texto); tira negra de extremo a extremo al reaparecer con scroll hacia arriba en todo el sitio; barra de inicio con botón de tres barritas, desplegable tipo máscara y «Pedir cita» con borde; retirada del tema por luminancia y del chip de desenfoque; «Pedir cita» disponible en el nav.
- `home-cabecera`: composición sin nombre ni CTA visibles; `h1` solo accesible; vídeo a pantalla completa sin desenfoque (el árbol ya contiene parte de este cambio sin commit y se conserva).
- `home-intro`: el final del cruce deja la portada con el vídeo a pantalla completa y los accesos disponibles (título oculto para lectores y CTA en la barra), sin exigir título y acceso visibles sobre la cabecera.

## Impact

- Código: `src/components/navigation/SiteNav.astro` y `SiteNav.module.css` (hover, tira negra, limpieza del tema y chip, CTA con estilo propio); nuevo componente de barra de inicio en `src/components/navigation/` (barra, hamburguesa, desplegable y su CSS Module); `src/features/home/cabecera/Cabecera.astro` y `Cabecera.module.css` (retirada de nombre visible y CTA, `h1` oculto, vídeo sin desenfoque); posible ajuste menor en `src/features/home/intro/` si la referencia al título/acceso lo requiere.
- Sin dependencias nuevas: el desplegable y sus transiciones pueden resolverse con CSS y un script mínimo; GSAP ya está disponible si hiciera falta.
- Accesibilidad: `aria-expanded`/`aria-controls`, foco visible y ordenado, cierre con Escape y clic fuera, ampliación también con foco por teclado, `prefers-reduced-motion` sin animación.
- Memoria: el cierre deberá registrar el bloque de navegación/cabecera en `memoria/bloques.json` y reflejar la excepción de la barra en las fuentes afectadas; el inventario del parche anterior requiere regeneración local, no se rebajan controles.
- Trabajo ajeno en el árbol: los cambios sin commit del nav, la cabecera, Galería, Servicios y la licencia tipográfica se conservan; este cambio los toma como base y no los pisa.
