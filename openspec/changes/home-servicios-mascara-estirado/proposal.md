## Why

La revisión visual del responsable reabrió Servicios (fase UB-004) con dos defectos concretos: la máscara de la palabra recorta el punto de la «i» por arriba y el sobresalto de las curvas (c/s/o) por abajo, y el estirado del estado pausado no responde a lo pedido: debe conservar el mismo ancho y hacer que las letras ocupen en alto lo mismo que la lista de servicios, con efecto de texto estirado.

## What Changes

- Máscara SVG de la palabra con margen vertical seguro: caja más alta y línea base desplazada para que el punto de la «i» y el sobresalto inferior de las curvas queden dentro (la tinta permanece visualmente igual en reposo).
- Estado pausado: el estirado vertical pasa de un factor fijo a uno **dinámico** que iguala la altura del bloque de la palabra con la altura de la lista, manteniendo el ancho; progresivo con el scroll (scrub actual).
- Fallback de movimiento reducido o sin JS: variable CSS con el cociente medido en reposo para que el estado compuesto conserve el estirado.
- Delta de la spec consolidada `home-servicios` (comportamiento observable de máscara y estado pausado).

Fuera de alcance: franja y tramo de scroll (ya ajustados y aceptados en su última revisión), vídeo y su reproducción, tipografía definitiva, enlaces por servicio, resto de secciones.

## Capabilities

### New Capabilities

<!-- Ninguna: no se introduce capacidad nueva. -->

### Modified Capabilities

- `home-servicios`: el requisito de composición y transformación pasa a exigir que el estado pausado conserve el ancho y estire el alto de la palabra hasta el alto de la lista, y se añade un requisito de máscara sin recortes para el punto de la «i» y las curvas inferiores.

## Impact

- `src/features/home/servicios/Servicios.module.css` (máscara SVG, `aspect-ratio` del bloque y transform del estado final).
- `src/features/home/servicios/Servicios.astro` (timeline de ScrollTrigger y medición para el estirado).
- `openspec/specs/home-servicios/spec.md` mediante el delta de este cambio.
- Sin dependencias nuevas; sin cambios en otras secciones ni en la página de productos.
