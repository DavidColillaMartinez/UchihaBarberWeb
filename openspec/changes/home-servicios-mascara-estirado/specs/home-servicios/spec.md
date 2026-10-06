## MODIFIED Requirements

### Requirement: Composición y transformación de Servicios

La sección SHALL identificar sus servicios mediante un encabezado accesible y SHALL mostrar la palabra visual como texto real en la tipografía de identidad del sitio, con el vídeo fundido sobre las letras (visible solo dentro de ellas). En escritorio con movimiento permitido, el título SHALL comenzar a gran escala y transformarse hacia la mitad izquierda mientras la lista aparece en la derecha, de forma progresiva con el scroll. En el estado compuesto la palabra SHALL conservar el ancho de su columna y la tinta de sus letras SHALL ocupar exactamente el alto del listado, calculado en tiempo de ejecución con las métricas reales de la fuente; el factor `--factor-tinta` permite ajustar ese alto. El estado compuesto SHALL mantenerse utilizable sin esa animación.

#### Scenario: Recorrido de escritorio

- **WHEN** la sección atraviesa el tramo de transformación acordado (actualmente `top 50%` a `top 0%`)
- **THEN** el título se reduce en ancho y la lista aparece en la mitad derecha sin fijar el scroll de la página

#### Scenario: Estado pausado con la lista mostrada

- **WHEN** la transformación termina y la sección queda compuesta
- **THEN** la palabra mantiene el ancho de su columna y la tinta de sus letras va de borde superior a inferior del listado, con el vídeo rellenándolas, sin que la lista se desplace

#### Scenario: Distinta resolución

- **WHEN** cambia el tamaño de la ventana o terminan de cargar las fuentes
- **THEN** las métricas de la tinta se recalculan y el encaje exacto con el listado se mantiene

#### Scenario: Movimiento reducido o disposición estrecha

- **WHEN** se solicita movimiento reducido o no se aplica la composición de escritorio
- **THEN** no se ejecuta la transformación de escritorio y el estado compuesto conserva el encaje mediante los valores medidos, con el listado disponible

## ADDED Requirements

### Requirement: Palabra con vídeo fundido y tipografía de identidad

La palabra SHALL ser texto real en la tipografía de identidad del sitio (General Sans, en su peso de titular). El vídeo SHALL fundirse sobre las letras de modo que solo se vea dentro de ellas y desaparezca sobre el fondo. Si el vídeo no está disponible, las letras SHALL permanecer visibles en negro.

#### Scenario: Vídeo dentro de las letras

- **WHEN** la sección se muestra en reposo, en transformación o en estado pausado
- **THEN** el vídeo se ve únicamente dentro de las letras, con el fondo limpio y las letras en la tipografía de identidad

#### Scenario: Vídeo no disponible

- **WHEN** el vídeo no carga o se pausa por preferencia de movimiento
- **THEN** la palabra sigue leyéndose como texto negro sólido
