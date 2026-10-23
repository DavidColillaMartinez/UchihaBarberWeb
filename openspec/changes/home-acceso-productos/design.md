# Acceso a Productos — diseño técnico

## Context

Estado de partida del bloque `src/features/home/acceso-productos/`: provisional, con un `h2` horizontal, un enlace sin contexto, un visor vacío con borde y la nota genérica de provisionalidad. La página ya lo monta entre la Galería y las Opiniones (`src/pages/index.astro`), y `src/pages/index.module.css` le da la altura de viewport y el punto de ajuste del recorrido. No hay que recomponer la página.

Restricciones vigentes que condicionan la solución:

- La dirección de la sección está en `PRODUCT.md`: ~40 % de contenido a la izquierda, ~60 % de vídeo a la derecha, palabra «Productos» vertical de abajo hacia arriba, descripción breve y botón «Conócelos» hacia el catálogo.
- General Sans es la familia única y autoalojada; los pesos disponibles son los declarados en `src/styles/global.css` (300, 400, 500, 600, 600 cursiva, 700).
- El vídeo definitivo de productos todavía no existe: el material disponible es demo (`public/videos/`), con 13 clips ya en el repo.
- `font-synthesis: none` está activo: no puede haber cursivas ni negritas sintéticas.
- El vídeo del bloque es decorativo y su material es provisional; la sección no puede quedarse sin contenido útil si falla la carga.

La imagen aportada por el responsable se toma como referencia de composición (la palabra en vertical leyendo de abajo hacia arriba, el texto en el extremo opuesto de la columna, el vídeo en la mitad derecha a sangre), no como plantilla: su tipografía condensada no es la familia vigente y su fotografía es material de referencia.

## Goals / Non-Goals

**Goals:**

- Reproducir la composición dirigida con la tipografía y el tratamiento reales de la web.
- Que el bloque mida exactamente una pantalla en escritorio y que el titular ocupe la altura disponible sin recortarse ni desbordar el viewport.
- Resolver el movimiento del vídeo de forma accesible (control de pausa, movimiento reducido, sin JavaScript).
- Dejar la sustitución del material oficial a un cambio de dos rutas.
- Mantener el bloque aislado: ningún efecto sobre otras secciones de la portada.

**Non-Goals:**

- La página `/productos`, el catálogo y las fichas (fase UB-005).
- El diseño móvil definitivo (fase UB-006): aquí solo se evita que la composición de escritorio bloquee el apilado.
- Cualquier animación de scroll o coreografía añadida: el bloque es una composición estable y el movimiento lo aporta el vídeo.
- Datos estructurados de producto: el catálogo no existe todavía y no se publica información inventada.

## Decisions

### La palabra vertical es texto real con escritura vertical de CSS

La palabra se implementa como un `h2` con un `span` en `writing-mode: vertical-rl` y un giro de 180°, en lugar de una imagen o un texto rasterizado.

- Alternativa descartada: imagen de la palabra. Descarta la semántica, la traducción y la selección, y obligaría a rehacer el titular en cuanto cambie el texto.
- Alternativa descartada: `transform: scaleY()` para condensar. Deformaría las letras; además el responsable ya rechazó el estirado vertical en la sección de Servicios (SES-032).
- El giro de 180° invierte la dirección de lectura: con `vertical-rl` el avance va de arriba abajo y las letras quedan tumbadas con la cabeza a la derecha; al girar, la palabra se lee de abajo hacia arriba con la cabeza a la izquierda, que es la posición de la referencia.
- El texto del DOM sigue siendo «Productos»: el estilo no cambia lo que se lee ni lo que se anuncia. Las mayúsculas son `text-transform`, no una reescritura del texto.

### El tamaño del titular se deriva de la altura disponible

Medido sobre los archivos de General Sans Bold en uso, el avance vertical de «PRODUCTOS» es de 6,4667 veces el tamaño de letra (9 caracteres, `letter-spacing: -0.01em`). Para que la palabra ocupe la columna sin que la sección crezca por encima del viewport, el tamaño se calcula a partir de la altura libre:

