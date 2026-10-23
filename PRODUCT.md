# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (generación estática), TypeScript, CSS nativo con CSS Modules por sección, GSAP con ScrollTrigger para las animaciones que lo requieran. Despliegue en Vercel vinculado a GitHub. Recursos audiovisuales servidos desde un directorio propio en un VPS Linux existente. Catálogo de productos desde JSON local con páginas generadas en compilación.

## Users

Cliente actual de Uchiha Barber, barbería de Torrejón de Ardoz (Madrid). Objetivo prioritario: transmitir la identidad de Uchiha, reforzar el vínculo con sus clientes y hacer que se sientan identificados con la marca. Captar nuevos clientes es objetivo secundario.

## Product Purpose

Web de la barbería que permite conocer los servicios, consultar precios, acceder al sistema externo de reservas, descubrir trabajos y contenido audiovisual, explorar los productos que la barbería utiliza y ofrece, y consultar opiniones e información del negocio.

## Positioning

Identidad visual reconocible y propia: no es una plantilla genérica de barbería ni una landing dominada por mensajes comerciales, tarjetas repetidas o botones de reserva en cada bloque. La composición, la tipografía, el movimiento y el material audiovisual son fundamentales para comunicar la marca; la reserva debe ser accesible sin dominar la experiencia.

## Operating Context

- Trabajo por etapas y por secciones, dirigido por el responsable del proyecto (director de diseño): primero base técnica, después estructura general y comportamiento de inicio, después desarrollo y ajuste individual de cada sección.
- No anticipar secciones pendientes ni "completar" el sitio por iniciativa propia. Conocer la visión completa no autoriza a construirla: se espera una instrucción explícita de implementación y solo se actúa sobre el alcance indicado.
- El director de diseño tiene la autoridad: los criterios y recomendaciones de diseño están subordinados a sus instrucciones explícitas. Se puede señalar problemas y proponer alternativas justificadas, pero una sugerencia no equivale a permiso para aplicarla; si afecta a composición, identidad, tipografía o comportamiento indicado, se consulta antes de modificar.
- Si se detecta un problema de legibilidad, rendimiento, accesibilidad o viabilidad: explicarlo y proponer un ajuste que preserve la intención original.
- La dirección detallada por sección (resumida en Capabilities and Constraints) fue descrita por el responsable; las ambigüedades se consultarán al llegar el momento de implementar cada sección.
- OpenCode y las skills OpenSpec ya tienen archivos inicializados en este repositorio. Conservar su generación oficial; `AGENTS.md`, `openspec/config.yaml` y `memoria/integraciones.md` conectan las reglas sin duplicar tareas ni alterar skills por defecto. Impeccable conserva este documento como contexto de producto; su configuración local no se comparte.
- La memoria compartida se mantiene en `memoria/`, con protocolo, estado, mapa, relevos e inventario SHA-256. Su primer ensayo real (aplicación, revisión, commit y push) está confirmado; el registro está en `memoria/sesiones/`. Git transporta los cambios; no hay sincronización automática entre agentes. Leer `memoria/README.md` antes de trabajar.

## Capabilities and Constraints

Páginas y alcance:

- Inicio, catálogo de productos y ficha individual por producto. Sessions confirmada: sección de acceso en inicio entre Productos y Opiniones y página independiente `/sessions`, provisional como `/productos`. Planificada en SES-039 e implementada por petición expresa posterior (SES-040), pendiente de aceptación visual; cambio `openspec/changes/home-acceso-sessions/` activo.
- No hay venta online, carrito, pagos ni cuentas de usuario. No añadir filtros avanzados, buscador ni funciones de comercio por iniciativa propia.

Reservas y datos reales:

- Sistema externo: https://yeasy.io/commerce/7b8627f1-9c5e-46a6-ab95-ef6e0e1b87da . Los enlaces a servicios concretos dependen de las posibilidades reales de Yeasy; no asumir API, integración embebida ni funcionalidades sin comprobarlas.
- Ubicación confirmada por el responsable: Torrejón de Ardoz, Madrid. Dirección detallada, horarios y precios deben validarse antes de publicarlos.
- No inventar reseñas, puntuaciones, horarios, teléfonos ni datos comerciales. Los ejemplos de servicios (corte de pelo, corte y barba, corte de niño, corte de jubilado) no constituyen una lista comercial validada y no deben publicarse con precios inventados. La lista real de productos se facilitará; no inventarla.

Estado de la dirección visual:

Adaptación móvil de Productos autorizada en SES-045: hasta 68rem, vídeo primero con proporción 16:10 y márgenes simétricos como Sessions; debajo titular vertical compacto a la izquierda, descripción sin margen superior y alineada a la izquierda, y Conócelos bajo la descripción. Sustituye solo en este rango las reglas de composición de escritorio. Galería extiende el fundido inferior 1px sobre la junta para evitar líneas de rasterización. Escritorio y Sessions no se modifican; pendiente de aceptación visual.

