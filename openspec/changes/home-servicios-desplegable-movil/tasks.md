## 1. Fila con dos controles

- [x] 1.1 Sustituir el enlace unico de la fila por: enlace de escritorio (`BookingLink` cubriendo la fila con nombre accesible), boton desplegable de movil con `aria-expanded`/`aria-labelledby`/`aria-controls` y «Reserva ya» como `BookingLink` propio; verificar en el HTML compilado la presencia de los tres y que el boton es `type="button"`
- [x] 1.2 Ordenar las capas de la fila: contenido visible bajo el control activo y «Reserva ya» encima con `visibility` oculta al plegarse; verificar en el CSS compilado los `z-index` (contenido 1, controles 2, llamada 3) y `visibility:hidden` base

## 2. Despliegue movil y conservacion de escritorio

- [x] 2.1 Mover las reglas de despliegue a bloques espejados: `min-width: 48rem` (hover + `:has(:focus-visible)`) y `max-width: 48rem` (`[data-abierta]` + `:has(:focus-visible)`); verificar en el CSS compilado que el hover no aplica bajo 48rem
- [x] 2.2 Script del acordeon: marcar `data-abierta`, sincronizar `aria-expanded`, cerrar el resto de filas y limpiar el estado al cambiar de breakpoint; verificar en navegador
- [x] 2.3 Heredar el color de «Reserva ya» de la fila para evitar el azul de enlace del navegador; verificar `color` computado blanco con la fila abierta

## 3. Verificacion del cambio

- [x] 3.1 En movil (390x844, Firefox headless): primer toque despliega sin navegar (URL local), «Reserva ya» abre yeasy.io en pestaña nueva, segundo toque contrae y abrir otra fila cierra la anterior; capturas en `/tmp/opencode/shots/`
- [x] 3.2 En escritorio (1440x900): hover despliega y el boton movil queda `display: none` fuera del tabulado
- [x] 3.3 `npm run build` (check incluido), Prettier en lo tocado, detector Impeccable y `openspec validate home-servicios-desplegable-movil` sin hallazgos

## 4. Cierre

- [ ] 4.1 Aceptacion visual del responsable en movil real; tras aceptar, archivar el cambio para consolidar el delta en `openspec/specs/home-servicios/spec.md`
- [x] 4.2 Relevo de memoria con la evidencia y `memoria:scan`/`memoria:check` vigentes
