## Purpose

Define la Galería de la portada de Uchiha Barber: carrusel continuo de material audiovisual a sangre entre Servicios y el acceso a Productos, con snap de página, movimiento lateral alimentado por el scroll y por flechas propias, bucle circular por ambos extremos, fundido reversible del fondo y reproducción contenida.

## ADDED Requirements

### Requirement: Tira o banner de extremo a extremo

La sección Galería SHALL componer una tira horizontal de material audiovisual a sangre, entre Servicios y el acceso a Productos, a una altura aproximada de un tercio a dos quintos del viewport. El material SHALL declararse como demo mientras no sea el definitivo y MUST NOT inventarse contenido, recursos ni derechos; su sustitución por el material del VPS SHALL prepararse en el componente.

#### Scenario: Composición de la tira

- **WHEN** se solicita la portada en una compilación válida
- **THEN** la Galería muestra la tira de vídeos a sangre, sin bordes ni tarjetas, con los clips demo servidos desde el propio sitio

#### Scenario: Tira contenida en el ancho de la página

- **WHEN** se recorre la portada
- **THEN** la página mantiene su ancho establecido y no se desplaza horizontalmente; la tira vive dentro de ese ancho y el sobrante queda recortado dentro de la Galería

#### Scenario: Material demo sustituible

- **WHEN** el material profesional del VPS esté disponible
- **THEN** la sustitución se realiza editando la lista de recursos del componente sin cambiar la composición

### Requirement: Carrusel continuo con snap

La tira SHALL comportarse como un carrusel continuo contenido en el ancho de la página. El recorrido vertical de la página SHALL alimentar su movimiento lateral mientras la sección entra o se abandona, y la Galería SHALL conservar el encaje (snap) del recorrido general como el resto de secciones. Los controles de flecha SHALL desplazar únicamente el carrusel —un panel por activación— sin modificar el scroll de la página. El carrusel SHALL conservar su posición al alternar entre scroll y flechas, sin saltos ni reinicios, y tras el último panel SHALL continuar con el primero —y a la inversa—, en ambos sentidos, sin salto visible. Sin JavaScript o con movimiento reducido la tira SHALL permanecer estática en su posición inicial, nunca oculta ni vacía, y con movimiento reducido SHALL seguir siendo navegable con las flechas sin animación automática.

#### Scenario: Snap en la sección

- **WHEN** el visitante llega a la Galería por el recorrido de la portada
- **THEN** la página se encaja en la sección como en el resto del recorrido

#### Scenario: Movimiento por scroll

- **WHEN** la sección entra en el viewport o se abandona mientras el visitante hace scroll
- **THEN** el carrusel se desplaza lateralmente, recorriéndose una vuelta completa durante el cruce de la sección

#### Scenario: Movimiento por flechas

- **WHEN** el visitante activa una de las flechas (clic, teclado o toque)
- **THEN** el carrusel avanza o retrocede exactamente un panel y la posición de la página no cambia

#### Scenario: Continuidad sin saltos

- **WHEN** el visitante alterna el uso de las flechas con el scroll vertical
- **THEN** el carrusel continúa desde la posición en que quedó, sin saltos ni retorno a una posición impuesta por el scroll

#### Scenario: Bucle por los extremos (noria)

- **WHEN** el carrusel supera el último panel o retrocede más allá del primero
- **THEN** vuelven a verse los primeros o los últimos respectivamente, sin salto visible y en ambos sentidos

#### Scenario: Sin JavaScript o con movimiento reducido

- **WHEN** el módulo de animación no se ejecuta o el visitante prefiere movimiento reducido
- **THEN** la tira se muestra estática en su posición inicial, el scroll no la mueve automáticamente y, con movimiento reducido, las flechas la navegan sin animación automática

### Requirement: Transición reversible del fondo

El fondo de la Galería SHALL fundirse del blanco al negro en aproximadamente un segundo cuando la sección alcanza aproximadamente el 50 % de entrada en pantalla y SHALL volver al blanco al abandonarla, en ambos sentidos de scroll. El fondo por defecto SHALL ser blanco —también sin JavaScript o con movimiento reducido— y el negro solo SHALL existir durante el fundido animado. El punto exacto de disparo queda pendiente de ajuste con la revisión visual del responsable.

#### Scenario: Fondo por defecto

- **WHEN** la portada carga y el visitante se acerca a la Galería por scroll
- **THEN** el fondo de la Galería permanece blanco hasta el disparo del fundido, sin negro previo

#### Scenario: Entrada a la sección

- **WHEN** la Galería cubre aproximadamente el 50 % del viewport durante el scroll de entrada
- **THEN** el fondo funde de blanco a negro en ~1 s

#### Scenario: Salida de la sección

- **WHEN** el visitante continúa o deshace el scroll hasta que la Galería deja de cubrir el umbral
- **THEN** el fondo vuelve al blanco en ambos sentidos, sin estados atascados

### Requirement: Reproducción contenida de los vídeos

Los vídeos de la tira SHALL reproducirse solo mientras la sección está en pantalla, silenciados, en bucle y sin capturar el foco, limitándose a los paneles cercanos al hueco visible (con margen de precarga); el resto SHALL permanecer pausado. Con movimiento reducido SHALL permanecer pausados, mostrándose el primer fotograma de los clips para que la tira estática no quede vacía.

#### Scenario: Reproducción en pantalla

- **WHEN** la Galería intersecta el viewport con movimiento normal
- **THEN** solo los paneles cercanos al hueco visible se reproducen en bucle sin audio

#### Scenario: Pausa fuera de pantalla

- **WHEN** la Galería deja de intersectar el viewport
- **THEN** la reproducción se detiene

#### Scenario: Tira estática legible

- **WHEN** el visitante prefiere movimiento reducido y la sección está en pantalla
- **THEN** los clips muestran su primer fotograma y no se reproducen automáticamente

### Requirement: Navegación de la tira

La Galería SHALL ofrecer dos controles de navegación —flecha anterior y flecha siguiente— sobre los extremos izquierdo y derecho de la tira, con la altura completa de esta y un ancho aproximado al 8 % del viewport, visibles con efecto vidrio y flecha tenue en reposo, y con fondo blanco semitransparente y flecha plena al hover o al foco. Los controles SHALL aparecer fundidos cuando la sección entra en pantalla (aproximadamente al encaje por snap) y SHALL desaparecer al salir de ella. Los controles SHALL permanecer activos en los extremos: el bucle circular del carrusel no agota el recorrido.

#### Scenario: Aparición con la sección en pantalla

- **WHEN** la Galería entra en el viewport hasta cubrir aproximadamente un cuarto del mismo
- **THEN** los controles se muestran fundidos sobre los extremos de la tira y desaparecen al salir de ella

#### Scenario: Paso adelante y atrás

- **WHEN** el visitante activa uno de los controles (clic, teclado o toque)
- **THEN** el carrusel avanza o retrocede exactamente un panel sin modificar el scroll de la página

#### Scenario: Activos en los extremos

- **WHEN** el carrusel pasa por el último o el primer panel
- **THEN** ambos controles permanecen activos y la noria continúa el recorrido

#### Scenario: Accesibilidad y degradación

- **WHEN** el módulo de animación no se ejecuta o la sección está fuera de pantalla
- **THEN** los controles no son visibles ni alcanzables por teclado, y la tira conserva su estado estático compuesto
