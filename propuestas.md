# Propuesta de pruebas unitarias para `pp/prueba`

## 1. Propósito y alcance

Este documento propone una base de pruebas unitarias para la aplicación Angular ubicada en
[`prueba/`](./prueba/). El objetivo es comprobar la lógica de los componentes, sus entradas y
salidas, la presentación condicional de información y la navegación entre pantallas, además de
definir qué pruebas convendría agregar cuando se implemente la lógica de negocio pendiente.

La propuesta se basa en el código actual: una aplicación Angular con componentes standalone,
pantallas de portal, calendario de citas y dashboards, y modelos `Producto` y `Actividad`.
Actualmente no se observan servicios, persistencia, API, autenticación ni estado compartido para
una cita. Por tanto, esas áreas se plantean como trabajo futuro y no como funcionalidades ya
disponibles que puedan probarse hoy.

## 2. Prioridades

| Prioridad | Área | Motivo |
| --- | --- | --- |
| **P0 — primero** | Calendario y flujo de navegación de citas | Es el flujo principal con selección de fecha/hora y cambio de pantallas; tiene lógica e interacciones comprobables. |
| **P0 — primero** | Componentes reutilizables con `@Input`/`@Output` | Un error en botones, tarjetas o listas afecta varias pantallas. |
| **P1 — después** | Catálogo, dashboards y páginas | Verifica que los datos se enlacen y que se represente correctamente cada estado. |
| **P1 — después** | Rutas y pantalla de inicio | Protege los destinos principales y el redireccionamiento de rutas desconocidas. |
| **P2 — cuando exista lógica** | Validaciones, estado compartido, servicios, persistencia y errores de API | El código actual no incluye aún estas responsabilidades; primero deben diseñarse e implementarse. |

## 3. Casos propuestos por prioridad

### P0 — Calendario y citas

Archivos principales: [`calendario.ts`](./prueba/src/app/componentes/calendario/calendario.ts),
[`calendario.html`](./prueba/src/app/componentes/calendario/calendario.html),
[`cita-calendario.ts`](./prueba/src/app/paginas/cita-calendario/cita-calendario.ts),
[`cita-detalle.ts`](./prueba/src/app/paginas/cita-detalle/cita-detalle.ts) y
[`cita-confirmacion.ts`](./prueba/src/app/paginas/cita-confirmacion/cita-confirmacion.ts).

Casos:

1. **Estado inicial del calendario:** comprobar que se construyan los 31 días, los cinco horarios,
   el día seleccionado `18` y la hora `10:30`, de acuerdo con los valores actuales.
2. **Selección de día:** llamar `seleccionarDia(dia)` y comprobar que `diaSeleccionado` cambie
   al valor elegido.
3. **Selección de horario:** llamar `seleccionarHora(hora)` y comprobar que `horaSeleccionada`
   cambie al horario elegido.
4. **Selección visible y accesible:** con `TestBed`, comprobar que cada día y horario se muestre,
   que el seleccionado tenga `aria-pressed="true"` y que al seleccionar otro botón se actualicen
   la clase de selección, el atributo accesible y el texto resumen.
5. **Continuar desde el calendario:** hacer clic en el botón y comprobar que el componente emita
   `continuar`; en la pantalla `CitaCalendario`, comprobar la navegación a `/cita/detalle`.
6. **Confirmación y reagendamiento:** comprobar en `CitaDetalle` y `CitaConfirmacion` que
   `confirmar()` y `reagendar()` naveguen a las rutas actualmente definidas en cada pantalla.
   Usar un `Router` de prueba o un espía inyectado, sin activar navegación real.
7. **Integración de rutas:** comprobar que las rutas de calendario, detalle y confirmación carguen
   el componente esperado y que una ruta desconocida redirija a `/`.

**Criterios futuros que deben quedar separados de las pruebas del comportamiento actual:**

- No aceptar fechas pasadas, días inexistentes, horarios ocupados o una selección incompleta
  cuando se agreguen reglas y disponibilidad reales.
- Verificar que mes, año, cantidad de días, selección y horarios cambien al navegar entre meses.
- Comprobar que la fecha y hora elegidas se conserven al continuar al detalle, confirmar o
  reagendar. Hoy las pantallas no comparten ese estado y el calendario contiene valores estáticos.

### P0 — Componentes reutilizables y eventos

Archivos principales: carpetas
[`componentes/`](./prueba/src/app/componentes/), especialmente `boton`, `card`, `catalogo`,
`info-cita`, `campo-info`, `fila-actividad` y `dashboard-lista`.

Casos:

1. **`Boton`:** mostrar el texto de entrada; usar la variante primaria por defecto; aplicar la
   variante secundaria al recibirla; respetar `tipo="button"` o `tipo="submit"`; emitir `pulsado`
   una sola vez por clic.
