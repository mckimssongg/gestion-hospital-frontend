import { Component,OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Medicos } from 'src/app/interfaces/medicos';
import { FormControl, FormGroup, Validators } from '@angular/forms';



const list_medicos: Medicos[] = [
  {id:1,cmp:3,apellidos:"Mckimsson",nombres:"Jeremie", foto:"FOTO AQUI"}
];

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit,OnChanges {
  displayedColumns: string[] = ["id_medicos", "cmp", "apellidos","nombres", "foto"];

  list_medicos: Medicos[] = [
    { id:2,cmp:4,apellidos:"vicente",nombres:"wilson",foto:"foto"},
  ];


  dataSource = this.list_medicos;

  form = new FormGroup({
    nombre: new FormControl<string>(''),
    id_Médicos: new FormControl<number | null>(null),
  });

  constructor() { }
  public view: boolean = false;
  gnOnInit(): void {}

  public View: boolean = false;
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
      let new_objects = [...this.list_medicos, new_object];
      this.dataSource = new_objects;
      this.form.reset();
    }
  }

}
function captura(){

  var id_medicos=document.getElementById().Value;
  console.log(captura)
}
