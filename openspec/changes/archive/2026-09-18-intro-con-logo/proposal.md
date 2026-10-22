## Why

El cruce de entrada de la portada usa hoy el nombre de la marca como máscara. El responsable ha decidido que el sujeto del cruce sea **el logo suministrado**, con la misma mecánica: la tinta del logo deja pasar el vídeo de la cabecera y con la transición se atraviesa el logotipo. Forma parte del bloque de cabecera/cruce de la fase **UB-004** (`memoria/estado.json`), ya gobernado por la spec `home-intro`.

## What Changes

- **Sujeto del cruce**: la máscara deja de componer el texto «UCHIHA BARBER» y pasa a usar **el logo de la marca** (`ContenidoDemo/Logo/uchiha-barber-logo-negro.svg`, tinta casi negra), conservando proporciones (347,4 × 234,1) y sin redibujarlo. El vídeo de la cabecera se ve a través de la tinta del logo; el resto de la pantalla permanece negro.
- **Movimiento**: el logo arranca diminuto y crece hasta que **una zona sólida del propio logo** cubre la pantalla completa (cobertura total, sin desvanecimiento); se mantienen la duración aproximada de un segundo, el arranque breve, los 24 fotogramas por segundo, el desenfoque de movimiento y el fundido de rescate solo si el cálculo no alcanzara cobertura.
- **Cálculo del cruce**: la medición del hueco y el punto de fuga se adaptan de «glifos del titular» a «tinta del logo» (búsqueda del punto con mayor zona sólida próxima al centro del logotipo), manteniendo el recálculo automático ante cambios de tamaño.
- **Sin cambios de comportamiento**: se repite en cada carga de la portada, no existe en otras páginas, se omite con movimiento reducido, nunca bloquea la portada sin JavaScript o ante un fallo (salida de seguridad), bloquea el scroll solo durante el cruce y el aterrizaje deja la portada en su estado vigente (el titular no se muestra visualmente y no hay acceso en la cabecera, por decisión posterior del responsable; tampoco hay desenfoque en el vídeo).
- **Activo**: el SVG del logo se copia al sitio (el material origen vive en `ContenidoDemo/`, excluido de Git) y se sirve desde el propio origen; sin CDN.

**Fuera de alcance**: la cabecera y su composición vigente (ya reconciliada en las specs por el cambio archivado del nav), la barra de inicio y la navegación (otra sesión), Servicios, la página de productos, la variante blanca del logo (queda para fondos oscuros fuera de esta intro), el material audiovisual real del VPS y la publicación.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `home-intro`: el requisito del cruce cambia su sujeto (nombre → logo suministrado), añade la fidelidad al logo entregado y un arranque limpio sin formas fuera de la máscara, conservando los escenarios ya sincronizados (barra y accesos disponibles al terminar); el requisito de accesibilidad y degradación segura se mantiene sin cambios. `home-cabecera` queda fuera: su reconciliación la hizo el cambio archivado del nav.

## Impact

- `src/features/home/intro/` (componente, CSS Module y TypeScript): máscara con la imagen del logo, medición del hueco sobre su tinta y arranque/tamaño del logotipo.
- `public/`: copia versionada del SVG del logo (origen en `ContenidoDemo/Logo/`, ignorado en Git).
- Sin dependencias nuevas; sin tocar cabecera, navegación, Servicios ni productos.

**Hechos y decisiones**: el logo fue suministrado por el responsable en PDF y después en dos SVG de idéntica geometría (uno de tinta casi negra y otro de tinta blanca); para esta intro se usa el de tinta negra porque la máscara interpreta la tinta como ventana al vídeo. **Pendiente ajeno a este alcance**: la familia tipográfica definitiva y el material audiovisual real. Preparar estos artefactos no constituye aprobación visual ni autoriza la implementación.
