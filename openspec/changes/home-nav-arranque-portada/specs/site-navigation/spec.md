## MODIFIED Requirements

### Requirement: Navegación fija como tira negra

La navegación SHALL permanecer fija en la parte superior de la pantalla, de extremo a extremo y por encima del contenido. Cuando reaparece con el scroll hacia arriba SHALL mostrarse como una tira de fondo negro con las opciones legibles sobre ella, sin depender de la fusión con el fondo ni de la inversión de color por sección. En la portada, mientras la barra de inicio está a la vista, la navegación fija MUST NOT mostrarse: la barra la sustituye en lo alto del vídeo. Desde el arranque de la portada, la navegación fija MUST NOT ser visible en ningún fotograma anterior a que su propio control asuma la gestión de su visibilidad: no puede aparecer sobre la cabecera ni sobre la capa del cruce de entrada. Sin JavaScript la navegación fija de la portada SHALL seguir siendo visible y utilizable. Si su control no llega a ejecutarse, la navegación SHALL volver a estar disponible en unos segundos para no dejar la portada sin navegación.

#### Scenario: Nav sobre fondo claro

- **WHEN** la navegación reaparece sobre una sección de fondo blanco
- **THEN** se percibe como una tira negra de extremo a extremo con las opciones legibles, sin texto fusionado sin fondo

#### Scenario: Nav sobre fondo oscuro o vídeo

- **WHEN** la navegación reaparece sobre una sección oscura o sobre vídeo
- **THEN** la tira negra se percibe igual y las opciones permanecen legibles sin depender de la inversión del fondo

#### Scenario: Portada en lo alto

- **WHEN** la portada está en su parte superior con la barra de inicio a la vista
- **THEN** la navegación fija no aparece y es la barra la que ofrece las opciones

#### Scenario: Arranque de la portada

- **WHEN** se entra en la portada o se actualiza
- **THEN** la navegación fija no aparece en ningún fotograma del arranque, ni sobre la cabecera ni sobre la capa del cruce de entrada, y en lo alto solo se ve la barra de inicio

#### Scenario: Arranque sin control de la navegación

- **WHEN** el control de la navegación no llega a ejecutarse tras cargar la portada
- **THEN** en unos segundos la navegación fija vuelve a estar visible y utilizable en lo alto

#### Scenario: Portada sin JavaScript

- **WHEN** el navegador no ejecuta scripts
- **THEN** la navegación fija de la portada es visible y utilizable