```css
font-size: max(
  2.75rem,
  min(
    calc(
      (100svh - var(--aire-superior) - var(--aire-inferior)) /
        var(--avance-palabra)
    ),
    22vw
  )
);
```

- Alternativa descartada: un porcentaje fijo de `svh`. Con el aire superior e inferior fijos, cualquier porcentaje dejaba la sección más alta que el viewport (medido: 961 px en un viewport de 900 px).
- El coeficiente se documenta en el propio CSS y se puede recalcular si cambia la familia o el texto.
- El tope `22vw` evita que en pantallas estrechas la palabra se coma la columna de texto; el suelo de `2,75rem` evita que se vuelva ilegible.
- Se comprobó en 1920×1080, 1440×900, 1280×720 y 390×844: en escritorio la altura del bloque coincide con la del viewport.

### El aire superior existe por la navegación fija

La navegación reaparece como tira negra de extremo a extremo al subir el scroll. Sobre un bloque negro se confundiría con el fondo, pero su franja (unos 50 px) taparía el arranque del titular y el texto. El aire superior de `3,75rem` deja el contenido por debajo de esa franja.

### El vídeo se carga y reproduce solo cuando está cerca de la vista

El `video` va con `preload="none"` y `autoplay` nativo (corrección vigente de SES-037); un `IntersectionObserver` con margen de 200 px carga el archivo y llama a `play()` cuando el bloque se acerca, y pausa al salir.

- La decisión inicial sin `autoplay` fue sustituida por el arranque nativo autorizado en SES-037; se conserva el control de pausa y la pausa por visibilidad.
- Alternativa descartada: reproducir en bucle siempre. El coste de CPU y datos es permanente.
- El vídeo es decorativo (`aria-hidden` y `tabindex="-1"`): no tiene audio con sentido ni información que leer.

### El cartel resuelve movimiento reducido y ausencia de JavaScript

Se genera `public/videos/CorteDePelo1-poster.jpg` a partir del propio clip demo. Con movimiento reducido el script retira autoplay y pausa el vídeo en su cartel hasta una acción explícita. Sin JavaScript el vídeo conserva el autoplay nativo (SES-037). El control de pausa permanece oculto hasta que el script lo revela, de modo que no aparece un botón inactivo.

- El botón de control cumple el requisito de control del movimiento automático (WCAG 2.2.2) de un vídeo en bucle de más de cinco segundos.
- El foco visible se fuerza en blanco sobre los dos controles que invierten su color al interactuar: con el color de texto por defecto (negro) el anillo de foco sería invisible sobre el fondo negro.

### El texto de la descripción es demo y su carácter provisional se registra en la documentación

El bloque no muestra ninguna marca de provisionalidad: el carácter demo del texto y del vídeo queda registrado en `PRODUCT.md`, en `memoria/bloques.json` y en el relevo de la sección, no dentro de la composición. El texto busca el tono de marca: cercano, seguro y con el gracejo de la barbería, sin promesas ni datos de producto.

### Retoques de composición posteriores (decisión del responsable)

Tras la primera entrega, el responsable ajustó la composición y esa versión es la vigente:

- SES-044 sustituye el centrado inicial de la descripción por los ajustes del responsable: `margin-top: 6rem` y `text-align: right`; la llamada «Conócelos» conserva `margin: auto` y aumenta su texto a `1.4rem`. No cambia el contenido literal del párrafo.
- El vídeo deja de llenar su mitad a sangre: se presenta dentro de ella, al 90 % de ancho y alto y con un margen superior del 5 %, de modo que el negro del bloque lo rodea sin marcos, bordes ni sombras.
- Se retira la nota de provisionalidad del bloque.
- El fondo del bloque deja de ser negro plano y pasa a un degradado `linear-gradient(30deg, #757575 0%, #000000 42%)`: la luz cae desde el ángulo inferior izquierdo y se apaga hacia el extremo superior derecho, de modo que el titular y el vídeo se apoyen en una superficie con volumen en lugar de sobre un plano.

