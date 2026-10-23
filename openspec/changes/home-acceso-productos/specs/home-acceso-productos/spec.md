## Purpose

Bloque de acceso a Productos de la portada de Uchiha Barber: presenta la identidad de la sección con una composición de contraste y ofrece el paso al catálogo de productos con contexto suficiente para que el visitante quiera entrar.

## ADDED Requirements

### Requirement: Composición de contraste del bloque

La sección SHALL ocupar el lugar acordado en la portada, entre la Galería y las Opiniones, y SHALL presentarse como un bloque oscuro de una pantalla: fondo en degradado que pasa de un gris medio al negro, texto blanco y una división aproximada de 40 % de contenido a la izquierda y 60 % de vídeo a la derecha. El texto SHALL conservar contraste suficiente sobre el degradado. El vídeo SHALL presentarse dentro de su mitad, con margen sobre el fondo del bloque, sin marcos, tarjetas, bordes ni sombras. La sección SHALL ocupar como mínimo la altura del viewport y su contenido SHALL poder crecer sin recortarse.

#### Scenario: Bloque en el recorrido de la portada

- **WHEN** se recorre la portada hasta el bloque de acceso a Productos
- **THEN** aparece después de la Galería y antes de las Opiniones, con fondo oscuro en degradado y su contenido a la izquierda y el vídeo a la derecha

#### Scenario: Legibilidad sobre el degradado

- **WHEN** se revisa el bloque con el degradado aplicado
- **THEN** el titular, la descripción y la llamada se leen con contraste suficiente en toda la superficie que los sostiene

#### Scenario: Altura del bloque

- **WHEN** se revisa el bloque en un viewport de escritorio
- **THEN** su altura coincide con la del viewport y la columna de contenido y la de vídeo ocupan la altura completa

#### Scenario: Contenido que no cabe

- **WHEN** el contenido de la columna izquierda no cabe en la altura disponible
- **THEN** el bloque crece para mostrarlo entero, sin recortarlo ni desbordarlo

### Requirement: Titular vertical de abajo hacia arriba

La sección SHALL presentar la palabra «Productos» con gran protagonismo, escrita de abajo hacia arriba y colocada junto al borde izquierdo de la columna de contenido, apoyada en su parte inferior. La palabra SHALL ser texto real del documento, legible por lectores de pantalla y seleccionable, y SHALL mostrarse en mayúsculas por estilo sin alterar lo que se lee ni lo que se anuncia.

#### Scenario: Lectura del titular

- **WHEN** se observa el bloque en escritorio
- **THEN** la palabra «Productos» aparece en vertical, con las letras tumbadas, leída desde abajo hacia arriba

#### Scenario: Acceso por lector de pantalla

- **WHEN** un lector de pantalla recorre el bloque
- **THEN** el titular se anuncia como un encabezado con el texto «Productos»

### Requirement: Descripción y llamada al catálogo

La sección SHALL incluir una descripción breve que explique qué son los productos y anime a visitarlos, y SHALL incluir un enlace con el texto «Conócelos» que lleve a la página del catálogo. La descripción y la llamada SHALL quedar centradas en su columna. El enlace SHALL ser alcanzable por teclado, con foco visible, y SHALL tener un objetivo de pulsación suficiente.

#### Scenario: Llamada al catálogo

- **WHEN** el visitante activa «Conócelos»
- **THEN** se navega a la página del catálogo en `/productos`

#### Scenario: Recorrido con teclado

- **WHEN** se recorre el bloque únicamente con teclado
- **THEN** el enlace «Conócelos» es alcanzable, el foco permanece visible y el enlace se distingue del resto del texto

#### Scenario: Carácter provisional

- **WHEN** se revisa el contenido textual del bloque
- **THEN** su carácter provisional queda registrado en la documentación del proyecto, no dentro del bloque

### Requirement: Vídeo del bloque

La mitad derecha del bloque SHALL contener un vídeo en bucle, sin sonido y en línea, tratado en blanco y negro como el resto del material audiovisual de la web. El vídeo SHALL arrancar de forma nativa por sí solo, sin que el visitante lo active, y la visibilidad del bloque SHALL conservar ese arranque autónomo: SHALL pausarse al salir de la vista y SHALL reanudarse cuando el bloque esté a la vista o muy cerca de ella; la pausa puede llegar de inmediato al cargar la página si el bloque aún no es visible. El material SHALL ser sustituible por el vídeo oficial de productos sin rehacer la sección.

#### Scenario: Reproducción al llegar al bloque

- **WHEN** el bloque entra en la vista
- **THEN** el vídeo se reproduce en bucle y sin sonido, mostrando el material del bloque

#### Scenario: Arranque sin pulsar reproducir

- **WHEN** se carga la portada en móvil con movimiento normal
- **THEN** el vídeo del bloque se reproduce por sí solo, sin que el visitante tenga que pulsar reproducir

#### Scenario: Pausa al salir de la vista

- **WHEN** el bloque deja de estar en la vista
- **THEN** el vídeo se pausa

#### Scenario: Sustitución del material

- **WHEN** se dispone del vídeo oficial de productos
- **THEN** se sustituye el material del bloque cambiando solo el origen del vídeo y su cartel, sin modificar la composición

### Requirement: Control del movimiento del vídeo

El bloque SHALL ofrecer un control accesible de pausa y reproducción sobre el vídeo, con su nombre actualizado según el estado. Con la preferencia de movimiento reducido activada, el vídeo SHALL permanecer estático en su cartel y SHALL reproducirse solo si el visitante lo pide de forma explícita. Sin JavaScript, el bloque SHALL conservar su contenido y el vídeo SHALL arrancar por sí solo de forma nativa, sin control disponible: la pausa por visibilidad y el control dependen del guion del bloque.

#### Scenario: Pausa desde el control

- **WHEN** el visitante activa el control con el vídeo en reproducción
- **THEN** el vídeo se pausa y el control anuncia la acción de reproducir

#### Scenario: Movimiento reducido

- **WHEN** el sistema indica preferencia de movimiento reducido
- **THEN** el vídeo no se reproduce por sí solo y se muestra su cartel, con el control disponible para iniciarlo si el visitante lo desea

#### Scenario: Sin JavaScript

- **WHEN** la página se carga sin JavaScript
- **THEN** el titular, la descripción y el enlace se muestran con normalidad, el vídeo arranca por sí solo de forma nativa y no aparece ningún control inactivo

### Requirement: Tipografía y aislamiento de estilos

La sección SHALL usar exclusivamente General Sans como familia, con la jerarquía de pesos vigente: Bold para el titular, Semibold Italic para la descripción y Medium para la llamada a la acción. Los estilos SHALL vivir en su propio CSS Module, de modo que no alteren el render de otras secciones de la portada.

#### Scenario: Familias y pesos

- **WHEN** se revisan los estilos del bloque
- **THEN** toda la tipografía usa General Sans con los pesos previstos para titular, descripción y llamada

#### Scenario: Aislamiento

- **WHEN** se modifican los estilos del bloque
- **THEN** ninguna otra sección de la portada altera su render
