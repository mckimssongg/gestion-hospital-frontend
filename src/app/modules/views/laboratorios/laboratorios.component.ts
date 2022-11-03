import { Component, OnInit } from '@angular/core';
import { Laboratorios } from 'src/app/interfaces/laboratorios';

const list_laboratorios: Laboratorios[] = [
  {id_examen:20838766,descripcion:"Laboratorio de sangre",nombre:"Federica"}
];
@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit {
  displayedColumns: string[] = ["id_examen","descripcion","nombre"];
  dataSource = list_laboratorios
  constructor() { }

  ngOnInit(): void {
  }

}
