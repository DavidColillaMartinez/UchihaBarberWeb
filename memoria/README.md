# Memoria compartida

Punto de continuidad para OpenCode, Codex y cualquier IA con acceso a **esta copia del repositorio**. Git distribuye cambios mediante commit, push y fetch/pull. No hay comunicación simultánea entre modelos ni acceso automático al ordenador del usuario.

## Orden de lectura

1. `AGENTS.md` y `PRODUCT.md` en raíz.
2. `memoria/protocolo.md` y `memoria/estado.json`.
3. El relevo indicado en `ultimoRelevo` y `memoria/roadmap.md`.
4. `memoria/mapa.md`, `memoria/integraciones.md` y specs/archivos del alcance actual.
5. Ejecutar `npm run memoria:check`; si difiere, `npm run memoria:changes` y revisar antes de escanear.

## Fuentes canónicas

| Fuente                         | Responsabilidad                                              |
| ------------------------------ | ------------------------------------------------------------ |
| Instrucción actual del usuario | Alcance y decisiones de diseño                               |
| `AGENTS.md`                    | Entrada y comportamiento de todas las IAs                    |
| `PRODUCT.md`                   | Identidad, visión y límites; contexto de Impeccable          |
| `openspec/config.yaml`         | Conecta estas fuentes al flujo SDD                           |
| `openspec/specs/`              | Requisitos consolidados cuando existan                       |
| `openspec/changes/`            | Artefactos y tareas de cada cambio                           |
| `memoria/estado.json`          | Estado único de fases, dependencias, criterios y relevo      |
| `memoria/roadmap.md`           | Reglas del roadmap, no otra lista de tareas                  |
| `memoria/mapa.md`              | Arquitectura real y destino previsto, diferenciados          |
| `memoria/decisiones/`          | Decisiones duraderas y procedencia                           |
| `memoria/sesiones/`            | Evidencias, pendientes y traspaso entre agentes              |
| `memoria/relaciones.json`      | Dependencias documentales declaradas por área                |
| `memoria/generado/`            | Inventario calculado SHA-256 y referencia Git; no aprobación |

No se crea un `DESIGN.md` global que duplique `PRODUCT.md`. El `design.md` de cada cambio OpenSpec recoge decisiones técnicas de su alcance cuando el esquema lo requiere. Si en el futuro se separa una fuente visual, trasladar contenido y actualizar referencias, sin copias contradictorias.

## Automatización y límites

Scripts Node estándar, sin dependencias ni hooks. `scan` escribe solo `generado/`; `check` y `changes` son de lectura. Ninguno modifica Git. El protocolo depende de que cada IA lo siga; no es un bloqueo de seguridad ni una sincronización automática. Para una IA que no carga AGENTS, adjuntar estos documentos y pedir su lectura.

El mapa de dependencias es declarado por áreas, no un análisis AST. Los hashes detectan cambios de bytes, no corrección semántica. La primera ejecución de OpenCode y la compatibilidad efectiva de la CLI OpenSpec quedan pendientes hasta comprobarlas en el equipo del usuario.
