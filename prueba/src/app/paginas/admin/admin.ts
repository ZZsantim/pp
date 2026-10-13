import { Component } from '@angular/core';
import { DashboardLista } from '../../componentes/dashboard-lista/dashboard-lista';
import { Header } from '../../componentes/header/header';
import { TituloSeccion } from '../../componentes/titulo-seccion/titulo-seccion';
import { Actividad } from '../../modelos/actividad';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [DashboardLista, Header, TituloSeccion],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  readonly actividades: Actividad[] = [
    { texto: 'Actividad 1 · Recepción de vehículo', completada: true },
    { texto: 'Actividad 2 · Diagnóstico inicial', completada: false },
    { texto: 'Actividad 3 · Aprobación del servicio', completada: false },
    { texto: 'Actividad 4 · Asignación de técnico', completada: true },
    { texto: 'Actividad 5 · Entrega al cliente', completada: false },
  ];
}
