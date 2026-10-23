# home-cabecera Specification

## Purpose

Composición y contenido de la cabecera de inicio de Uchiha Barber —vídeo de fondo a pantalla completa en blanco y negro, con el nombre solo para lectores de pantalla y las reservas fuera de la cabecera— y adopción de las tipografías propias que la web sirve desde su propio origen.

## Requirements

### Requirement: Cabecera a viewport completo

La cabecera de inicio SHALL ocupar al menos la altura del viewport y SHALL mostrar el vídeo de fondo a pantalla completa en blanco y negro, sin desenfoque, sin nombre ni llamada a la acción visibles. El nombre del negocio SHALL permanecer como encabezado de nivel uno únicamente accesible para lectores de pantalla, y el acceso a reservas SHALL quedar disponible a través de la barra de la portada y la navegación, no dentro de la cabecera. El material audiovisual SHALL declararse como demo mientras no sea el definitivo y MUST NOT inventarse contenido, precios ni recursos.

#### Scenario: Carga de la portada

- **WHEN** se solicita la portada en una compilación válida
- **THEN** la cabecera ocupa al menos la altura del viewport con el vídeo a pantalla completa y sin nombre ni llamada a la acción visibles

#### Scenario: Tratamiento del vídeo de fondo

- **WHEN** se revisa la cabecera
- **THEN** el vídeo de fondo se muestra a pantalla completa en blanco y negro sin desenfoque y su condición de material demo queda declarada en el código

#### Scenario: Reproducción autónoma

- **WHEN** la portada carga con movimiento normal
- **THEN** el vídeo de fondo arranca solo, silenciado, en bucle y en línea, sin que haya que activar la reproducción

#### Scenario: Encabezado accesible

- **WHEN** un lector de pantalla recorre la portada
- **THEN** encuentra el encabezado de nivel uno con el nombre del negocio sin presencia visual sobre el vídeo

#### Scenario: Acceso a reservas

- **WHEN** el visitante activa «Pedir cita» en la barra de la portada o en la navegación
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
