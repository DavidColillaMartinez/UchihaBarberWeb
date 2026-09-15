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

- Verificación completa: `npm run format:check && npm run check && npm run build`.
- No hay suite de tests: la verificación disponible es `check` + `build`.

## Entorno

- Node definido en `.nvmrc` (22.12.0); `engines` exige `>=22.12.0 <25` (requisito de Astro 7).
- Solo npm como gestor. Conservar `package-lock.json`. Nunca `--force` ni `--legacy-peer-deps`; si hay conflicto de dependencias, informar antes de forzar.

## Convenciones

- Rutas en `src/pages/`. Cada sección vive en `src/features/<seccion>/` con su componente Astro, su CSS Module y su TypeScript co-localizados en la misma carpeta.
- Componentes reutilizables en `src/components/ui/` y `src/components/navigation/`. Alias `@/* → src/*` (tsconfig, strict de Astro).
- Estilos globales solo base, reset y variables compartidas en `src/styles/`. El aislamiento por sección se logra con CSS Modules, no con separar archivos CSS globales.
- Catálogo de productos: se construirá después desde JSON local en `src/data/` con generación estática; su esquema no está definido, no lo inventes.
- Salida estática, sin adaptador de servidor. GSAP (con ScrollTrigger incluido en el mismo paquete) para animaciones; no añadir otros motores de scroll.

## Estado del repo

- Sin `git init` todavía: no crear commits ni remotos sin instrucción explícita.
- Varias carpetas del esqueleto (`src/components/*`, `src/features/*`, `src/styles`, `src/data`, `src/config`, `src/assets`) están vacías a propósito; Git no conserva directorios vacíos.
- Archivos generados/locales excluidos de formato en `.prettierignore` y de Git en `.gitignore`.
