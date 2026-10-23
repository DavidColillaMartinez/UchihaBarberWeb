## Purpose

Establece un destino estático provisional para Sessions, enlazable desde la home y coherente con el sitio mientras su contenido definitivo permanece pendiente.

## ADDED Requirements

### Requirement: Página provisional de Sessions

La ruta `/sessions` SHALL responder con una página estática que incluya título de documento «Sessions · Uchiha Barber», un único encabezado principal «Sessions», aviso claro de contenido provisional y enlace «Volver a inicio». MUST NOT publicar una galería, sesiones, localizaciones o textos comerciales definitivos inventados.

#### Scenario: Acceso directo

- **WHEN** se solicita `/sessions` o se llega desde «Descúbrelas»
- **THEN** se muestra una página válida que identifica Sessions y explica que el contenido está pendiente

#### Scenario: Regreso a inicio

- **WHEN** se activa «Volver a inicio»
- **THEN** se navega a `/` mediante un enlace real

### Requirement: Integración semántica y navegación compartida

La página SHALL conservar idioma español, estructura de documento y enlace para saltar al contenido del sitio. SHALL mostrar la navegación compartida conforme a `site-navigation`, con sus destinos actuales funcionales, sin señalar Productos como página activa ni añadir una nueva opción Sessions en este cambio. Su contenido principal y controles SHALL ser legibles y accesibles en escritorio, móvil, teclado y zoom.

#### Scenario: Navegación en Sessions

- **WHEN** se visita la página provisional
- **THEN** la navegación compartida está disponible con sus enlaces correctos a la home y Productos, sin un estado activo falso

#### Scenario: Contenido rastreable

- **WHEN** se examina el HTML de la página sin ejecutar scripts
- **THEN** contiene título de documento, un solo h1, aviso provisional y enlaces legibles, sin datos estructurados ni metadatos comerciales inventados
