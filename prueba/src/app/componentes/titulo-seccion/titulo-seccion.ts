import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-seccion',
  standalone: true,
  templateUrl: './titulo-seccion.html',
  styleUrl: './titulo-seccion.css',
})
export class TituloSeccion {
  @Input() texto = '';
}
