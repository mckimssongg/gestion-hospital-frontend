import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = 
[
  {path: "", redirectTo: "login", pathMatch: "full"},//automaticamente redicrecciona al login
  {path: 'login', component: LoginComponent},
  {path: "dashboard", loadChildren: () => import("./components/dashboard/dashboard.module").then(x => x.DashboardModule)},//para cargar el tablero (carga perezosa (trae algunos componentes))
  {path:"**", redirectTo: "login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
