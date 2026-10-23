## MODIFIED Requirements

### Requirement: Cruce de entrada en la portada

Al entrar en la portada, la página SHALL mostrar una capa negra con el logo de la marca como máscara negativa, de modo que el vídeo de la cabecera se vea a través de la tinta del logotipo. El logo SHALL crecer desde un tamaño diminuto hasta que una zona sólida de su propia tinta cubra la pantalla completa, momento en el que la capa se retira y la portada queda visible con el vídeo a pantalla completa y sus accesos disponibles: el encabezado accesible del negocio y «Pedir cita» en la barra y la navegación. El cruce SHALL repetirse en cada carga de la portada y MUST NOT existir en otras páginas. Al recargarse la portada, la página SHALL arrancar en la cabecera, con independencia de la sección visible antes de la recarga o del ancla de la URL, de modo que el cruce se reproduzca siempre sobre el vídeo de la cabecera.

#### Scenario: Entrada nueva en la portada

- **WHEN** se carga la portada
- **THEN** el cruce se reproduce desde el logo diminuto hasta que una zona sólida de su tinta cubre la pantalla completa

#### Scenario: Arranque limpio

- **WHEN** el cruce arranca
- **THEN** solo es visible la capa negra con el logotipo centrado, sin ninguna forma del logo fuera de la máscara ni en otra posición

#### Scenario: Final sin restos de negro

- **WHEN** el cruce termina
- **THEN** la pantalla queda enteramente ocupada por el vídeo de la cabecera, sin restos de negro ni desvanecimiento posterior, con la barra disponible sobre el vídeo

#### Scenario: Recarga de la portada

- **WHEN** se recarga la portada, incluso desde otra sección
- **THEN** el cruce vuelve a reproducirse con la página situada en la cabecera

#### Scenario: Recarga con ancla

- **WHEN** se recarga una URL de la portada que incluye un ancla de sección
- **THEN** la página arranca en la cabecera y el ancla no desplaza la vista durante el cruce

#### Scenario: Otras páginas

- **WHEN** se carga la página de productos
- **THEN** no existe capa de cruce ni bloqueo de scroll asociado