2. **`Card`:** mostrar título y descripción; usar el título predeterminado si no se proporciona;
   emitir `verMas` al activar el botón de la tarjeta.
3. **`Catalogo`:** mostrar una tarjeta por cada producto recibido, con título y descripción
   correctos; emitir `verProducto` con el objeto de la tarjeta activada, no solo con su título;
   mostrar una cuadrícula vacía sin error cuando reciba `[]`.
4. **`InfoCita`:** mostrar los datos configurados; no mostrar el aviso de confirmación cuando
   `confirmacion` sea falso y mostrarlo cuando sea verdadero; emitir `confirmar` y `reagendar`
   desde sus botones respectivos.
5. **`CampoInfo` y `TituloSeccion`:** comprobar que las entradas `etiqueta`, `valor` y `texto`
   aparezcan correctamente.
6. **`FilaActividad`:** mostrar el texto y representar los estados completado/pendiente mediante
   la marca, clase y etiqueta accesible correctas.
7. **`DashboardLista`:** mostrar el rol recibido y una fila por actividad; manejar lista vacía;
   pasar a cada fila sus valores `texto` y `completada`.
8. **Entradas vacías:** comprobar los valores predeterminados de componentes con entradas
   opcionales, evitando texto `undefined` o errores de renderizado.

### P1 — Catálogo, datos y dashboards

Archivos principales: [`portal-principal.ts`](./prueba/src/app/paginas/portal-principal/portal-principal.ts),
[`admin.ts`](./prueba/src/app/paginas/admin/admin.ts),
[`mecanico.ts`](./prueba/src/app/paginas/mecanico/mecanico.ts),
[`producto.ts`](./prueba/src/app/modelos/producto.ts) y
[`actividad.ts`](./prueba/src/app/modelos/actividad.ts).

Casos:

1. **Portal principal:** comprobar que `productos` y `itemsMenu` tengan los datos esperados y que
   el portal pase el catálogo a sus componentes hijos.
2. **Administrador y mecánico:** verificar el número de actividades, su texto y sus estados
   iniciales; comprobar que cada pantalla renderice su lista y título/rol correspondiente.
3. **Modelos:** son interfaces TypeScript sin lógica ejecutable. No necesitan pruebas unitarias
   independientes; su contrato se valida mediante compilación estricta y pruebas de los
   componentes que los consumen.
4. **Componentes principalmente visuales** (`AcercaDe`, `Destacados`, `Footer`, `Header`,
   `HeroPromo`, `MenuProductos`, `PanelEstado`, `CajaFotos`): priorizar pruebas de entradas,
   contenido condicional o eventos si el componente tiene ese comportamiento. No crear pruebas
   que solo repitan cada detalle estático del HTML; validar contenido visible únicamente cuando
   represente un requisito funcional o accesible.

### P2 — Lógica de negocio que todavía no existe

Antes de probar estos escenarios, se recomienda crear servicios/modelos para las
responsabilidades correspondientes:

1. **Citas:** validar campos obligatorios, reglas de fecha/hora, disponibilidad y transiciones
   de estado; preservar el borrador de la cita entre pantallas.
2. **Persistencia/API:** comprobar cargas correctas, estados de carga, respuesta vacía, errores,
   reintentos si aplican y que los datos mostrados correspondan a la respuesta recibida.
3. **Autorización:** si se agregan roles y sesión, verificar acceso permitido/denegado a
   `/admin` y `/mecanico`, además de la expiración de sesión. Las rutas actuales no muestran
   guards ni autenticación.
4. **Reglas de dashboard:** cuando las actividades puedan actualizarse, verificar transiciones
   pendiente/completada, conteos y actualización de estado.

## 4. Dónde crear las pruebas

Para mantener el patrón Angular de pruebas junto al código probado, se recomienda crear archivos
`*.spec.ts` en la misma carpeta del componente o página:

| Archivo de prueba propuesto | Qué cubrir |
| --- | --- |
| `src/app/componentes/calendario/calendario.spec.ts` | Estado inicial, selección de día/hora, vista y accesibilidad, evento continuar. |
| `src/app/paginas/cita-calendario/cita-calendario.spec.ts` | Navegación a detalle al continuar. |
| `src/app/paginas/cita-detalle/cita-detalle.spec.ts` | Navegación para confirmar y reagendar. |
| `src/app/paginas/cita-confirmacion/cita-confirmacion.spec.ts` | Navegación posterior a confirmar y reagendar. |
| `src/app/componentes/boton/boton.spec.ts` | Entradas, tipo, variante y evento de clic. |
| `src/app/componentes/card/card.spec.ts` | Entradas, valores por defecto y evento `verMas`. |
| `src/app/componentes/catalogo/catalogo.spec.ts` | Lista, datos de tarjeta, lista vacía y emisión del producto. |
| `src/app/componentes/info-cita/info-cita.spec.ts` | Datos, aviso condicional y eventos. |
| `src/app/componentes/dashboard-lista/dashboard-lista.spec.ts` | Rol, actividades y lista vacía. |
| `src/app/componentes/fila-actividad/fila-actividad.spec.ts` | Estado, marca y etiqueta accesible. |
| `src/app/paginas/portal-principal/portal-principal.spec.ts` | Datos iniciales y composición del portal. |
| `src/app/paginas/admin/admin.spec.ts` y `src/app/paginas/mecanico/mecanico.spec.ts` | Datos y contenido de cada dashboard. |
| `src/app/app.routes.spec.ts` | Rutas, pantallas y redirección desconocida. |

