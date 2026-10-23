## Why

El responsable pidió que todos los vídeos de la web arranquen solos, porque en móvil había que darle a reproducir para que empezara el vídeo (comprobación real en el bloque de acceso a Productos). En el código de ese bloque la petición de reproducción va pegada a la carga del recurso: en iOS puede abortar y el catch silencioso no reintenta, dejando el vídeo pausado con solo el botón «Reproducir el vídeo». Además, la pauta de reproducción vive repartida por secciones sin una capacidad transversal que la fije.

## What Changes

- Nueva capacidad transversal `video-reproduccion`: todo vídeo de la web SHALL empezar a reproducirse por sí solo, sin que el visitante deba activarlo; silenciado, en bucle y en línea; la pausa por visibilidad queda permitida; con movimiento reducido SHALL permanecer pausado salvo acción explícita.
- `home-cabecera`: se deja explícito en el requisito de la cabecera que el vídeo de fondo arranca solo con movimiento normal (hoy solo está implícito en la implementación; su escenario de movimiento reducido no lo declara).
- Ajuste del vídeo del bloque de acceso a Productos: marca nativa `autoplay` (mismo patrón que cabecera y Servicios, con retirada de la marca y pausa con movimiento reducido) y reintento de `play()` cuando el arranque aborta por ir pegado a la carga.
- El delta de `home-acceso-productos` (cambio en curso, pendiente de aceptación) se ajusta en su pauta de arranque y en su escenario «Sin JavaScript», atravesado por la nueva instrucción transversal.
- No se añaden dependencias; el resto de secciones no cambia.

## Capabilities

### New Capabilities

- `video-reproduccion`: pauta de reproducción de los vídeos de la web: inicio autónomo sin acción del visitante, silencio, bucle y reproducción en línea en móvil, con pausa por visibilidad permitida y movimiento reducido pausado.

### Modified Capabilities

- `home-cabecera`: el requisito «Cabecera a viewport completo» pasa a contemplar el arranque autónomo del vídeo de fondo con movimiento normal.

## Impact

- Código: `src/features/home/acceso-productos/AccesoProductos.astro` (marca nativa y comentario) y `src/features/home/acceso-productos/acceso-productos.ts` (reintento y movimiento reducido).
- Cabecera y Servicios ya cumplen la pauta con la marca nativa; la Galería cumple su spec vigente de reproducción contenida (los paneles cercanos arrancan solos al entrar la sección) y conserva `preload="none"` por los 24 elementos de la tira, así que no lleva la marca a sangre.
- Especs: nueva `openspec/specs/video-reproduccion/spec.md`; delta de `home-cabecera`; adición documental en el delta abierto de `home-acceso-productos`.
- Coste de datos en móvil: el vídeo del acceso a Productos carga al abrir la portada aunque su bloque esté fuera de pantalla, hasta que la pausa por visibilidad lo detiene; aceptado por el alcance de este turno (material demo).
- El arranque con autoplay puede bloquearlo igualmente el ahorro de datos o el modo de bajo consumo del terminal; esos límites no dependen de la implementación.
