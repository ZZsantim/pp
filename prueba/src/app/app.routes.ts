import { Routes } from '@angular/router';
import { PortalPrincipal } from './paginas/portal-principal/portal-principal';
import { CitaCalendario } from './paginas/cita-calendario/cita-calendario';
import { CitaDetalle } from './paginas/cita-detalle/cita-detalle';
import { CitaConfirmacion } from './paginas/cita-confirmacion/cita-confirmacion';
import { Admin } from './paginas/admin/admin';
import { Mecanico } from './paginas/mecanico/mecanico';

export const routes: Routes = [
  { path: '', component: PortalPrincipal },
  { path: 'cita/calendario', component: CitaCalendario },
  { path: 'cita/detalle', component: CitaDetalle },
  { path: 'cita/confirmacion', component: CitaConfirmacion },
  { path: 'admin', component: Admin },
  { path: 'mecanico', component: Mecanico },
  { path: '**', redirectTo: '' },
];
