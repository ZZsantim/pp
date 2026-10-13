import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../modelos/producto';
import { Card } from '../card/card';
import { TituloSeccion } from '../titulo-seccion/titulo-seccion';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [Card, TituloSeccion],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  @Input() productos: Producto[] = [];
  @Output() verProducto = new EventEmitter<Producto>();
}
