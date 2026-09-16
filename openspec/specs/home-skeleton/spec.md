# home-skeleton Specification

## Purpose

Estructura navegable y provisional de la página de inicio de Uchiha Barber: secciones reconocibles en su orden acordado, navegación interna funcional y acceso al sistema de reservas, sirviendo de base para el desarrollo visual individual de cada sección.

## Requirements

### Requirement: Composición de secciones en orden acordado

La página de inicio SHALL renderizar, en este orden, las secciones provisionales: navegación, cabecera de inicio, Servicios, Galería, acceso a Productos, Opiniones e Información. Cada sección SHALL ser identificable de forma independiente para permitir su revisión de orden y estructura, con una presentación provisional mínima que no aparente diseño definitivo. Como espacio de recorrido, cada sección SHALL ocupar la altura del viewport (estructura general de la página, independiente de su contenido definitivo).

#### Scenario: Carga de la página de inicio

- **WHEN** se solicita `/` en una compilación válida
- **THEN** la respuesta contiene, en el orden indicado, un contenedor por sección con su denominación reconocible y presentación provisional

#### Scenario: Sin datos reales disponibles

- **WHEN** una sección no dispone aún de material o textos reales (por ejemplo Galería u Opiniones)
- **THEN** se muestra una estructura provisional mínima sin precios, reseñas, horarios ni material inventados, y la ausencia queda registrada en el propio código como pendiente documentado

#### Scenario: Espacio de viewport

- **WHEN** se revisa la estructura de las secciones de inicio
- **THEN** cada sección ocupa como mínimo la altura del viewport sin que su contenido definitivo esté maquetado

### Requirement: Navegación y enlaces internos funcionales

La navegación SHALL ofrecer enlaces internos a los destinos existentes del esqueleto (inicio y productos) y a las secciones de la página cuando aplique, y los enlaces SHALL resolver a rutas válidas sin errores de compilación ni enlaces rotos.

#### Scenario: Enlace interno a productos

- **WHEN** se activa el enlace de Productos en la navegación o en la sección de acceso a Productos
- **THEN** se navega a la página provisional `/productos`

#### Scenario: Enlace interno a secciones de inicio

- **WHEN** se activa un enlace de navegación hacia una sección de la página de inicio
- **THEN** el usuario queda posicionado en esa sección sin pérdida de contexto de la página

### Requirement: Acceso al sistema de reservas

La navegación y la sección Información SHALL incluir un enlace al sistema de reservas externo con la URL confirmada documentada en `PRODUCT.md`. El enlace SHALL ser un enlace externo simple y MUST NOT presuponer funciones, API, embeds ni parámetros de Yeasy no comprobados. La presencia del acceso SHALL ser estable sin dominar la experiencia visual del esqueleto.

#### Scenario: Enlace de reservas disponible

- **WHEN** se revisa la navegación o la sección Información
- **THEN** existe un enlace hacia la URL confirmada de reservas, accesible por teclado, sin elementos incrustados adicionales de Yeasy

### Requirement: Semántica y accesibilidad base

La página SHALL usar HTML semántico con landmarks y una jerarquía de encabezados coherente (un único `h1`), SHALL ser navegable por teclado con foco visible y SHALL respetar `prefers-reduced-motion` ante cualquier movimiento que se introduzca. La estructura SHALL conservar semántica y accesibilidad cuando se sustituya el provisional por el diseño definitivo.

#### Scenario: Navegación por teclado

- **WHEN** se recorre la página únicamente con teclado
- **THEN** todos los enlaces son alcanzables y el foco permanece visible y ordenado

#### Scenario: Movimiento reducido

- **WHEN** el sistema del usuario indica preferencia de movimiento reducido
- **THEN** la página no introduce movimiento automático que lo ignore

### Requirement: Aislamiento de estilos por sección

Cada sección SHALL llevar sus estilos en un CSS Module propio dentro de su carpeta de feature, de forma que los estilos de una sección no alteren el render de otra, y los estilos globales SHALL limitarse a fundamentos compartidos.

#### Scenario: Cambio de estilos en una sección

- **WHEN** se modifican los estilos provisionales de una sección concreta
- **THEN** ninguna otra sección ni la estructura de la página alteran su render por ese cambio

### Requirement: Recorrido con ajuste por sección

El scroll de la página SHALL permanecer libre, y al aproximarse al límite de una sección la página SHALL ajustar (snap por proximidad) la vista al punto de alineación de esa sección, con su inicio anclado a la parte superior del viewport como en el salto de las anclas. La Galería SHALL conservar este comportamiento genérico hasta que se trabaje su contenido, momento en el que adoptará el ajuste centrado tipo banner previsto.

#### Scenario: Scroll libre

- **WHEN** el usuario hace scroll a mitad de una sección sin acercarse a sus límites
- **THEN** la página no interrumpe ni fija el scroll

#### Scenario: Ajuste al límite de sección

- **WHEN** el scroll se aproxima al límite entre dos secciones
- **THEN** la vista se asienta con el inicio de la sección siguiente anclado a la parte superior, igual que el salto por ancla

#### Scenario: Coherencia con las anclas

- **WHEN** se activa un enlace de navegación hacia una sección
- **THEN** el punto de llegada coincide con el punto de ajuste del snap de esa sección
