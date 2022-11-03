import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  //automaticamente redicrecciona al login
  { path: 'login', component: LoginComponent },

  //Para la carga de las vistas
  {
    path: 'inicio',
    loadChildren: () =>
      import('./modules/views/dashboard.module').then((x) => x.DashboardModule),
  },

  // Si no hace match con ninguna ruta, redirecciona al login
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
