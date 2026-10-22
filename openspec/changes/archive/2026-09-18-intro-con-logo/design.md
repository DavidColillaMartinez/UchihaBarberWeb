# Diseño técnico: cruce de entrada con el logo

## Context

El cruce actual está descrito en la spec `home-intro` y su implementación vive en `src/features/home/intro/` (SVG en línea con máscara: rect blanco + texto negro; el vídeo se ve por la tinta del texto). El cambio sustituye el sujeto: pasa del texto «UCHIHA BARBER» al logo suministrado. Ver `proposal.md` para la motivación y `specs/` para los requisitos.

Restricciones vigentes: sin dependencias nuevas, comportamiento del cruce ya acordado (24 fps, cobertura total sin fundido, cada carga, degradación segura) y el material de origen en `ContenidoDemo/`, que está excluido de Git.

Material recibido: `ContenidoDemo/Logo/uchiha-barber-logo-negro.svg` — un único trazado con 84 subcaminos, relleno casi negro, `viewBox` 35.8042 32.2988 347.444 234.129 (relación 1,48:1). Existe una variante de tinta blanca con geometría idéntica, fuera del alcance.

## Goals / Non-Goals

- **Objetivos**: que el cruce use la tinta del logo como ventana al vídeo conservando su forma exacta, que termine en cobertura total sin restos y que la medición siga recalculándose sola ante cualquier tamaño de ventana.
- **No objetivos**: redibujar, recolorear ni recomponer el logo; cambiar la cabecera o su titular; usar la variante blanca; alterar el resto del comportamiento del cruce.

## Decisions

### El logo entra en la máscara como imagen referenciada, no como trazado incrustado

El SVG pesa ~174 KB (8.000 puntos de trazado). Incrustarlo en el HTML lo cargaría en cada visita y engordaría el documento. Se copia el archivo al sitio (`public/logo/uchiha-barber-logo-negro.svg`, versión elegida por el responsable) y la máscara lo referencia con `<image>` dentro del `<g>` animado; el navegador lo carga aparte y lo cachea. Alternativas descartadas: incrustar el trazado (peso en cada carga; solo se justificaría si hubiera que animar subcaminos) y máscara CSS con data URI (no animable, y el problema ya resuelto antes con el texto).

Con la convención de la máscara, **la tinta del SVG es la ventana**: al ser casi negra se comporta como hueco sin recolorear nada, que es exactamente el uso pedido («solo necesitamos el negro»).

### La medición del hueco pasa de glifos a tinta del logo

Hoy el punto de fuga y la escala de cobertura se obtienen dibujando el texto en un canvas y consultando posiciones de glifos (`getExtentOfChar`). Con el logo:

1. El mismo SVG se carga como `Image` (mismo origen, sin CORS) y se dibuja en el canvas de medición.
2. El punto de fuga se busca con un **barrido de candidatos en rejilla** sobre la caja del logo, puntuando cada punto por el radio inscrito de tinta a su alrededor (el mismo `radioHueco` de 48 direcciones) y prefiriendo los próximos al centro del logotipo.
3. La escala de cobertura se calcula como hasta ahora: la esquina más lejana del viewport debe caer dentro de la tinta elegida (holgura 1,25, tope 150).

Ventaja: el comportamiento se conserva sin depender de glifos, y sigue siendo agnóstico ante cambios de tamaño del logo. Riesgo asumido: si el barrido no encontrara ninguna zona sólida suficiente (trazos finos), se mantiene el fundido de rescate ya existente.

### Tamaño inicial y proporciones

El logo arranca a un tamaño legible pese a ser «diminuto» (≈12 % del ancho del viewport, referencia a revisar visualmente) y crece conservando su relación de aspecto; la posición inicial queda centrada en el viewport, como el texto anterior. Al ser un logotipo ancho (1,48:1), el factor de zoom hasta cobertura será distinto al del texto; lo calcula la medición, no una constante.

### Lo que no cambia

Duración (~1,05 s), espera de arranque (40 ms), 24 fps con desenfoque de movimiento y factor 3,5, cobertura total sin desvanecimiento (el fundido de rescate solo si el cálculo no alcanzara), repetición en cada carga, omisión con movimiento reducido, salida de seguridad de 5 s, bloqueo de scroll con `scrollbar-gutter` y retirada de la capa del DOM. El script previo al primer pintado y el resto de la portada quedan intactos: la cabecera vigente no muestra titular ni acceso y su vídeo no lleva desenfoque (decisiones posteriores del responsable), y la barra de inicio pertenece a otra sesión.

### Arranque limpio de la máscara

La imagen de la máscara se declara con geometría inicial cero (`x="0" y="0" width="0" height="0"`) y el script la mide y la centra antes de animar. Sin esas dimensiones, SVG2 aplica `width/height: auto` y el navegador pinta el logo con su tamaño intrínseco en la esquina superior izquierda como hueco de la máscara durante los primeros fotogramas. Alternativa descartada: ocultar el grupo hasta medir (más estado que gestionar para el mismo resultado).

## Risks / Trade-offs

- **`<image>` dentro de una máscara SVG**: soportado en navegadores actuales; si algún motor no lo pintara, la alternativa es incrustar el trazado (más peso, sin cambio de comportamiento).
- **Barrido de candidatos más costoso que las posiciones de glifos** → se ejecuta una sola vez por carga, antes de arrancar, y sobre una rejilla moderada; el coste entra dentro del beat inicial ya existente.
- **Detalle fino del logo** (84 subcaminos) → el radio inscrito puede limitar la zona sólida; por eso el barrido puntúa y elige la mejor zona, y el rescate queda como red de seguridad.
- **Peso del activo** (~174 KB) → se sirve aparte, cacheado; el origen sigue siendo el propio sitio y no hay bloqueo del cruce si tarda, porque el arranque ya espera a las métricas.

## Migration Plan

Sin migración de datos. El SVG se copia del material local al sitio y se versiona; el cambio entra y sale retirando la referencia en la máscara. Reversión: restaurar el sujeto de texto (el código anterior queda en el historial de Git).

## Open Questions

Ninguna que afecte a specs, enfoque o tareas. El tamaño inicial del logotipo y el punto exacto de fuga son parámetros visuales que se ajustan en la revisión del responsable, sin tocar requisitos.
