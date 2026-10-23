## Context

Ver `proposal.md` (Why) y el delta de `home-servicios`. Estado de partida: la fila completa es un enlace (`BookingLink`) y el despliegue solo existe en `:hover`/`:focus-visible`, así que en móvil el primer toque navega sin desplegar. La sección ya separa interacción (requisito de `home-servicios`) y el componente de reservas es la única fuente del enlace externo.

## Goals / Non-Goals

**Goals:**

- Equivalente táctil del despliegue: primer toque abre, «Reserva ya» reserva, segundo toque cierra, acordeón de una fila abierta.
- Estado accesible del despliegue (`aria-expanded`) y conservación del comportamiento de escritorio aceptado.

**Non-Goals:**

- Cambiar la estética de la fila (barrido de inversión, pesos tipográficos, precios) ni los datos.
- Enlaces por servicio: sigue la URL general confirmada.
- Tocar `BookingLink` u otras secciones.

## Decisions

- **Dos controles por fila, uno por breakpoint**: en escritorio un enlace `BookingLink` cubre la fila (comportamiento aceptado, sin cambios) y en móvil un `<button type="button">` con `aria-expanded`/`aria-labelledby`/`aria-controls` cubre la fila como control desplegable. El control ajeno a cada rango sale con `display: none`, así que no duplica tabulaciones ni contenido en el árbol de accesibilidad. El contenido visible (nombre, descripción, precio, llamada) se comparte y no es interactivo por sí mismo: vive bajo la capa del control activo. Alternativa descartada: duplicar la lista completa por breakpoint, y también mantener una sola etiqueta cambiando su rol con JS.
- **«Reserva ya» como enlace real**: pasa de decoración dentro del enlace de fila a un `BookingLink` propio con `z-index` superior al control, de modo que sea activable sobre él cuando la fila está abierta; plegada, se oculta con `visibility` (y no solo opacidad) para no robar toques ni tabulaciones. Su color hereda de la fila porque, al ser ahora un enlace, el navegador le aplicaría su azul.
- **Despliegue por capas de CSS**: las reglas de despliegue se duplican espejadas en los bloques `min-width: 48rem` (hover y `:has(:focus-visible)`) y `max-width: 48rem` (`[data-abierta]` y `:has(:focus-visible)`). El hover no se aplica en móvil para evitar el hover pegajoso del táctil, que reabriría la fila justo al contraerla.
- **Acordeón en JS mínimo**: un solo listener por control marca `data-abierta` y sincroniza `aria-expanded`, cierra el resto de filas y, al cambiar el breakpoint, el estado se limpia para que el despliegue vuelva a pilotarlo hover/foco. Sin JS, la fila no se despliega en táctil (igual que no hay hover) y el escritorio funciona igual por CSS.

## Risks / Trade-offs

- [El desplegable móvil depende de JS] → sin JS la fila sigue legible y «Reserva ya» permanece oculto; no hay contenido inaccesible.
- [Duplicación espejada de las reglas de despliegue] → se anota en ambas bloques que deben mantenerse iguales; el coste es de unas decenas de líneas frente a selectores frágiles.
- [El enlace de escritorio cubre la fila e impide seleccionar su texto] → es el comportamiento ya aceptado de la demo, sin cambio.
