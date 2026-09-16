## MODIFIED Requirements

### Requirement: Recorrido con ajuste por sección

El scroll de la página SHALL permanecer libre, y al aproximarse al límite de una sección la página SHALL ajustar (snap por proximidad) la vista al punto de alineación de esa sección, con su inicio anclado a la parte superior del viewport como en el salto de las anclas. La Galería SHALL encajarse como el resto del recorrido; la excepción prevista de ajuste centrado tipo banner queda descartada: su contenido se desarrolló como carrusel continuo con snap (cambio `home-galeria`).

#### Scenario: Scroll libre

- **WHEN** el usuario hace scroll a mitad de una sección sin acercarse a sus límites
- **THEN** la página no interrumpe ni fija el scroll

#### Scenario: Ajuste al límite de sección

- **WHEN** el scroll se aproxima al límite entre dos secciones
- **THEN** la vista se asienta con el inicio de la sección siguiente anclado a la parte superior, igual que el salto por ancla

#### Scenario: Coherencia con las anclas

- **WHEN** se activa un enlace de navegación hacia una sección
- **THEN** el punto de llegada coincide con el punto de ajuste del snap de esa sección

#### Scenario: Galería en el recorrido

- **WHEN** el recorrido alcanza la Galería, ya desarrollada como carrusel continuo
- **THEN** la sección se encaja igual que el resto y no aplica excepción de ajuste
