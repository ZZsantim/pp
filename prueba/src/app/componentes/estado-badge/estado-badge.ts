import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estado-badge',
  standalone: true,
  templateUrl: './estado-badge.html',
  styleUrl: './estado-badge.css',
})
export class EstadoBadge {
  @Input() estado: 'ACTIVO' | 'PENDIENTE' | 'REVISION' = 'ACTIVO';
}
