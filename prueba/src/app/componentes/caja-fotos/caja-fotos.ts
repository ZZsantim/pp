import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-caja-fotos',
  standalone: true,
  templateUrl: './caja-fotos.html',
  styleUrl: './caja-fotos.css',
})
export class CajaFotos {
  @Input() fotos: string[] = [];
}
