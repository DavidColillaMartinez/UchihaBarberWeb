## 1. Navegación fusionada

- [x] 1.1 Convertir `SiteNav` en overlay: fijo arriba, centrado, sin fondo ni borde, `mix-blend-mode: difference` con texto blanco, conservando accesibilidad y enlaces (comprobación: revisión del HTML/CSS generado y del nav sobre secciones claras y oscuras)
- [x] 1.2 Desvanecimiento por dirección de scroll con GSAP ScrollTrigger: gradual al bajar, reaparición al subir con retardo ~0,3 s, visible al inicio de página (comprobación: recorrido manual de scroll en dev/preview)
- [x] 1.3 Movimiento reducido: nav siempre visible sin transiciones (comprobación: navegar con `prefers-reduced-motion: reduce`)

## 2. Estructura y recorrido de la index

- [x] 2.1 Secciones como espacio de viewport desde la composición de la página (`min-height: 100svh` con reserva), sin tocar cabecera ni módulos de sección (comprobación: revisión del render de `/`)
- [x] 2.2 Snap por proximidad en el scroller con alineación al inicio de sección, coherente con las anclas; scroll libre fuera de los límites (comprobación: recorrido manual de scroll y clic de anclas)
- [x] 2.3 Verificar que la página de productos conserva el nav compartido y sin cambios de contenido (comprobación: revisión de `/productos`)

## 3. Verificación y cierre

- [x] 3.1 Verificación técnica: `npm run build` sin errores, formato correcto en archivos tocados, teclado y foco intactos (comprobación: build + revisión registrada)
- [x] 3.2 Actualizar memoria (estado, mapa si procede, relevo) tras revisar el diff (comprobación: `npm run memoria:check` vigente)
- [x] 3.3 Presentar al responsable la revisión visual del desvanecimiento y del snap; registrar su aceptación o el paso al plan B (comprobación: decisión anotada en relevo)
