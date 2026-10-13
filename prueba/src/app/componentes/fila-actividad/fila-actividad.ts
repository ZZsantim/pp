import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fila-actividad',
  standalone: true,
  templateUrl: './fila-actividad.html',
  styleUrl: './fila-actividad.css',
})
export class FilaActividad {
  @Input() texto = '';
  @Input() completada = false;
}
