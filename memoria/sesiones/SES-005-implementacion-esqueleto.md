# SES-005 — Implementación del esqueleto de inicio y productos

Agente: OpenCode (modelo deepseek-v4.1-flash), continuación de SES-004. Fase: UB-003 en revisión (implementado, pendiente de aceptación del usuario). Modalidad: implementación autorizada por el flujo OpenSpec.

## Procedencia

Base Git: `cf3e7e1971d006aa97e6d24858213c1212c51df1` (Planifica el esqueleto de inicio y productos en OpenSpec), rama `main`, remoto `UchihaBarberWeb` sincronizado. Sin cambios ajenos.

## Decisiones del usuario (tarea 4.1)

- Reservas en navegación e Información; ruta provisional `/productos` (SES-004).
- Navegación **estática** en el esqueleto: sin ocultado por scroll ni desplazamiento suave; el comportamiento descrito en `PRODUCT.md` (ocultar al bajar, reaparecer al subir) se concreta al desarrollar las animaciones de sección.
- Salto directo a las anclas de sección. En consecuencia, la tarea 4.2 no requiere código nuevo: lo implementado ya respeta la decisión.

## Implementado

- `src/styles/global.css`: base, reset, variables mínimas (blanco/negro, tipografía del sistema marcada como provisional), foco visible, movimiento reducido y skip link.
- `src/layouts/BaseLayout.astro`: importa los fundamentos, skip link, `description` opcional (hueco pendiente, sin texto comercial).
- `src/components/navigation/SiteNav.astro` + módulo: navegación compartida, anclas estables (`servicios`, `galeria`, `productos`, `opiniones`, `info`), enlace a `/productos`, `aria-current` y enlace externo de reservas a la URL confirmada.
- `src/components/ui/ProvisionalNote.astro` + módulo: aviso provisional compartido (repetición real en seis secciones y la página de productos).
- Secciones de inicio en `src/features/home/<seccion>/` con su CSS Module: `cabecera` (h1 «Uchiha Barber»), `servicios`, `galeria`, `acceso-productos`, `opiniones`, `informacion`. Cada una con marcado provisional y comentarios de pendientes reales.
- `src/pages/index.astro`: compone navegación + las seis secciones en el orden acordado.
- `src/features/products/provisional/` + `src/pages/productos/index.astro`: página provisional con enlace de vuelta a inicio, sin datos ni venta.

## Comprobaciones realizadas

- `npm run build`: correcto; 2 páginas estáticas (`/` y `/productos`).
- HTML generado: un único `h1` por página; cinco `h2` en inicio (Servicios, Galería, Productos, Opiniones, Información) en el orden acordado; `lang="es"`; `nav` con `aria-label`; skip link y `main id="contenido"`; CSS Modules con hash aplicados; `global.css` incluye foco visible y `prefers-reduced-motion`; enlace de reservas presente en navegación e Información (2 en inicio, 1 en productos).
- Enlaces internos: sin rutas rotas (`/` y `/productos` existen).
- Prettier: correcto en todos los archivos tocados.
- Sin dependencias nuevas; `package-lock.json` intacto; GSAP sin uso en el esqueleto.

## Provisional y pendientes

Contenido de todas las secciones; vídeo de cabecera; lista real de servicios y precios; material de Galería; reseñas de Opiniones; descripción y vídeo del acceso a Productos; dirección detallada, horarios, teléfono y perfiles oficiales de Información; `meta description`. Intenciones reservadas a su turno: vídeo dentro de las letras, transformación de Servicios y transición Servicios–Galería. Sessions sigue sin confirmarse.

## Estado y siguiente paso

El esqueleto queda **en revisión**: la validación técnica está hecha, pero la aceptación visual es del usuario y no se anticipa. Ninguna sección tiene diseño aprobado por esta prueba. Tras su aceptación se sincronizarán/archivarán los artefactos OpenSpec según el flujo y comenzará, en sesión aparte, el diseño detallado de la cabecera de inicio.
