# ING.SOFTWARE

Portal responsive de productos, promociones, citas y actividades, construido con Angular standalone.

## Desarrollo

```bash
npm ci
npm start
```

Abre `http://localhost:4200/`. Para crear el build de producción:

```bash
npm run build
```

## Pantallas

- `/` — portal principal, catálogo y agendamiento.
- `/cita/calendario` — selección de día y horario.
- `/cita/detalle` — información de la cita.
- `/cita/confirmacion` — confirmación o reagendamiento.
- `/admin` — dashboard del administrador.
- `/mecanico` — dashboard del mecánico.

Los componentes reutilizables están en `src/app/componentes/`; cada uno tiene su clase
TypeScript, plantilla HTML y estilos CSS. El layout comparte los mismos componentes en móvil y
escritorio, con un breakpoint de 768 px.
