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

El alcance de implementación es **toda la aplicación Angular actual**: sus 19 componentes, las
seis páginas, el componente raíz y las rutas. Las prioridades siguientes indican el orden de
trabajo, no elementos que se excluyen de la cobertura final. Las pruebas unitarias comprobarán
entradas, salidas, lógica, navegación y contenido funcional o accesible. No se necesitan pruebas
unitarias independientes para CSS, interfaces TypeScript sin lógica ni el arranque de la
aplicación; el diseño responsive y los recorridos completos entre pantallas se validan aparte con
pruebas visuales o de integración.

## 2. Prioridades

| Prioridad | Área | Motivo |
| --- | --- | --- |
| **P0 — primero** | Calendario y flujo de navegación de citas | Es el flujo principal con selección de fecha/hora y cambio de pantallas; tiene lógica e interacciones comprobables. |
| **P0 — primero** | Componentes reutilizables con `@Input`/`@Output` | Un error en botones, tarjetas o listas afecta varias pantallas. |
| **P1 — después** | Catálogo, dashboards y páginas | Verifica que los datos se enlacen y que se represente correctamente cada estado. |
| **P1 — después** | Rutas y pantalla de inicio | Protege los destinos principales y el redireccionamiento de rutas desconocidas. |
| **P2 — cuando exista lógica** | Validaciones, estado compartido, servicios, persistencia y errores de API | El código actual no incluye aún estas responsabilidades; primero deben diseñarse e implementarse. |

El alcance final incluye también componentes presentacionales. Se cubren con pruebas breves de
sus entradas, contenido funcional o navegación, según corresponda; no se les atribuye lógica que
no tienen.

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
4. **Componentes presentacionales:** están incluidos en la cobertura completa de la sección 4.
   Verificar las entradas, los enlaces, el contenido esencial o el estado accesible que aplique.
   Evitar comprobar estilos píxel a píxel o duplicar cada texto decorativo del HTML.

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

Para cubrir el sistema actual con pruebas mantenibles, ubicar cada `*.spec.ts` junto al componente
o página que se prueba. La tabla incluye todas las unidades Angular actuales y señala el
comportamiento relevante. En componentes sin lógica propia, integrar la comprobación en la prueba
de la página o componente padre si un archivo unitario independiente solo comprobaría que se
crea; no añadir pruebas vacías para aumentar el conteo.

