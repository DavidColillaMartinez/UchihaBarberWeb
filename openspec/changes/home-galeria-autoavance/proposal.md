## Why

Tras la reversión de las rondas 5-6 (relevo `SES-028`, que devolvió la Galería a la ronda 4 validada por el fallo de funcionamiento del scroll), el responsable recupera solo la parte que sí era válida de aquel trabajo: el avance automático de la tira cada 2 s con las mismas instrucciones (un panel por tic, solo con la sección encuadrada, reinicio del contador con las flechas, sin movimiento con movimiento reducido). La propuesta de aumentar la altura del carrusel (55 svh en escritorio) se revisó en local, resultó demasiado grande y queda **descartada**: la tira mantiene su altura vigente.

## What Changes

- **Avance automático de la tira**: un panel cada ~2 s en bucle mientras la Galería está encuadrada en pantalla (umbral 25 %, el de las flechas) y con movimiento normal; la página no se mueve. Cualquier pulsación de flecha reinicia el contador. Con la pestaña oculta el tic no avanza; sin JavaScript o con movimiento reducido no existe.
- **Spec**: se añade el requisito de avance automático a los vigentes de `home-galeria`; la altura de la tira no cambia.

**Fuera de alcance y explícitamente descartado**: el encaje forzado, la altura dinámica 80/100 svh, el aumento de la altura de la tira a 55 svh y cualquier `ScrollTrigger.refresh()` dentro de callbacks (causa del fallo revertido en `SES-028`). El fundido, el snap y el desplazamiento ligado al scroll quedan como en la ronda 4.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `home-galeria`: avance automático de la tira (nuevo requisito).

## Impact

- `src/features/home/galeria/Galeria.astro`: temporizador del autoavance (encadenado, reprogramado por las flechas) y su enganche al estado de visibilidad de los controles.
- Sin cambios de CSS (la altura de la tira se mantiene) y sin tocar otras secciones.
