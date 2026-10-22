## 1. Activo del logo

- [x] 1.1 Copiar `ContenidoDemo/Logo/uchiha-barber-logo-negro.svg` al sitio (`public/logo/`, nombre estable) y verificar que la compilación lo sirve en `dist/logo/`
- [x] 1.2 Comprobar que el activo copiado conserva el `viewBox` y la geometría originales (misma relación 1,48:1) y queda declarada su condición de material suministrado

## 2. Máscara y medición

- [x] 2.1 Sustituir en `Intro.astro` los elementos de texto de la máscara por la imagen del logo dentro del grupo animado, conservando `aria-hidden`, la ausencia de foco y la estructura de la capa; retirar el CSS y los `data-*` que solo servían a las líneas de texto
- [x] 2.2 Adaptar `intro.ts`: cargar el logo como imagen de mismo origen, dibujarlo en el canvas de medición y buscar el punto de fuga por barrido de candidatos sobre la tinta (radio inscrito, preferencia por el centro del logotipo) en lugar de las posiciones de glifos
- [x] 2.3 Fijar el tamaño inicial del logotipo (referencia ≈12 % del ancho, centrado y sin deformar) y calcular la escala de cobertura como hasta ahora, conservando duración, espera de arranque, 24 fps, desenfoque, cobertura total sin fundido y fundido de rescate
- [x] 2.4 Conservar sin cambios el script previo al primer pintado, la omisión con movimiento reducido, la salida de seguridad y el bloqueo de scroll, y verificar que la capa cubre la barra de inicio sin depender de la cabecera (que ya no muestra titular ni acceso)
- [x] 2.5 Corregir el arranque: la imagen de la máscara se declara con geometría inicial cero para que SVG2 no pinte el logo con su tamaño intrínseco en la esquina antes de medirlo (comprobación: salida generada con `width="0" height="0"` y diagnóstico sin errores)

## 3. Verificación

- [x] 3.1 Compilación y diagnóstico sin errores propios (`npx astro build`; `astro check` con los avisos ajenos ya conocidos) y formato aplicado en los archivos tocados
- [x] 3.2 Revisar la salida generada: logo servido desde el propio origen, máscara con la imagen, página de productos sin cruce, y comportamiento sin JavaScript y con movimiento reducido sin bloqueo
- [x] 3.3 Presentar la revisión visual al responsable (arranque en negro sin ninguna forma de logo fuera de la máscara, crecimiento centrado, paso a través del logotipo y final sin restos) y registrar su aceptación o los ajustes pedidos, sin darla por hecha

## 4. Cierre documental

- [x] 4.1 Verificar las specs afectadas: `home-cabecera` ya quedó reconciliada por el cambio archivado del nav, así que este cambio no añade delta suya y la retirada redundante se comprobó; la delta de `home-intro` se ha fusionado con lo ya sincronizado (barra y accesos disponibles), conservando todos sus escenarios (comprobación: `openspec validate --strict` y comparación requisito a requisito)
- [x] 4.2 Sincronizar las specs y archivar el cambio según la CLI, cuando las tareas y la aceptación estén cerradas
- [x] 4.3 Actualizar memoria (estado, mapa si procede, relevo y registro del bloque afectado), revisar la coherencia documental y dejar `memoria:scan` y `memoria:check` vigentes
