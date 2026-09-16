## Purpose

Define la composición y el contenido de la cabecera de inicio —vídeo de fondo tratado, nombre y acceso a reservas— y la adopción de las tipografías propias que la web sirve desde su propio origen.

## ADDED Requirements

### Requirement: Cabecera a viewport completo

La cabecera de inicio SHALL ocupar al menos la altura del viewport y SHALL mostrar el nombre del negocio y el acceso a reservas sobre un vídeo de fondo en blanco y negro con desenfoque. El material audiovisual SHALL declararse como demo mientras no sea el definitivo y MUST NOT inventarse contenido, precios ni recursos.

#### Scenario: Carga de la portada

- **WHEN** se solicita la portada en una compilación válida
- **THEN** la cabecera ocupa al menos la altura del viewport con el nombre y el acceso visibles

#### Scenario: Tratamiento del vídeo de fondo

- **WHEN** se revisa la cabecera
- **THEN** el vídeo de fondo se muestra en blanco y negro con desenfoque y su condición de material demo queda declarada en el código

#### Scenario: Acceso a reservas

- **WHEN** el visitante activa «Pedir cita»
- **THEN** se abre el sistema externo de reservas confirmado en la documentación de producto

#### Scenario: Movimiento reducido

- **WHEN** el visitante prefiere movimiento reducido
- **THEN** el vídeo de fondo no se reproduce automáticamente y permanece pausado

### Requirement: Tipografías propias autoalojadas

La web SHALL servir sus tipografías desde su propio origen, sin depender de servicios de terceros, mediante subconjuntos optimizados y tokens compartidos para titulares y para textos de interfaz. La familia provisional SHALL conservarse como respaldo mientras la definitiva no esté aprobada.

#### Scenario: Sin dependencia externa

- **WHEN** se carga la portada
- **THEN** las tipografías se solicitan al propio sitio y no a un servicio externo

#### Scenario: Reparto por elemento

- **WHEN** una sección aplica un token tipográfico
- **THEN** puede usar la familia de titulares o la de interfaz con independencia del resto de secciones

#### Scenario: Familia provisional

- **WHEN** la familia definitiva todavía no está aprobada por el cliente
- **THEN** la composición se mantiene con la provisional como respaldo sin depender de decisiones pendientes
