import { Component } from '@angular/core';
import { DashboardLista } from '../../componentes/dashboard-lista/dashboard-lista';
import { Header } from '../../componentes/header/header';
import { TituloSeccion } from '../../componentes/titulo-seccion/titulo-seccion';
import { Actividad } from '../../modelos/actividad';

@Component({
  selector: 'app-mecanico',
  standalone: true,
  imports: [DashboardLista, Header, TituloSeccion],
  templateUrl: './mecanico.html',
  styleUrl: './mecanico.css',
})
export class Mecanico {
  readonly actividades: Actividad[] = [
    { texto: 'Trabajo 1 · Revisión de motor', completada: true },
    { texto: 'Trabajo 2 · Cambio de aceite', completada: false },
    { texto: 'Trabajo 3 · Inspección de frenos', completada: false },
    { texto: 'Trabajo 4 · Alineación', completada: true },
    { texto: 'Trabajo 5 · Prueba de carretera', completada: false },
    { texto: 'Trabajo 6 · Entrega de vehículo', completada: false },
  ];
}
