import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Boton } from '../boton/boton';
import { CajaFotos } from '../caja-fotos/caja-fotos';
import { CampoInfo } from '../campo-info/campo-info';

@Component({
  selector: 'app-info-cita',
  standalone: true,
  imports: [Boton, CajaFotos, CampoInfo],
  templateUrl: './info-cita.html',
  styleUrl: './info-cita.css',
})
export class InfoCita {
  @Input() confirmacion = false;
  @Output() confirmar = new EventEmitter<void>();
  @Output() reagendar = new EventEmitter<void>();

  readonly datos = [
    { etiqueta: 'Cliente', valor: 'Andrea Martínez' },
    { etiqueta: 'Vehículo', valor: 'Sedán · ABC-123' },
    { etiqueta: 'Fecha', valor: '18 de octubre, 2026' },
    { etiqueta: 'Hora', valor: '10:30 a. m.' },
    { etiqueta: 'Servicio', valor: 'Mantenimiento general' },
  ];
}
