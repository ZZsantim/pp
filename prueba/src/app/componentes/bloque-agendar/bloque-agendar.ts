import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Boton } from '../boton/boton';
import { TituloSeccion } from '../titulo-seccion/titulo-seccion';

@Component({
  selector: 'app-bloque-agendar',
  standalone: true,
  imports: [Boton, RouterLink, TituloSeccion],
  templateUrl: './bloque-agendar.html',
  styleUrl: './bloque-agendar.css',
})
export class BloqueAgendar {}
