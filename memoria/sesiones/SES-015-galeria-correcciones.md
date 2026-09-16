# SES-015 — Correcciones de Galería por revisión visual (ronda 3)

Agente: OpenCode (modelo glm-5.3-flash). Fase: UB-004 (turno: galería, ronda 3 — correcciones). Modalidad: implementación dirigida por el responsable; sin commit solicitado.

## Instrucción recibida

Tres observaciones de la revisión visual del responsable: (1) al bajar hacia la Galería nada más entrar en la web el fondo se ve negro, luego pasa a blanco y vuelve a negro al llegar a la sección — «corrige que nada más entrar en web galeria background sea blanco»; (2) solo se ve la flecha «atrás», falta «adelante», y deben funcionar las dos para el desplazamiento; (3) la Galería extiende la pantalla horizontalmente hasta el extremo de los vídeos en lugar de ser un carrusel sencillo contenido — «la página tiene un ancho establecido, no se debe tener que desplazar horizontalmente».

## Diagnóstico

`.galeria` y `.bloque` son grids sin plantilla explícita: la columna implícita se dimensiona al max-content de la tira (`width: max-content`, 12 paneles) y arrastra sección y página más allá del viewport. El `overflow: clip` de `.escena` no lo evita porque el overflow no cambia el tamaño intrínseco del ítem en el dimensionado de pista. De ahí el scroll horizontal de página y la flecha «adelante» (posicionada en `right: 0` del bloque gigante) fuera del viewport. El fondo negro venía del fallback CSS «estado compuesto» introducido en SES-012: se veía antes de tiempo y el tween lo repintaba en blanco al disparar.

## Cambiado (real, solo galería)

- `Galeria.module.css`:
  - Contención: `grid-template-columns: minmax(0, 1fr)` en `.galeria` y `.bloque`; la sección y el bloque miden el ancho de la página y la tira queda recortada (carrusel sencillo contenido). Las dos flechas quedan en los extremos del viewport.
  - Fondo por defecto blanco (`var(--color-bg)`) también sin JS y con movimiento reducido; el negro solo existe durante el fundido animado. Retirado el fallback negro.
- Sin cambios de lógica en el script: las dos flechas ya existían y funcionaban; su contenedor era lo que medía mal. El desplazamiento ligado al scroll queda intacto.
- OpenSpec `home-galeria` (cambio abierto): delta spec con dos escenarios nuevos (fondo por defecto blanco; tira contenida en el ancho de la página), requisito de transición ampliado, `design.md` con las decisiones de las rondas 2 y 3 y tasks actualizadas con sus comprobaciones; `openspec validate --strict` correcto.

## No tocado

Resto de secciones, nav, estilos globales, layout. Cambios ajenos sin commitear: conservados.

## Comprobaciones

- `openspec validate home-galeria --strict`: válido.
- `npm run build`: 0 errores, 0 avisos, 2 páginas; CSS generado con `background: var(--color-bg)`, `grid-template-columns: minmax(0, 1fr)` en galeria y bloque, y las dos flechas en `dist/index.html`.
- Detector mecánico Impeccable (`detect --json`): sin hallazgos.
- Prettier en archivos tocados. Sin dependencias nuevas.
- Capturas visuales: no verificables en este entorno (sin navegador); la verificación del scroll horizontal eliminado, las dos flechas visibles/operativas y el fondo blanco al acercarse corresponden al responsable.

## Pendientes del responsable

- Verificar la corrección en navegador (fondo blanco al entrar, sin desplazamiento horizontal, dos flechas en los extremos y paso de un panel).
- Afinado del umbral del fundido y de la aparición de las flechas si procede.
- Archivo del cambio OpenSpec `home-galeria` tras la aceptación visual.

## Estado

UB-004 en curso, turno galería ronda 3 entregada para revisión visual. Cambios sin commit (no solicitado).
