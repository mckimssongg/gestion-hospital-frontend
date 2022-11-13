import { Component, OnChanges, OnInit,SimpleChanges } from '@angular/core';
import { Consultas } from 'src/app/interfaces/consultas';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    id_consulta: new FormControl<number | null>(null),
    fecha: new FormControl<string>(""),
    num_consultorio: new FormControl<number | null>(null),
    id_especialidad: new FormControl<number | null>(null),
    id_medico: new FormControl<number | null>(null),
    id_paciente: new FormControl<number | null>(null)
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
      let new_objects = [...this.dataSource, new_object];
      this.dataSource = new_objects;
      this.form.reset();
    }
  }

}
