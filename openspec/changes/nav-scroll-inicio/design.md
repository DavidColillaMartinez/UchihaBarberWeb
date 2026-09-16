## Context

El esqueleto (`esqueleto-inicio-productos`, archivado) dejó la navegación estática con caja propia (borde inferior) y las secciones con altura por contenido. `PRODUCT.md` describe la dirección del nav: visible al entrar, desaparece gradualmente al bajar, reaparece al subir con ~0,3 s. El responsable decidió: nav fusionado y centrado; desvanecimiento suave como primera opción; secciones como espacios de viewport; scroll libre con snap por proximidad alineando al inicio de sección. La cabecera (vídeo con blur) se trabaja en sesión paralela y no se toca aquí.

## Goals / Non-Goals

**Goals:**

- Nav fijo, transparente, centrado y fusionado con el contenido; desvanecimiento por dirección de scroll.
- Secciones de inicio como espacios de viewport y snap por proximidad en sus límites, coherente con las anclas.
- Respeto a movimiento reducido y teclado; sin dependencias nuevas.

**Non-Goals:**

- Cabecera (vídeo, blur, composición) y contenido/diseño de cualquier sección.
- Animaciones de sección (pin de Servicios, transición Servicios–Galería, vídeo en letras).
- Página de productos más allá del nav compartido; datos ni dependencias.

## Decisions

- **Nav como overlay sin caja**: `position: fixed; top: 0`, centrado con flex, `z-index` alto, sin fondo ni borde; el componente y su accesibilidad se conservan (un solo `SiteNav` para las dos páginas). Alternativa descartada: fondo translúcido con blur (introduce una superficie, no fusión).
- **`mix-blend-mode: difference` con texto blanco**: sobre blanco el texto resulta negro; sobre negro/vídeo, blanco; sin JS de detección de sección ni estados por página. Dominio blanco/negro de la marca minimiza el punto débil (grises medios). Alternativas descartadas: dos temas por sección con IntersectionObserver (más código y sincronización), `difference` sobre un nav con fondo (mata la fusión).
- **Desvanecimiento con GSAP ScrollTrigger**: `ScrollTrigger.create` sobre todo el documento con `direction` para desvanecer al bajar y reaparecer al subir con `delay: 0.3`; `autoAlpha` también desactiva la interacción al ocultar. `gsap.matchMedia` con `prefers-reduced-motion` mantiene el nav siempre visible. Alternativa descartada: `IntersectionObserver`/rAF a mano (duplicaría lógica que ScrollTrigger ya da y que se reutilizará en secciones). Umbral superior: cerca del inicio de la página el nav permanece visible aunque se baje un poco.
- **Secciones como espacio de viewport**: `min-height: 100svh` (con reserva `100vh`) aplicado desde la composición de la página (`#contenido > *` en el módulo de `index.astro`), no desde cada sección; así no se tocan archivos de la cabecera (sesión paralela) ni el contenido de secciones, y el propio `main` es el contenedor del recorrido. Alternativa descartada: alturas en cada módulo de sección (invade el turno de cada sección).
- **Snap nativo por proximidad**: `scroll-snap-type: y proximity` en el scroller (`html`) y `scroll-snap-align: start` en los hijos directos del `main` desde la composición de la página. Proximidad permite scroll libre salvo cerca de los límites; el salto por ancla y el snap comparten punto de alineación. `mandatory` descartado (bloquearía el recorrido libre pedido). Galería: excepción futura (ajuste centrado tipo banner) documentada, no implementada.
- **Sin `scroll-margin-top`**: no hay banda de nav que tape el inicio de sección; el nav es overlay sin caja y el contenido de sección arranca con su propio padding.

## Risks / Trade-offs

- [`difference` pierde contraste sobre grises medios] → dominio blanco/negro de la marca reduce el caso; revisión visual con el responsable; plan B (ocultado directo) si no convence.
- [Snap nativo + futuro pin de Servicios] → el pin añadirá spacers/anchos propios; al implementar sus animaciones se revisará la conviviencia y, si hiciera falta, se excluyen los contenedores pineados del snap.
- [Blend requiere que el nav no quede aislado en un stacking context con fondo opaco] → el nav se aplica directamente sobre el contenido raíz; se verifica en build y revisión.
- [Desvanecimiento ≠ ocultado: puede leerse débil] → es la primera opción acordada, con revisión visual y plan B documentado.

## Migration Plan

Sin migración: cambios acotados a `SiteNav`, composición de `index` y una regla global del scroller. Reversión trivial por Git. La sesión paralela de cabecera no se ve afectada: el nav es overlay y la regla de composición no modifica sus archivos.

## Open Questions

- Ninguna que bloquee: la revisión visual del desvanecimiento suave (frente al plan B) y el snap centrado de Galería quedan para sus momentos de revisión.
