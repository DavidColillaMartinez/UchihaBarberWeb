## Why

Al entrar en la portada o al actualizarla, la navegación fija de secciones aparece durante un instante sobre la cabecera, justo antes de que se cargue la máscara del logo y se vea el vídeo. La navegación solo se oculta desde JavaScript (`gsap.set(nav, { autoAlpha: 0 })` en el script del componente), que se ejecuta después del primer pintado: hasta entonces el nav ya está en pantalla. Además, su apilamiento (`z-index: 100`) está por encima de la capa del cruce (`60`), de modo que puede pintarse sobre la máscara negra. El requisito vigente de `site-navigation` ya exige que en la portada la barra de inicio sustituya a la navegación fija, así que el comportamiento observado incumple la spec aprobada.

Fase del roadmap: UB-004 (bloque de navegación, mantenimiento sobre la portada). Alcance autorizado: el arranque de la navegación fija en la portada y su relación con el cruce de entrada. Fuera de alcance: la composición, el comportamiento de scroll y los estilos aprobados de la navegación y de la barra de inicio; el cruce de entrada; el resto de secciones.

## What Changes

- La navegación fija de la portada queda oculta desde el primer pintado, mediante CSS y una marca previa que la deja marcada antes de que se pinte nada.
- El script de la navegación retira esa marca en cuanto toma el control (GSAP) y mantiene el comportamiento vigente: oculta en lo alto de la portada, tira negra al reaparecer.
- Si el script de la navegación no llegara a ejecutarse, un plazo de seguridad libera la marca y la navegación vuelve a estar disponible: nunca queda inaccesible.
- Sin JavaScript la navegación se mantiene visible (degradación segura vigente) y en páginas distintas de la portada no cambia nada.
- Sin cambios visuales en la navegación, en la barra de inicio, en la cabecera ni en el cruce de entrada.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `site-navigation`: el requisito «Navegación fija como tira negra» incorpora que, en la portada, la navegación fija no debe ser visible en ningún fotograma del arranque, ni sobre la cabecera ni sobre la capa del cruce, hasta que su propio script asuma el control.

## Impact

- `src/layouts/BaseLayout.astro`: marca previa al primer pintado (estado inicial de la navegación) y plazo de seguridad.
- `src/components/navigation/SiteNav.module.css`: estado inicial invisible de la navegación en la portada.
- `src/components/navigation/SiteNav.astro`: retirada de la marca cuando GSAP asume el control.
- `openspec/specs/site-navigation/spec.md`: requisito actualizado al consolidar el cambio.
- Sin dependencias nuevas, sin cambios de servidor ni de despliegue.
