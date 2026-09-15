# Uchiha Barber

Web estática de marca para Uchiha Barber, Torrejón de Ardoz. Desarrollo dirigido por el responsable del proyecto, sección a sección. Versiones y comandos: `package.json`, `package-lock.json`, `.nvmrc`. El inicio actual sigue vacío; documentar la visión no implica implementarla.

## Desarrollo

Usar Node compatible con `package.json`, instalar con `npm ci` y ejecutar `npm run dev`. `npm run build` verifica tipos y compila; `npm run preview` sirve la compilación.

Antes de trabajar con cualquier IA, leer [AGENTS.md](AGENTS.md), [PRODUCT.md](PRODUCT.md) y [memoria/README.md](memoria/README.md). Conservar la inicialización de las herramientas existentes.

## Memoria

```sh
npm run memoria:check
npm run memoria:changes
npm run memoria:test
```

Después de revisar y documentar los cambios: `npm run memoria:scan` y `npm run memoria:check`. El repositorio Git transporta el contexto; las IAs no se comunican por sí solas.

Aplicación de la entrega: [memoria/aplicacion.md](memoria/aplicacion.md). Primer ensayo con OpenCode: [memoria/primer-commit.md](memoria/primer-commit.md).
