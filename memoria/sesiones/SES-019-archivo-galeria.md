# SES-019 — Archivo del cambio OpenSpec home-galeria

Agente: OpenCode (modelo glm-5.3-flash). Fase: UB-004 (turno: galería, cierre OpenSpec). Modalidad: archivo del cambio solicitado por el responsable («archiva»); sin commits ni push (no solicitados).

## Instrucción recibida

«Archiva». Cambio seleccionado: `home-galeria` (el único activo). Pregunta de sincronización resuelta: «Sincronizar ahora».

## Hecho

- Cierre de tareas pendientes con evidencia real: 5.4 (verificación en navegador) y 6.3 (aceptación visual) confirmadas por el responsable («todo listo», registradas en `SES-018-cierre-galeria`); 6.4 (memoria) con los commits `000a4e1` y `8e256b7`.
- Delta añadida para `home-skeleton` (MODIFIED «Recorrido con ajuste por sección»): resuelve la excepción reservada a Galería en la spec principal («hasta que se trabaje su contenido») — el recorrido la encaja igual que el resto y el ajuste centrado tipo banner queda descartado; los 3 escenarios previos se conservan íntegros y se añade «Galería en el recorrido». `## Purpose` añadido a la delta de la capacidad nueva.
- Sincronización (inline, agent-driven): creado `openspec/specs/home-galeria/spec.md` (Purpose + 5 requisitos ADDED, 19 escenarios) y actualizado el requisito «Recorrido con ajuste por sección» en `openspec/specs/home-skeleton/spec.md`. Verificación requisito a requisito: ADDED presentes, MODIFIED con su cambio y escenarios íntegros; `openspec validate --all`: 7/7 correctas (avisos INFO de requisitos largos, sin consecuencia; existían antes).
- Archivo: `openspec/changes/home-galeria` → `openspec/changes/archive/2026-09-16-home-galeria/` (con `.openspec.yaml`). `openspec list`: sin cambios activos. Tras el movimiento, `openspec validate --all`: 6/6 correctas.
- Memoria: `estado.json` (evidencia apuntando al archivo, alcance con el cierre de SES-018 y el archivado, `ultimoRelevo` a este relevo) y `mapa.md` (specs consolidadas y cambios archivados actualizados).

## No tocado

Código de `src/` (el archivado no toca implementación), specs ajenas, el trabajo sin commitear del bloque de enlaces de reserva (cabecera/información + `SES-011-correccion-enlaces`).

## Comprobaciones

- `openspec validate home-galeria --strict` antes de sincronizar y `openspec validate --all` tras sincronizar y tras archivar.
- Comparación de sincronización verificada contra ambas capacidades antes de mover el cambio.
- Pendiente el SHA del propio commit de este relevo (se registra en el siguiente); commits de Galería previos ya anotados en `estado.json`.

## Pendientes del responsable

- Push (cuando autorice; rama 12 por delante del remoto) y commit de este archivado si se solicita.
- Cierre del bloque ajeno de los enlaces de reserva (BookingLink en cabecera/información).

## Estado

UB-004 en curso: Galería implementada, aceptada, con commits y cambio archivado con deltas sincronizadas. Sin commits de este turno (no solicitados).
