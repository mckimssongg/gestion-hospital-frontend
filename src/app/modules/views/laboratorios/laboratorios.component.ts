import {  Component, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { Laboratorios } from 'src/app/interfaces/laboratorios';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css'],
})
export class LaboratoriosComponent implements OnInit, OnChanges{
  
  
  displayedColumns: string[] = ['id_examen', 'descripcion','nombre'];

  list_laboratorios: Laboratorios[] = [
    { id_examen: 220,descripcion:"hola", nombre: 'Dulce' },

  ];

  dataSource = this.list_laboratorios;

  form = new FormGroup({
    id_examen: new FormControl<number | null>(null),
    descripcion: new FormControl<string>(''),
    nombre: new FormControl<string>('')
    
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
      let new_object: Laboratorios = this.form.value as Laboratorios;
      let new_objects = [...this.list_laboratorios, new_object];
      this.dataSource = new_objects;
      this.list_laboratorios = new_objects;
      this.form.reset();
    }
  }
}