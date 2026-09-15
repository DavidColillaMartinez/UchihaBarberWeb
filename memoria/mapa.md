# Mapa del proyecto

## Implementado en esta entrega

| Ruta                                   | Función actual                                                       |
| -------------------------------------- | -------------------------------------------------------------------- |
| `src/pages/index.astro`                | Inicio vacío; importa BaseLayout                                     |
| `src/layouts/BaseLayout.astro`         | HTML español con título y slot                                       |
| `public/`                              | Favicons iniciales, no identidad final validada                      |
| `astro.config.mjs`, `tsconfig.json`    | Configuración estática, TS estricto y alias                          |
| `package.json`, `package-lock.json`    | Dependencias y comandos                                              |
| `AGENTS.md`, `PRODUCT.md`              | Comportamiento de agentes y visión                                   |
| `openspec/config.yaml`                 | Contexto y reglas SDD compartidas                                    |
| `openspec/specs/`, `openspec/changes/` | Contenedores iniciales, sin specs/cambios creados                    |
| `.agents/skills/`, `.opencode/`        | Skills/comandos instalados; configuración local no portable excluida |
| `memoria/`, `scripts/memoria/`         | Continuidad, inventario y verificaciones                             |

Dependencia de código observada: inicio → BaseLayout. `generado/archivos.json` da el inventario exacto; `generado/dependencias.json` calcula relaciones documentales por área desde `relaciones.json`, sin analizar imports.

## Destino previsto, sin implementar

Secciones de inicio en `src/features/home/<seccion>/`, catálogo/fichas en `src/features/products/<seccion>/`, compartidos en `src/components/ui/` y `src/components/navigation/`, fundamentos en `src/styles/`, datos en `src/data/`, configuración en `src/config/`. Git no conserva las carpetas vacías locales ni éstas prueban funcionalidad.

Cada sección tendrá Astro, CSS Module y TS cuando lo necesite; las páginas componen secciones, lo repetido se comparte. El layout no acumula estilos de secciones. No crear ahora código de secciones ni un esquema definitivo de producto.

Orden previsto: esqueleto/comportamiento de inicio y enlace provisional a productos; ajuste individual dirigido por el usuario; catálogo/fichas y móvil en sus fases. Sessions pendiente de confirmar. La visión visual vive en `PRODUCT.md`.
