# SES-009 — Cruce de entrada de la portada (intro)

Agente: OpenCode (modelo deepseek-v4.1-flash). Fase: UB-004 (bloque de la intro de entrada). Modalidad: implementación dirigida por el responsable sobre el prototipo ya aprobado; sin commit solicitado.

## Instrucción recibida

«Implementa en web ya normal con las demás integraciones actuales, revisa para no cargarte nada ya funcionando». Antes de tocar nada se revisó el trabajo en paralelo: nav fusionado (`SES-007-nav-scroll`, cambio `nav-scroll-inicio`) y sección Servicios (`SES-008-servicios`), ambos con GSAP + ScrollTrigger, ajuste por secciones con `scroll-snap-type: y proximity`, vídeo por IntersectionObserver y snap en `index.module.css`.

## Decisiones del responsable que fija la implementación

- Cruce **en cada carga de la portada** (decisión revisada en el turno 2; al principio se acordó una vez por sesión). En `/productos` no existe.
- Punto de fuga: la **letra más central** del nombre que tenga hueco sólido (se recorren las líneas empezando por la última y los glifos por cercanía al centro).
- Final: **cobertura total** (el hueco cubre el viewport); sin desvanecimiento, el último fotograma ya es el vídeo completo. Solo si no se puede garantizar cobertura se usa un fade de rescate de 280 ms.
- **24 fps con desenfoque de movimiento** en el tramo rápido.
- Bloqueo de scroll únicamente durante el cruce.
- Texto de la intro en mayúsculas, tomado del propio `h1` (una sola fuente de verdad).
- Tipografía: la intro usa la **provisional global** (`--font-base`); cuando el cliente decida familia (Inter/Archivo u otra) no hay que tocar la intro: la máscara lee las métricas y la familia del `h1`.

## Implementado (real)

- `src/features/home/intro/Intro.astro`: capa SVG fija con `<mask>` (rect blanco + texto negro = hueco) sobre el vídeo de la cabecera; `aria-hidden`, sin contenido enfocable. El script importa y arranca el módulo.
- `src/features/home/intro/Intro.module.css`: capa fija `z-index: 60` (por encima del nav, 50; por debajo del skip-link, 100); visible solo con `html[data-intro="pendiente"]`; bloqueo de scroll con `scrollbar-gutter: stable` para evitar el salto de composición al reaparecer la barra. Misma técnica de máscara que Servicios, en SVG inline para poder animar la letra.
- `src/features/home/intro/intro.ts`: lógica del cruce. Mide el `h1` real (tamaño, interlineado, tipografía, espaciado) para que la letra del cruce sea la que luego aterriza; dibuja el mismo texto en un canvas offscreen y **mide el radio inscrito del hueco** (48 direcciones) para calcular el punto de fuga y la escala exacta de cobertura (esquina más lejana ÷ radio, con holgura 1,25; tope 150). Animación con `requestAnimationFrame` limitada a 24 fps y desenfoque ligado a la velocidad; al terminar retira la capa del DOM, libera el estado y marca la sesión.
- `src/layouts/BaseLayout.astro`: atributo `data-intro-activa` en `<html>` cuando la página pide la intro, y script `is:inline` **previo al primer pintado** que decide si hay cruce (sin movimiento reducido y sin marca de sesión) y deja `html[data-intro="pendiente"]`; incluye **salida de seguridad de 5 s** que libera la página si el módulo no llegara a ejecutarse.
- `src/pages/index.astro`: `introDeEntrada` + `<Intro />` fuera de `<main>` (no entra en el snap ni en `.contenido > *`).
- `src/features/home/cabecera/Cabecera.module.css`: con el cruce activo, título y acceso esperan ocultos (`animation: none; opacity: 0`) y su entrada escalonada arranca al pasar a `html[data-intro="listo"]`.

## Integración revisada (sin tocar)

Nav, Servicios, Galería, Acceso a productos, Opiniones, Información, `global.css`, `index.module.css`, OpenSpec y el resto de memoria quedan intactos. La intro no toca el ticker de GSAP (se eligió `requestAnimationFrame` propio para no alterar la cadencia de las animaciones de nav/Servicios); el bloqueo de scroll dura ~1,2 s y no dispara ScrollTrigger. La capa cubre el nav, que aparece al levantarse el cruce; el vídeo que se ve por las letras es el mismo de la cabecera (sin vídeos nuevos).

## Comprobaciones

