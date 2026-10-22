## MODIFIED Requirements

### Requirement: Cruce de entrada en la portada

Al entrar en la portada, la página SHALL mostrar una capa negra con el logo de la marca como máscara negativa, de modo que el vídeo de la cabecera se vea a través de la tinta del logotipo. El logo SHALL crecer desde un tamaño diminuto hasta que una zona sólida de su propia tinta cubra la pantalla completa, momento en el que la capa se retira y la portada queda visible con el vídeo a pantalla completa y sus accesos disponibles: el encabezado accesible del negocio y «Pedir cita» en la barra y la navegación. El cruce SHALL repetirse en cada carga de la portada y MUST NOT existir en otras páginas.

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

- **WHEN** se recarga la portada o se vuelve a ella
- **THEN** el cruce vuelve a reproducirse

#### Scenario: Otras páginas

- **WHEN** se carga la página de productos
- **THEN** no existe capa de cruce ni bloqueo de scroll asociado

## ADDED Requirements

### Requirement: Fidelidad al logo suministrado

El cruce SHALL usar el logo suministrado por el responsable, mediante su variante de tinta oscura y conservando sus proporciones originales; el logotipo MUST NOT redibujarse, recolorearse ni recomponerse. El activo SHALL servirse desde el propio origen, sin servicios de terceros.

#### Scenario: Proporciones del logotipo

- **WHEN** se revisa el cruce en cualquier tamaño de ventana
- **THEN** el logo conserva su relación de aspecto original sin deformarse

#### Scenario: Activo propio

- **WHEN** se carga la portada
- **THEN** el logo se solicita al propio sitio, no a un servicio externo
