import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css'],
})
export class EspecialidadesComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id_especialidad', 'nombre'];

  list_especialidades: Especialidades[] = [
    { id_especialidad: 220, nombre: 'Dulce' },
  ];

  dataSource = this.list_especialidades;

  form = new FormGroup({
    nombre: new FormControl<string>(''),
    id_especialidad: new FormControl<number | null>(null),
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
      let new_object: Especialidades = this.form.value as Especialidades;
      let new_objects = [...this.dataSource, new_object];
      this.dataSource = new_objects;
      this.form.reset();
    }
  }
}
