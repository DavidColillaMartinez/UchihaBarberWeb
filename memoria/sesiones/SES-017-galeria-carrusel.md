# SES-017 — Carrusel continuo con snap (ronda 4 de Galería)

Agente: OpenCode (modelo glm-5.3-flash). Fase: UB-004 (turno: galería, ronda 4 — reformulación del carrusel). Modalidad: implementación dirigida por el responsable; sin commit solicitado.

## Instrucción recibida

Tras SES-016 el responsable reformuló el modelo: «las flechas mueven el scroll de la página» no era lo pedido. Modelo correcto: la Galería como carrusel — el scroll de página hace snap en la sección, el scroll al acercarse o abandonarla activa el movimiento lateral del carrusel, y dos botones mueven el carrusel sin tocar la página. Confirmaciones: el carrusel continúa desde donde se quedó al alternar scroll y flechas (sin saltos), y tras el último vídeo aparecen los primeros —«como una noria»—, también hacia atrás.

## Diagnóstico del modelo anterior

Las flechas movían la página (ScrollToPlugin); el re-snap por proximidad deshacía el paso, y la solución SES-016 (quitar el snap a la Galería) atacaba el síntoma y no el modelo. Sustitución registrada: el snap de Galería queda restaurado y la excepción de `home-skeleton` se entiende resuelta con este carrusel continuo.

## Cambiado (real, solo galería)

- `Galeria.astro`:
  - Tira con el material **duplicado** (24 paneles, 12 únicos) para el bucle circular: tras el último clip vuelven los primeros, en ambos sentidos, sin salto visible.
  - Script reescrito: **posición compartida** (`posicion`, px acumulados sin límite) alimentada por el scroll (ScrollTrigger sin tween: cada cambio de progreso del cruce de la sección suma su parte; cruce completo = una vuelta) y por las flechas (± un panel, la página queda quieta); `gsap.ticker` persigue la posición con suavizado (factor 0.16, equivalente al scrub anterior) y la normaliza módulo una vuelta; en movimiento reducido va directa, sin persecución. Fuera ScrollToPlugin y todo el estado de extremos/desplazamientoActivo.
  - Reproducción limitada a los paneles cercanos al hueco visible (margen de precarga 2); con movimiento reducido y sección en pantalla se carga el primer fotograma de los clips para que la tira estática no quede en negro; salida de pantalla pausa todo.
- `Galeria.module.css`: `scroll-snap-align: none` retirado (snap restaurado); `.escena` con `overflow: clip` en todos los tamaños (fuera el scroll nativo horizontal); reglas `:disabled` de los controles retiradas (el bucle no agota el recorrido).
- OpenSpec `home-galeria` (cambio abierto): requisito «Carrusel continuo con snap» (6 escenarios, sustituye «Desplazamiento ligado al scroll» y el escenario de recorrido libre), «Reproducción contenida» ampliado (hueco visible + primer fotograma), «Navegación de la tira» actualizado (página quieta, controles activos en los extremos), decision en `design.md` y tasks (sección 5 nueva); `openspec validate --strict` correcto.

## No tocado

Resto de secciones (incluido el snap de Servicios), nav, `index.module.css`, estilos globales, layout. Cambios ajenos sin commitear: conservados.

## Comprobaciones

- `openspec validate home-galeria --strict`: válido.
- `npm run build`: 0 errores, 0 avisos, 2 páginas; 24 paneles de galería en `dist/index.html`; bundle sin ScrollToPlugin, con `ticker` y la lógica de bucle; CSS generado sin `scroll-snap-align: none` en galería (el `none` vigente es el de Servicios) y `.escena { overflow: clip }`.
- Detector mecánico Impeccable (`detect --json`): sin hallazgos.
- Prettier en archivos tocados. Sin dependencias nuevas.
- Capturas visuales: no verificables en este entorno (sin navegador); la verificación del comportamiento completo corresponde al responsable (task 5.4).

## Pendientes del responsable

- Verificar en navegador: snap al llegar a la Galería, movimiento lateral con el scroll de entrada/salida, flechas que mueven solo el carrusel, continuidad sin saltos al alternar y noria por ambos extremos.
- Afinados ya registrados (umbral del fundido, umbral de aparición de flechas).
- Archivo del cambio OpenSpec `home-galeria` tras la aceptación visual.

## Estado

UB-004 en curso, turno galería ronda 4 (carrusel continuo) entregado para revisión. Cambios sin commit (no solicitado).
