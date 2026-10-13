import { Component } from '@angular/core';
import { EstadoBadge } from '../estado-badge/estado-badge';

@Component({
  selector: 'app-panel-estado',
  standalone: true,
  imports: [EstadoBadge],
  templateUrl: './panel-estado.html',
  styleUrl: './panel-estado.css',
})
export class PanelEstado {}