| Archivo de prueba propuesto | Qué cubrir y por qué |
| --- | --- |
| `src/app/componentes/acerca-de/acerca-de.spec.ts` | Renderizado del bloque y su título; protege una sección informativa del portal. |
| `src/app/componentes/bloque-agendar/bloque-agendar.spec.ts` | Contenido de agendamiento y enlace hacia el calendario. |
| `src/app/componentes/boton/boton.spec.ts` | Texto, tipo, variante y emisión de `pulsado`; es compartido por varias vistas. |
| `src/app/componentes/caja-fotos/caja-fotos.spec.ts` | Fotos recibidas y estado con lista vacía. |
| `src/app/componentes/calendario/calendario.spec.ts` | Estado inicial, selección de día/hora, accesibilidad y evento continuar. |
| `src/app/componentes/campo-info/campo-info.spec.ts` | Etiqueta y valor recibidos; contrato usado al mostrar datos de cita. |
| `src/app/componentes/card/card.spec.ts` | Entradas, valores predeterminados y emisión de `verMas`. |
| `src/app/componentes/catalogo/catalogo.spec.ts` | Tarjetas por producto, lista vacía y emisión del producto elegido. |
| `src/app/componentes/dashboard-lista/dashboard-lista.spec.ts` | Rol, actividades y paso correcto de datos a filas y paneles. |
| `src/app/componentes/destacados/destacados.spec.ts` | Renderizado del título y contenido principal de la sección. |
| `src/app/componentes/estado-badge/estado-badge.spec.ts` | Representación de los estados `ACTIVO`, `PENDIENTE` y `REVISION`. |
| `src/app/componentes/fila-actividad/fila-actividad.spec.ts` | Texto y representación accesible de actividad completada o pendiente. |
| `src/app/componentes/footer/footer.spec.ts` | Contenido esencial y destinos de navegación del pie de página. |
| `src/app/componentes/header/header.spec.ts` | Título configurable, enlaces y comportamiento del menú si aplica. |
| `src/app/componentes/hero-promo/hero-promo.spec.ts` | Contenido principal y acción de la promoción. |
| `src/app/componentes/info-cita/info-cita.spec.ts` | Datos, contenido condicional y eventos confirmar/reagendar. |
| `src/app/componentes/menu-productos/menu-productos.spec.ts` | Elementos recibidos y lista vacía. |
| `src/app/componentes/panel-estado/panel-estado.spec.ts` | Renderizado del estado y del badge asociado. |
| `src/app/componentes/titulo-seccion/titulo-seccion.spec.ts` | Texto recibido como título de sección. |
| `src/app/paginas/portal-principal/portal-principal.spec.ts` | Productos, menú y composición de secciones del portal. |
| `src/app/paginas/cita-calendario/cita-calendario.spec.ts` | Navegación a detalle al continuar. |
| `src/app/paginas/cita-detalle/cita-detalle.spec.ts` | Destinos de confirmar y reagendar. |
| `src/app/paginas/cita-confirmacion/cita-confirmacion.spec.ts` | Destinos de confirmar y reagendar desde la confirmación. |
| `src/app/paginas/admin/admin.spec.ts` | Datos y contenido del dashboard de administrador. |
| `src/app/paginas/mecanico/mecanico.spec.ts` | Datos y contenido del dashboard de mecánico. |
| `src/app/app.spec.ts` | Comprobar el shell junto con el `RouterOutlet` si aporta una verificación útil; la navegación real se cubre en la prueba de rutas. |
| `src/app/app.routes.spec.ts` | Resolución de todas las rutas declaradas y redirección comodín. |

Las filas de renderizado son intencionalmente pequeñas: no se inventan métodos para componentes
que no tienen lógica. Los modelos `Producto` y `Actividad` son interfaces sin comportamiento y se
validan mediante compilación y consumo por los componentes. Los estilos CSS y la adaptación
responsive requieren comprobación visual; el recorrido completo entre varias rutas corresponde a
pruebas de integración. Puede agregarse `src/app/testing/` para fixtures o configuración común de
router cuando la suite lo necesite.

## 5. Preparación y configuración necesaria

### Necesarios para comenzar

1. **No instalar otro runner inicialmente.** `pp/prueba/angular.json` ya declara
   `@angular/build:unit-test`; el CLI instalado ofrece Vitest como runner predeterminado y jsdom
   como entorno Node predeterminado.
2. **Agregar comandos a `pp/prueba/package.json`:** mantener los existentes y sumar
   `"test": "ng test"` para desarrollo y `"test:ci": "ng test --watch=false"` para una ejecución
   que termine automáticamente.
3. **No modificar `tsconfig.json` de entrada.** Crear `tsconfig.spec.json` o ajustar la
   configuración TypeScript solamente si el primer test muestra un problema concreto de inclusión
   de archivos o tipos; no anticipar una configuración que quizá no se necesita.
4. **Crear `*.spec.ts` junto al código probado**, siguiendo la matriz de la sección 4. En
   componentes standalone, importarlos en `TestBed.configureTestingModule({ imports: [...] })`.
5. **Aislar navegación y dependencias:** usar `provideRouter` para una prueba de enrutamiento o un
   doble de `Router` con `vi.fn()` para comprobar una llamada de navegación sin cambiar de página.
6. **Documentar los comandos** en `pp/prueba/README.md` cuando se agregue el script `test`.

### Comandos

Desde la raíz de la aplicación:

```bash
cd pp/prueba
npm ci
```

`npm ci` se ejecuta al preparar un entorno limpio o instalar dependencias, no antes de cada
prueba. Antes de agregar el script al `package.json`, se puede verificar el runner con:

```bash
npm exec ng test -- --watch=false
```

Cuando ya existan los scripts propuestos:

```bash
npm test                 # modo de desarrollo; puede quedar observando cambios
npm run test:ci          # una ejecución y salida
npm run test:ci -- --coverage
npm run build
```