- Las decisiones vigentes de Cabecera, Entrada, Navegación, Servicios y Galería están consolidadas en `openspec/specs/`; sus rutas, aprobación y relevos figuran en `memoria/bloques.json`. Ante una evolución autorizada, actualizar esa fuente y este resumen; conservar el proceso en los relevos históricos.
- Cabecera, cruce de entrada, navegación, Servicios y Galería fueron aceptados para la versión demo (SES-020). General Sans queda elegida como familia tipográfica vigente; el material profesional, catálogo y móvil siguen pendientes.
- Acceso a Productos está implementado en su versión demo (SES-035) y pendiente de aceptación visual: no se considera aprobado ni consolidado.
- Acceso a Sessions y destino provisional implementados en demo (SES-040), pendientes de aceptación visual y editorial. Sus requisitos viven en los deltas del cambio activo `home-acceso-sessions`; consolidación y archivo pendientes tras la aceptación, sin atribuir ese estado a las specs principales.
- General Sans y los vídeos en `public/` son recursos autoalojados de la demo. La familia procede de Fontshare/Indian Type Foundry y se sirve desde `public/fonts/general-sans/` bajo la ITF Free Font License (FFL), cuyo texto se conserva en `public/fonts/general-sans/LICENSE.txt`. El destino previsto del audiovisual profesional sigue siendo el VPS. No confundir esta excepción temporal de vídeo con una autorización para importar otros recursos.

Dirección por sección (decisiones vigentes donde ya hubo desarrollo; intenciones pendientes para las demás):

Corrección vigente de Sessions (SES-041): descripción en General Sans Semibold Italic 600 como Productos, centrada verticalmente respecto al h2 en composición lateral. «Descúbrelas» conserva su altura y centra su eje horizontal bajo el hueco descripción/titular. El fondo conserva una fuga negra pequeña (no se sustituye negro por blanco) y una franja estática cruza la junta con Productos para mezclar los colores, sin filtros sobre contenido ni editar Productos. Sustituye las concreciones visuales iniciales de SES-040; pendiente de aceptación visual.

- Navegación: bloque demo aceptado, con integración sobre la cabecera, adaptación de contraste y comportamiento de aparición/desaparición al recorrer la página. Los requisitos vigentes están en `site-navigation` y el recorrido compartido en `home-skeleton`, incluida la excepción de Servicios. Los destinos futuros solo se añaden cuando existan y estén autorizados.
- Inicio/cabecera: composición demo aceptada con vídeo a pantalla completa y el nombre solo accesible; el acceso a cita vive en la barra de la portada y la navegación, y el cruce de entrada usa el logo de la marca. Se repite en cada carga; véanse `home-cabecera` y `home-intro`. General Sans queda fijada; el material profesional sigue pendiente; no reabrir la composición aprobada por iniciativa propia.
- Servicios: diseño demo aceptado, consolidado en `home-servicios`. Título con vídeo a la izquierda y lista a la derecha tras la transformación; título estable al desplegar las filas; hover/foco con descripción y acceso a reservas. Excepción aprobada: no hay snap dentro de Servicios. El vídeo actual usa reproducción nativa en bucle sin respuesta por servicio; la decisión definitiva de bucle frente a segmentos sigue pendiente y no autoriza implementar saltos. Los precios proceden de la consulta de Yeasy registrada en los relevos; no presuponer que sigan actualizados indefinidamente.
- Galería: carrusel demo aceptado de 12 clips únicos, circular, con movimiento lateral por scroll de entrada/salida y flechas que mueven solo el carrusel. La sección conserva snap de página y fundido reversible del fondo. Ajuste dirigido SES-042: degradado superior que mezcla el blanco de Servicios con el fondo cuando se oscurece; invisible sobre blanco, sin cambios de altura ni comportamiento y pendiente de aceptación visual. Ajuste SES-043: degradado inferior hacia el negro de Productos, visible sobre blanco e indistinguible sobre negro, sincronizado por composición con el fondo existente y pendiente de aceptación visual. `home-galeria` recoge los requisitos vigentes; la idea inicial de banner no debe restaurarse como si siguiera pendiente.
- Acceso a Productos: composición demo implementada, pendiente de aceptación visual: ~40 % izquierda contenido / 60 % derecha vídeo, que se presenta dentro de su mitad con margen sobre el fondo del bloque; palabra "Productos" vertical, de abajo hacia arriba, con gran protagonismo; descripción alineada a la derecha con margen superior de 6rem y botón "Conócelos" centrado con texto de 1.4rem hacia el catálogo (ajustes del responsable, SES-044). Control de pausa dentro de la esquina inferior derecha del vídeo, con separación interior de 1rem. El bloque es oscuro, de una pantalla, con un degradado que va de un gris medio al negro, y el titular es texto real con General Sans (no condensada). El vídeo actual (`CorteDePelo1`) y el texto de la descripción son material demo pendientes de sustitución o redacción definitiva. Los requisitos vigentes están en `home-acceso-productos`.
- Acceso a Sessions: referencia local del cliente `ContenidoDemo/ImagenDemoSeccionSesions.jpeg`, interpretada en horizontal sin interfaz de Instagram: audiovisual a la izquierda, descripción y titular a la derecha y llamada debajo. «UCHIHA / BARBER / SESSION / PLACES» en cuatro líneas con General Sans; «Descúbrelas» enlaza a `/sessions` provisional. Demo implementada con `CorteDePelo1.mp4`, su cartel existente y encuadre centrado `cover`; descripción demo generada pendiente de aprobación editorial y material final. Fondo neutro de iluminación inversa y más luminosa respecto a Productos, sin modificar el bloque anterior; excepción dirigida al criterio de evitar degradados por defecto. Apilado móvil audiovisual/contenido implementado como propuesta pendiente de revisión visual. Normas y tareas en `home-acceso-sessions`; no se añaden opciones al menú, nuevas animaciones ni contenido definitivo.
- Catálogo: escaparate informativo; ~20 % izquierda para categorías (Todos, Styling, Cuidado capilar, Barba y afeitado, Herramientas, Infantil), derecha galería de productos; filtro por categoría; variación/ampliación vertical de la tipografía de categoría en hover/selección conservando anchura; productos con imágenes de fondo transparente integradas y su nombre; ligera ampliación en hover; cada producto enlaza a su ficha.
- Ficha de producto: referencia estructural https://www.yunsey.com/productos-peluqueria/balsamo/ — solo organización, adaptada a la identidad de Uchiha; no copiar estética ni contenido.
- Opiniones e Información: previstas en el inicio; diseño y comportamiento sin definir.

