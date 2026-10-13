import { Component } from '@angular/core';
import { TituloSeccion } from '../titulo-seccion/titulo-seccion';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [TituloSeccion],
  templateUrl: './acerca-de.html',
  styleUrl: './acerca-de.css',
})
export class AcercaDe {}
