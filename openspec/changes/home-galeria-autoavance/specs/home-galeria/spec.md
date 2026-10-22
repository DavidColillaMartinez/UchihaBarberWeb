## ADDED Requirements

### Requirement: Avance automático de la tira

La tira SHALL avanzar automáticamente un panel cada ~2 segundos en bucle mientras la Galería está encuadrada en pantalla (mismo umbral de aparición que los controles), sin modificar el scroll de la página. Cualquier activación de las flechas SHALL reiniciar el contador del avance automático. El avance SHALL detenerse al salir la sección de pantalla o con la pestaña oculta, y MUST NOT existir sin JavaScript ni con movimiento reducido.

#### Scenario: Avance periódico

- **WHEN** la Galería está encuadrada en pantalla con movimiento normal y sin interacción
- **THEN** la tira avanza un panel en bucle cada ~2 s sin que la página cambie de posición

#### Scenario: Reinicio con las flechas

- **WHEN** el visitante activa una de las flechas
- **THEN** el carrusel se mueve un panel y el contador del avance automático vuelve a empezar su cuenta de ~2 s

#### Scenario: Pausa fuera de pantalla

- **WHEN** la sección deja de estar encuadrada en pantalla o la pestaña queda oculta
- **THEN** el avance automático se detiene y, al volver, se reprograma desde cero

#### Scenario: Movimiento reducido o sin JavaScript

- **WHEN** el visitante prefiere movimiento reducido o el módulo de animación no se ejecuta
- **THEN** la tira no avanza automáticamente y permanece navegable solo con las flechas
