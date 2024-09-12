import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ListadoComponent } from './page/listado/listado.component';
import { UpsertComponent } from './page/upsert/upsert.component';
import { DetalleComponent } from './page/detalle/detalle.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
      path: 'home',
      component: ListadoComponent
    },
    {
      path: 'nuevo',
      component: UpsertComponent
    },
    {
      path: 'detalle/:id',
      component: DetalleComponent
    },
    {
      path: 'editar/:id',
      component: UpsertComponent
    },
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full'
    }
    ]
  }
];
