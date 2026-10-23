## Context

### Corrección vigente SES-041

Por petición y confirmación del responsable, se sustituyen las concreciones visuales iniciales siguientes: descripción Regular pasa a General Sans Semibold Italic 600 con escala e interlineado de Productos, centrada verticalmente respecto al titular. El botón mantiene su altura y centra su eje bajo el hueco entre columnas (no el centro del panel). El degradado conserva negro con una fuga menor: 210°, negro 0%, gris #757575 6%, #c9c9c9 18%, #e5e5e5 100%. Una capa estática de 2.5rem cruza 1.25rem por cada lado de la junta, con centro opaco gris compartido y extremos transparentes; mezcla los fondos sin desenfocar contenido y sin editar Productos. Estas decisiones sustituyen los valores iniciales de SES-040 descritos más abajo como histórico de la primera demo. Aceptación visual pendiente.

Véase `proposal.md` para motivación y alcance. Planificado en el turno documental de UB-004 (SES-039); aplicación autorizada expresamente en SES-040. No hay autorización de commit, push ni despliegue.

La home compone sus secciones en `src/pages/index.astro`. `index.module.css` ya impone altura mínima de viewport y snap inicial; `global.css` mantiene scroll por proximidad y tokens de General Sans. Productos usa `linear-gradient(30deg, #757575 0%, #000000 42%)`, vídeo a la derecha y contenido a la izquierda. Opiniones sigue provisional. `/productos` aporta el patrón de página interna mínima con `BaseLayout`, `SiteNav` y `ProvisionalNote`.

La imagen local del cliente es una captura de Instagram con la composición girada. Su lectura horizontal sitúa la fotografía a la izquierda, y descripción, titular de cuatro líneas y llamada a la derecha. No es un recurso limpio para publicar. Los clips demo ya existen en `public/videos/`; elegir uno no convierte el material demo en material oficial de Sessions.

## Goals / Non-Goals

**Goals:**

- Extender la home dentro de su identidad, con aislamiento por sección y un destino estático válido.
- Dejar instrucciones ejecutables para composición, comportamiento, accesibilidad y verificación, diferenciando requisitos y propuestas pendientes de revisión.
- Mantener sustituibles el audiovisual, cartel, encuadre y descripción.

**Non-Goals:**

- Rehacer el sistema visual, crear un DESIGN.md global, refactorizar los vídeos de otras secciones o corregir incidencias ajenas.
- Ampliar la fase móvil de toda la web: el alcance responsive afecta a Sessions y a su página provisional.
- Interpretar tareas listas como autorización para aplicar, publicar o aceptar visualmente.

## Decisions

### 1. Arquitectura co-localizada y estática

Archivos previstos en SES-039, creados durante la aplicación SES-040:

| Ruta                                                          | Responsabilidad                                                 |
| ------------------------------------------------------------- | --------------------------------------------------------------- |
| `src/features/home/acceso-sessions/AccesoSessions.astro`      | Estructura semántica, texto, audiovisual y llamada              |
| `src/features/home/acceso-sessions/AccesoSessions.module.css` | Composición, degradado, estados y responsive propios            |
| `src/features/home/acceso-sessions/acceso-sessions.ts`        | Estado de vídeo, visibilidad y preferencias                     |
| `src/pages/index.astro`                                       | Inserción entre Productos y Opiniones                           |
| `src/pages/sessions/index.astro`                              | Ruta estática y composición con layout y navegación compartidos |
| `src/features/sessions/provisional/Provisional.astro`         | h1, aviso provisional y regreso al inicio                       |
| `src/features/sessions/provisional/Provisional.module.css`    | Estilo aislado del destino provisional                          |

Reutilizar `BaseLayout`, `SiteNav` y `ProvisionalNote`, sin modificar sus estilos ni añadir enlaces de Sessions al menú. Para la página nueva, no pasar `currentPage="products"`; hoy el valor por defecto de SiteNav no marca ningún enlace activo. No ampliar ese contrato solo para añadir un estado sin opción visible. Alternativas descartadas: añadir estilos de sección al layout, usar una isla React o extraer un controlador global para todos los vídeos; ampliarían el alcance sin necesidad.

### 2. Referencia e identidad

Modo de la sección: experiencia audiovisual de marca con acceso a otro destino. Se hereda la identidad existente; no hay concurso de estilos, tipografías nuevas ni reinterpretación del cliente.

