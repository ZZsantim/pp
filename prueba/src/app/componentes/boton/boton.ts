import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton',
  standalone: true,
  templateUrl: './boton.html',
  styleUrl: './boton.css',
})
export class Boton {
  @Input() texto = '';
  @Input() variante: 'primario' | 'secundario' = 'primario';
  @Input() tipo: 'button' | 'submit' = 'button';
  @Output() pulsado = new EventEmitter<void>();
}
