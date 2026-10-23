## Context

La portada tiene cuatro composiciones con vídeo. Cabecera y Servicios ya usan la marca nativa `autoplay muted loop playsinline` y su guion la retira con movimiento reducido antes de dejar el control de animación. La Galería reproduce solo los paneles cercanos al hueco visible (24 `<video>` con `preload="none"`, tira duplicada para el bucle) y su spec vigente exige esa reproducción contenida. El acceso a Productos reproduce su vídeo por IntersectionObserver al acercarse el bloque y ofrece control de pausa (WCAG 2.2.2); su delta está en un cambio OpenSpec aún abierto, pendiente de aceptación visual: `home-acceso-productos`.

El síntoma móvil que motiva el cambio: al llegar al bloque, `cargar()` llama a `video.load()` y a continuación `reproducir()` a `video.play()`; en iOS la petición puede abortar porque va pegada a la carga y el `catch` silencioso no reintenta, así que el vídeo queda pausado con el botón anunciando «Reproducir el vídeo».

## Goals / Non-Goals

**Goals:**

- Que ningún vídeo requiera pulsar reproducir: arranque nativo en los vídeos singulares y arranque automático al entrar en pantalla en los grupos gestionados.
- Dejar la pauta transversal en una capacidad propia (`video-reproduccion`) para los vídeos que se implementen en adelante.
- Conservar la pausa por visibilidad, el control de pausa del acceso a Productos y el comportamiento con movimiento reducido.

**Non-Goals:**

- No se añaden controles de pausa a cabecera, Servicios ni Galería (queda fuera del alcance autorizado; cada sección los decide en su bloque).
- No se retoca el carrusel de la Galería ni su reproducción contenida: es requisito vigente y la tira duplicada multiplica el coste si se aplica la marca nativa a sus 24 elementos.
- No se sustituye material demo ni se toca el bucle de la tira.

## Decisions

- **Marca nativa en el vídeo del acceso a Productos.** El navegador arranca el vídeo él mismo al cargar la página, que es la vía más fiable en móvil; el observador lo pausa en sus primeras llamadas si el bloque no está a la vista y lo reanuda al acercarse. Alternativas descartadas: reintentar solo desde JS (más robusto frente a la carrera, pero deja la pauta fuera del HTML y dependiendo del guion) y no tocar el HTML (no cumple la pauta pedida).
- **Reintento de `play()` pegado al evento `loadeddata`.** Si la petición aborta por ir pegada a la carga, se reprograma cuando el fotograma está disponible; el reintento revisa el estado de pausa, así que no reanuda un vídeo que el observador ya detuvo. Se conserva en el guion aunque la marca nativa cubra el arranque inicial.
- **Retirada de la marca con movimiento reducido por JS.** Mismo patrón ya aceptado en cabecera y Servicios (`removeAttribute('autoplay')` + `pause()`); el guion del bloque ya contemplaba la preferencia, pero solo la aplicaba renunciando a su observador; con la marca nativa hace falta retirarla y pausar. Sin JavaScript el navegador inicia el vídeo de forma nativa en cualquier preferencia: es un límite del patrón asumido en el resto de la web y por eso se ajusta también el escenario «Sin JavaScript» del delta de `home-acceso-productos`.
- **Galería sin marca nativa.** Sus clips ya arrancan solos al entrar la sección (observador + `play()`, permitidos al estar silenciados con `playsinline`) y su spec vigente manda reproducir solo lo cercano; aplicar la marca a la tira duplicada forzaría cargar los 24 clips al abrir la portada.
- **Ajuste documental del delta abierto de `home-acceso-productos`.** La instrucción transversal del responsable atraviesa su escenario «Sin JavaScript» (el vídeo ya no queda en el cartel sin guion) y la frase «reproducirse de forma automática solo cuando el bloque esté a la vista»; se enmienda el delta en su propia carpeta mientras el cambio siga abierto, y su sesión lo toma dentro de su aceptación.

## Risks / Trade-offs

- [Coste de datos: el vídeo del acceso a Productos carga al abrir la portada aunque el bloque esté fuera de pantalla] → Aceptado en este alcance con material demo; el observador lo pausa en el primer ciclo y el material oficial vendrá del VPS en su fase.
- [Bloqueos ajenos al código: ahorro de datos, modo de bajo consumo] → Ninguna implementación los quita; con ellos el botón del bloque sigue siendo la salida manual.
- [Enmienda de un cambio ajeno abierto] → Anotada como añadido documental con su motivo en el delta y en el relevo; no altera tareas ni código de esa sesión.
- [Un fotograma del vídeo puede verse antes de que el guion lo detenga con movimiento reducido] → Mismo patrón aceptado ya en cabecera y Servicios; el guion corre antes del pintado perceptible.

## Migration Plan

Sin migración: la marca y el guion del bloque se tocan en su propia sección; el resto de secciones ya cumplen. Reversión: retirar la marca `autoplay` y el reintento.