Escritorio: dos zonas principales, audiovisual izquierdo y contenido derecho. Dentro de contenido, descripción a la izquierda del titular, y llamada en la parte inferior. Las proporciones se ajustarán con la referencia y el render, no imponiendo el 40/60 de Productos por analogía. Conservar cuatro líneas en el título, General Sans Bold 700 sin condensación artificial; descripción Regular 400 y llamada Medium 500 mediante tokens. Si se propone cursiva, usar solo un corte real disponible y consultar cualquier cambio de intención visual.

Texto demo propuesto, pendiente de revisión editorial:

> El corte es solo una parte. Entra en nuestras Sessions y conoce Uchiha Barber desde otro punto de vista.

El usuario autorizó generar descripción demo, no hechos sobre localizaciones, protagonistas o eventos. El título conserva «SESSION» singular y «PLACES»: no normalizarlo a «SESSIONS» por iniciativa propia. El bloque se identifica como Sessions mediante su contexto semántico, sin un segundo titular visual añadido.

### 3. Fondo luminoso sin tocar Productos

Construir el fondo en el CSS Module de Sessions, en escala de grises, con progresión de luz contraria a la de Productos. Usar gris medio como referencia de relación y avanzar hacia tonos claros/blanco. La dirección exacta y las paradas se calibrarán sobre la composición renderizada; invertir 30° a 210° es solo una prueba geométrica, no garantía de continuidad ni valor fijado por el usuario.

Comparar el borde inferior de Productos con el superior de Sessions, tanto en escritorio como al apilar. Ajustar únicamente Sessions para evitar un corte arbitrario de luz; no añadir capas sobre Productos ni modificar Opiniones. Usar tinta oscura para titular y descripción donde el fondo lo exija, midiendo contraste local, no un promedio del degradado. La excepción al criterio general de evitar degradados está expresamente solicitada para este bloque.

Concreción demo SES-040, pendiente de aceptación visual: degradado a 210° con `#757575 0%, #e5e5e5 42%, #fff 100%`; columnas exteriores 0.9/1.1 y contenido interior descripción/titular 0.8/1.6. Apilado a 68rem y contenido en una columna a 30rem. El contraste conservador del negro sobre el tono más oscuro es 4,56:1; hover y controles negro/blanco 21:1. La junta mantiene una separación tonal visible, no una fusión continua aprobada; se revisó sin editar Productos.

### 4. Vídeo local y mejora progresiva

Selección demo SES-040: `/videos/CorteDePelo1.mp4` y su cartel existente `/videos/CorteDePelo1-poster.jpg`, sin crear binarios ni descargar recursos. Encuadre centrado `object-position: 50% 50%`, `cover`, blanco y negro; la revisión visual/editorial del responsable sigue pendiente. Sustituir ambas rutas juntas cuando llegue el material final, sin declarar definitivo el recurso ni usar la captura de Instagram.

Mantener la pauta nativa `autoplay`, `muted`, `loop`, `playsinline` y una carga contenida al aproximarse al bloque, sin precargar clips adicionales. Tratar `preload` como sugerencia del navegador, no garantía de ausencia de tráfico con autoplay. Dimensiones o relación de aspecto reservadas para evitar saltos.

Inspirarse en el comportamiento de `acceso-productos.ts`, sin importarlo ni modificarlo: sus selectores son específicos de Productos. El controlador nuevo tendrá estado separado para pausa voluntaria, pausa por visibilidad y preferencia de movimiento. Escuchar cambios de `prefers-reduced-motion`; pausar al activarse y no tratar un cambio de preferencia como consentimiento para reanudar una pausa manual. Reintentos de `play()` y eventos tardíos deben verificar visibilidad, preferencia y pausa voluntaria actuales; no crear bucles de reintento ante una denegación permanente.

Sin JS, ofrecer controles nativos si hay reproducción. Con JS, un control propio puede sustituirlos después de inicializarse correctamente. Reducir movimiento no debe depender solo de un observador de visibilidad que llegue tarde: impedir el arranque desde la inicialización y comprobar el resultado real. Una denegación de autoplay es una limitación del navegador; mostrar estado detenido y control de inicio, sin afirmar reproducción.

### 5. Responsive, accesibilidad y SEO acotados

Resolver escritorio primero. Base de adaptación propuesta: audiovisual arriba y contenido debajo cuando deje de caber el reparto lateral. Ajustar la distribución interna de descripción y titular según legibilidad, conservando la jerarquía y sin girar el bloque completo; revisión visual móvil pendiente. No fijar una altura máxima de pantalla ni usar recortes para ocultar desbordamiento. Los puntos de ruptura responden al contenido, con tamaños fluidos y áreas flexibles.

