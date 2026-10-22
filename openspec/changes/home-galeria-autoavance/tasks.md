## 1. Avance automático

- [x] 1.1 Temporizador de ~2 s en cadena que avanza un panel por tic, activo solo con la sección encuadrada (umbral 25 %, el de las flechas) y con movimiento normal; tics saltados con pestaña oculta (comprobación: `setTimeout` y `document.hidden` en el bundle generado)
- [x] 1.2 Cada pulsación de flecha reinicia el contador (comprobación: `programarAuto()` tras `avanzar()`; el scroll no lo altera, decisión del responsable)
- [x] 1.3 Sin JavaScript o con movimiento reducido el autoavance no existe y la tira sigue navegable con flechas (comprobación: `autoActivo()` y escucha de cambio de preferencia)

## 2. Verificación y cierre

- [x] 2.1 Verificación técnica: `npm run build` correcto, detector mecánico Impeccable sin hallazgos, OpenSpec válido y Prettier aplicado (comprobación: comandos del relevo)
- [x] 2.2 Revisar la salida generada: temporizador en el bundle y nada del encaje revertido (comprobación: `dist/`)
- [x] 2.3 Altura de la tira: la propuesta de 55 svh en escritorio se revisó en local, resultó demasiado grande y quedó **descartada**; la tira conserva los 38 svh vigentes y el CSS vuelve a su estado comprometido anterior (comprobación: `git diff` sin cambios en `Galeria.module.css`)
- [ ] 2.4 Registrar la revisión visual del responsable (autoavance y reinicio con flechas)
- [ ] 2.5 Actualizar Surface brief local y memoria afectada (relevo, bloques, estado/mapa) con `memoria:scan` y `memoria:check` vigentes
