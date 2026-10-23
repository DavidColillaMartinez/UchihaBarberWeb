## 1. Herramientas y documentación del cambio

- [x] 1.1 Actualizar la skill de Impeccable a la última versión (`npx impeccable update`) y verificar que el proyecto sigue intacto. Comprobado: 2 skills actualizadas a v4.7.0 y ninguna modification en `src/` ni en `PRODUCT.md`.
- [x] 1.2 Crear el cambio OpenSpec `home-acceso-productos` con la CLI (`openspec new change`) y redactar propuesta, requisitos, diseño técnico y estas tareas. Comprobado: `openspec validate home-acceso-productos` válido.
- [x] 1.3 Registrar en el diseño técnico la procedencia de la imagen de referencia (inspiración de composición, no plantilla) y la de las skills aplicadas (frontend-design, accessibility, astro, seo, Impeccable). Comprobado: sección «Context» de `design.md`.

## 2. Composición y contenido

- [x] 2.1 Sustituir el contenido provisional del bloque por la composición dirigida: columna de contenido a la izquierda (~40 %) con el titular vertical, la descripción y la llamada, y la escena de vídeo a la derecha (~60 %) a sangre. Comprobado: el bloque ocupa exactamente la altura del viewport en 1920×1080, 1440×900 y 1280×720.
- [x] 2.2 Implementar el titular vertical de abajo hacia arriba como texto real, con General Sans Bold y sin deformar las letras. Comprobado: el `h2` contiene el texto «Productos» en el DOM, la palabra se lee de abajo hacia arriba y el coeficiente de avance medido (6,4667) queda documentado en el CSS.
- [x] 2.3 Redactar el texto demo de la descripción con el tono de la marca y registrar su carácter provisional en la documentación del proyecto. Comprobado: la descripción está presente, es legible y su carácter demo queda anotado en `PRODUCT.md`, `memoria/bloques.json` y el relevo de la sección.
- [x] 2.4 Implementar la llamada «Conócelos» con el tratamiento de la navegación (recuadro sin relleno que se invierte) y destino `/productos`. Comprobado: el enlace navega a la página del catálogo y es alcanzable por teclado.

## 3. Vídeo y control del movimiento

- [x] 3.1 Incorporar el clip demo con el mismo tratamiento audiovisual del sitio (blanco y negro) y generar su cartel. Comprobado: el clip se reproduce en bucle y sin sonido cuando el bloque está a la vista, y se pausa al salir.
- [x] 3.2 Implementar el control de pausa y reproducción accesible, con el nombre actualizado según el estado y el foco visible en blanco. Comprobado: el botón alterna entre «Pausar el vídeo» y «Reproducir el vídeo» y el anillo de foco se ve sobre el fondo negro.
- [x] 3.3 Respetar la preferencia de movimiento reducido y la ausencia de JavaScript: el vídeo no se reproduce solo y el control inactivo no se muestra. Comprobado: con `prefers-reduced-motion: reduce` el vídeo queda pausado en su cartel; sin JavaScript se mantiene el cartel y no aparece el botón.

## 4. Verificación

- [x] 4.1 Ejecutar `npm run build` (incluye `astro check`) sin errores ni avisos, y confirmar que el bloque no altera el render de las demás secciones de la portada. Comprobado: compilación correcta y revisión visual de las secciones vecinas sin cambios.
- [x] 4.2 Formatear los archivos tocados con Prettier y ejecutar el detector mecánico de Impeccable sobre la sección. Comprobado: `prettier --check` correcto y detector sin hallazgos.
- [x] 4.3 Revisar el bloque con teclado, con zoom y con movimiento reducido, y comprobar el enlace al catálogo. Comprobado: recorrido con teclado con foco visible y ordenado, enlace resoluble, sin pérdida de contenido al ampliar.

## 5. Cierre documental

- [x] 5.1 Actualizar `PRODUCT.md` con el estado de la sección (composición aceptada pendiente de aprobación visual, material y texto demo) y `memoria/bloques.json` con las rutas, las specs y los pendientes del bloque. Comprobado: la sección figura en el bloque `acceso-productos` con su estado real.
- [x] 5.2 Actualizar `memoria/mapa.md` y `memoria/estado.json` con la sección ya desarrollada y el relevo correspondiente. Comprobado: el mapa distingue lo implementado de lo pendiente y el estado apunta al relevo real.
- [x] 5.3 Crear el relevo con `npm run memoria:relevo`, registrar la revisión real con `npm run memoria:revision` y cerrar con `npm run memoria:scan` y `npm run memoria:check`. Comprobado: check vigente al terminar.