Conservar `id="sessions"`, sección etiquetada por h2, DOM y foco coherentes y `h1` único de la home existente. La página independiente tendrá su propio h1. «Descúbrelas» debe incluir Sessions en su nombre accesible sin perder el texto visible. Botón de vídeo nativo, estado anunciado real, foco contrastado y espacio para la navegación fija. Evitar `aria-hidden` en controles o contenido enfocable.

En esta demo el vídeo acompaña al texto y no contiene información necesaria que el visitante solo pueda obtener viéndolo. Si el material final aporta información, voz o narrativa imprescindible, reevaluar alternativas textuales/subtítulos antes de sustituirlo; no aplicar automáticamente el tratamiento decorativo.

Probar al menos 320, 390, 768, 1280 y 1440 píxeles de ancho, una ventana baja en horizontal, texto al 200 %, teclado y movimiento reducido. El snap es el nativo por proximidad ya existente: no añadir motores de scroll ni pinning. Si el contenido alto queda inaccesible, resolver el problema local preservando el scroll libre; cualquier excepción visual al snap se acuerda y documenta antes de cambiarla.

La página provisional reserva localmente 14rem superiores hasta 48rem de ancho, porque la navegación compartida ocupa varias filas; geometría comprobada a 320px con texto normal y al 200 %. No se modifica la navegación global. Al ampliar texto se permite reflujo dentro de palabras en titular/llamada antes que recortarlas; las cuatro líneas son la composición nominal, no una restricción que impida ampliar el texto. Pruebas de scroll nativo separadas de las capturas completas: estas desactivan snap únicamente en la cámara de pruebas para evitar desplazamientos durante la captura, no en el código entregado.

HTML generado con contenido y enlaces reales, sin esconder texto en imágenes o JS. Para `/sessions`, título «Sessions · Uchiha Barber» y aviso provisional; sin canonical de un dominio no facilitado, metadatos comerciales inventados, JSON-LD de vídeos/sesiones ni nueva política global de indexación. No ampliar esto a una auditoría SEO de toda la web.

### 6. Skills y criterios de revisión

- Astro: estructura estática, alias y scripts según el proyecto; consultar documentación oficial al implementar APIs.
- Impeccable y frontend-design: fidelidad de composición y coherencia con PRODUCT; no autorización para rediseñar otras secciones.
- responsive-design: valores fluidos y puntos de ruptura por contenido, subordinando su preferencia mobile-first al escritorio primero exigido por el proyecto.
- accessibility: contraste, semántica, teclado, reflow y control del movimiento conforme a los escenarios.
- SEO: encabezados, título, enlaces rastreables y estabilidad del contenido dentro del alcance.
- GSAP solo si se acuerda movimiento que realmente lo necesite; el plan actual no añade animaciones.

No instalar herramientas ni dependencias para cumplir una lista de skills. Revisar el render con evidencia real y ejecutar el detector de Impeccable una vez terminado el trabajo de UI; un detector o build correcto no acredita aceptación del cliente.

## Risks / Trade-offs

- [La fuente de la referencia es una captura girada, no un diseño responsive completo] → Conservar su composición horizontal y marcar la adaptación móvil como propuesta revisable.
- [General Sans tiene métricas distintas de la serif de la captura] → Ajustar escala y espacios, no importar otra fuente ni deformar texto.
- [El degradado inverso puede crear una junta visible] → Contrastar ambas secciones juntas y modificar solo Sessions; no prometer una fusión perfecta antes de verla.
- [Restricciones de autoplay móvil y ahorro de datos] → Cartel, controles y estado detenido honesto; comprobar en dispositivo real sin prometer saltarse políticas del navegador.
- [El recurso demo o la descripción pueden cambiar] → Centralizar sus referencias y revisar encuadre, contraste y alturas al sustituirlos.
- [El registro de bloques exige rutas de código existentes] → En SES-040 se registran ambos bloques con sus archivos reales, sin aceptación inventada y sin consolidar los deltas prematuramente.

## Migration Plan

La planificación SES-039 no modificó código ni specs consolidadas. La aplicación SES-040 incorpora el componente y el destino provisional juntos para no producir enlaces rotos. Las specs consolidadas permanecen intactas: aprobación visual y consolidación/archivo posteriores, separadas de la verificación técnica. Si se necesita retirar la implementación, hacerlo con un cambio acotado que quite a la vez acceso y destino, sin resetear ni descartar trabajo ajeno. No hay migraciones de datos ni despliegue autorizado.

## Open Questions

- Clip demo y encuadre seleccionados en SES-040; sustitución por material profesional y aceptación del encuadre pendientes.
- Validación editorial de la descripción demo y ajustes de escala, paradas de luz y apilado en la revisión visual. El contenido final de `/sessions` queda expresamente fuera de este cambio.
