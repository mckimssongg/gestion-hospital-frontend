import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pacientes } from 'src/app/interfaces/pacientes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  displayedColumns: string[] = [
    'id_paciente',
    'apellidos',
    'nombres',
    'direccion',
    'dni',
    'email',
    'telefono',
  ];

  list_pacientes: Pacientes[] = [];

  dataSource = this.list_pacientes;

  form = new FormGroup({
    apellidos: new FormControl<string>(''),
    nombres: new FormControl<string>(''),
    direccion: new FormControl<string>(''),
    dni: new FormControl<number | null>(null),
    email: new FormControl<string>(''),
    telefono: new FormControl<number | null>(null),
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
      let new_object: Pacientes = this.form.value as Pacientes;
      let new_objects = [...this.dataSource, new_object];
      this.dataSource = new_objects;
      this.form.reset();
    }
  }
}