El degradado introduce el único color de la sección, un gris medio, y es una excepción dirigida a la recomendación de evitar degradados decorativos: aquí cumple una función de luz y profundidad sobre el bloque, no de adorno. El texto blanco mantiene contraste holgado en toda la superficie: en la zona más clara (esquina inferior izquierda, bajo la última letra del titular) ronda 5,3:1, y en la zona donde se apoya la descripción y la llamada el fondo ya es negro prácticamente puro.

SES-044 añade un contenedor posicionado compartido por vídeo y pausa. El contenedor conserva el 90 % de ancho y alto y el margen superior del 5 % anteriores; el vídeo lo llena sin cambiar `cover`. La pausa se ancla a ese rectángulo con `right` y `bottom` de `1rem`, no a la columna exterior. Así se conserva el encuadre y el control queda dentro también en el apilado móvil.

### Tipografía y aislamiento

Titular en Bold `700`, descripción en Semibold Italic `600` (corte real de la familia) y llamada a la acción en Medium `500`, con los tokens `--font-weight-*` de `src/styles/global.css`. Todo el estilo vive en el CSS Module de la sección; no se toca `global.css` ni otras secciones.

### SEO: alcance limitado al bloque

El bloque no introduce datos estructurados: no hay catálogo ni productos reales, y publicar marcas, precios o valoraciones inventados está prohibido. Aporta encabezado `h2` coherente con la jerarquía de la página (un único `h1` en la cabecera), enlace rastreable a `/productos` con texto «Conócelos» y contexto textual en el párrafo anterior. El título y la descripción de la página, el sitemap y los canonicals son territorio del SEO global y quedan fuera de este bloque.

## Risks / Trade-offs

Actualización SES-045: adaptación autorizada hasta 68rem inspirada en el ritmo de Sessions, sin modificar Sessions ni escritorio. Vídeo primero, 16:10 y márgenes iguales; marco al 100 % y margen cero dentro de la escena móvil. Debajo se conserva el título vertical a 2.5–3.5rem según ancho; descripción izquierda y sin los 6rem de margen de escritorio; botón bajo ella. La altura puede crecer. Sustituye la adaptación provisional anterior. El CSS móvil de Galería traslada el fundido inferior a una capa de fondo que se prolonga 1px más allá de la junta, sin filtros ni eventos y conservando su franja superior.

- **El vídeo demo no representa los productos** → se declara como material provisional en la documentación y en `PRODUCT.md`, no dentro del bloque; la sustitución es un cambio de dos rutas.
- **El recorte del vídeo es aggressive**: el clip es de 16:9 y el bloque es casi vertical, así que `object-fit: cover` muestra solo la banda central (en un bloque de 864×900 px se ve el 54 % del ancho). → Se eligió el clip cuyo encuadre aguanta el recorte (`CorteDePelo1`, con la estantería de productos detrás del cliente) y se documenta para que el material oficial se encuadre pensando en el bloque.
- **La medida del texto es estrecha** (unos 35 caracteres) por la composición de 40 % con el titular dentro. → Es la consecuencia de la dirección pedida y coincide con la referencia; el peso y el interlineado lo hacen legible.
- **El aire superior resta altura al titular**: el bloque no puede pegar la palabra al borde superior mientras la navegación tape el contenido. → Se prioriza que la navegación no tape nada.
- **El bloque depende del coeficiente 6,4667 medido sobre la familia vigente**. → Si cambia la familia o el texto, hay que remedir; queda documentado en el CSS y en este documento.
- **La adaptación específica móvil necesita aceptación**: SES-045 incorpora la composición autorizada con vídeo primero y titular vertical compacto. Puede crecer más de una pantalla; aceptación visual, dispositivo real y revisión móvil global de UB-006 siguen pendientes.
