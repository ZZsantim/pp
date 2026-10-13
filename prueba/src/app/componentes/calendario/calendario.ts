import { Component, EventEmitter, Output } from '@angular/core';
import { Boton } from '../boton/boton';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [Boton],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class Calendario {
  @Output() continuar = new EventEmitter<void>();
  dias = Array.from({ length: 31 }, (_, index) => index + 1);
  horarios = ['09:00', '10:30', '12:00', '14:30', '16:00'];
  diaSeleccionado = 18;
  horaSeleccionada = '10:30';

  seleccionarDia(dia: number): void {
    this.diaSeleccionado = dia;
  }

  seleccionarHora(hora: string): void {
    this.horaSeleccionada = hora;
  }
}
