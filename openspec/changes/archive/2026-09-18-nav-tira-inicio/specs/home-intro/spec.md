## MODIFIED Requirements

### Requirement: Cruce de entrada en la portada

Al entrar en la portada, la página SHALL mostrar una capa negra con el nombre del negocio como máscara negativa, de modo que el vídeo de la cabecera se vea a través de sus letras. El texto SHALL crecer desde un tamaño diminuto hasta que el hueco de una de sus letras cubra la pantalla completa, momento en el que la portada SHALL aparecer con el vídeo a pantalla completa y sus accesos disponibles: el encabezado accesible del negocio y «Pedir cita» en la barra y la navegación. El cruce SHALL repetirse en cada carga de la portada y MUST NOT existir en otras páginas.

#### Scenario: Entrada nueva en la portada

- **WHEN** se carga la portada
- **THEN** el cruce se reproduce desde el texto diminuto hasta que el hueco de una letra cubre la pantalla completa

#### Scenario: Final sin restos de negro

- **WHEN** el cruce termina
- **THEN** la pantalla queda enteramente ocupada por el vídeo de la cabecera, sin restos de negro ni desvanecimiento posterior, con la barra disponible sobre el vídeo

#### Scenario: Recarga de la portada

- **WHEN** se recarga la portada o se vuelve a ella
- **THEN** el cruce vuelve a reproducirse

#### Scenario: Otras páginas

- **WHEN** se carga la página de productos
- **THEN** no existe capa de cruce ni bloqueo de scroll asociado
