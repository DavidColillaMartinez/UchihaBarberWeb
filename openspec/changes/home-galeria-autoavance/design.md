## Contexto

La Galería quedó en la ronda 4 validada tras la reversión `SES-028` (autoavance y encaje dinámico retirados por romper el scroll). El responsable recupera únicamente el autoavance con las mismas instrucciones acordadas en la ronda 5. La propuesta de subir la altura de la tira (38 → 55 svh en escritorio) se probó en local, resultó demasiado grande y queda descartada: la tira conserva su altura vigente (38 svh) y el blanco de la sección se resolverá por otros medios.

## Decisiones

- **Autoavance como temporizador en cadena**: `setTimeout` reprogramado en cada tic (no `setInterval`), para que cada pulsación de flecha reinicie el contador limpiamente y el avance no se acumule si la pestaña queda oculta (los tics se saltan con `document.hidden` y se reprograman). Cadencia `CADENCIA_AUTO = 2` (segundos), constante ajustable.
- **Condición de actividad**: solo con la sección encuadrada — se reutiliza el mismo umbral de aparición de las flechas (25 % de cobertura) mediante el `IntersectionObserver` existente — y con movimiento normal. Fuera de pantalla se cancela y al volver se reprograma desde cero. Con movimiento reducido o sin JavaScript no se crea; un cambio en caliente de la preferencia cancela o reprograma mediante `addEventListener("change")`.
- **Reinicio con flechas**: las flechas siguen moviendo solo el carrusel (± un panel sobre la posición compartida) y llaman a reprogramar el contador; el scroll no lo altera (decisión del responsable en la ronda 5: «solo flechas»).
- **Sin nada del encaje revertido**: no hay `scrollIntoView`, ni `data-encajada`, ni alturas dinámicas, ni `ScrollTrigger.refresh()` en callbacks. El autoavance solo suma a `posicion`, que alimenta el mismo render suavizado del carrusel.

## Riesgos / mitigaciones

- **Reproducción**: los paneles que entran por el autoavance empiezan a cargar al acercarse (margen de precarga de 2 del render), sin cambios en la reproducción contenida.
- **Velocidad percibida**: cada tic de 2 s avanza un panel completo; con la altura vigente de la tira la cadencia se percibe equilibrada (ajustable al revisar).
- **Movimiento reducido**: sin autoavance ni reproducción automática; la tira queda navegable con flechas (comportamiento ya especificado).
