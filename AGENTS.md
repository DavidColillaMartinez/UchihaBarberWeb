# AGENTS.md

## Contexto y autoridad

- Web de Uchiha Barber (barbería en Torrejón de Ardoz), Astro estático, en desarrollo **sección a sección** dirigido por el responsable del proyecto.
- `PRODUCT.md` (raíz) es la fuente de verdad de marca, usuarios, stack y reglas de autoridad. Léelo antes de cualquier trabajo: no anticipar secciones no solicitadas ni inventar textos comerciales, precios, productos, tipografías, imágenes ni URLs de assets. Los audiovisuales se servirán desde un VPS propio (material demo primero, profesional después): no descargar recursos.
- OpenSpec (SDD): specs en `openspec/specs/`, cambios en `openspec/changes/`; comandos `/opsx-*` definidos en `.opencode/commands/`.

## Comandos

```sh
npm run dev
npm run check          # astro check (TypeScript + Astro)
npm run build          # ejecuta check y luego astro build
npm run preview
npm run format         # prettier --write
npm run format:check
```

- Para cambios de Astro/TypeScript/dependencias: `npm run build` y comprobaciones específicas del cambio; el formato se revisa sobre archivos tocados.
- Herramientas de memoria: `npm run memoria:test`. Para documentación: formato de archivos tocados y `npm run memoria:check`. `build` ya ejecuta `check`; no repetirlo sin motivo ni formatear skills ajenas incidentalmente.

## Entorno

- Node definido en `.nvmrc` (22.12.0); `engines` exige `>=22.12.0 <25` (requisito de Astro 7).
- Solo npm como gestor. Conservar `package-lock.json`. Nunca `--force` ni `--legacy-peer-deps`; si hay conflicto de dependencias, informar antes de forzar.

## Convenciones

- Rutas en `src/pages/`. Cada sección vive en `src/features/<pagina>/<seccion>/` con su componente Astro, su CSS Module y su TypeScript co-localizados en la misma carpeta.
- Componentes reutilizables en `src/components/ui/` y `src/components/navigation/`. Alias `@/* → src/*` (tsconfig, strict de Astro).
- Estilos globales solo base, reset y variables compartidas en `src/styles/`. El aislamiento por sección se logra con CSS Modules, no con separar archivos CSS globales.
- Catálogo de productos: se construirá después desde JSON local en `src/data/` con generación estática; su esquema no está definido, no lo inventes.
- Salida estática, sin adaptador de servidor. GSAP (con ScrollTrigger incluido en el mismo paquete) para animaciones; no añadir otros motores de scroll.

## Git y remoto

- Repo Git activo en `main`, rastrea `UchihaBarberWeb/main` (https://github.com/DavidColillaMartinez/UchihaBarberWeb). `push.autoSetupRemote` activado (push de ramas nuevas sin `--set-upstream`).
- Historial inicial: `8389229 Initial commit` (creado en GitHub web) → `06dec92 StackInicialUchihaBarberWeb` (base técnica completa; rebase sobre el remoto con conflicto README.md resuelto conservando el README del proyecto).
- Commit solo cuando se pida, tras inspeccionar `git status`/`git diff`; mensajes cortos en español sin tipo ni ámbito (p. ej. `StackInicialUchihaBarberWeb`). Nunca forzar (`--force`).

## Estado del repo

- Varias carpetas del esqueleto (`src/components/*`, `src/features/*`, `src/styles`, `src/data`, `src/config`, `src/assets`) están vacías a propósito; Git no conserva directorios vacíos.
- Archivos generados/locales excluidos de formato en `.prettierignore` y de Git en `.gitignore`.

## Continuidad obligatoria para todas las IAs

1. Leer `PRODUCT.md`, `memoria/README.md`, `memoria/protocolo.md`, `memoria/estado.json` y el relevo indicado en `ultimoRelevo`. Las instrucciones de seguridad del entorno siguen vigentes.
2. Comprobar directorio, `git status --short --branch`, `git rev-parse HEAD` y remoto real. Ejecutar `npm run memoria:check`; si difiere, `npm run memoria:changes` y leer los archivos afectados **antes** de escanear. La primera aplicación sigue `memoria/aplicacion.md`.
3. Identificar alcance autorizado y consultar specs/cambio OpenSpec pertinente. Conocer el roadmap no autoriza a implementarlo. Resolver decisiones técnicas rutinarias compatibles sin pedir confirmación repetida; cambios de composición, tipografía, identidad y comportamiento requieren decisión del usuario.
4. No sobrescribir cambios ajenos. Si el contexto puede haber cambiado, releer archivos y estado antes de editar. Para trabajo simultáneo, usar ámbitos y ramas independientes; Git integra los resultados.
5. Al cerrar, actualizar fuentes canónicas afectadas, estado/mapa/relevo y evidencia real. Formatear archivos tocados; después ejecutar `npm run memoria:scan` y `npm run memoria:check`. Escaneado no significa revisado ni aprobado visualmente.

## OpenCode, OpenSpec e Impeccable

Leer `memoria/integraciones.md`. `openspec/config.yaml` enlaza estas fuentes al flujo SDD. Conservar comandos/skills generados; actualizarlos mediante su herramienta cuando proceda y revisar la integración después. No fabricar cambios OpenSpec manualmente ni duplicar sus tareas en la memoria.

Impeccable y frontend-design aportan técnicas y observaciones; el usuario dirige el diseño. Cargar contexto o ejecutar una auditoría no autoriza a rediseñar, normalizar o pulir otras secciones. No elegir fuentes, recursos, contenido ni patrones por iniciativa propia. No crear backend porque exista una skill de Node. Si una mejora afecta a la visión, explicar razones y esperar su decisión; ejecutar directamente correcciones técnicas ya autorizadas.

Diseño de escritorio primero y móvil después, conservando estructura adaptable, semántica, teclado, foco y movimiento reducido. Un build correcto no demuestra aceptación visual. No inventar datos comerciales, recursos, derechos o integración de Yeasy.

Los nombres de página previstos en features son `home` y `products`. El estado vigente está en `memoria/estado.json`; las carpetas vacías no prueban implementación. No añadir dependencias sin necesidad del alcance actual.

No publicar credenciales, consentimientos ni rutas personales en Git o relevos. No asumir que el remoto se llama origin. El primer commit/push del ensayo de continuidad está completado y confirmado (`memoria/sesiones/SES-003-cierre-ub002.md`); los commit/push siguientes se hacen solo con autorización expresa. No reescribir historia, forzar pushes, descartar cambios o hacer commits no solicitados.
