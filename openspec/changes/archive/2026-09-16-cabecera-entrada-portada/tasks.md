## 1. Cabecera y tipografías

- [x] 1.1 Montar el vídeo de fondo demo (blanco y negro con desenfoque) servido desde el propio sitio, con la sustitución por el VPS documentada en el código (comprobación: `dist/videos/` y relevo `SES-007-cabecera`)
- [x] 1.2 Componer el nombre en dos líneas apiladas, alineado a la izquierda, centrado verticalmente y un 15 % menor que el primer diseño, con el acceso «Pedir cita» a la reserva confirmada (comprobación: salida generada y relevo `SES-007-cabecera`)
- [x] 1.3 Pausar el vídeo de fondo con movimiento reducido (comprobación: comportamiento del script de la cabecera, registrado en `SES-007-cabecera`)
- [x] 1.4 Instalar las tipografías propias autoalojadas (Inter 800 y Archivo 600, subconjuntos latinos) con `@font-face` y tokens compartidos en los fundamentos, conservando la provisional como respaldo (comprobación: `dist/fonts/`, `@font-face` y tokens en el CSS generado)
- [x] 1.5 Aplicar los tokens en la cabecera (titular con la familia de titulares; acceso con la de interfaz) sin tocar la navegación (comprobación: reglas generadas de `.titulo` y `.cita`)

## 2. Cruce de entrada

- [x] 2.1 Crear la capa del cruce como SVG en línea con máscara del nombre (componente, CSS Module y módulo TypeScript co-localizados), decorativa y fuera del foco (comprobación: `dist/index.html` con la capa y sin contenido anunciable)
- [x] 2.2 Calcular el punto de fuga (letra más central con hueco sólido) y la escala de cobertura total midiendo el hueco real del texto en un canvas (comprobación: constantes y recálculo en el script generado; verificación visual del cruce)
- [x] 2.3 Animar el cruce a 24 fotogramas por segundo con desenfoque de movimiento ligado a la velocidad, terminando en cobertura total sin desvanecimiento y retirando la capa del DOM (comprobación: revisión visual del final sin restos de negro, registrada el 2026-09-16)
- [x] 2.4 Marcar el cruce antes del primer pintado y solo en la portada, repetirlo en cada carga y añadir la salida de seguridad que libera la página si el módulo no se ejecuta (comprobación: atributo en `<html>` de la portada y su ausencia en `/productos`; script previo al pintado en la salida generada)
- [x] 2.5 Bloquear el scroll únicamente durante el cruce, reservando el canal de la barra para que su reaparición no desplace la composición (comprobación: reglas generadas del bloqueo y `scrollbar-gutter`)
- [x] 2.6 Diferir la entrada del titular y del acceso de la cabecera hasta que el cruce termina (comprobación: reglas generadas de la entrada diferida y revisión visual)
- [x] 2.7 Acortar el negro inicial del cruce (espera de arranque, escala inicial visible y aceleración cúbica, con el desenfoque compensado) (comprobación: constantes en el script generado y revisión visual del responsable)

## 3. Verificación y cierre

- [x] 3.1 Verificación técnica: compilación astro correcta, diagnóstico sin errores ni avisos en los archivos del cambio y formato aplicado en los archivos tocados (comprobación: `npx astro build` y `prettier --check`)
- [x] 3.2 Revisar la salida generada: la capa del cruce y las tipografías están donde corresponden y la página de productos queda sin cruce (comprobación: inspección de `dist/index.html`, `dist/productos/index.html` y el CSS generado)
- [x] 3.3 Registrar la aceptación visual del responsable (comprobación: confirmación del 2026-09-16, anotada en el relevo)
- [x] 3.4 Actualizar la memoria afectada (relevos `SES-007-cabecera` y `SES-009-intro-entrada`, estado y mapa) y dejar `memoria:check` vigente (comprobación: `npm run memoria:check`)
