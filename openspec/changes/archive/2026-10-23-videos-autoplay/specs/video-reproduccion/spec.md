## Purpose

Fija la pauta transversal de reproducción de los vídeos de la web: todos arrancan por sí solos, sin que el visitante deba activarlos, silenciados, en bucle y en línea, con pausa por visibilidad permitida y pausa con movimiento reducido.

## ADDED Requirements

### Requirement: Inicio de la reproducción sin acción del visitante

Todo vídeo de la web SHALL empezar a reproducirse por sí solo, sin que el visitante deba pulsar ningún control de reproducción. Los vídeo singulares de una sección SHALL declararlo de forma nativa —autoplay con silencio, bucle y reproducción en línea— y la pausa y reanudación por visibilidad SHALL conservar ese inicio autónomo: un vídeo detenido por salir de la vista SHALL reanudarse solo al volver a estar cerca de ella. Los grupos de vídeo gestionados por la visibilidad de su sección, por su número y coste de datos, SHALL iniciar de forma automática los paneles cercanos al área visible en cuanto la sección entra en pantalla, sin acción del visitante y sin cargar la tira completa.

#### Scenario: Arranque de un vídeo singular

- **WHEN** la sección con un vídeo propio entra en el recorrido de la página con movimiento normal
- **THEN** el vídeo se reproduce por sí solo, sin que el visitante active la reproducción

#### Scenario: Reanudación tras la pausa por visibilidad

- **WHEN** un vídeo que quedó pausado por salir de la vista vuelve a estar a la vista o muy cerca de ella
- **THEN** se reanuda solo, sin que el visitante haga nada

#### Scenario: Grupos gestionados por visibilidad

- **WHEN** la sección con un grupo de vídeos gestionado entra en pantalla
- **THEN** los paneles cercanos al área visible arrancan solos y el resto del grupo no se carga ni se reproduce

### Requirement: Silencio, bucle y reproducción en línea

Todo vídeo SHALL reproducirse sin sonido, en bucle y en línea, sin pantalla completa automática en móvil. La reproducción de la web no SHALL emitir audio propio ni interrumpir la reproducción del visitante con recursos de audio.

#### Scenario: Sin sonido

- **WHEN** cualquier vídeo de la web se reproduce
- **THEN** no emite audio

#### Scenario: En línea en móvil

- **WHEN** un vídeo se reproduce en un dispositivo móvil
- **THEN** lo hace en línea dentro de su composición y no abre la pantalla completa por sí solo

### Requirement: Movimiento reducido de los vídeos

Con la preferencia de movimiento reducido activada, los vídeos SHALL permanecer pausados al cargar y al recorrer la página, mostrando su fotograma inicial o su cartel, y SHALL reproducirse solo mediante una acción explícita del visitante en un control que la sección ofrezca para ello. Este requisito cubre tanto el arranque de la página como las reanudaciones por visibilidad.

#### Scenario: Carga con movimiento reducido

- **WHEN** la página carga con la preferencia de movimiento reducido activada
- **THEN** los vídeos permanecen pausados mostrando su fotograma inicial o su cartel, aunque la sección esté a la vista

#### Scenario: Acción explícita del visitante

- **WHEN** para una sección que ofrece control de reproducción el visitante pide iniciar un vídeo con movimiento reducido activado
- **THEN** ese vídeo se reproduce a partir de la acción del visitante