- `npm run build`: correcto (astro check sin errores, avisos ni sugerencias; 2 páginas).
- Salida generada revisada: `dist/index.html` lleva `data-intro-activa`, la máscara y el script; `dist/productos/index.html` no lleva ni el atributo ni la capa. Reglas CSS comprobadas (`display: block` de la capa, bloqueo de scroll, entrada de cabecera diferida). Sintaxis del script inline validada con `node --check`.
- Prettier aplicado a los archivos tocados. Sin dependencias nuevas.
- **No hay verificación visual**: en este entorno no fue posible una captura headless fiable (Firefox sin perfil aislado). La aceptación visual queda pendiente del responsable, abriendo `npm run dev`.

## Turno 2: el cruce se repite en cada carga

Instrucción del responsable: «cuando me refería a una vez por sesión decía que hasta que le dieras a recargar la página; al recargar o salir y entrar sí debe volver a cargar la animación». Se retira la marca de sesión: fuera `sessionStorage` y `CLAVE_SESION` en `intro.ts` (y las llamadas que la escribían) y fuera la consulta correspondiente en el script previo al pintado de `BaseLayout`. Queda como único gate el movimiento reducido, más la salida de seguridad de 5 s. Consecuencia anotada: cada recarga y cada entrada a la portada repiten el cruce (~1,2 s). `astro build` correcto y salida sin rastro de la marca; Prettier limpio.

Nota de continuidad: `npm run build` falla por un error de tipos **ajeno a este bloque**, en `src/components/navigation/SiteNav.astro:77` (`parseFloat` sobre `number | "1"` al desestructurar `rgba`), del trabajo en curso del nav. No se ha tocado: corresponde a su bloque.

## Turno 3: fuentes del prototipo y arranque del cruce

Instrucción del responsable: «en el prototipo ya habías implementado las fuentes que hablamos pero en la dev normal no están; y el negro de la máscara en el primer instante es muy largo, recórtalo un poco». Se instalan las familias del prototipo y se acorta el beat inicial.

- Fuentes autoalojadas: `public/fonts/inter-800.woff2` (24,4 KB) y `public/fonts/archivo-600.woff2` (13,8 KB), subsets latinos completos descargados de Google Fonts (SIL OFL), servidos por la propia web (sin CDN; en producción los sirve el VPS con el resto del sitio). `@font-face` con `font-display: block` en `global.css` y tokens compartidos `--font-display: "Inter", …` y `--font-text: "Archivo", …` (el reparto por elemento lo decide cada sección, según el juego planteado por el responsable). En la cabecera: `.titulo` → `--font-display`; `.cita` → `--font-text` con `font-weight: 600`. El nav no se ha tocado (bloque paralelo). La intro no necesitó cambios por las fuentes: lee tipografía y métricas del `h1` real y recalcula el hueco en el canvas.
- Beat de negro: el arranque era `fonts.ready` + 120 ms con la capa negra sin texto y, después, `expo.in`, que mantiene el texto microscópico ~250 ms más. Ahora: espera 40 ms (`ESPERA_MINIMA`), escala inicial 0,12 (texto diminuto pero visible desde el primer fotograma) y aceleración cúbica `t³` en lugar de exponencial. El desenfoque de movimiento se compensa subiendo el factor de 2 a 3,5 para conservar el efecto del tramo rápido. Duración, 24 fps y cobertura total sin cambios.
- Verificado en la salida: `dist/fonts/` con los dos ficheros, `@font-face` y tokens en el CSS, `.titulo`/`.cita` con sus variables y las nuevas constantes del cruce en el script (`0.12`, `t³`, 40 ms). `astro build` correcto; Prettier limpio.

## Pendientes del responsable

- Aceptación visual del cruce en la portada (ritmo, encuadre, desenfoque) y de su aterrizaje.
- Tipografía definitiva (sigue la provisional) y logo; el cruce no hay que rehacerlo al cambiarlas.
- Decidir si este bloque se captura en OpenSpec como cambio propio (el prototipo validado vive fuera del repo, en `/tmp/opencode/intro-proto`) y si se documentan sus requisitos.
- La aceptación del prototipo se dio sobre el Prototipo v2: iris con cobertura total, 24 fps y blur.

## Estado

UB-004 en curso. Intro implementada, compilada y pendiente de aceptación visual; cabecera (con h1 centrado y 15 % menor), nav y Servicios siguen su curso. Cambios sin commit (no solicitado); SHA pendiente.
