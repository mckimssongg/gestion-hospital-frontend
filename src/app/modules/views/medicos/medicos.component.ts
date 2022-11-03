import { Component, OnInit } from '@angular/core';
import { Medicos } from 'src/app/interfaces/medicos';

const list_medicos: Medicos[] = [
  {id:1,cmp:3,apellidos:"Mckimsson",nombres:"Jeremie", foto:"FOTO AQUI"}
];

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  displayedColumns: string[] = ["id", "cmp", "apellidos","nombres", "foto"];
  dataSource = list_medicos;
  constructor() { }

  ngOnInit(): void {
  }

}
