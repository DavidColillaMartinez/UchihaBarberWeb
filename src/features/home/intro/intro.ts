/* Cruce de entrada: capa negra con el nombre como máscara negativa sobre el
   vídeo de la cabecera. Se activa solo si html[data-intro="pendiente"] (marca
   que deja el script previo al primer pintado en BaseLayout). Termina cuando
   el hueco de la letra cubre el viewport: sin fundido, el último fotograma ya
   es el vídeo a pantalla completa. Se repite en cada carga de la portada.

   El foco y la geometría del hueco se calculan con el texto real de la máscara
   dibujado en un canvas, de modo que la letra por la que se cruza es siempre la
   que deja de cubrir la pantalla, sea cual sea la tipografía. */

const DURACION = 1050; // ms del cruce
const ESCALA_INICIAL = 0.12; // el texto arranca diminuto pero visible
const MARGEN_COBERTURA = 1.25; // holgura sobre la escala de cobertura total
const ESCALA_MAXIMA = 150;
const FPS = 24; // cadencia de cine
const ESPERA_MINIMA = 40; // ms antes de arrancar (deja pintar la capa)

const html = document.documentElement;

function liberar(): void {
  html.dataset.intro = "listo";
}

function iniciar(): void {
  const capa = document.querySelector<SVGSVGElement>("[data-intro-capa]");
  const titulo = document.querySelector<HTMLElement>("#cabecera-titulo");
  const grupo = capa?.querySelector<SVGGElement>("[data-intro-texto]");
  const lineas = capa?.querySelectorAll<SVGTextElement>("[data-intro-linea]");

  if (
    !capa ||
    !titulo ||
    !grupo ||
    !lineas ||
    lineas.length === 0 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    liberar();
    return;
  }

  const textos = [...titulo.querySelectorAll("span")].map((span) =>
    (span.textContent ?? "").trim().toUpperCase(),
  );

  if (textos.length === 0) {
    liberar();
    return;
  }

  let ancho = 0;
  let alto = 0;
  let fs = 0;
  let espaciado = 0;
  let interlineado = 0;
  let familia = "";
  let peso = "";
  let base1 = 0;
  let base2 = 0;
  let lienzo: HTMLCanvasElement | null = null;
  let contexto: CanvasRenderingContext2D | null = null;
  let pixeles: Uint8ClampedArray | null = null;

  let escala = ESCALA_INICIAL;
  let origen = { x: 0, y: 0 };
  let escalaFinal = 0;
  let cobertura = false;
  let fotogramaPedido = 0;

  /* Métricas: se toman del propio h1 (tamaño, interlineado, tipografía) para
     que la máscara sea exactamente la misma letra que luego aterriza. */
  function medir(): void {
    const cs = getComputedStyle(titulo!);
    fs = Number.parseFloat(cs.fontSize);
    const esp = Number.parseFloat(cs.letterSpacing);
    espaciado = Number.isFinite(esp) ? esp : 0;
    const inter = Number.parseFloat(cs.lineHeight);
    interlineado = Number.isFinite(inter) ? inter : fs * 0.84;
    familia = cs.fontFamily;
    peso = cs.fontWeight;
    ancho = window.innerWidth;
    alto = window.innerHeight;

    if (!lienzo) {
      lienzo = document.createElement("canvas");
    }
    lienzo.width = ancho;
    lienzo.height = alto;
    contexto = lienzo.getContext("2d", { willReadFrequently: true });
    if (!contexto) {
      return;
    }

    contexto.font = `${peso} ${fs}px ${familia}`;
    const metrica = contexto.measureText("H");
    const alturaMayuscula = metrica.actualBoundingBoxAscent || fs * 0.72;
    const alturaBloque = alturaMayuscula + interlineado;
    const arriba = alto / 2 - alturaBloque / 2;
    base1 = arriba + alturaMayuscula;
    base2 = base1 + interlineado;

    lineas!.forEach((linea, i) => {
      const texto = textos[i] ?? "";
      linea.textContent = texto;
      linea.setAttribute("font-size", String(fs));
      linea.setAttribute("x", String(ancho / 2));
      linea.setAttribute("y", String(i === 0 ? base1 : base2));
      linea.style.letterSpacing = `${espaciado}px`;
      linea.style.fontFamily = familia;
      linea.style.fontWeight = peso;
    });

    dibujarMascara();
  }

  /* El mismo texto de la máscara, dibujado en el canvas: blanco = zona opaca
     (negro de la capa), negro = letra (por donde se ve el vídeo). */
  function dibujarMascara(): void {
    if (!contexto) {
      return;
    }
    contexto.fillStyle = "#fff";
    contexto.fillRect(0, 0, ancho, alto);
    contexto.fillStyle = "#000";
    contexto.font = `${peso} ${fs}px ${familia}`;
    textos.forEach((texto, i) => {
      dibujarLinea(texto, i === 0 ? base1 : base2);
    });
    pixeles = contexto.getImageData(0, 0, ancho, alto).data;
  }

  function dibujarLinea(texto: string, y: number): void {
    if (!contexto) {
      return;
    }
    const anchos = [...texto].map((c) => contexto!.measureText(c).width);
    const total =
      anchos.reduce((a, b) => a + b, 0) +
      espaciado * Math.max(texto.length - 1, 0);
    let x = ancho / 2 - total / 2;
    [...texto].forEach((c, i) => {
      contexto!.fillText(c, x, y);
      x += (anchos[i] ?? 0) + espaciado;
    });
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

  /* Radio inscrito de la letra alrededor del punto: distancia al borde más
     cercano de la zona opaca. 0 si el punto no cae dentro de una letra. */
  function radioHueco(ox: number, oy: number): number {
    const inicial = valorEn(ox, oy);
    if (inicial === null || inicial > 128) {
      return 0;
    }
    let minimo = Number.POSITIVE_INFINITY;
    const direcciones = 48;
    const limite = Math.max(ancho, alto);
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

  /* Punto de fuga: la letra más central del nombre que tenga un hueco sólido
     suficiente (los contadores cerrados y los trazos gruesos valen). Se
     empieza por la última línea y, si no hubiera hueco válido, por la primera. */
  function buscarOrigen(): { x: number; y: number } | null {
    const totalLineas = Math.min(textos.length, lineas!.length);
    const desfases: [number, number][] = [
      [0.55, 0.32],
      [0.55, 0.28],
      [0.55, 0.36],
      [0.5, 0.3],
      [0.6, 0.3],
      [0.45, 0.3],
      [0.65, 0.35],
      [0.5, 0.5],
    ];

    let mejor: { x: number; y: number; r: number } | null = null;
    for (let i = totalLineas - 1; i >= 0; i--) {
      const linea = lineas![i];
      const texto = textos[i] ?? "";
      if (!linea || texto.length === 0) {
        continue;
      }
      const centro = (texto.length - 1) / 2;
      const indices = [...texto]
        .map((_, indice) => indice)
        .sort((a, b) => Math.abs(a - centro) - Math.abs(b - centro));

      for (const indice of indices) {
        let caja: DOMRect;
        try {
          caja = linea.getExtentOfChar(indice);
        } catch {
          continue;
        }
        for (const [fx, fy] of desfases) {
          const x = caja.x + caja.width * fx;
          const y = caja.y + caja.height * fy;
          const r = radioHueco(x, y);
          if (r >= 8) {
            return { x, y };
          }
          if (r >= 3 && (!mejor || r > mejor.r)) {
            mejor = { x, y, r };
          }
        }
      }
    }
    return mejor ? { x: mejor.x, y: mejor.y } : null;
  }

  /* Escala a la que la esquina más lejana del viewport queda dentro del
     hueco: el último fotograma es vídeo completo, sin restos de negro. */
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
    return Math.min(ESCALA_MAXIMA, (esquina / r) * MARGEN_COBERTURA);
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
      escalaFinal = 22;
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
         el texto ya crece de forma perceptible en los primeros fotogramas
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

  window.scrollTo(0, 0);
  void document.fonts.ready.then(() => {
    window.setTimeout(reproducir, ESPERA_MINIMA);
  });
}

export function iniciarIntro(): void {
  if (html.dataset.intro !== "pendiente") {
    return;
  }
  iniciar();
}
