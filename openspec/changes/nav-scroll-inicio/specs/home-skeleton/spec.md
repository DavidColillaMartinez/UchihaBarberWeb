# Delta: home-skeleton

## MODIFIED Requirements

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

## ADDED Requirements

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
