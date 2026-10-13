import { Component, Input } from '@angular/core';
import { Actividad } from '../../modelos/actividad';
import { FilaActividad } from '../fila-actividad/fila-actividad';
import { PanelEstado } from '../panel-estado/panel-estado';

@Component({
  selector: 'app-dashboard-lista',
  standalone: true,
  imports: [FilaActividad, PanelEstado],
  templateUrl: './dashboard-lista.html',
  styleUrl: './dashboard-lista.css',
})
export class DashboardLista {
  @Input() rol = 'Administrador';
  @Input() actividades: Actividad[] = [];
}
