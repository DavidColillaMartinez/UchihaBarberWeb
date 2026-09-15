# Mapa del proyecto

## Implementado en esta entrega

| Ruta                                                                                     | Función actual                                                         |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `src/pages/index.astro`                                                                  | Inicio: compone navegación + secciones provisionales en su orden       |
| `src/pages/productos/index.astro`                                                        | Página provisional de productos (`/productos`), destino del enlace     |
| `src/layouts/BaseLayout.astro`                                                           | HTML español, fundamentos globales, skip link y `description` opcional |
| `src/styles/global.css`                                                                  | Base/reset, variables mínimas, foco visible y movimiento reducido      |
| `src/components/navigation/SiteNav.astro`                                                | Navegación compartida con anclas, `/productos` y reservas              |
| `src/components/ui/ProvisionalNote.astro`                                                | Aviso provisional compartido por secciones                             |
| `src/features/home/{cabecera,servicios,galeria,acceso-productos,opiniones,informacion}/` | Secciones provisionales de inicio (Astro + CSS Module)                 |
| `src/features/products/provisional/`                                                     | Contenido provisional de la página de productos                        |
| `public/`                                                                                | Favicons iniciales, no identidad final validada                        |
| `astro.config.mjs`, `tsconfig.json`                                                      | Configuración estática, TS estricto y alias                            |
| `package.json`, `package-lock.json`                                                      | Dependencias y comandos                                                |
| `AGENTS.md`, `PRODUCT.md`                                                                | Comportamiento de agentes y visión                                     |
| `openspec/config.yaml`                                                                   | Contexto y reglas SDD compartidas                                      |
| `openspec/specs/`, `openspec/changes/`                                                   | Specs sin consolidar; cambio `esqueleto-inicio-productos` en curso     |
| `.agents/skills/`, `.opencode/`                                                          | Skills/comandos instalados; configuración local no portable excluida   |
| `memoria/`, `scripts/memoria/`                                                           | Continuidad, inventario y verificaciones                               |

Dependencia de código observada: inicio y productos → BaseLayout → fundamentos globales; inicio → SiteNav + secciones de `features/home`; productos → SiteNav + `features/products/provisional`. `generado/archivos.json` da el inventario exacto; `generado/dependencias.json` calcula relaciones documentales por área desde `relaciones.json`, sin analizar imports.

## Destino previsto, sin implementar

Ajuste visual individual de cada sección de inicio en `src/features/home/<seccion>/` (vídeo en Servicios, transición Servicios–Galería, animaciones); catálogo y fichas en `src/features/products/`; datos en `src/data/`; configuración en `src/config/`. Git no conserva las carpetas vacías locales ni éstas prueban funcionalidad.

Cada sección tiene ya su Astro y su CSS Module; las páginas componen secciones y lo repetido se comparte (`SiteNav`, `ProvisionalNote`). El layout no acumula estilos de secciones. El esquema definitivo de producto no está creado.

Orden previsto: cabecera de inicio primero, después el resto de secciones en su turno; catálogo/fichas y móvil en sus fases. Sessions pendiente de confirmar. La visión visual vive en `PRODUCT.md`.
