import { Component, OnChanges, OnInit,SimpleChanges } from '@angular/core';
import { Consultas } from 'src/app/interfaces/consultas';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const list_consultas: Consultas[] = [
  {id_consulta:12, fecha:"01 de noviembre", num_consultorio:1,id_especialidad:34,id_medico:1,id_paciente:5}
];
@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit,OnChanges {
  displayedColumns: string[] = ["id_consulta", "fecha","num_consultorio","id_especialidad","id_medico","id_paciente"];

  list_consultas: Consultas[] = [
    { id_consulta:2,fecha:"2/23/2022",num_consultorio:4,id_especialidad:2,id_medico:3,id_paciente:2},
  ];




  dataSource = this.list_consultas;
  form = new FormGroup({
    id: new FormControl<number | null>(null),
    cmp: new FormControl<number | null>(null),
    apellidos: new FormControl<string>(""),
    nombres: new FormControl<string>(""),
    foto: new FormControl<string>("")
  });

  constructor() { }
  public view: boolean = false;
  ngOnInit(): void {}

  onChangeView() {
    console.log('cambio de vista');
    this.view = !this.view;
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  created() {
    if (this.form.valid) {
      let new_object: Consultas = this.form.value as Consultas;
      let new_objects = [...this.list_consultas, new_object];
      this.dataSource = new_objects;
      this.form.reset();
    }
  }

}
