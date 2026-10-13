import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-productos',
  standalone: true,
  templateUrl: './menu-productos.html',
  styleUrl: './menu-productos.css',
})
export class MenuProductos {
  @Input() items: string[] = [];
}
