## Context

Ver `proposal.md` — Why. Estado técnico relevante:

- `src/styles/global.css` declara dos cortes provisionales (`inter-800.woff2`, `archivo-600.woff2`) con `font-display: block` y tokens `--font-display`/`--font-text` que apuntan a esas familias.
- Pesos declarados a mano en secciones: `SiteNav.module.css` (`.cita` 600), `BarraInicio.module.css` (`.cita` y `.lista a` 600) y `Servicios.module.css` (`.nombre/.descripcion` y `.precio/.llamada` 600; máscara SVG con `system-ui` 800). No hay más declaraciones de familia o peso en `src/`.
- `public/fonts/general-sans/` ya contiene los seis WOFF2 y `LICENSE.txt` con hash idéntico al paquete oficial; aún sin versionar.
- El paquete de referencia se preparó sobre `2983fcc`: sus versiones de `SiteNav.module.css`, `Cabecera.module.css` e `Intro.module.css` revierten trabajo posterior (`nav-tira-inicio`, `intro-con-logo`), y sus `mapa.md`/`bloques.json`/`estado.json` no conocen los cierres posteriores. Solo se extraen de él los fragmentos tipográficos.
- Hay una sesión paralela cerrando `intro-con-logo` en el mismo árbol; sus archivos sin commit se conservan.

## Goals / Non-Goals

- Objetivo: familia única autoalojada con pesos reales, pauta aplicada, recursos provisionales retirados y documentación/memoria consolidadas.
- No objetivo: composiciones, animaciones, secciones, datos, catálogo, móvil ni aprobación visual. Tampoco decidir el peso final de cada fila: el CSS deja las alternativas comentadas para la prueba manual del responsable.

## Decisions

1. **Familia única con alias de tokens**: `--font-base` pasa a `"General Sans", system-ui, …` y `--font-display`/`--font-text` quedan como alias de `--font-base`, de modo que los CSS Modules existentes siguen funcionando sin cambios y la jerarquía se expresa con peso, escala y espacio. Alternativa descartada: mantener dos tokens con familias distintas (ya no hay dos familias).
2. **`font-display: swap` en los seis cortes**: el `block` anterior existía para que la medición de la máscara de texto no usara una fuente de respaldo; tras `intro-con-logo` la máscara es una imagen y Servicios mide con su propia técnica, así que `swap` evita texto invisible durante la carga. Riesgo asumido: un FOUT breve en titulares con red lenta, aceptable para una familia local.
3. **`font-synthesis: none`**: garantiza que nunca aparezcan negritas o cursivas fabricadas; como todos los pesos usados (400–700) tienen archivo real, la coincidencia de fuentes siempre encuentra un corte válido.
4. **Pesos por elemento con alternativas comentadas**: se aplica la pauta (Regular en nombres/descripciones, Medium en opciones y llamadas, Semibold en precios) y cada regla modificada deja un comentario con las alternativas (`--font-weight-regular/medium/semibold/light`) para que el responsable pruebe manualmente sin salir del CSS.
5. **Máscara de Servicios**: el `font-family` escrito a mano del SVG pasa a `General Sans` con peso `700`, conservando la técnica de máscara. Limitación conocida: en algunos navegadores las fuentes web no cargan dentro de máscaras CSS y el SVG cae al respaldo `sans-serif`; la forma de la palabra cambia igual respecto al estado anterior y queda a revisión visual.
6. **Retirada de Inter/Archivo**: tras sustituir el CSS global no quedan referencias activas fuera de cambios archivados y relevos históricos; se eliminan los dos WOFF2 (no las menciones documentales, que son evidencia).
7. **Fusión documental, no reemplazo**: de AGENTS/PRODUCT/config se aplican solo las adiciones tipográficas; en memoria se fusionan `DEC-003`, la fila de `public/` del mapa, los pendientes de bloques y el estado. `generado/` y `revision.json` se regeneran con las herramientas del proyecto.
8. **Conflicto con el paquete**: las versiones del paquete que revierten `nav-tira-inicio`/`intro-con-logo` se descartan; se conserva el checkout actual y la integración se limita a lo tipográfico.

## Risks / Trade-offs

- [FOUT de `swap` en titulares grandes] → familia servida desde el mismo origen; si la revisión visual lo desmiente, se puede volver a `block` solo en el corte de titulares.
- [La máscara SVG puede no usar la fuente web] → se mantiene el respaldo `sans-serif`; la comprobación visual del responsable decide si se conserva así o se ajusta la técnica (fuera de este alcance cambiarla).
- [Cambio de pesos en Servicios y navegación altera la apariencia aceptada] → pesos de la pauta aplicados con alternativas comentadas; la versión final la fija la prueba manual del responsable y no se declara aceptada por adelantado.
- [Sesión paralela activa en el mismo árbol] → protocolo de memoria: releer estado y archivos antes de escribir y antes de escanear; no se tocan los cambios ajenos.

## Migration Plan

Sustitución directa de estilos y recursos (sitio estático, sin datos persistidos). Reversión: restaurar `global.css`, los tres CSS Modules y los dos WOFF2 retirados desde Git. En esta entrega no hay commit ni push; la publicación requiere autorización posterior.

## Open Questions

- Peso definitivo de nombres, opciones y llamadas tras la prueba manual del responsable (alternativas comentadas en el CSS). Es ajuste fino y no altera el enfoque.
- Confirmación visual de la máscara de Servicios con la familia nueva.
