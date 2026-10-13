import { Component } from '@angular/core';
import { Boton } from '../boton/boton';

@Component({
  selector: 'app-hero-promo',
  standalone: true,
  imports: [Boton],
  templateUrl: './hero-promo.html',
  styleUrl: './hero-promo.css',
})
export class HeroPromo {}
