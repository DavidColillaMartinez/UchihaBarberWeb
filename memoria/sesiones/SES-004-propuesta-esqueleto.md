# SES-004 — Propuesta del esqueleto de inicio y productos

Agente: OpenCode (modelo deepseek-v4.1-flash), continuación de SES-003 en la misma sesión. Fase: UB-003 en definición. Modalidad: planificación SDD autorizada; sin implementación en este bloque.

## Procedencia

Base Git al iniciar el bloque: `e73607e17101c64cb4931f913c1b968e2b32ae9c` (Cierra UB-002 y registra la publicación confirmada), rama `main`, remoto `UchihaBarberWeb` sincronizado. Sin cambios ajenos detectados.

## Cierre de cimientos (commit `e73607e`)

Relevo SES-003 incorporado, UB-002 aprobada, menciones vigentes actualizadas (PRODUCT, AGENTS, memoria/README, integraciones, roadmap) y continuidad intra-conversación explicitada en `memoria/protocolo.md`. Comprobaciones: memoria:scan/check/test correctos, formato Prettier revisado, commit y push reales (`fe817cc..e73607e`) y memoria:check vigente tras publicar.

## Propuesta OpenSpec

- Cambio creado con la CLI 1.13.0: `esqueleto-inicio-productos` (esquema `spec-driven`), enlazado a UB-003. Artefactos completos: `proposal.md`, `specs/home-skeleton/spec.md`, `specs/products-page/spec.md`, `design.md` y `tasks.md`; `openspec validate` correcto.
- **Contexto OpenSpec verificado de extremo a extremo para instrucciones**: `openspec instructions` (proposal/specs/design/tasks) devuelve el `context` del `config.yaml` y las reglas del proyecto; la comprobación que quedó pendiente en SES-002/SES-003 está satisfecha para la generación de artefactos. El ciclo `apply`/`archive` completo se observa cuando el usuario autorice aplicar.
- Decisiones del usuario registradas en la propuesta: acceso a reservas en navegación e Información; ruta provisional `/productos`. Sessions sigue sin incluirse.
- SEO y accesibilidad encaminados en design.md (semántica, un `h1`, jerarquía, foco por teclado, movimiento reducido, meta description provisional sin textos comerciales); sitemap/robots diferidos a fase con contenido real para no añadir dependencias sin necesidad.

## Pendientes y siguiente paso

La implementación no comienza en este bloque: requiere indicación del usuario (`/opsx-apply`). Antes de implementar lo ambiguo (comportamiento de navegación y recorrido), se presentarán las variantes al responsable. UB-003 permanece en definición hasta aplicar y verificar. Ninguna sección queda aprobada ni el esqueleto implementado por esta planificación.
