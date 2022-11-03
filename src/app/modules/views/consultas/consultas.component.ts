import { Component, OnInit } from '@angular/core';
import { Consultas } from 'src/app/interfaces/consultas';

const list_consultas: Consultas[] = [
  {id_consulta:12, fecha:"01 de noviembre", num_consultorio:1,id_especialidad:34,id_medico:1,id_paciente:5}
];
@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  displayedColumns: string[] = ["id_consulta", "fecha","num_consultorio","id_especialidad","id_medico","id_paciente"];
  dataSource = list_consultas;
  constructor() { }

  ngOnInit(): void {
  }

}
