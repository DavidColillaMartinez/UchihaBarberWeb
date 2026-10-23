## MODIFIED Requirements

### Requirement: Filas de servicios y reservas

Las filas SHALL mostrar los nombres, precios y descripciones del contenido validado por el responsable. En escritorio, en hover o foco visible SHALL desplegarse la descripción, invertirse el contraste y mostrarse «Reserva ya» en lugar del precio, y la fila SHALL enlazar mediante el componente compartido al sistema general de reservas confirmado, sin inventar enlaces particulares por servicio. En móvil la fila SHALL desplegarse al primer toque sin abandonar la web; la reserva SHALL quedar en «Reserva ya», que SHALL ser el único enlace activo de la fila en ese rango; un segundo toque SHALL contraer la fila y abrir otro servicio SHALL cerrar el anterior. El control desplegable SHALL exponer su estado con `aria-expanded`.

#### Scenario: Activación visual de una fila

- **WHEN** una fila recibe hover o foco visible en escritorio, o el primer toque en móvil
- **THEN** crece en flujo para mostrar la descripción, el nombre cede su espacio y la llamada de reserva aparece con su borde

#### Scenario: Abrir reservas

- **WHEN** se activa el enlace de una fila (la fila entera en escritorio, «Reserva ya» en móvil)
- **THEN** se abre la URL general confirmada con el comportamiento externo del componente BookingLink

#### Scenario: Contracción y acordeón en móvil

- **WHEN** se toca de nuevo una fila desplegada, o se despliega otro servicio
- **THEN** la fila se contrae y solo una fila permanece desplegada

#### Scenario: Procedencia de los datos

- **WHEN** se cambian precios o textos de los servicios
- **THEN** se registra la fuente o instrucción del responsable y no se considera que la consulta histórica de Yeasy pruebe vigencia indefinida