Técnica:

- Componentes, estilos y comportamiento organizados de forma independiente por sección; elementos repetidos como componentes compartidos; estilos globales limitados a fundamentos comunes.
- Idioma: español de España.

## Brand Commitments

- Nombre confirmado: Uchiha Barber.
- Voz: cercana, segura y con personalidad; evitar textos genéricos de marketing, exageraciones y frases que podrían pertenecer a cualquier barbería.
- Logo: el existente en los perfiles oficiales — Instagram https://www.instagram.com/uchiha.barber/ y Google https://maps.app.goo.gl/mADNJ5MLBfCiSrPCA . El archivo del logo debe facilitarse para trabajar con él: no reconstruirlo, sustituirlo ni reinterpretarlo por iniciativa propia. No presuponer que esos perfiles pueden consultarse íntegramente; si un recurso no está disponible, indicarlo y solicitar el material.
- El nombre Uchiha no autoriza por sí solo a incorporar personajes de Naruto, símbolos adicionales, ilustraciones anime, colores rojos ni estética japonesa; cualquier extensión de ese universo visual requiere decisión expresa del responsable.
- Compromisos visuales vinculantes: blanco y negro como base; General Sans como familia tipográfica única autoalojada, con tipografía de gran escala y función compositiva; Bold `700` en titulares; Medium `500` en botones, navegación y llamadas a la acción; Regular `400` en nombres, etiquetas y lectura; Semibold `600` en énfasis y precios; Semibold Italic `600` para textos especiales; Light `300` solo en descripciones informativas, avisos legales y copias secundarias grandes, nunca si perjudica la legibilidad. La jerarquía puede variar por sección mediante peso, escala, espaciado, alineación, contraste y comportamiento, sin introducir otra familia por iniciativa propia. Vídeos como parte del lenguaje visual, incluido su uso dentro de letras; composiciones amplias, bloques de extremo a extremo y contraste entre secciones; movimiento intencional que explique la transformación de la composición; productos con fondos transparentes integrados en la página; evitar por defecto tarjetas, bordes redondeados, sombras, degradados decorativos, insignias y patrones visuales genéricos.

## Evidence on Hand

- Logo en perfiles oficiales (Instagram y Google Maps, enlaces en Brand Commitments); archivo pendiente de facilitar por el responsable.
- Se producirá material profesional con un fotógrafo; antes se facilitarán demos para desarrollar y validar las composiciones; los recursos finales sustituirán a los provisionales en el VPS.
- La implementación debe facilitar la sustitución de demos por recursos finales y permitir revisar sus encuadres.
- Ausencias que el trabajo futuro no debe fabricar: no usar fotografías de stock como identidad definitiva de Uchiha; no inventar material, derechos de uso ni URLs.

## Product Principles

- La visión del director de diseño manda: ejecutarla con precisión, no sustituirla por preferencias estéticas propias.
- Identidad antes que conversión: la reserva es accesible, pero la expresión de marca lidera la experiencia.
- Progresión controlada: una sección a la vez, bajo instrucción explícita, sin anticipar lo pendiente.
- Explicar problemas (legibilidad, rendimiento, accesibilidad, viabilidad) y proponer ajustes que preserven la intención original, sin aplicarlos sin aprobación.

## Accessibility & Inclusion

- Los comportamientos basados en hover necesitarán equivalentes para interacción táctil y teclado.
- Legibilidad, acceso al contenido y preferencias de movimiento reducido deben acompañar la dirección visual.
- La experiencia parte de escritorio con composiciones amplias; después se diseñará la adaptación móvil buscando la mayor fidelidad posible. Esto no autoriza decisiones que bloqueen la versión móvil: mantener estructura adaptable.
