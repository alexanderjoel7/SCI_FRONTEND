import { Routes } from '@angular/router';
import { ContenidoComponent } from './pages/menu/contenido/contenido.component';
import { PaginanoencontradaComponent } from './pages/general/paginanoencontrada/paginanoencontrada.component';
import { TipoObligacionComponent } from './pages/administracion/tipo-obligacion/tipo-obligacion.component';
import { UsuariosComponent } from './pages/administracion/Usuarios/usuarios.component';
export const routes: Routes = [
    { path: '', redirectTo: '/panel', pathMatch: 'full' },
    {
      path: 'panel',
      component: ContenidoComponent,
      canActivate: [],
      children: [
        { path: '', component: ContenidoComponent, canActivate: [] },
        { path: 'usuarios', component: UsuariosComponent, canActivate: []},
        { path: 'tipObligacion', component: TipoObligacionComponent, canActivate: []},
        { path: '**', component: PaginanoencontradaComponent, canActivate: [] },
      ]
    },
];
