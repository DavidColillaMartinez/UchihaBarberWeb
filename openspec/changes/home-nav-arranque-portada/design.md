## Context

Estado actual relevante para el enfoque (motivación en `proposal.md`):

- La navegación fija se oculta solo desde JavaScript: `src/components/navigation/SiteNav.astro` ejecuta `gsap.set(nav, { autoAlpha: 0 })` cuando la página es la portada. Ese `<script>` de componente se compila como módulo diferido, así que se ejecuta **después** del primer pintado: hay fotogramas en los que el nav ya está en pantalla.
- El requisito vigente de `site-navigation` («Navegación fija como tira negra») ya exige que en la portada la navegación fija no se muestre mientras la barra de inicio está a la vista.
- `src/layouts/BaseLayout.astro` ya incluye un script en línea que se ejecuta antes del primer pintado en la portada (marca `data-intro="pendiente"`, restauración manual del scroll y salida de seguridad a los 5 s). Es el punto natural para fijar el estado inicial de la navegación.
- El aislamiento por sección obliga a que el estado inicial de la navegación viva en su CSS Module (`SiteNav.module.css`), no en estilos globales.
- La intro es una capa fija a pantalla completa (`Intro.module.css`, `z-index: 60`); la navegación fija está por encima (`z-index: 100`).

## Goals / Non-Goals

**Goals:**

- Que la navegación fija de la portada no sea visible en ningún fotograma del arranque, con cualquier velocidad de red y con o sin movimiento reducido.
- Mantener intacto el comportamiento aprobado de la navegación: oculta en lo alto de la portada, tira negra al reaparecer al subir, degradación segura sin JavaScript.
- No tocar la composición ni el comportamiento de ninguna sección.

**Non-Goals:**

- Cambiar el apilamiento de la intro, de la barra de inicio o de la navegación.
- Modificar el cruce de entrada, la cabecera o el resto de secciones.
- Añadir dependencias, alterar el despliegue o tocar el proceso de publicación.

## Decisions

### 1. Ocultar desde CSS antes del primer pintado, no solo desde JavaScript

El defecto es inherente a ocultar con JS: el estado inicial visible existe hasta que el script se ejecuta. La corrección invierte la dependencia: el estado inicial (oculto en la portada) se declara en CSS y el JavaScript pasa a ser quien _muestra_ la navegación cuando corresponde.

- **Alternativa descartada (a): subir el `z-index` de la intro por encima del nav.** No elimina los fotogramas previos a que la intro exista y altera el apilamiento aprobado (afectaría al enlace de salto). Además, con movimiento reducido no hay capa de intro y el nav seguiría apareciendo.
- **Alternativa descartada (b): ocultar el nav por defecto en CSS solo en la portada**, sin marca previa. Rompe la degradación sin JavaScript (el nav quedaría inaccesible para quien no tiene scripts) y, si GSAP fallara, ocultaría el nav de forma permanente.
- **Alternativa descartada (c): patrón `html.js`**. Mismo problema de fallo permanente que (b) y añade una clase global que debe gobernarse desde estilos globales.

### 2. Marca previa en `<html>` + regla en el CSS Module de la navegación

El script en línea de `BaseLayout.astro` (bloqueante de renderizado, se ejecuta antes de cualquier pintado) marca `<html data-nav-portada="oculto">` cuando la página es la portada. `SiteNav.module.css` traduce esa marca a una regla que oculta la navegación; el script de la navegación borra la marca en cuanto GSAP asume el control.

- La marca se pone **antes** de la salida temprana por movimiento reducido, para que ese camino también arranque sin destello.
- Solo se aplica a la portada: el script en línea ya retorna de inmediato en las páginas sin cruce.
- Se elige el atributo sobre una clase para no depender de estilos globales.

### 3. GSAP como dueño de la visibilidad a partir de ese momento

GSAP escribe `opacity`/`visibility` en línea, que prevailecen sobre la regla del CSS Module; al retirar la marca, el nav sigue oculto por esos estilos en línea (`autoAlpha: 0`). No hay conflicto de cascada ni parpadeo en el relevo entre CSS y JS.

### 4. Salida de seguridad para que la navegación nunca quede inaccesible

Si el script de la navegación no llegara a ejecutarse (fallo de red, error de módulo), un plazo de seguridad de 5 s —el mismo criterio y duration que la salida de seguridad del cruce— libera la marca y el nav vuelve a estar visible. Es la misma filosofía de degradación segura que ya exige la spec del cruce.

## Risks / Trade-offs

- **[El script de la navegación no se ejecuta]** → el nav permanecería oculto; mitigado por el plazo de seguridad de 5 s que libera la marca (verificable en el navegador).
- **[La marca depende del script en línea]** → si el navegador no ejecuta scripts, la marca no existe y el nav se mantiene visible (degradación segura); si el script se ejecuta, es bloqueante de renderizado y precede siempre al primer pintado.
- **[Encuadre con la spec de movimiento reducido]** → la spec vigente mantiene la navegación visible con `prefers-reduced-motion: reduce` «salvo en lo alto de la portada, donde manda la barra» (comportamiento ya implementado en el componente); el cambio no altera esa lógica, solo evita el destello previo.
- **[Falta de commit para trazabilidad]** → no se hace commit ni push sin autorización expresa; el cambio queda registrado en OpenSpec y en la memoria.

## Verificación prevista

- `npm run build` (incluye `astro check`) y Prettier sobre los archivos tocados.
- `openspec validate home-nav-arranque-portada --strict`.
- Navegador headless (Firefox vía geckodriver) sobre la compilación local: sonda que registra, fotograma a fotograma, la visibilidad calculada del nav durante el arranque; se compara antes y después del cambio (entrada nueva y recarga), además del estado final con la navegación correctly oculta en lo alto y visible al subir.
- Comprobación de la salida de seguridad: forzando la marca tras la carga, el nav vuelve a estar visible en unos segundos.
- `memoria:scan` y `memoria:check` tras registrar la revisión real.
