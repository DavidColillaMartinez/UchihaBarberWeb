/* Acceso a Productos: control del vídeo del bloque.

   El vídeo es material provisional: cuando llegue el material oficial de
   productos se sustituirán la ruta del vídeo y su cartel, y el resto del
   comportamiento se conserva.

   El clip solo se reproduce cuando la sección está cerca de la vista; fuera
   de ella se pausa para no gastar recursos. Con movimiento reducido no se
   reproduce nunca y se queda el cartel hasta que el visitante lo pida. El
   botón de pausa cubre el control que exige WCAG 2.2.2 sobre el movimiento
   automático de más de cinco segundos. */

const MARGEN_PRECARGA = "200px";

export function iniciarAccesoProductos(): void {
  const seccion = document.querySelector<HTMLElement>(
    "[data-acceso-productos]",
  );
  const video = seccion?.querySelector<HTMLVideoElement>(
    "[data-video-productos]",
  );
  const control = seccion?.querySelector<HTMLButtonElement>(
    "[data-control-video]",
  );

  if (!seccion || !video || !control) {
    return;
  }

  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  let pausadoPorUsuario = false;

  const reflejarEstado = (): void => {
    const reproduciendo = !video.paused && !video.ended;
    control.dataset.estado = reproduciendo ? "reproduciendo" : "pausado";
    control.setAttribute(
      "aria-label",
      reproduciendo ? "Pausar el vídeo" : "Reproducir el vídeo",
    );
  };

  /* El vídeo se descarga solo cuando va a reproducirse. */
  const cargar = (): void => {
    if (video.preload !== "auto") {
      video.preload = "auto";
      video.load();
    }
  };

  const pausar = (): void => {
    if (!video.paused) {
      video.pause();
    }
  };

  const reproducir = (): void => {
    if (movimientoReducido.matches || pausadoPorUsuario || !video.paused) {
      return;
    }
    void video.play().catch(() => {});
  };

  control.addEventListener("click", () => {
    if (video.paused) {
      /* Una acción explícita del visitante abre paso a la preferencia de
         movimiento reducido: quien lo detiene puede volver a pulsarlo. */
      pausadoPorUsuario = false;
      cargar();
      void video.play().catch(() => {});
    } else {
      pausadoPorUsuario = true;
      video.pause();
    }
    reflejarEstado();
  });

  video.addEventListener("play", reflejarEstado);
  video.addEventListener("pause", reflejarEstado);

  if (!movimientoReducido.matches) {
    new IntersectionObserver(
      (entradas) => {
        const entrada = entradas[0];
        if (!entrada) {
          return;
        }
        if (entrada.isIntersecting) {
          cargar();
          reproducir();
        } else {
          pausar();
        }
      },
      { rootMargin: MARGEN_PRECARGA, threshold: 0 },
    ).observe(seccion);
  }

  control.setAttribute("data-visible", "");
  reflejarEstado();
}
