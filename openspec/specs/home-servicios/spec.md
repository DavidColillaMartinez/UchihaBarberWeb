# home-servicios Specification

## Purpose

Comportamiento demo vigente de Servicios, reconstruido documentalmente desde la implementación publicada y las decisiones del responsable en SES-008, SES-009-servicios-ajustes, SES-010-servicios-ajustes-hover, SES-013 y SES-020. Esta consolidación corrige una omisión: no afirma que existiera un cambio OpenSpec previo ni vuelve a aprobar el diseño. La familia y el material finales siguen pendientes.

## Requirements

### Requirement: Composición y transformación de Servicios

La sección SHALL identificar sus servicios mediante un encabezado accesible y SHALL mostrar la palabra visual con vídeo dentro de las letras. En escritorio con movimiento permitido, el título SHALL comenzar a gran escala y transformarse hacia la mitad izquierda mientras la lista aparece en la derecha. El estado compuesto SHALL mantenerse utilizable sin esa animación.

#### Scenario: Recorrido de escritorio

- **WHEN** la sección atraviesa el tramo de transformación acordado (actualmente `top 30%` a `top -20%`)
- **THEN** el título se reduce y la lista aparece en la mitad derecha sin fijar el scroll de la página

#### Scenario: Movimiento reducido o disposición estrecha

- **WHEN** se solicita movimiento reducido o no se aplica la composición de escritorio
- **THEN** no se ejecuta la transformación de escritorio y el listado permanece disponible

### Requirement: Filas de servicios y reservas

Las filas SHALL mostrar los nombres, precios y descripciones del contenido validado por el responsable. En hover o foco visible SHALL desplegarse la descripción, invertirse el contraste y mostrarse «Reserva ya» en lugar del precio. Cada fila SHALL enlazar mediante el componente compartido al sistema general de reservas confirmado, sin inventar enlaces particulares por servicio.

#### Scenario: Activación visual de una fila

- **WHEN** una fila recibe hover o foco visible
- **THEN** crece en flujo para mostrar la descripción, el nombre cede su espacio y la llamada de reserva aparece con su borde

#### Scenario: Abrir reservas

- **WHEN** se activa el enlace de una fila
- **THEN** se abre la URL general confirmada con el comportamiento externo del componente BookingLink

#### Scenario: Procedencia de los datos

- **WHEN** se cambian precios o textos de los servicios
- **THEN** se registra la fuente o instrucción del responsable y no se considera que la consulta histórica de Yeasy pruebe vigencia indefinida

### Requirement: Título estable y excepción de snap

Servicios MUST NOT aplicar snap de sección. El crecimiento de las filas MUST NOT desplazar el título por un nuevo centrado dependiente del hover ni provocar un reajuste por anclaje de scroll. Esta excepción pertenece a Servicios; no desactiva el snap de Galería u otras secciones.

#### Scenario: Desplegar una descripción

- **WHEN** cambia la altura de una fila al interactuar
- **THEN** la fila crece, el título mantiene su posición de reposo y Servicios no introduce un salto de snap

#### Scenario: Cambiar tamaño de ventana

- **WHEN** cambia el tamaño o terminan de cargar las fuentes
- **THEN** se puede recalcular la posición de reposo del título para la disposición correspondiente

### Requirement: Reproducción provisional del vídeo

El vídeo demo actual SHALL reproducirse de forma nativa, silenciada y en bucle mientras corresponda a su visibilidad y preferencia de movimiento. MUST NOT cambiar de segmento por el hover de un servicio. La elección definitiva de reproducción por segmentos sigue pendiente; la existencia del bucle provisional no la resuelve.

#### Scenario: Fuera de pantalla o movimiento reducido

- **WHEN** la sección sale de pantalla o se aplica la preferencia de movimiento reducido contemplada por la implementación
- **THEN** el vídeo permanece pausado

#### Scenario: Interactuar con otra fila

- **WHEN** se cambia de servicio mediante hover o foco
- **THEN** no se solicita un salto a otro segmento del vídeo
