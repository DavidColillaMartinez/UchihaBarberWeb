## Why

La web de Uchiha Barber no tiene todavía una estructura navegable: solo existe un inicio vacío que importa BaseLayout. Para empezar el desarrollo visual sección a sección hace falta primero un esqueleto estable con secciones reconocibles, navegación funcional y la página provisional de productos. Este cambio pertenece a la fase UB-003 del roadmap (`memoria/estado.json`).

## What Changes

- Página de inicio que compone, con presentación provisional mínima, las secciones acordadas: navegación, cabecera de inicio, Servicios, Galería, acceso a Productos, Opiniones e Información.
- Página provisional mínima en `/productos`, para dar destino al enlace desde inicio; el catálogo y las fichas llegan en su fase posterior (UB-005).
- Navegación y enlaces internos funcionales entre inicio y productos.
- Acceso al sistema externo de reservas (URL confirmada en `PRODUCT.md`) en la navegación y en Información; sin asumir funciones de Yeasy no comprobadas.
- Estructura por sección bajo `src/features/<pagina>/<seccion>/` con CSS Modules; componentes compartidos solo si existe repetición real.
- Semántica, teclado, foco y movimiento reducido desde el esqueleto, encaminando comportamiento SEO y de accesibilidad para la web completa.
- Comportamiento general de navegación y recorrido de página concretado con el responsable antes de implementar lo que tenga ambigüedad visual.

**Fuera de alcance**: diseño definitivo de cualquier sección, vídeo en letras, transformación de Servicios, transición Servicios–Galería, catálogo/fichas de productos, página Sessions (inclusión sin confirmar), textos comerciales, precios, reseñas, horarios, material audiovisual, dependencias nuevas, venta, cuentas ni base de datos.

## Capabilities

### New Capabilities

- `home-skeleton`: estructura navegable de la página de inicio con sus secciones provisionales, navegación interna y acceso a reservas.
- `products-page`: página provisional mínima de productos como destino del enlace desde inicio, preparada para el catálogo futuro.

### Modified Capabilities

- (Ninguna: no existen specs consolidadas todavía.)

## Impact

- `src/pages/index.astro`, `src/pages/productos/index.astro` (nueva), `src/layouts/BaseLayout.astro` (estructura base, sin estilos de secciones).
- Carpetas de `src/features/home/*` y `src/features/products/*`, componentes compartidos en `src/components/` si hay repetición real.
- Sin dependencias nuevas (GSAP ya presente; su uso real llega con las animaciones de cada sección).
- Sin cambios en lockfile, build pipeline ni despliegue.
