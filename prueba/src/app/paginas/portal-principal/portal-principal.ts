import { Component } from '@angular/core';
import { AcercaDe } from '../../componentes/acerca-de/acerca-de';
import { BloqueAgendar } from '../../componentes/bloque-agendar/bloque-agendar';
import { Catalogo } from '../../componentes/catalogo/catalogo';
import { Destacados } from '../../componentes/destacados/destacados';
import { Footer } from '../../componentes/footer/footer';
import { Header } from '../../componentes/header/header';
import { HeroPromo } from '../../componentes/hero-promo/hero-promo';
import { MenuProductos } from '../../componentes/menu-productos/menu-productos';
import { Producto } from '../../modelos/producto';

@Component({
  selector: 'app-portal-principal',
  standalone: true,
  imports: [AcercaDe, BloqueAgendar, Catalogo, Destacados, Footer, Header, HeroPromo, MenuProductos],
  templateUrl: './portal-principal.html',
  styleUrl: './portal-principal.css',
})
export class PortalPrincipal {
  readonly itemsMenu = ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5', 'Otras cosas'];
  readonly productos: Producto[] = [
    { id: 1, titulo: 'Mantenimiento preventivo', descripcion: 'Cuida el rendimiento y la vida útil de tu vehículo.' },
    { id: 2, titulo: 'Diagnóstico general', descripcion: 'Revisión especializada para detectar cualquier detalle.' },
    { id: 3, titulo: 'Servicio de frenos', descripcion: 'Seguridad y confianza en cada kilómetro.' },
    { id: 4, titulo: 'Cambio de aceite', descripcion: 'Lubricantes y filtros adecuados para tu motor.' },
    { id: 5, titulo: 'Alineación y balanceo', descripcion: 'Conducción cómoda y desgaste uniforme.' },
    { id: 6, titulo: 'Revisión de batería', descripcion: 'Comprueba el sistema eléctrico de tu vehículo.' },
  ];
}
