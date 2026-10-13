import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-info',
  standalone: true,
  templateUrl: './campo-info.html',
  styleUrl: './campo-info.css',
})
export class CampoInfo {
  @Input() etiqueta = '';
  @Input() valor = '';
}
