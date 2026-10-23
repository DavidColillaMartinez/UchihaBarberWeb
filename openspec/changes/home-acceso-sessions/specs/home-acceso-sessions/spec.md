## Purpose

Define el acceso audiovisual a Sessions desde la home, fiel a la referencia del cliente y a la identidad vigente de Uchiha Barber, con recorrido responsive y enlace funcional.

## ADDED Requirements

### Requirement: Corrección dirigida de fondo y alineación

El fondo SHALL conservar una zona negra de menor extensión que en Productos, con predominio luminoso y dirección inversa. La junta con Productos SHALL mezclar progresivamente ambos fondos sin borde duro ni desenfoque del contenido. En composición lateral, la descripción SHALL usar General Sans Semibold Italic 600 y centrarse verticalmente respecto al titular. La llamada SHALL conservar su altura de la primera demo y centrar horizontalmente su eje bajo el hueco entre descripción y titular, no bajo el panel completo.

#### Scenario: Revisión de la corrección en escritorio

- **WHEN** se recorre la junta y la composición de Sessions en escritorio
- **THEN** los fondos se mezclan, sigue existiendo una fuga negra pequeña, la descripción queda centrada en altura respecto al h2 y la llamada conserva su altura con su centro horizontal entre ambas columnas

### Requirement: Composición inspirada en la referencia del cliente

El bloque SHALL presentar en escritorio un vídeo a la izquierda y el contenido a la derecha, tomando la referencia del cliente en orientación horizontal. La descripción y el titular SHALL compartir la zona superior de contenido, con la llamada debajo. El titular SHALL conservar las palabras y el orden «UCHIHA / BARBER / SESSION / PLACES» en cuatro líneas, como texto real. El bloque MUST NOT reproducir los controles de Instagram ni el texto de relleno de la captura.

#### Scenario: Composición de escritorio

- **WHEN** se revisa la sección en una ventana de escritorio
- **THEN** se reconocen el audiovisual izquierdo y el contenido derecho con titular de cuatro líneas y llamada inferior, sin interfaz de Instagram

#### Scenario: Lectura del titular

- **WHEN** se selecciona el titular o se lee mediante tecnología de asistencia
- **THEN** se obtiene «UCHIHA BARBER SESSION PLACES» en ese orden, sin depender de una imagen ni duplicar el anuncio

### Requirement: Identidad y continuidad del fondo

La sección SHALL conservar General Sans y la jerarquía tipográfica vigente del sitio. Su fondo SHALL ser un degradado neutro más luminoso y con dirección contraria al fondo de Productos; la unión SHALL revisarse en el recorrido real sin modificar la composición ni el fondo de Productos. Textos y controles SHALL mantener contraste WCAG AA sobre su fondo efectivo. El bloque MUST NOT introducir otra identidad tipográfica, tarjetas, sombras, redondeados, carruseles ni nuevas animaciones de entrada.

#### Scenario: Continuidad entre secciones

- **WHEN** se recorre Productos, Sessions y Opiniones
- **THEN** Sessions se percibe como parte de la misma web, con iluminación invertida y más clara, y Productos conserva su aspecto previo

#### Scenario: Contraste sobre degradado

- **WHEN** se miden los fondos reales bajo textos y controles, incluidos hover y foco
- **THEN** el texto normal alcanza al menos 4,5:1, el texto grande 3:1 y los indicadores y límites necesarios de controles 3:1

### Requirement: Descripción demo y llamada a Sessions

La sección SHALL mostrar una descripción breve de invitación a conocer Sessions, identificada en la documentación como demo pendiente de redacción final. La llamada visible «Descúbrelas» SHALL enlazar a `/sessions`, con nombre accesible que permita reconocer el destino Sessions. El contenido MUST NOT incorporar como hechos servicios, localizaciones, eventos, derechos o datos comerciales no facilitados.

#### Scenario: Acceso al destino

- **WHEN** se activa «Descúbrelas» mediante puntero, teclado o interacción táctil
- **THEN** se abre la página provisional `/sessions` sin enlaces vacíos ni rutas inexistentes

### Requirement: Vídeo demo controlable

El vídeo SHALL usar material demo ya existente y seguir `video-reproduccion`: inicio automático silenciado, bucle y reproducción en línea, con pausa por visibilidad. SHALL ofrecer un control accesible de pausa y reproducción y conservar la pausa explícita al salir y volver a la sección. Con movimiento reducido SHALL permanecer detenido hasta una acción explícita; al activar esa preferencia durante la visita SHALL detener la reproducción automática. El bloqueo o fallo de reproducción MUST NOT ocultar el titular, la descripción ni el enlace.

#### Scenario: Reproducción habitual

- **WHEN** Sessions entra en pantalla con movimiento normal y reproducción permitida por el navegador
- **THEN** el clip arranca sin sonido ni pantalla completa y el control refleja su estado real

#### Scenario: Apariencia común del control de vídeo

- **WHEN** se comparan los controles de Sessions y Productos en reposo, hover y foco
- **THEN** comparten tamaño de44×44px, borde y fondo semitransparentes, iconos y tratamiento de interacción, manteniendo Sessions su comportamiento de reproducción y pausa

#### Scenario: Pausa voluntaria

- **WHEN** el visitante pausa el vídeo y después abandona y recupera la sección
- **THEN** el vídeo sigue detenido hasta que el visitante solicite reproducirlo

#### Scenario: Movimiento reducido

- **WHEN** la preferencia de movimiento reducido está activa o se activa durante la visita
- **THEN** no hay reproducción automática y se muestra el cartel o un estado visual estable, conservando un control de inicio explícito

#### Scenario: Reproducción no disponible

- **WHEN** el navegador bloquea el autoplay o el recurso audiovisual no puede cargarse
- **THEN** la composición permanece estable, el enlace funciona y el control no anuncia una reproducción inexistente

### Requirement: Adaptación responsive y recorrido accesible

La sección SHALL preservar la jerarquía al reducir el ancho, sin girar toda la composición, deformar letras ni ocultar contenido para forzarlo dentro de una pantalla. SHALL admitir crecimiento vertical cuando el contenido lo requiera y mantener el scroll libre y el snap por proximidad del sitio sin impedir leer el bloque completo. El enlace y el control SHALL ser utilizables por teclado, con foco visible no oculto por la navegación; sus áreas táctiles SHALL alcanzar al menos 44 × 44 píxeles CSS. A 320 píxeles CSS de ancho y con ampliación de texto al 200 % no SHALL aparecer pérdida de contenido ni desbordamiento horizontal de página.

#### Scenario: Ventana estrecha

- **WHEN** la composición lateral deja de admitir tamaños legibles
- **THEN** se reorganiza el contenido conservando titular, descripción, audiovisual y llamada, sin solapamiento ni recortes

#### Scenario: Contenido más alto que la pantalla

- **WHEN** el contenido supera la altura visible por orientación horizontal, zoom o apilado
- **THEN** se puede recorrer y activar todo su contenido sin que el ajuste de scroll lo devuelva repetidamente al inicio

#### Scenario: Teclado y foco

- **WHEN** el visitante recorre la sección con Tab y activa sus controles
- **THEN** el orden es coherente con la lectura, el foco permanece visible y no hay trampas de teclado

#### Scenario: Sin JavaScript

- **WHEN** no se ejecuta JavaScript
- **THEN** el titular, la descripción y el enlace siguen disponibles y cualquier vídeo que se reproduzca ofrece un mecanismo nativo de pausa
