## Why

En movil la fila entera es un enlace a Yeasy, asi que el primer toque abandona la web sin desplegar la descripcion: no existe el equivalente tactil del despliegue de escritorio, que PRODUCT.md exige para la interaccion basada en hover.

## What Changes

- La fila deja de ser un enlace unico: en escritorio conserva el enlace completo a reservas (comportamiento aceptado) y en movil la fila se convierte en un control desplegable con estado accesible (`aria-expanded`).
- Movil: el primer toque despliega la descripcion y muestra «Reserva ya»; el toque en «Reserva ya» abre el sistema general de reservas; un segundo toque contrae la fila y abrir otro servicio cierra el anterior.
- «Reserva ya» pasa a ser el enlace compartido de reservas dentro de la fila, oculto de pestañado y toques mientras la fila esta plegada.
- La estructura visual (barrido de inversion, tipografias y precio semibold) se mantiene.

## Capabilities

### New Capabilities

### Modified Capabilities

- `home-servicios`: el requisito de filas y reservas incorpora el despliegue tactil en movil con «Reserva ya» como unico enlace activo en ese rango.

## Impact

- `src/features/home/servicios/Servicios.astro` (estructura de fila, control movil y script) y `src/features/home/servicios/Servicios.module.css` (capas de interaccion y despliegue por breakpoint).
- Sin cambios en `BookingLink` ni en otras secciones; sin datos comerciales nuevos.
