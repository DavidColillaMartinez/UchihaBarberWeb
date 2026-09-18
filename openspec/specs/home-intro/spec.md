# home-intro Specification

## Purpose

Cruce de entrada de la portada: la capa con el nombre como máscara negativa sobre el vídeo de la cabecera y sus condiciones de reproducción, accesibilidad y degradación segura.

## Requirements

### Requirement: Cruce de entrada en la portada

Al entrar en la portada, la página SHALL mostrar una capa negra con el nombre del negocio como máscara negativa, de modo que el vídeo de la cabecera se vea a través de sus letras. El texto SHALL crecer desde un tamaño diminuto hasta que el hueco de una de sus letras cubra la pantalla completa, momento en el que la portada SHALL aparecer con el vídeo a pantalla completa y sus accesos disponibles: el encabezado accesible del negocio y «Pedir cita» en la barra y la navegación. El cruce SHALL repetirse en cada carga de la portada y MUST NOT existir en otras páginas.

#### Scenario: Entrada nueva en la portada

- **WHEN** se carga la portada
- **THEN** el cruce se reproduce desde el texto diminuto hasta que el hueco de una letra cubre la pantalla completa

#### Scenario: Final sin restos de negro

- **WHEN** el cruce termina
- **THEN** la pantalla queda enteramente ocupada por el vídeo de la cabecera, sin restos de negro ni desvanecimiento posterior, con la barra disponible sobre el vídeo

#### Scenario: Recarga de la portada

- **WHEN** se recarga la portada o se vuelve a ella
- **THEN** el cruce vuelve a reproducirse

#### Scenario: Otras páginas

- **WHEN** se carga la página de productos
- **THEN** no existe capa de cruce ni bloqueo de scroll asociado

### Requirement: Accesibilidad y degradación segura del cruce

El cruce MUST omitirse por completo cuando el visitante prefiere movimiento reducido y MUST NOT impedir el uso de la portada si el navegador no ejecuta scripts o si el cruce no llega a completarse. El scroll SHALL permanecer bloqueado únicamente mientras el cruce se reproduce.

#### Scenario: Movimiento reducido

- **WHEN** el visitante tiene activada la preferencia de movimiento reducido
- **THEN** la portada aparece directamente, sin cruce

#### Scenario: Sin JavaScript

- **WHEN** el navegador no ejecuta scripts
- **THEN** la portada es visible y navegable, sin capa de cruce

#### Scenario: Cruce interrumpido

- **WHEN** el cruce no llega a completarse por un fallo de carga
- **THEN** la portada se libera y queda usable en pocos segundos

#### Scenario: Bloqueo de scroll acotado

- **WHEN** el cruce se está reproduciendo
- **THEN** el scroll permanece bloqueado y se libera al terminar

#### Scenario: Lectores de pantalla

- **WHEN** un lector de pantalla recorre la portada
- **THEN** la capa del cruce no se anuncia y el título y el acceso reales permanecen disponibles
