import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../componentes/header/header';
import { InfoCita } from '../../componentes/info-cita/info-cita';
import { TituloSeccion } from '../../componentes/titulo-seccion/titulo-seccion';

@Component({
  selector: 'app-cita-confirmacion',
  standalone: true,
  imports: [Header, InfoCita, TituloSeccion],
  templateUrl: './cita-confirmacion.html',
  styleUrl: './cita-confirmacion.css',
})
export class CitaConfirmacion {
  constructor(private readonly router: Router) {}

  confirmar(): void {
    void this.router.navigate(['/']);
  }

  reagendar(): void {
    void this.router.navigate(['/cita/calendario']);
  }
}