La cobertura se mide después de que los casos funcionales estén estabilizados. No se fija un
porcentaje inicial sin conocer el baseline; se revisa qué ramas de comportamiento importante
quedaron sin probar, no se persiguen líneas de CSS o código sin lógica.

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

## 6. Cuándo hacer cada prueba

Las pruebas se escriben y ejecutan durante el desarrollo, no solo al final:

| Momento | Qué hacer | Por qué / salida esperada |
| --- | --- | --- |
| Antes de empezar la suite | Ejecutar una prueba mínima con el builder existente y confirmar el comando del runner. | Detectar problemas de entorno o configuración antes de escribir muchos casos. |
| Antes o junto a cada cambio funcional | Escribir primero el caso que expresa el requisito; comprobar que falla por la razón esperada y luego implementar el comportamiento. | La prueba define el resultado solicitado y demuestra que detecta la ausencia o regresión de ese comportamiento. |
| Después de cada archivo o grupo pequeño | Ejecutar el test afectado y corregirlo antes de continuar. | Acota rápidamente la causa si aparece un fallo. |
| Al terminar una etapa P0/P1 | Ejecutar toda la suite en modo CI y revisar resultados. | Detectar interacciones entre unidades ya cubiertas. |
| Antes de integrar/publicar cambios | Ejecutar suite completa y `npm run build`; revisar fallos y cobertura relevante. | Evitar integrar cambios que rompan pruebas o compilación de producción. |
| Al desarrollar una nueva regla futura | Añadir casos unitarios con el servicio/estado/regla en el mismo cambio; añadir integración si cruza páginas o límites de datos. | Evitar que la regla quede sin protección desde que se incorpora. |

### Orden de implementación

1. **Preparación:** validar `ng test`, agregar scripts `test` y `test:ci`, y crear un primer caso de
    componente pequeño, por ejemplo `Boton`. No tocar `tsconfig.json` salvo que aparezca un error
    que lo requiera.
2. **P0 — interacción reutilizable y cita:** cubrir `Boton`, `Calendario`, `InfoCita` y las tres
    páginas del flujo. Verificar estado seleccionado, eventos y destinos de navegación actuales.
3. **P1 — componentes y pantallas restantes:** completar la matriz de componentes con entradas,
    listas, estados, enlaces y contenido funcional; cubrir portal, dashboards, shell y rutas.
4. **P2 — nuevas reglas de negocio:** incorporar servicios/estado solo cuando se implemente esa
    funcionalidad, y probar casos válidos, inválidos, límites y errores según el requisito.
5. **Cierre de cada etapa:** ejecutar `npm run test:ci` y `npm run build`, documentar cualquier
    comportamiento pendiente y no convertir requisitos futuros en expectativas del código actual.

Los controles del calendario muestran etiquetas de navegación entre meses, pero hoy no cambian
el mes; la selección tampoco se conserva entre pantallas. Esos casos se incorporan cuando se
implemente el comportamiento, no como pruebas que deban fallar en la primera suite.

## 7. Plantillas para identificar y escribir pruebas

### Ficha para el plan de casos

Registrar una fila por resultado esperado antes de codificar el test. El ID facilita reportar
fallos y vincular cada caso a un requisito.

| ID | Unidad/archivo | Prioridad | Estado inicial | Acción | Resultado observable esperado | Justificación |
| --- | --- | --- | --- | --- | --- | --- |
| CAL-02 | `Calendario.seleccionarDia` | P0 | Día seleccionado `18` | Seleccionar día `7` | `diaSeleccionado` vale `7` y la vista marca el botón de día 7 como seleccionado. | Evita que estado y selección visible discrepen. |
| [AREA-00] | [componente, página o servicio] | [P0/P1/P2] | [entradas y dependencias] | [clic, entrada o llamada] | [afirmación que se pueda comprobar] | [riesgo que reduce] |

Prefijos sugeridos: `BOT` (botón), `CAL` (calendario), `CIT` (cita), `CAT` (catálogo), `DASH`
(dashboards), `RUT` (rutas), `PORT` (portal). No se considera un caso completo si su resultado
esperado solo dice “funciona”.

