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
- La memoria compartida se mantiene en `memoria/`, con protocolo, estado, mapa, relevos e inventario SHA-256. Su primera validación local está pendiente. Git transporta los cambios; no hay sincronización automática entre agentes. Leer `memoria/README.md` antes de trabajar.

## Capabilities and Constraints

Páginas y alcance:

- Inicio, catálogo de productos y ficha individual por producto. Posible página independiente "Sessions" para contenido audiovisual de marca (inclusión y ubicación sin confirmar; si se confirma, tendría sección de acceso en inicio, quizá entre Productos y Opiniones).
- No hay venta online, carrito, pagos ni cuentas de usuario. No añadir filtros avanzados, buscador ni funciones de comercio por iniciativa propia.

Reservas y datos reales:

- Sistema externo: https://yeasy.io/commerce/7b8627f1-9c5e-46a6-ab95-ef6e0e1b87da . Los enlaces a servicios concretos dependen de las posibilidades reales de Yeasy; no asumir API, integración embebida ni funcionalidades sin comprobarlas.
- Ubicación confirmada por el responsable: Torrejón de Ardoz, Madrid. Dirección detallada, horarios y precios deben validarse antes de publicarlos.
- No inventar reseñas, puntuaciones, horarios, teléfonos ni datos comerciales. Los ejemplos de servicios (corte de pelo, corte y barba, corte de niño, corte de jubilado) no constituyen una lista comercial validada y no deben publicarse con precios inventados. La lista real de productos se facilitará; no inventarla.

Dirección de comportamiento por sección (pendiente de concreción al implementar; no convertir en requisitos definitivos):

- Navegación: visible al entrar; desaparece gradualmente al hacer scroll hacia abajo, reaparece gradualmente al subir, con retraso previsto de 0,3 s. Destinos previstos: Servicios (con Galería relacionada), Productos, Opiniones, Información y, si se confirma, Sessions.
- Inicio/cabecera: vídeo de la barbería con desenfoque y tratamiento en blanco y negro; nombre "Uchiha Barber"; acceso a pedir cita. Composición y textos adicionales por definir.
- Servicios: palabra "Servicios" a gran escala de extremo a extremo con relleno de vídeo (el audiovisual solo se ve dentro de las letras); bloque con espacio superior/inferior aproximado del 20 % de pantalla; al alcanzar el punto de scroll previsto, el título se adapta a la mitad izquierda y la lista de servicios aparece desde abajo en la mitad derecha; cada fila con nombre al centro y precio a la derecha; en hover la fila invierte a fondo negro/texto blanco extendiéndose desde el centro hasta el extremo derecho, con descripción en lugar del nombre y llamada "Reserva ya" enlazada al sistema de reservas; el vídeo dentro de las letras podría responder al servicio seleccionado. Reproducción del vídeo pendiente de decidir (bucle continuo vs. saltos a segmentos por servicio): no elegir todavía ni implementar ambas.
- Galería: tira o banner de extremo a extremo relacionada con Servicios que lo separa de Productos; transición del fondo blanco al negro con fundido de ~1 s cuando la sección alcanza ~50 % de entrada en pantalla (punto exacto por concretar).
- Acceso a Productos: ~40 % izquierda contenido / 60 % derecha vídeo que llena su bloque; palabra "Productos" vertical, de abajo hacia arriba, con gran protagonismo; breve descripción y botón "Conócelos" hacia el catálogo.
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
- Compromisos visuales vinculantes: blanco y negro como base; tipografía de gran escala con función compositiva (familia aún no elegida; puede variar por sección — no fijar una familia definitiva ni forzar una única fuente; coherencia mediante escala, espaciado, alineación, contraste y comportamiento); vídeos como parte del lenguaje visual, incluido su uso dentro de letras; composiciones amplias, bloques de extremo a extremo y contraste entre secciones; movimiento intencional que explique la transformación de la composición; productos con fondos transparentes integrados en la página; evitar por defecto tarjetas, bordes redondeados, sombras, degradados decorativos, insignias y patrones visuales genéricos.

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
