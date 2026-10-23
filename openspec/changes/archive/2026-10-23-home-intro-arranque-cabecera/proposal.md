## Why

Al recargar la portada, el navegador puede restaurar la sección donde estaba el visitante o saltar a un ancla de la URL. El cruce de entrada descubre el vídeo de la cabecera, así que la máscara acaba apareciendo sobre otra sección y no cumple su función. La vista previa pública llegó a servir la versión anterior de la intro; el despliegue actual ya incluye el logo, pero el arranque debe ser determinista en cualquier navegador.

## What Changes

- La portada con cruce desactiva la restauración automática de scroll antes del primer pintado.
- La página se mantiene en la cabecera mientras el cruce está pendiente, incluidas las recargas desde otra sección, las recargas con ancla, `pageshow` y `load`.
- El script del cruce reafirma la cabecera antes de medir y durante el cruce; si el logo no carga, la página se libera situada arriba.
- Sin cambios visuales en el cruce, en la cabecera ni en otras páginas.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `home-intro`: el requisito «Cruce de entrada en la portada» exige que la recarga arranque en la cabecera y que un ancla de la URL no desplace la vista durante el cruce.

## Impact

- `src/layouts/BaseLayout.astro`: marca previa al pintado y control de la posición inicial.
- `src/features/home/intro/intro.ts`: reafirmación de la cabecera antes y durante el cruce.
- `openspec/specs/home-intro/spec.md`: requisito actualizado al consolidar el cambio.
- La vista previa pública necesitará el despliegue de este cambio para validar el comportamiento; esta sesión no publica.
