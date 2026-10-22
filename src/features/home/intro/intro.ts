/* Cruce de entrada: capa negra con el logo de la marca como máscara negativa
   sobre el vídeo de la cabecera. Se activa solo si html[data-intro="pendiente"]
   (marca que deja el script previo al primer pintado en BaseLayout). Termina
   cuando una zona sólida de la tinta del logo cubre el viewport: sin fundido,
   el último fotograma ya es el vídeo a pantalla completa. Se repite en cada
   carga de la portada.

   El logo suministrado se sirve como archivo propio y se dibuja en un canvas
   de medición: sobre su tinta se busca el punto de fuga (la zona sólida más
   generosa próxima al centro) y la escala exacta de cobertura total. El
   activo no se redibuja, recolorea ni recomprime: solo se escala. */

const DURACION = 1050; // ms del cruce
const ANCHO_INICIAL = 0.12; // el logo arranca al 12 % del ancho del viewport
const ESCALA_INICIAL = 1; // multiplicador de arranque (ya es diminuto)
const MARGEN_COBERTURA = 1.25; // holgura sobre la escala de cobertura total
const ESCALA_MAXIMA = 500; // tope del multiplicador (trazos finos del logo)
const FPS = 24; // cadencia de cine
const ESPERA_MINIMA = 40; // ms antes de arrancar (deja pintar la capa)
const LOGO = "/logo/uchiha-barber-logo-negro.svg";
const RELACION_LOGO = 347.444 / 234.129; // proporción original del activo

const html = document.documentElement;

function liberar(): void {
  html.dataset.intro = "listo";
}

