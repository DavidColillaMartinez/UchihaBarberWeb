# site-navigation Specification

## Purpose

Comportamiento de la navegación compartida de Uchiha Barber en todo el sitio: fija en la parte superior, fusionada con el contenido sin caja propia, centrada, y desvaneciéndose según la dirección del scroll.

## Requirements

### Requirement: Navegación fija y fusionada con el contenido

La navegación SHALL permanecer fija en la parte superior de la pantalla, centrada en horizontal, sin fondo ni borde propios, y SHALL fundirse con el contenido subyacente invirtiendo el color del texto con el fondo (blanco/negro), de modo que sea legible sobre secciones claras, oscuras o vídeo.

#### Scenario: Nav sobre fondo claro

- **WHEN** la navegación flota sobre una sección de fondo blanco
- **THEN** el texto de la navegación se percibe en negro sin caja ni borde que la separe del contenido

#### Scenario: Nav sobre fondo oscuro o vídeo

- **WHEN** la navegación flota sobre una sección oscura o sobre vídeo
- **THEN** el texto de la navegación se percibe invertido (claro) manteniendo la fusión visual

### Requirement: Desvanecimiento por dirección de scroll

Al hacer scroll hacia abajo la navegación SHALL desvanecerse de forma gradual; al hacer scroll hacia arriba SHALL reaparecer de forma gradual tras un retardo aproximado de 0,3 s. La transición SHALL ser suave; si la revisión visual la desmiente, se aplicará la alternativa más directa documentada en el diseño. Al inicio de la página la navegación SHALL estar visible.

#### Scenario: Scroll hacia abajo

- **WHEN** el usuario hace scroll hacia abajo desde la parte alta de la página
- **THEN** la navegación se desvanece gradualmente y deja de interceptar la interacción

#### Scenario: Scroll hacia arriba

- **WHEN** el usuario hace scroll hacia arriba
- **THEN** la navegación reaparece de forma gradual tras el retardo previsto (~0,3 s)

#### Scenario: Parte superior de la página

- **WHEN** el usuario está al inicio de la página o vuelve a ella
- **THEN** la navegación está visible

### Requirement: Preferencia de movimiento reducido

Con `prefers-reduced-motion: reduce` la navegación SHALL permanecer siempre visible, sin desvanecimiento ni reaparición animada.

#### Scenario: Movimiento reducido

- **WHEN** el sistema indica preferencia de movimiento reducido y el usuario hace scroll
- **THEN** la navegación permanece visible sin transiciones

### Requirement: Alcance en todo el sitio

La navegación fija y fusionada SHALL aplicar a todas las páginas existentes mediante el componente compartido, conservando enlaces internos, `aria-current` y el enlace de reservas.

#### Scenario: Navegación en productos

- **WHEN** se visita la página de productos
- **THEN** la misma navegación fija y fusionada está presente con su comportamiento
