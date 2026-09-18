## 1. Navegación compartida (tira negra y hover de texto)

- [x] 1.1 En `SiteNav.astro`, retirar la lógica de tema por luminancia y el chip `data-blur`, añadir el indicador de portada para ocultar el nav en lo alto de la portada y limpiar el `<li>` vacío conservando «Pedir cita»; verificar con `npm run build` que compila sin errores.
- [x] 1.2 En `SiteNav.module.css`, aplicar la tira negra de extremo a extremo como forma visible, sustituir el hover invertido por ampliación de texto sin fondo y dar a «Pedir cita» el recuadro con borde e inversión copiado del CTA de cabecera; verificar en el navegador que el hover solo amplía y que el CTA se invierte.
- [x] 1.3 Comprobar en el navegador el comportamiento en portada (barra en lo alto, tira al reaparecer al subir) y en `/productos` (nav visible arriba con la tira), incluido el foco por teclado y `prefers-reduced-motion` sin animación; registrar el resultado.

## 2. Barra de navegación de la portada

- [x] 2.1 Crear `src/components/navigation/BarraInicio.astro` y su CSS Module: barra negra translúcida de extremo a extremo sobre el vídeo, botón de tres barritas a la izquierda con `aria-expanded`/`aria-controls`, «Pedir cita» con borde a la derecha y desplegable tipo máscara hasta el pie de la pantalla con las opciones espaciadas.
- [x] 2.2 Implementar el comportamiento del desplegable: apertura y cierre con el botón, cierre con Escape (devolviendo el foco al botón), clic fuera y al navegar; verificar con teclado y lector de pantalla que el estado se anuncia y todas las opciones son alcanzables.
- [x] 2.3 Integrar la barra en `Cabecera.astro` sobre el vídeo y verificar con `npm run build` y en el navegador que la portada muestra el vídeo a pantalla completa con la barra encima.

## 3. Cabecera de inicio

- [x] 3.1 Retirar de `Cabecera.astro` y `Cabecera.module.css` el nombre visible, el CTA y sus animaciones de entrada, dejando el `h1` con clase solo-accesible y el `aria-labelledby` de la sección; verificar en el navegador que no se ve nombre ni botón y que un lector de pantalla encuentra el encabezado.
- [x] 3.2 Ajustar el vídeo a blanco y negro a pantalla completa sin desenfoque (conservar `grayscale(1)`), respetando el `filter` del árbol si otra sesión lo cambió; verificar visualmente el tratamiento y registrar la decisión sobre el color en la revisión.

## 4. Verificación y cierre

- [x] 4.1 Ejecutar `openspec validate "nav-tira-inicio" --strict`, `npm run check` y `npm run build`, y formatear los archivos tocados; registrar la salida real de cada comando.
- [x] 4.2 Solicitar la revisión visual del responsable (escritorio) de nav, barra, desplegable y cabecera, y registrar en el relevo los valores que confirme o ajuste (opacidad ≈80 %, factor de ampliación, interlineado) sin darlos por aprobados por defecto.
- [x] 4.3 Con la aceptación registrada y autorización expresa, archivar el cambio y consolidar las specs; actualizar `memoria/bloques.json` (bloques «navegación» y «cabecera»: specs, aceptación y pendientes) y las fuentes afectadas.
- [x] 4.4 Crear el relevo con `npm run memoria:relevo`, registrar la revisión con `memoria:revision` tras el contraste real y ejecutar `memoria:scan` y `memoria:check`; hacer commit y push solo si el responsable lo autoriza en ese momento.
