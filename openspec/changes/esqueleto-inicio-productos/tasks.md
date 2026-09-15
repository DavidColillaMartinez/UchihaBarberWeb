## 1. Fundamentos y navegación

- [ ] 1.1 Definir ids estables de anclaje por sección y estructura base de la navegación compartida en `src/components/navigation/`, verificando que enlaces internos y a `/productos` existen (comprobación: `npm run build` y revisión del HTML generado)
- [ ] 1.2 Añadir acceso de reservas como enlace externo a la URL confirmada en `PRODUCT.md`, accesible por teclado, sin embeds ni parámetros de Yeasy no comprobados (comprobación: revisión del enlace en HTML y destino manual)
- [ ] 1.3 Revisar fundamentos globales de accesibilidad en `src/styles/`: foco visible, `prefers-reduced-motion` y skip link, sin acumular estilos de secciones en el layout (comprobación: recorrer la página solo con teclado)

## 2. Secciones provisionales de inicio

- [ ] 2.1 Crear carpeta y componente de cada sección en `src/features/home/<seccion>/` con su CSS Module: navegación, cabecera, Servicios, Galería, acceso a Productos, Opiniones e Información, con estructura provisional mínima reconocible y jerarquía de encabezados con un único `h1` (comprobación: render de `/` con las siete secciones en orden)
- [ ] 2.2 Señalizar en el código las ausencias de material real (Galería, Opiniones, horarios, dirección) sin inventar datos, precios ni textos comerciales (comprobación: revisión del código y de la página renderizada)
- [ ] 2.3 Componente compartido solo si existe repetición real; registrar qué se comparte y por qué (comprobación: revisión de `src/components/` tras implementar)

## 3. Página provisional de productos

- [ ] 3.1 Crear `src/pages/productos/index.astro` con componente provisional en `src/features/products/`, enlace de retorno a inicio y navegación compartida (comprobación: `npm run build` y acceso a `/productos`)
- [ ] 3.2 Verificar que la página no contiene datos comerciales ni funciones de venta y documenta su estado provisional (comprobación: revisión de la página renderizada)

## 4. Comportamiento pendiente de concretar

- [ ] 4.1 Presentar al responsable las variantes de comportamiento general de navegación y recorrido de página (anclas, visibilidad de la nav) con sus implicaciones, y registrar la decisión (comprobación: decisión anotada en memoria/relevo antes de implementar lo ambiguo)
- [ ] 4.2 Implementar solo los comportamientos concretados, sin anticipar animaciones ni transformaciones reservadas a su turno (comprobación: diff limitado al comportamiento aprobado)

## 5. Verificación y cierre

- [ ] 5.1 Verificación técnica completa: `npm run build` sin errores, enlaces internos válidos, teclado y movimiento reducido comprobados, CSS Modules por sección (comprobación: build + revisión manual registrada)
- [ ] 5.2 Actualizar memoria: mapa, estado, relevo con lo implementado y lo provisional, tras revisión del diff (comprobación: `npm run memoria:check` vigente)
- [ ] 5.3 Presentar al responsable la forma de revisar el esqueleto y esperar su aceptación antes de marcarlo aprobado; diferenciar validación técnica de aceptación (comprobación: aceptación registrada en relevo)