function iniciar(): void {
  const capa = document.querySelector<SVGSVGElement>("[data-intro-capa]");
  const grupo = capa?.querySelector<SVGGElement>("[data-intro-grupo]");
  const imagen = capa?.querySelector<SVGImageElement>("[data-intro-logo]");

  if (
    !capa ||
    !grupo ||
    !imagen ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    liberar();
    return;
  }

  let ancho = 0;
  let alto = 0;
  let baseAncho = 0;
  let baseAlto = 0;
  let xInicial = 0;
  let yInicial = 0;
  let lienzo: HTMLCanvasElement | null = null;
  let contexto: CanvasRenderingContext2D | null = null;
  let pixeles: Uint8ClampedArray | null = null;
  let logo: HTMLImageElement | null = null;

  let escala = ESCALA_INICIAL;
  let origen = { x: 0, y: 0 };
  let escalaFinal = 0;
  let cobertura = false;
  let fotogramaPedido = 0;

  /* Coloca el logo (máscara y lienzo de medición con las mismas medidas) al
     tamaño inicial, centrado y sin deformar. */
  function medir(): void {
    ancho = window.innerWidth;
    alto = window.innerHeight;
    baseAncho = ancho * ANCHO_INICIAL;
    baseAlto = baseAncho / RELACION_LOGO;
    xInicial = (ancho - baseAncho) / 2;
    yInicial = (alto - baseAlto) / 2;

    imagen!.setAttribute("x", String(xInicial));
    imagen!.setAttribute("y", String(yInicial));
    imagen!.setAttribute("width", String(baseAncho));
    imagen!.setAttribute("height", String(baseAlto));

    if (!lienzo) {
      lienzo = document.createElement("canvas");
    }
    lienzo.width = ancho;
    lienzo.height = alto;
    contexto = lienzo.getContext("2d", { willReadFrequently: true });
    dibujarMascara();
  }

  function cargarLogo(): Promise<HTMLImageElement | null> {
    return new Promise((resolver) => {
      const img = new Image();
      img.onload = () => {
        const listo = () => resolver(img);
        if (typeof img.decode === "function") {
          void img.decode().then(listo, listo);
          return;
        }
        listo();
      };
      img.onerror = () => resolver(null);
      img.src = LOGO;
    });
  }

  /* La misma composición de la máscara, dibujada en el canvas: blanco = zona
     opaca (negro de la capa), tinta del logo = ventana al vídeo. */
  function dibujarMascara(): void {
    if (!contexto) {
      return;
    }
    contexto.fillStyle = "#fff";
    contexto.fillRect(0, 0, ancho, alto);
    if (logo) {
      contexto.drawImage(logo, xInicial, yInicial, baseAncho, baseAlto);
    }
    pixeles = contexto.getImageData(0, 0, ancho, alto).data;
  }

  function valorEn(x: number, y: number): number | null {
    if (!pixeles) {
      return null;
    }
    const xi = Math.round(x);
    const yi = Math.round(y);
    if (xi < 0 || yi < 0 || xi >= ancho || yi >= alto) {
      return null;
    }
    return pixeles[(yi * ancho + xi) * 4] ?? null;
  }

  /* Radio inscrito de la tinta alrededor del punto: distancia al borde más
     cercano de la zona opaca. 0 si el punto no cae dentro del logo. */
  function radioHueco(
    ox: number,
    oy: number,
    limite = Math.max(ancho, alto),
  ): number {
    const inicial = valorEn(ox, oy);
    if (inicial === null || inicial > 128) {
      return 0;
    }
    let minimo = Number.POSITIVE_INFINITY;
    const direcciones = 48;
    for (let i = 0; i < direcciones; i++) {
      const angulo = (i / direcciones) * Math.PI * 2;
      const dx = Math.cos(angulo);
      const dy = Math.sin(angulo);
      let r = 2;
      for (; r <= limite; r += 2) {
        const v = valorEn(ox + dx * r, oy + dy * r);
        if (v === null || v > 128) {
          break;
        }
      }
      if (r < minimo) {
        minimo = r;
      }
    }
    return Number.isFinite(minimo) ? minimo : 0;
  }

  /* Punto de fuga: barrido de candidatos sobre la caja del logo, puntuando la
     zona sólida (radio inscrito) con preferencia por las próximas al centro.
     El barrido acota su radio; la escala final se mide después sin tope. */
  function buscarOrigen(): { x: number; y: number } | null {
    const paso = Math.max(4, baseAncho / 60);
    const centroX = ancho / 2;
    const centroY = alto / 2;
    let mejor: { x: number; y: number; nota: number } | null = null;

    for (let y = yInicial + paso; y <= yInicial + baseAlto - paso; y += paso) {
      for (
        let x = xInicial + paso;
        x <= xInicial + baseAncho - paso;
        x += paso
      ) {
        const r = radioHueco(x, y, 260);
        if (r < 4) {
          continue;
        }
        const distancia = Math.hypot(x - centroX, y - centroY);
        const nota = r - distancia * 0.12;
        if (!mejor || nota > mejor.nota) {
          mejor = { x, y, nota };
        }
      }
    }
    return mejor ? { x: mejor.x, y: mejor.y } : null;
  }

  /* Escala a la que la esquina más lejana del viewport queda dentro del hueco:
     el último fotograma es vídeo completo, sin restos de negro. Si la escala
     necesaria superara el tope, no se declara cobertura (mejor el rescate que
     un final con restos). */
  function escalaDeCobertura(ox: number, oy: number): number {
    const r = radioHueco(ox, oy);
    if (r < 3) {
      return 0;
    }
    const esquina = Math.max(
      Math.hypot(ox, oy),
      Math.hypot(ancho - ox, oy),
      Math.hypot(ox, alto - oy),
      Math.hypot(ancho - ox, alto - oy),
    );
    const necesaria = (esquina / r) * MARGEN_COBERTURA;
    return necesaria <= ESCALA_MAXIMA ? necesaria : 0;
  }

  function pintar(s: number, ox: number, oy: number, desenfoque: number): void {
    grupo!.setAttribute(
      "transform",
      `translate(${ox} ${oy}) scale(${s}) translate(${-ox} ${-oy})`,
    );
    capa!.style.filter =
      desenfoque > 0.05 ? `blur(${desenfoque.toFixed(2)}px)` : "none";
  }

  function preparar(): void {
    medir();
    const encontrado = buscarOrigen();
    origen = encontrado ?? { x: ancho / 2, y: alto / 2 };
    escalaFinal = escalaDeCobertura(origen.x, origen.y);
    cobertura = escalaFinal > 0;
    if (!cobertura) {
      escalaFinal = 6;
    }
  }

  function terminar(): void {
    pintar(escala, origen.x, origen.y, 0);
    if (cobertura) {
      capa!.remove();
      liberar();
      return;
    }
    /* Rescate: si no se pudo garantizar cobertura total, se desvanece. */
    const inicio = performance.now();
    const desvanecer = (ahora: number): void => {
      const k = Math.min(1, (ahora - inicio) / 280);
      capa!.style.opacity = String(1 - k);
      if (k < 1) {
        requestAnimationFrame(desvanecer);
        return;
      }
      capa!.remove();
      liberar();
    };
    requestAnimationFrame(desvanecer);
  }

  function reproducir(): void {
    preparar();
    escala = ESCALA_INICIAL;
    pintar(escala, origen.x, origen.y, 0);

    const inicio = performance.now();
    const paso = 1000 / FPS;
    let previa = escala;
    let ultimo = Number.NEGATIVE_INFINITY;

    const fotograma = (ahora: number): void => {
      if (ahora - ultimo < paso - 1) {
        fotogramaPedido = requestAnimationFrame(fotograma);
        return;
      }
      ultimo = ahora;
      const t = Math.min(1, (ahora - inicio) / DURACION);
      /* Aceleración cúbica: acelera hacia el final como la exponencial, pero
         el logo ya crece de forma perceptible en los primeros fotogramas
         (menos negro absoluto al entrar). */
      escala = ESCALA_INICIAL + (escalaFinal - ESCALA_INICIAL) * t ** 3;
      const desenfoque = Math.min(
        12,
        Math.max(0, (escala - previa) * 3.5 - 1.5),
      );
      pintar(escala, origen.x, origen.y, desenfoque);
      previa = escala;
      if (t >= 1) {
        terminar();
        return;
      }
      fotogramaPedido = requestAnimationFrame(fotograma);
    };

    fotogramaPedido = requestAnimationFrame(fotograma);
  }

  window.addEventListener("resize", () => {
    if (html.dataset.intro !== "pendiente") {
      return;
    }
    preparar();
    pintar(escala, origen.x, origen.y, 0);
  });

  window.addEventListener("pagehide", () => {
    cancelAnimationFrame(fotogramaPedido);
  });

  void cargarLogo().then((img) => {
    if (!img) {
      /* Sin logo no hay cruce: la portada queda usable directamente. */
      liberar();
      return;
    }
    logo = img;
    window.scrollTo(0, 0);
    window.setTimeout(reproducir, ESPERA_MINIMA);
  });
}

export function iniciarIntro(): void {
  if (html.dataset.intro !== "pendiente") {
    return;
  }
  iniciar();
}
