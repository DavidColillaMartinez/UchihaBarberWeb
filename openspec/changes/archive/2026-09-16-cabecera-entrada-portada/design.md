# Diseño técnico: cabecera y cruce de entrada

## Context

La portada es estática (Astro, salida sin adaptador) y ya cuenta con la composición general de secciones y el recorrido de la página (cambio `nav-scroll-inicio`). La cabecera y el cruce de entrada se implementaron y se revisaron visualmente el 2026-09-16; este documento fija cómo están resueltos y por qué, para que las specs resultantes no dependan del código como única fuente. Ver `proposal.md` para la motivación y `specs/` para los requisitos.

Restricciones vigentes: sin dependencias nuevas, animaciones con GSAP/ScrollTrigger como motor del sitio, audiovisuales demo servidos desde el propio sitio y CSS aislado por sección con variables compartidas solo de base.

## Goals / Non-Goals

- **Objetivos**: que el cruce se apoye en la letra real de la cabecera (no en métricas aproximadas), que acabe sin restos de negro, que consuma lo mínimo en un instante de un segundo, y que nunca pueda dejar la portada bloqueada.
- **No objetivos**: el desvanecimiento y el recorrido de la navegación, el resto de secciones, el material audiovisual definitivo ni la tipografía definitiva del cliente.

## Decisions

### Máscara SVG en línea, en lugar de `mask-image` con data URI

La sección de Servicios usa una máscara de vídeo con `mask-image` y un SVG en data URI. Aquí no sirve: la letra tiene que **crecer animada**, y una máscara en data URI no puede animarse. Se usa un `<svg>` en línea con `<mask>` (rect blanco + texto negro) sobre el vídeo de la cabecera. Alternativas descartadas: `background-clip: text` (no permite ver el vídeo detrás sin duplicarlo) y composición en canvas (más coste y peor integración con el DOM).

### Punto de fuga y escala calculados midiendo el hueco

El punto de fuga («la letra más central») y la escala final no son constantes: dependen de la tipografía, el tamaño y el interlineado reales del `h1`. El script dibuja el mismo texto en un canvas fuera de pantalla y mide el radio inscrito del hueco alrededor del punto elegido (48 direcciones); con eso obtiene el punto válido más cercano al centro y la escala exacta a la que la esquina más lejana del viewport cae dentro del hueco (holgura 1,25, tope 150). Ventaja: al cambiar de familia tipográfica o de tamaño del titular, el cruce se recalcula solo y no hay que retocarlo. Alternativa descartada: constantes fijas por familia (frágiles ante cualquier ajuste de composición).

### Cobertura total sin desvanecimiento

Si la escala final se calcula como se describe, el último fotograma ya es vídeo a pantalla completa: la capa se retira del DOM de inmediato, sin fundido. Un fundido sobre restos de negro fue el defecto observado en el prototipo (costuras que se disolvían y solapaban con el vídeo). El fundido corto se conserva únicamente como rescate si el cálculo no alcanza cobertura.

### 24 fotogramas por segundo con bucle propio, sin tocar GSAP

El prototipo evidenció que a 24 fps con desenfoque ligado a la velocidad el cruce se lee como cine, y además el coste se reduce al rasterizar menos fotogramas. Se anima con `requestAnimationFrame` propio y aceleración cúbica (`t³`, movimiento perceptible desde el arranque), en lugar de la exponencial del prototipo, que alargaba el negro inicial. **No se usa el ticker de GSAP a propósito**: `gsap.ticker.fps()` es global y habría alterado la cadencia de las animaciones de navegación y Servicios durante el cruce. El desenfoque se calcula por diferencia de escala entre fotogramas, con el factor ajustado para conservar el efecto tras cambiar la curva.

### Degradación segura y accesibilidad

- La decisión de mostrar el cruce se toma en un script en línea **antes del primer pintado** (sin destello) y solo en la portada, mediante un atributo en `<html>` que el layout emite cuando la página lo pide.
- Sin JavaScript no existe el atributo: la portada se ve y funciona igual, pausando el vídeo solo la preferencia de movimiento reducido (ya resuelta en la cabecera).
- Con movimiento reducido el cruce ni se plantea.
- Salida de seguridad de 5 s: si el módulo no llegara a ejecutarse, la portada se libera.
- El bloqueo de scroll se aplica solo con el cruce activo y usa `scrollbar-gutter: stable` para que la reaparición de la barra no salte la composición.
- La capa es decorativa (`aria-hidden`, sin foco) y el título real nunca sale del DOM, así que buscadores y lectores de pantalla no ven contenido duplicado.
- El texto de la máscara se toma del propio `h1`, en mayúsculas, para que no existan dos fuentes de verdad.

### Tipografías

Subconjuntos latinos de Inter 800 y Archivo 600 descargados de Google Fonts (SIL OFL) y servidos desde el propio sitio (`/fonts/`), con `font-display: block` para que la máscara no mida una fuente de respaldo, y tokens compartidos `--font-display` / `--font-text` que conservan la provisional como respaldo. Autoalojarlas evita depender de terceros y de la conexión del equipo de desarrollo; en producción las sirve el VPS junto con el sitio. Alternativa considerada: subdominio de activos (exigiría CORS en las fuentes), innecesaria mientras todo se sirva del mismo origen.

## Risks / Trade-offs

- **Rasterizar una máscara con letras gigantes cada fotograma** → mitigado con 24 fps, máscara sin filtros internos, un único transform y retirada inmediata de la capa al terminar; si en algún equipo resultara pesado, el plan alternativo es componer el fotograma en canvas.
- **Un clic o un redimensionado durante el cruce** → el redimensionado recalcula métricas y origen mientras la capa siga activa; el cruce no admite interacción y el bloqueo es de poco más de un segundo.
- **Material audiovisual demo en el repositorio** → pesa y no es el definitivo; se sustituirá por la URL del VPS cambiando una constante, y la carpeta demo queda fuera de Git.
- **Tipografía provisional** → el reparto por tokens y la medición del hueco hacen que el cambio de familia no obligue a rehacer el cruce.

## Migration Plan

Sin migración de datos ni de infraestructura. Despliegue estático normal: las fuentes viajan con el sitio. Reversión: retirar el atributo de la portada en el layout desactiva el cruce sin tocar el resto.

## Open Questions

Ninguna que afecte a las specs o al enfoque. La única decisión externa es la familia tipográfica definitiva del cliente, ya contemplada como respaldo provisional.
