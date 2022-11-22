import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Medicos } from 'src/app/interfaces/medicos';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'cmp', 'apellidos', 'nombres', 'foto'];

  list_medicos: Medicos[] = [
    {
      idMedico: 2,
      cmp: 4,
      apellidos: 'vicente',
      nombres: 'wilson',
      foto: 'foto',
    },
  ];

  dataSource = this.list_medicos;

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    cmp: new FormControl<number | null>(null),
    apellidos: new FormControl<string>(''),
    nombres: new FormControl<string>(''),
    foto: new FormControl<string>(''),
  });

  constructor() {}

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
      let new_object: Medicos = this.form.value as Medicos;
      let new_objects = [...this.dataSource, new_object];
      this.dataSource = new_objects;
      this.form.reset();
    }
  }
}
