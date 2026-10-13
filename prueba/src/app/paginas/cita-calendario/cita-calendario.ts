import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Calendario } from '../../componentes/calendario/calendario';
import { Header } from '../../componentes/header/header';
import { TituloSeccion } from '../../componentes/titulo-seccion/titulo-seccion';

@Component({
  selector: 'app-cita-calendario',
  standalone: true,
  imports: [Calendario, Header, TituloSeccion],
  templateUrl: './cita-calendario.html',
  styleUrl: './cita-calendario.css',
})
export class CitaCalendario {
  constructor(private readonly router: Router) {}

  continuar(): void {
    void this.router.navigate(['/cita/detalle']);
  }
}
