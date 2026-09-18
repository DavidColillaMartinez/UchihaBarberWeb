## RENAMED Requirements

- FROM: `### Requirement: Navegación fija y fusionada con el contenido`
- TO: `### Requirement: Navegación fija como tira negra`

## MODIFIED Requirements

### Requirement: Navegación fija como tira negra

La navegación SHALL permanecer fija en la parte superior de la pantalla, de extremo a extremo y por encima del contenido. Cuando reaparece con el scroll hacia arriba SHALL mostrarse como una tira de fondo negro con las opciones legibles sobre ella, sin depender de la fusión con el fondo ni de la inversión de color por sección. En la portada, mientras la barra de inicio está a la vista, la navegación fija MUST NOT mostrarse: la barra la sustituye en lo alto del vídeo.

#### Scenario: Nav sobre fondo claro

- **WHEN** la navegación reaparece sobre una sección de fondo blanco
- **THEN** se percibe como una tira negra de extremo a extremo con las opciones legibles, sin texto fusionado sin fondo

#### Scenario: Nav sobre fondo oscuro o vídeo

- **WHEN** la navegación reaparece sobre una sección oscura o sobre vídeo
- **THEN** la tira negra se percibe igual y las opciones permanecen legibles sin depender de la inversión del fondo

#### Scenario: Portada en lo alto

- **WHEN** la portada está en su parte superior con la barra de inicio a la vista
- **THEN** la navegación fija no aparece y es la barra la que ofrece las opciones

### Requirement: Desvanecimiento por dirección de scroll

Al hacer scroll hacia abajo la navegación SHALL desvanecerse de forma gradual; al hacer scroll hacia arriba SHALL reaparecer de forma gradual tras un retardo breve (del orden de 0,1 s) y en su forma de tira negra. La transición SHALL ser suave. Al inicio de las páginas la navegación SHALL estar visible, salvo en la portada, donde la barra de inicio ocupa ese lugar.

#### Scenario: Scroll hacia abajo

- **WHEN** el usuario hace scroll hacia abajo desde la parte alta de una página
- **THEN** la navegación se desvanece gradualmente y deja de interceptar la interacción

#### Scenario: Scroll hacia arriba

- **WHEN** el usuario hace scroll hacia arriba
- **THEN** la navegación reaparece de forma gradual como tira negra tras el retardo breve previsto

#### Scenario: Parte superior de la página

- **WHEN** el usuario está al inicio de una página interna o vuelve a ella
- **THEN** la navegación está visible

### Requirement: Preferencia de movimiento reducido

Con `prefers-reduced-motion: reduce` la navegación SHALL permanecer siempre visible en su forma de tira negra, sin desvanecimiento ni reaparición animada, y la barra de la portada SHALL mostrar y ocultar su desplegable sin animación.

#### Scenario: Movimiento reducido

- **WHEN** el sistema indica preferencia de movimiento reducido y el usuario hace scroll
- **THEN** la navegación permanece visible como tira sin transiciones animadas

### Requirement: Alcance en todo el sitio

La navegación fija y su tira negra SHALL aplicar a todas las páginas existentes mediante el componente compartido, conservando enlaces internos, `aria-current` y el enlace de reservas.

#### Scenario: Navegación en productos

- **WHEN** se visita la página de productos
- **THEN** la misma navegación fija está presente con su comportamiento de tira negra y sus enlaces

## ADDED Requirements

### Requirement: Opciones con ampliación de texto

Las opciones de la navegación SHALL ampliar su texto al hover y al foco visible, sin fondo, borde ni inversión de color. La ampliación SHALL ser perceptible sin romper la alineación de la tira y SHALL tener equivalente con teclado y en pantallas táctiles.

#### Scenario: Hover sobre una opción

- **WHEN** el puntero se sitúa sobre una opción de la navegación
- **THEN** solo el texto se amplía y no aparece ningún fondo detrás de la opción

#### Scenario: Foco por teclado

- **WHEN** una opción recibe el foco con el teclado
- **THEN** el texto se amplía igual que al hover y el foco resulta visible

### Requirement: Acceso a reservas con tratamiento de llamada a la acción

La navegación SHALL incluir «Pedir cita» con un recuadro de borde visible y sin relleno en reposo, que se invierte a fondo claro con texto oscuro al hover y al foco, conservando el tratamiento que tenía el acceso de la cabecera. El enlace SHALL usar el componente compartido de reservas y abrir el sistema externo confirmado.

#### Scenario: Aspecto del acceso

- **WHEN** se revisa la navegación en reposo
- **THEN** «Pedir cita» se muestra con borde y sin relleno, distinto del texto de las opciones

#### Scenario: Interacción con el acceso

- **WHEN** el visitante pasa el puntero o enfoca «Pedir cita»
- **THEN** el recuadro se invierte a fondo claro con texto oscuro

#### Scenario: Apertura de reservas

- **WHEN** se activa «Pedir cita» en la navegación
- **THEN** se abre la URL confirmada de reservas con el comportamiento externo del componente compartido

### Requirement: Barra de navegación de la portada

En la parte superior de la portada, sobre el vídeo, SHALL existir una barra de fondo negro con opacidad aproximada del 80 % que deje intuir el vídeo, parte de la página y no fija. Su extremo izquierdo SHALL contener un botón de tres barritas y su extremo derecho el acceso «Pedir cita» con borde. El botón SHALL abrir un desplegable que llegue hasta el pie de la pantalla como una máscara sobre el vídeo, con las opciones de navegación bien espaciadas; al hover o al foco cada opción SHALL ampliar su texto y al activarla SHALL navegar a la sección o página correspondiente. El desplegable SHALL cerrarse al navegar, al pulsar Escape, al hacer clic fuera y al volver a activar el botón.

#### Scenario: Barra visible en la portada

- **WHEN** se carga la portada y se observa la parte superior
- **THEN** el vídeo ocupa la pantalla completa y sobre él se ve la barra negra con el botón de tres barritas a la izquierda y «Pedir cita» a la derecha

#### Scenario: Apertura del desplegable

- **WHEN** el visitante activa el botón de tres barritas
- **THEN** se despliega la máscara sobre el vídeo hasta el pie de la pantalla con las opciones de navegación espaciadas

#### Scenario: Elección de una opción

- **WHEN** el visitante amplía una opción con el hover o el foco y la activa
- **THEN** navega al destino correspondiente y el desplegable se cierra

#### Scenario: Cierre sin navegar

- **WHEN** el desplegable está abierto y el visitante pulsa Escape, hace clic fuera o vuelve a activar el botón
- **THEN** el desplegable se cierra sin cambiar de sección

#### Scenario: Teclado y lectores de pantalla

- **WHEN** se recorre la barra y el desplegable solo con teclado o lector de pantalla
- **THEN** el botón anuncia si el desplegable está abierto o cerrado, el foco permanece visible y ordenado y todas las opciones son alcanzables

#### Scenario: Movimiento reducido

- **WHEN** el visitante prefiere movimiento reducido
- **THEN** el desplegable aparece y desaparece sin animación
