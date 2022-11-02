import { Component, OnInit } from '@angular/core';
import { Especialidades } from 'src/app/interfaces/especialidades';

const list_especialidades: Especialidades[] = [
  {id_especialidad:220,nombre:"Dulce"}
];
@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  displayedColumns: string[] = ["id_especialidad","nombre"];
  dataSource = list_especialidades
  constructor() { }

  ngOnInit(): void {
  }

}
