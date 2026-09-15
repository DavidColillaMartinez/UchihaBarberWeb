# Aplicar la entrega 1.5–2

El ZIP es una **actualización parcial**: contiene únicamente archivos nuevos/modificados bajo `Web/`, más un LEEME y un manifiesto de entrega fuera de esa carpeta. No contiene `.git`, dependencias, audiovisuales, claves ni configuraciones personales. No sustituir el repositorio entero.

1. Conservar una copia de los archivos actuales si se necesita deshacer la mezcla. Comparar el manifiesto con cualquier cambio local posterior al ZIP original; no sobrescribir a ciegas trabajo posterior.
2. Copiar el **contenido** de `Web/` sobre la raíz del proyecto actual (donde está `package.json`), fusionando carpetas y sobrescribiendo solo los archivos incluidos. Mostrar/copiar también los archivos de configuración incluidos. No crear una segunda carpeta Web dentro de la actual.
3. No copiar LEEME/MANIFIESTO a la raíz del repo: son instrucciones de distribución. No ejecutar init, reinstalar skills, recrear Git ni instalar dependencias nuevas: esta entrega no cambia dependencias ni lockfile.
4. Abrir OpenCode en esa raíz y pegar el contenido de `memoria/primer-commit.md`. Ahí están la revisión, controles y autorización del primer commit/push.

## Dos exclusiones de seguimiento pendientes

GitHub y el ZIP original compartían la base `d0021062a149336361cab5229bcda72e7b9d7eee` al inspeccionarlos. Se detectaron dos archivos seguidos de ámbito personal:

- `.impeccable/config.local.json`: consentimiento local de la herramienta.
- `.codex/hooks.json`: hooks con rutas de instalación de un equipo.

La entrega añade reglas a `.gitignore`, pero ignorar no retira archivos ya versionados. **OpenCode debe ejecutar la retirada del índice**, después de comprobar que no hay cambios ajenos preparados en esas rutas:

```sh
git rm --cached -- .impeccable/config.local.json .codex/hooks.json
```

Solo si ambos siguen versionados. Si alguno ya no lo está, retirar únicamente el que muestre `git ls-files` para esas rutas. No usar `-f` ni borrar los archivos locales. Comprobar que siguen existiendo localmente y que desaparecen del índice. El commit/push hará efectiva la retirada en la rama publicada. Las versiones anteriores seguirán en el historial; esta entrega no lo reescribe.

No son dependencias de la web y no se ha identificado aquí que esos dos archivos contengan credenciales. La revisión se centra en archivos publicables y configuración personal; no certifica ausencia de secretos en todo el historial. Conservar las skills/comandos compartidos, los documentos y los lockfiles, que sí permiten reproducir el proyecto.

## Resultado esperado

Antes de la retirada, `memoria:check` debe advertir de seguimiento no permitido. Después de revisar, documentar, formatear y escanear, debe pasar. Tras el commit debe seguir pasando sin fabricar un commit adicional para guardar su propio SHA. OpenCode devolverá ese SHA y el resultado del push; el siguiente relevo lo incorporará.

El ensayo no construye secciones ni inicia la web. Primero se confirma que las reglas y el relevo funcionan.