### Estructura base para un componente standalone

Ejemplo de forma para `src/app/componentes/boton/boton.spec.ts`; cada test debe comprobar una
regla observable y usar las entradas/eventos reales del componente.

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { Boton } from './boton';

describe('Boton', () => {
   let fixture: ComponentFixture<Boton>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [Boton] }).compileComponents();
      fixture = TestBed.createComponent(Boton);
      fixture.componentRef.setInput('texto', 'Guardar');
      fixture.detectChanges();
   });

   it('muestra el texto recibido', () => {
      const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(button.textContent).toContain('Guardar');
   });
});
```

Para una salida, suscribirse a `fixture.componentInstance.pulsado`, activar el botón y afirmar
que el suscriptor se invocó una vez. Para una entrada, usar `setInput`; para la vista, ejecutar
`detectChanges()` y comprobar el DOM/atributo accesible que expresa el comportamiento. Evitar
assertions sobre clases CSS internas salvo que la clase represente un estado funcional.

### Estructura para una página que navega

En pruebas unitarias de los métodos de página, proporcionar un `Router` falso y comprobar el
destino solicitado, sin navegación real:

```ts
const router = { navigate: vi.fn() };
// En la configuración de TestBed:
providers: [{ provide: Router, useValue: router }]
// En el caso:
component.confirmar();
expect(router.navigate).toHaveBeenCalledWith(['/cita/confirmacion']);
```

Importar `Router` desde `@angular/router` y `vi` desde `vitest`. Para comprobar que las URLs
resuelven a las páginas correctas, usar una prueba separada del router con `provideRouter(routes)`;
esa verificación es de integración, no una prueba del método de la página.

### Qué hacer cuando falla un test

1. Leer el primer error y localizar la aserción fallida; ejecutar solo ese caso con `--filter`
    mientras se depura.
2. Decidir si falló el comportamiento de la aplicación, la configuración del test o si cambió el
    requisito.
3. Corregir la implementación si contradice el requisito. Actualizar la expectativa solo si el
    requisito cambió y documentar el cambio; no cambiarla únicamente para obtener verde.
4. Volver a ejecutar el caso aislado y después toda la suite. Al cerrar, ejecutar también el build.

## 8. Criterios de aceptación

- Poder ejecutar las pruebas desde `pp/prueba/` mediante los scripts documentados en `package.json`.
- Las pruebas deben ser deterministas: no depender de fecha/hora del sistema, red, backend o
  estado externo. Cuando se pruebe lógica de calendario futura, controlar la fecha de referencia.
- Cada prueba debe verificar un resultado observable (estado, evento, navegación o DOM), no solo
  que el componente fue creado.
- Todo comportamiento funcional actual de componentes, páginas, shell y rutas queda cubierto por
   la matriz; los componentes presentacionales simples pueden comprobarse desde su padre para no
   añadir tests vacíos.
- Mantener separados los casos que describen el comportamiento actual de los criterios futuros
   que dependen de funcionalidades aún no implementadas.
- Ejecutar `npm run test:ci` y `npm run build` antes de integrar una etapa.
- Medir cobertura cuando la suite P0 esté estable y usarla para encontrar lógica importante sin
   caso; no establecer un umbral arbitrario ni perseguir cobertura de estilos.
- La adaptación responsive requiere una comprobación visual en móvil y escritorio; no se da por
   validada solo porque la suite unitaria pase.

## 9. Estado actual observado

- La aplicación está bajo `pp/prueba/`; las carpetas prioritarias son
  `src/app/componentes/`, `src/app/paginas/` y, para revisar la navegación,
  `src/app/app.routes.ts`.
- `angular.json` ya declara un builder de pruebas, pero `package.json` no ofrece actualmente un
  script `test`.
- No se encontraron pruebas `*.spec.ts` en el código de la aplicación.
- El calendario, los datos del portal, las actividades y la información de cita son estáticos.
  Las pruebas deben documentar ese comportamiento sin asumir que ya existe persistencia,
  disponibilidad dinámica o autenticación.
