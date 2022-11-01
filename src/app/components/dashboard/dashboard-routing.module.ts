import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { DashboardComponent } from './dashboard.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { InicioComponent } from './inicio/inicio.component';
import { LaboratoriosComponent } from './laboratorios/laboratorios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PacientesComponent } from './pacientes/pacientes.component';

const routes: Routes = 
[
  //para mostrar el HTML del tablero(dashboard)
  {path: "", component: DashboardComponent, children:
    [
      {path: "", component: InicioComponent},
      {path: "medicos", component: MedicosComponent},
      {path: "pacientes", component: PacientesComponent},
      {path: "laboratorios", component: LaboratoriosComponent},
      {path: "especialidades", component: EspecialidadesComponent},
      {path: "consultas", component: ConsultasComponent}
    ]}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
