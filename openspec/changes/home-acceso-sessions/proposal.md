## Why

El responsable confirma Sessions en la home, entre Productos y Opiniones, y aporta una referencia del cliente para mantener la identidad audiovisual de Uchiha Barber. Se necesita concretar su composición y un destino provisional válido antes de implementar, dentro de la fase UB-004.

## What Changes

- Planificar un acceso a Sessions con vídeo demo a la izquierda y contenido a la derecha, según `ContenidoDemo/ImagenDemoSeccionSesions.jpeg`, interpretada en horizontal y sin la interfaz de Instagram.
- Conservar el titular «UCHIHA / BARBER / SESSION / PLACES», adaptado a General Sans, y una llamada «Descúbrelas» hacia `/sessions`.
- Preparar una descripción demo autorizada; la redacción final y el material profesional siguen pendientes.
- Definir un fondo más luminoso, con dirección de degradado contraria al de Productos, comprobando su continuidad sin modificar el bloque anterior.
- Planificar la adaptación responsive, semántica, teclado, contraste y reproducción conforme a las reglas del sitio.
- Prever `/sessions` como página estática provisional, con navegación compartida, aviso de contenido pendiente y regreso a inicio; no desarrollar su contenido definitivo.
- Incorporar Sessions al orden y a los enlaces funcionales del esqueleto mediante deltas, sin consolidarlos todavía en las specs principales.

### Autorización y límites

La instrucción inicial (SES-039) autorizaba solo artefactos, normas y documentación. La petición posterior «vas a implementar home-acceso-sessions/» autoriza aplicar este cambio (SES-040), sin commit ni push. La inclusión, ubicación, vídeo demo, titular y destino provisional proceden del usuario; la distribución móvil apilada y la descripción siguen pendientes de revisión visual/editorial, no aceptación final del cliente.

Quedan fuera de alcance: rediseñar otras secciones, modificar Productos o su degradado, ampliar las barras de navegación con nuevas opciones, introducir tipografías o dependencias, añadir carruseles o animaciones de entrada, crear contenido definitivo de Sessions, descargar material o atribuir derechos no comprobados.

## Capabilities

### New Capabilities

- `home-acceso-sessions`: composición del bloque, identidad, texto demo, fondo, responsive, vídeo y enlace a Sessions.
- `sessions-page`: destino estático provisional `/sessions`, semántica y retorno a la home.

### Modified Capabilities

- `home-skeleton`: añadir acceso a Sessions entre Productos y Opiniones y reconocer su enlace a la nueva página provisional.

## Impact

En una futura aplicación: `src/pages/index.astro`, `src/features/home/acceso-sessions/`, `src/pages/sessions/index.astro` y `src/features/sessions/provisional/`. Se reutilizarán `BaseLayout`, `SiteNav` y `ProvisionalNote`; las opciones actuales de navegación no se amplían y no se señalará Productos como página activa en Sessions.

Se heredan `site-navigation` y `video-reproduccion` sin alterar sus requisitos. Sin APIs, adaptador, backend ni dependencias nuevas. La continuidad se actualiza en PRODUCT y memoria; las tareas detalladas permanecen únicamente en este cambio.
