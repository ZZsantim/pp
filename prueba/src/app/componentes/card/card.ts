import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Boton } from '../boton/boton';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [Boton],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() titulo = 'Producto destacado';
  @Input() descripcion = '';
  @Output() verMas = new EventEmitter<void>();
}
