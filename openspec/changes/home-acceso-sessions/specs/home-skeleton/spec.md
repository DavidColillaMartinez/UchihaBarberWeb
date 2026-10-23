## MODIFIED Requirements

### Requirement: Composición de secciones en orden acordado

La página de inicio SHALL renderizar, en este orden, las secciones: navegación, cabecera de inicio, Servicios, Galería, acceso a Productos, acceso a Sessions, Opiniones e Información. Cada sección SHALL ser identificable de forma independiente. Las secciones aún no desarrolladas SHALL conservar una presentación provisional; las desarrolladas SHALL seguir sus specs propias y las decisiones aceptadas. Como espacio de recorrido, cada sección SHALL ocupar como mínimo la altura del viewport respetando su composición y permitiendo crecimiento por contenido.

#### Scenario: Carga de la página de inicio

- **WHEN** se solicita `/` en una compilación válida
- **THEN** la respuesta contiene, en el orden indicado, un contenedor por sección con su denominación reconocible y la presentación vigente de cada bloque

#### Scenario: Sin datos reales disponibles

- **WHEN** una sección no dispone aún de material o textos reales (por ejemplo Galería u Opiniones)
- **THEN** se muestra una estructura provisional mínima sin precios, reseñas, horarios ni material inventados, y la ausencia queda registrada en el propio código como pendiente documentado

#### Scenario: Espacio de viewport

- **WHEN** se revisa la estructura de las secciones de inicio
- **THEN** cada sección ocupa como mínimo la altura del viewport respetando la composición vigente y permitiendo crecimiento por contenido

#### Scenario: Ubicación de Sessions

- **WHEN** se recorre la home desde Productos hacia Opiniones
- **THEN** se encuentra entre ambas el acceso a Sessions conforme a su spec propia, sin alterar el orden de las otras secciones

### Requirement: Navegación y enlaces internos funcionales

La navegación SHALL ofrecer enlaces internos a los destinos existentes del esqueleto y a las secciones de la página cuando aplique, y los enlaces SHALL resolver a rutas válidas sin errores de compilación ni enlaces rotos. El acceso a Sessions SHALL enlazar a la página provisional `/sessions`; su incorporación MUST NOT añadir por sí sola nuevas opciones a las barras de navegación.

#### Scenario: Enlace interno a productos

- **WHEN** se activa el enlace de Productos en la navegación o en la sección de acceso a Productos
- **THEN** se navega a la página provisional `/productos`

#### Scenario: Enlace interno a secciones de inicio

- **WHEN** se activa un enlace de navegación hacia una sección de la página de inicio
- **THEN** el usuario queda posicionado en esa sección sin pérdida de contexto de la página

#### Scenario: Enlace interno a Sessions

- **WHEN** se activa «Descúbrelas» en el acceso a Sessions
- **THEN** se navega a la página provisional `/sessions`