Crear pruebas para los otros componentes solo cuando tengan lógica, entradas, salidas o un
requisito de presentación importante. Si el equipo prefiere separar pruebas, puede agregarse
`src/app/testing/` para utilidades compartidas (por ejemplo, datos de prueba o configuración de
router), sin duplicar fixtures sencillos.

## 5. Archivos y configuración necesarios

### Necesarios para comenzar

1. **`prueba/package.json`:** agregar un script cómodo para ejecutar pruebas, normalmente
   `"test": "ng test"`, después de confirmar que el runner configurado es compatible con las
   versiones Angular instaladas.
2. **`prueba/angular.json`:** ya existe una configuración `architect.test` con el builder
   `@angular/build:unit-test`. Confirmar sus opciones y el runner elegido antes de añadir otro
   framework o dependencias; evitar configurar dos runners en paralelo.
3. **Archivos `*.spec.ts`:** crear los casos priorizados junto a sus componentes/páginas, como
   se detalla arriba. Para componentes standalone, configurar `TestBed` importando el componente
   standalone y sus dependencias necesarias.
4. **Pruebas de navegación:** usar el router de prueba disponible en la versión Angular del
   proyecto o un espía de `Router` según el alcance del caso. No depender del navegador ni de un
   servidor para pruebas unitarias.
5. **`prueba/README.md`:** documentar el comando de ejecución y cómo agregar una prueba si se
   incorpora el script al proyecto.

### Necesarios si se implementa lógica de negocio

- `src/app/servicios/` para servicios como `CitasService` o `ProductosService`, solo cuando exista
  una fuente de datos o responsabilidad real que extraer.
- `*.spec.ts` junto a cada servicio para probar reglas, transformación de datos y respuestas
  exitosas o fallidas con dependencias simuladas.
- Modelos/DTO adicionales solo si se definen contratos nuevos de API o estado.
- Guards y sus pruebas junto a la lógica de rutas, únicamente si se implementa autenticación y
  autorización.
- Un store o servicio de estado de cita y sus pruebas si la selección debe sobrevivir entre
  pantallas; el mecanismo concreto debe definirse antes de implementarlo.

## 6. Organización de la implementación

1. Confirmar el runner y hacer que un primer `*.spec.ts` se ejecute con el comando del proyecto.
2. Implementar primero las pruebas P0 del calendario, botones, información de cita y navegación.
3. Agregar pruebas P1 de catálogo, dashboards y rutas.
4. Corregir discrepancias detectadas entre comportamiento esperado y actual. Por ejemplo, los
   controles de mes del calendario tienen etiquetas en la plantilla, pero todavía no implementan
   una acción de cambio de mes; una prueba del requisito futuro debe añadirse junto con esa
   funcionalidad, no presentarse como comportamiento ya soportado.
5. Al agregar servicios o reglas nuevas, escribir sus pruebas unitarias con cada funcionalidad y
   actualizar esta propuesta.

## 7. Ejecución y criterios de aceptación

- Poder ejecutar la suite desde `prueba/` con el script documentado en `package.json`.
- Las pruebas deben ser deterministas: no depender de fecha/hora del sistema, red, backend o
  estado externo. Cuando se pruebe lógica de calendario futura, controlar la fecha de referencia.
- Cada prueba debe verificar un resultado observable (estado, evento, navegación o DOM), no solo
  que el componente fue creado.
- Mantener separados los casos que describen el comportamiento actual de los criterios futuros
  que dependen de funcionalidades aún no implementadas.
- Ejecutar también `npm run build` para confirmar que los cambios a pruebas/configuración no
  rompan la compilación de producción.

## 8. Estado actual observado

- La aplicación está bajo `pp/prueba/`; las carpetas prioritarias son
  `src/app/componentes/`, `src/app/paginas/` y, para revisar la navegación,
  `src/app/app.routes.ts`.
- `angular.json` ya declara un builder de pruebas, pero `package.json` no ofrece actualmente un
  script `test`.
- No se encontraron pruebas `*.spec.ts` en el código de la aplicación.
- El calendario, los datos del portal, las actividades y la información de cita son estáticos.
  Las pruebas deben documentar ese comportamiento sin asumir que ya existe persistencia,
  disponibilidad dinámica o autenticación.
