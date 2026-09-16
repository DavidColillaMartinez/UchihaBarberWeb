# SES-011 — Corrección general de enlaces externos (pestaña nueva)

Agente: OpenCode (modelo deepseek-v4.1-flash). Fase: UB-004. Modalidad: mantenimiento directo autorizado por el responsable. Sin commit (opción 1 acordada: cabecera y Servicios contienen trabajo paralelo sin commit).

## Decisión del responsable

Todo enlace que lleve a otra página debe abrirse en una pestaña nueva sin sacar al usuario de la web. A sugerencia suya, el linkeo se centraliza en un componente compartido en lugar de repetir la URL y el ancla en cada sección.

## Implementado

- **Nuevo `src/components/ui/BookingLink.astro`** (+ módulo): única fuente de la URL confirmada de reservas (`PRODUCT.md`), `target="_blank"` con `rel="noopener noreferrer"`, aviso para lectores de pantalla «(se abre en una pestaña nueva)» y `class` opcional para el estilo de cada sección. Conserva la nota pendiente de comprobar si Yeasy permite enlaces por servicio.
- **Usos** (sustituyendo el ancla y eliminando la constante `bookingUrl` duplicada de cada archivo): CTA de `Cabecera.astro`, cada fila de `Servicios.astro` (ocho servicios) y el enlace de `Informacion.astro`. El resto de esos archivos queda intacto, incluido el script y la estructura de Servicios.
- El aviso oculto usa posición absoluta y recorte, de modo que no ocupa celda ni altera la cuadrícula de las filas de Servicios.

## Comprobaciones

- HTML emitido: **10 enlaces externos** en inicio (1 cabecera + 8 servicios + 1 información), todos con `target="_blank"` y `rel="noopener noreferrer"` y su aviso oculto; `/productos` no tiene enlaces externos. Regla del aviso emitida con `position:absolute`.
- Prettier correcto en los archivos tocados.
- `npm run build` directo (`npx astro build`): compila y genera 2 páginas.
- **Bloqueo ajeno detectado**: `npm run check`/`npm run build` fallan por un error de tipos en `src/features/home/galeria/Galeria.astro` (`disableremoteplayback` → `disableRemotePlayback`), de la sesión de galería actualmente en curso. No se ha tocado ese archivo; se informa para que su sesión lo corrija.

## Pendiente

Sin commit (se publicará junto con los bloques paralelos). Estado Git al cerrar este bloque: `main` local **6 commits por delante** del remoto `UchihaBarberWeb/main` (commits de las sesiones de cabecera/intro/tipografías, sin publicar), y con trabajo en curso sin commit de galería y de ajustes de hover de Servicios. El cambio de este bloque (`Cabecera.astro` e `Informacion.astro` son los únicos archivos donde es el único delta) es separable y publicable por sí solo si se pide. Ninguna sección queda aprobada por esta corrección. Si en el futuro se añaden más enlaces externos (perfiles oficiales), deben usar el mismo componente.
