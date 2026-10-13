import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../componentes/header/header';
import { InfoCita } from '../../componentes/info-cita/info-cita';
import { TituloSeccion } from '../../componentes/titulo-seccion/titulo-seccion';

@Component({
  selector: 'app-cita-detalle',
  standalone: true,
  imports: [Header, InfoCita, TituloSeccion],
  templateUrl: './cita-detalle.html',
  styleUrl: './cita-detalle.css',
})
export class CitaDetalle {
  constructor(private readonly router: Router) {}

  confirmar(): void {
    void this.router.navigate(['/cita/confirmacion']);
  }

  reagendar(): void {
    void this.router.navigate(['/cita/calendario']);
  }
}
