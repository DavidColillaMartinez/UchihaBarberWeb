## 1. Estado inicial de la navegación

- [x] 1.1 Marcar `<html data-nav-portada="oculto">` en el script previo al primer pintado de `src/layouts/BaseLayout.astro` (antes de la salida temprana por movimiento reducido) y comprobar en el HTML compilado que la marca aparece solo en la portada.
- [x] 1.2 Añadir en `src/components/navigation/SiteNav.module.css` la regla que mantiene oculta la navegación mientras exista la marca y verificar que se aplica al nav de la portada.
- [x] 1.3 Retirar la marca en `src/components/navigation/SiteNav.astro` en cuanto GSAP asume el control y comprobar que la navegación sigue el comportamiento aprobado (oculta en lo alto, tira negra al subir).

## 2. Degradación segura

- [x] 2.1 Añadir el plazo de seguridad que libera la marca si el control de la navegación no llega a ejecutarse y verificar en el navegador que la navegación vuelve a estar visible en unos segundos.
- [x] 2.2 Comprobar que sin JavaScript la navegación de la portada sigue visible y utilizable, y que en `/productos` no hay cambios de comportamiento.

## 3. Verificación técnica

- [x] 3.1 Ejecutar `npm run build` (`astro check` sin errores) y Prettier sobre los archivos tocados.
- [x] 3.2 Con navegador headless sobre la compilación local, registrar fotograma a fotograma la visibilidad calculada del nav durante el arranque (entrada nueva y recarga) y verificar que no aparece ni sobre la cabecera ni sobre la capa del cruce.
- [x] 3.3 Ejecutar `openspec validate home-nav-arranque-portada --strict`.

## 4. Cierre documental

- [ ] 4.1 Revisión visual del responsable en local (entrada y recarga) antes de dar el cambio por aceptado.
- [x] 4.2 Actualizar el relevo, el estado, el bloque de navegación de `memoria/bloques.json` y el mapa afectados; registrar la revisión real y ejecutar `memoria:scan` y `memoria:check`.
- [ ] 4.3 Tras la aceptación, archivar el cambio y consolidar `site-navigation` con el flujo de OpenSpec.
