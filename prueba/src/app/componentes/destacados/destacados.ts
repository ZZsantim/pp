import { Component } from '@angular/core';
import { TituloSeccion } from '../titulo-seccion/titulo-seccion';

@Component({
  selector: 'app-destacados',
  standalone: true,
  imports: [TituloSeccion],
  templateUrl: './destacados.html',
  styleUrl: './destacados.css',
})
export class Destacados {}
