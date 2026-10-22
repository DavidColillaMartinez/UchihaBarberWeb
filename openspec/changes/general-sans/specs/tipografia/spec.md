## Purpose

Gobierno transversal de la tipografía de Uchiha Barber: una única familia autoalojada con sus pesos reales, sin estilos sintéticos, con la licencia conservada y una jerarquía de uso por elemento que protege la legibilidad en toda la web.

## ADDED Requirements

### Requirement: Familia única autoalojada con licencia

La web SHALL usar General Sans como única familia tipográfica, servida desde su propio origen bajo `public/fonts/general-sans/`, junto con su licencia, sin depender de CDN ni servicios de terceros. No se SHALL introducir otra familia por iniciativa propia; cualquier cambio de familia requiere una decisión expresa del responsable.

#### Scenario: Carga sin dependencia externa

- **WHEN** se carga cualquier página del sitio
- **THEN** las tipografías se solicitan al propio origen y no a un servicio externo

#### Scenario: Licencia y procedencia

- **WHEN** se revisa el directorio de la familia
- **THEN** la licencia oficial acompaña a los archivos de fuente y la procedencia queda documentada en `PRODUCT.md` y en la decisión de memoria

#### Scenario: Otra familia

- **WHEN** una sección necesita una expresión tipográfica distinta
- **THEN** se resuelve con peso, escala, espaciado, alineación, contraste y comportamiento de la misma familia, sin añadir otro archivo de fuente por iniciativa propia

### Requirement: Pesos reales y ausencia de síntesis

La web SHALL declarar los cortes reales disponibles —Light `300`, Regular `400`, Medium `500`, Semibold `600`, Semibold Italic `600` en cursiva y Bold `700`— con `font-display: swap`, y MUST NOT producir negritas ni cursivas sintéticas. El texto SHALL usar el peso real declarado en cada archivo.

#### Scenario: Declaración de pesos

- **WHEN** se revisan los fundamentos tipográficos
- **THEN** cada corte declarado corresponde a un archivo real de la familia y usa `swap` como estrategia de carga

#### Scenario: Cursiva real

- **WHEN** un texto necesita énfasis en cursiva
- **THEN** se usa el corte Semibold Italic real y no una cursiva sintética

#### Scenario: Sin negritas sintéticas

- **WHEN** un elemento solicita un peso no declarado
- **THEN** el navegador no fabrica un trazo sintético y el texto se resuelve con uno de los pesos reales disponibles

### Requirement: Jerarquía de uso por elemento

La aplicación de pesos SHALL seguir esta jerarquía: Bold `700` en titulares; Medium `500` en botones, navegación y llamadas a la acción; Regular `400` en nombres, etiquetas y texto de lectura general; Semibold `600` en énfasis y cifras/precios; Semibold Italic `600` en textos especiales que necesiten una señal expresiva; y Light `300` solo en descripciones informativas, avisos legales y copias secundarias suficientemente grandes. Light MUST NOT usarse en texto pequeño, controles o información crítica cuando reduzca la legibilidad. La jerarquía MAY ajustarse por sección mediante escala, espaciado, alineación y contraste, preservando esta pauta.

#### Scenario: Titulares y llamadas

- **WHEN** se revisa un titular y una llamada a la acción
- **THEN** el titular usa Bold y la llamada usa Medium

#### Scenario: Lectura y énfasis

- **WHEN** se revisa el texto de lectura, un nombre, una etiqueta y un precio
- **THEN** el texto y los nombres usan Regular y los precios y énfasis usan Semibold

#### Scenario: Uso restringido de Light

- **WHEN** se plantea aplicar Light a un texto pequeño, un control o información crítica
- **THEN** no se aplica si compromete la legibilidad y se resuelve con un peso superior

### Requirement: Tokens compartidos de tipografía

Los fundamentos SHALL exponer tokens compartidos de familia y de peso (`--font-base`, `--font-display`, `--font-text` y `--font-weight-*`) que las secciones usen en sus CSS Modules, de modo que el ajuste tipográfico no exija reescribir valores por sección.

#### Scenario: Aplicación por tokens

- **WHEN** una sección declara familia o peso en su CSS Module
- **THEN** usa los tokens compartidos en lugar de valores literales de familia

#### Scenario: Cambio centralizado

- **WHEN** se ajusta un token de peso en los fundamentos
- **THEN** las secciones que lo usan reflejan el cambio sin editar cada CSS Module
