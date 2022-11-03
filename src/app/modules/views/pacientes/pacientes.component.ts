import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/interfaces/pacientes';

const list_pacientes: Pacientes[] = [
  {id_paciente:22,apellidos:"Herrera",nombres:"Dulce",direccion:"Narnia",dni:16217,email:"jojojo.com",telefono:896534}
];
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  displayedColumns: string[] = ["id_paciente","apellidos","nombres","direccion","dni","email","telefono"];
  dataSource = list_pacientes
  constructor() { }

  ngOnInit(): void {
  }

}
