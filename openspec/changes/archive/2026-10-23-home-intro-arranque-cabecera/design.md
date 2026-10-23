## Context

El cruce es una capa fija que descubre el vídeo de la cabecera. Si la página aparece desplazada a Servicios, Galería u otra sección, la máscara sigue siendo visible pero el vídeo queda fuera de la vista: el efecto pierde su sentido. El navegador puede restaurar la posición anterior al recargar y, si la URL lleva un ancla, el salto ocurre después de que el script del cruce haya empezado.

## Decisions

- **Fijar la cabecera antes del primer pintado**, en el script `is:inline` de `BaseLayout`: `history.scrollRestoration = "manual"`, `window.scrollTo(0, 0)` y recordatorio en `scroll`, `load` y `pageshow` mientras `data-intro="pendiente"`. Es el único punto suficientemente temprano para adelantarse a la restauración y al salto de ancla.
- **No tocar la restauración después del cruce**: `ScrollTrigger` (GSAP) ya gestiona `history.scrollRestoration` por su cuenta al inicializarse; el script de la intro solo lo anula antes del primer pintado y no lo devuelve a `"auto"`, para no pelearse con la librería ni alterar el comportamiento previo del botón «atrás».
- **Mantener la URL con su ancla**, sin `history.replaceState`: no se altera lo que el visitante compartió o escribió. La vista permanece en la cabecera durante el cruce; el ancla no se usa para desplazar la página en esa carga.
- **Reafirmar la cabecera desde el script del cruce** antes de medir y al arrancar la animación, porque la carga del logo es asíncrona y puede terminar después de una restauración tardía. Un `pageshow` adicional cubre la vuelta desde la caché de navegación.
- **No cambiar el cruce ni sus tiempos**: la corrección es de posición, no de composición. Movimiento reducido sigue omitiendo la intro y la salida de seguridad de 5 s sigue liberando la página.
- **No manipular la altura ni el bloqueo de scroll**: el bloqueo existente ya impide el desplazamiento del visitante durante el cruce; el nuevo control solo cubre la posición programática del navegador.

## Risks

- Un navegador que ignore `scrollRestoration` seguirá disparando el recordatorio de `scroll`; el coste es una comprobación condicionada por fotograma de scroll, sin trabajo cuando el cruce ya terminó.
- `ScrollTrigger` fija `history.scrollRestoration = "manual"` por su cuenta al cargar (verificado en el navegador): su valor manda sobre el del layout, por lo que el recordatorio de `scroll` es la garantía real del arranque en la cabecera.
- La recarga con ancla mantiene la URL con el fragmento aunque la vista quede arriba. Es una decisión explícita para no reescribir la dirección.
- La vista previa pública solo demostrará el cambio después de desplegarlo; la comprobación local se hace sobre la compilación estática.
