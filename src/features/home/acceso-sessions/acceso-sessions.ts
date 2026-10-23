/** Control local: la pausa manual nunca se confunde con salir de pantalla. */
export function iniciarAccesoSessions() {
  const seccion = document.querySelector<HTMLElement>("[data-acceso-sessions]");
  const video = seccion?.querySelector<HTMLVideoElement>("video");
  const control = seccion?.querySelector<HTMLButtonElement>(
    "[data-sessions-control]",
  );
  if (!seccion || !video || !control) return;
  const preferencia = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false;
  let pausaManual = false;
  let permisoExplicito = false;
  let solicitud = 0;
  let pendiente = false;
  const permitido = () =>
    visible &&
    !document.hidden &&
    !pausaManual &&
    (!preferencia.matches || permisoExplicito);
  const reflejar = () => {
    const reproduciendo = !video.paused && !video.ended && !video.error;
    control.dataset.estado = reproduciendo ? "reproduciendo" : "pausado";
    control.setAttribute(
      "aria-label",
      reproduciendo
        ? "Pausar el vídeo de Sessions"
        : "Reproducir el vídeo de Sessions",
    );
  };
  const detener = () => {
    solicitud++;
    pendiente = false;
    video.pause();
    reflejar();
  };
  const reproducir = async () => {
    if (!permitido() || pendiente || !video.paused) return;
    const turno = ++solicitud;
    pendiente = true;
    try {
      await video.play();
      if (!permitido()) video.pause();
    } catch {
      // El navegador puede rechazar autoplay. No reintentar en bucle.
    } finally {
      if (turno === solicitud) pendiente = false;
      reflejar();
    }
  };
  const actualizar = () => (permitido() ? void reproducir() : detener());
  video.autoplay = false;
  detener();
  video.addEventListener("play", () => {
    if (!permitido()) detener();
    else reflejar();
  });
  video.addEventListener("pause", reflejar);
  video.addEventListener("ended", reflejar);
  video.addEventListener("error", () => {
    detener();
    control.disabled = true;
    control.setAttribute("aria-label", "Vídeo de Sessions no disponible");
  });
  control.addEventListener("click", () => {
    if (!video.paused || pendiente) {
      pausaManual = true;
      permisoExplicito = false;
      detener();
    } else {
      pausaManual = false;
      permisoExplicito = true;
      void reproducir();
    }
  });
  preferencia.addEventListener("change", () => {
    permisoExplicito = false;
    actualizar();
  });
  document.addEventListener("visibilitychange", actualizar);
  const observador = new IntersectionObserver(
    ([entrada]) => {
      visible = entrada.isIntersecting;
      if (!visible) permisoExplicito = false;
      actualizar();
    },
    { threshold: 0 },
  );
  observador.observe(seccion);
  video.controls = false;
  control.hidden = false;
  reflejar();
}
