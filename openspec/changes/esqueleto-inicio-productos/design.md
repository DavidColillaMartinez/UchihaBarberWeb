## Context

Estado actual: `src/pages/index.astro` renderiza un `main` vacío sobre `BaseLayout.astro` (html en español, título y slot). Existen carpetas de features vacías (`src/features/home/`, `src/features/products/`), componentes de reutilización en `src/components/ui/` y `src/components/navigation/`, y estilos globales limitados a fundamentos en `src/styles/`. GSAP está instalado pero sin uso real aún. El esqueleto debe ser navegable y organizado sin adelantar el diseño definitivo de ninguna sección. La composición y el comportamiento visual los dirige el responsable del proyecto (`PRODUCT.md`); este cambio cubre la fase UB-003 del roadmap.

## Goals / Non-Goals

**Goals:**

- Estructura navegable: inicio con sus siete bloques provisionales en orden acordado y página provisional `/productos` como destino real de enlaces.
- Encaminar SEO y accesibilidad de base desde el esqueleto: semántica, jerarquía de encabezados, landmarks, foco por teclado y movimiento reducido, sin instalar dependencias.
- Aislamiento real por sección (CSS Modules) y componentes compartidos solo con repetición real.
- Dejar marcado provisional que no bloquee el trabajo posterior ni parezca diseño definitivo.

**Non-Goals:**

- Diseño definitivo, animaciones, vídeo en letras, transformación de Servicios o transición Servicios–Galería (contenedores no equivalen a implementado).
- Catálogo, fichas, venta, cuentas, base de datos, CMS, analítica ni infraestructura.
- Página Sessions (inclusión sin confirmar) ni adaptación móvil detallada.
- Elección de tipografías definitivas ni decoraciones por iniciativa propia.

## Decisions

- **Composición por secciones sobre la página**: `index.astro` importa un componente por sección desde `src/features/home/<seccion>/` (nav, cabecera, servicios, galería, acceso-productos, opiniones, información). La página solo compone; ninguna sección acumula estilos de otra. Alternativa descartada: una única página monolítica (rompería el aislamiento y el desarrollo por turnos).
- **Navegación compartida como componente** en `src/components/navigation/`, usada por inicio y productos, con ids de anclaje por sección (`#servicios`, `#galeria`, `#productos`, `#opiniones`, `#info`) y enlace a `/productos`. Alternativa descartada: duplicar la nav por página (inconsistencia y repetición).
- **Acceso a reservas como enlace externo simple** hacia la URL confirmada de `PRODUCT.md`, presente en la navegación y en Información (decisión del usuario de este encargo). Sin embeds ni parámetros no comprobados de Yeasy; la llamada «Reserva ya» del hover de Servicios queda para su turno. Alternativa descartada: botón/incrustación ahora (funciones de Yeasy sin comprobar).
- **Página provisional de productos en `src/pages/productos/index.astro`** con componente desde `src/features/products/`, sin datos ni venta; el catálogo futuro la sustituirá manteniendo la ruta.
- **Provisional marcado como provisional**: contenedores/títulos mínimos y notas en código donde falte material real (Galería, Opiniones, horarios, dirección), sin textos comerciales ni datos inventados; cada ausencia documentada como pendiente en el relevo y en las tareas.
- **SEO y accesibilidad encaminados, no completados**: un único `h1` por página, jerarquía de encabezados, `lang="es"` ya presente, `meta description` como hueco provisional sin texto comercial inventado, enlaces con texto descriptivo, foco visible en fundamentos globales y `prefers-reduced-motion` en CSS. Sitemap/robots se tratarán con contenido real en fase posterior (evitar dependencia nueva ahora). Alternativa descartada: añadir `@astrojs/sitemap` en este cambio (dependencia sin necesidad de alcance).
- **GSAP sin uso en el esqueleto**: la navegación responde a enlaces normales; cualquier comportamiento de scroll se concreta con el usuario antes de implementar lo ambiguo. Alternativa descartada: animar ya el comportamiento general (violaría la concreción previa acordada).

## Risks / Trade-offs

- [El provisional puede percibirse como diseño final] → presentación deliberadamente mínima y notas de provisionalidad visibles en el código y el relevo; la aceptación del esqueleto no aprueba el diseño de secciones.
- [Anclas de sección pueden moverse al maquetar definitivo] → ids estables definidos por sección y revisados al aceptar el esqueleto; la nav centraliza los enlaces.
- [Enlace a Yeasy sin verificar en runtime] → solo se usa la URL confirmada como texto/enlace; comprobación manual de destino al revisar, sin asumir funciones.
- [Contenido provisional en Galería/Opiniones puede confundir] → estructura vacía reconocible con señalización de pendiente, no rellenos falsos.

## Migration Plan

Sin migración: salida estática existente; el esqueleto se añade sobre `src/pages/` y `src/features/`. Reversión trivial por Git (`git revert` del bloque). El catálogo futuro sustituirá el provisional de `/productos` conservando la ruta.

## Open Questions

- Comportamiento general de navegación y recorrido de página (visible/oculta según scroll, uso de anclas): se concreta con el responsable antes de implementar lo que tenga ambigüedad visual; el esqueleto no lo anticipa.
- Textos provisionales neutros de señalización (títulos de secciones): se ajustarán con el usuario durante la revisión del esqueleto sin convertirlos en contenido definitivo.
