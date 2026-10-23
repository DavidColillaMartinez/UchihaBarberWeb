/* Acceso a Productos: control del vídeo del bloque.

   El vídeo es material provisional: cuando llegue el material oficial de
   productos se sustituirán la ruta del vídeo y su cartel, y el resto del
   comportamiento se conserva.

   El clip arranca solo de forma nativa al cargar la página; la pausa por
   visibilidad lo detiene fuera de la vista para no gastar recursos y lo
   reanuda al acercarse. Con movimiento reducido se retira la marca y no se
   reproduce hasta que el visitante lo pida. El botón de pausa cubre el
   control que exige WCAG 2.2.2 sobre el movimiento automático de más de
   cinco segundos. */

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
    void video.play().catch(() => {
      /* En móvil la petición puede abortar por ir pegada a la carga del
         recurso (p. ej. en iOS): se reintenta en cuanto hay fotograma
         disponible. La revisión del estado de pausa evita reanudar un
         vídeo que la visibilidad ya ha detenido. */
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        video.addEventListener("loadeddata", reproducir, { once: true });
      }
    });
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

  if (movimientoReducido.matches) {
    /* Con autoplay nativo el navegador arranca el vídeo al cargar incluso
       con movimiento reducido: se retira la marca y se pausa para dejar el
       cartel hasta que el visitante lo pida, como en cabecera y Servicios. */
    video.removeAttribute("autoplay");
    video.pause();
  } else {
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
