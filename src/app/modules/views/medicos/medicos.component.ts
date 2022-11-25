import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Medicos } from 'src/app/interfaces/medicos';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private medicosService: MedicosService,
    private modalService: NgbModal
  ) {}

  public is_open_modal: boolean =false;
  public view: boolean = false;

  ngOnInit(): void {
    this.getMedicos();
  }

  getMedicos(){
    this.MedicosService.obtenerLista().subscribe((data) => {
        this.dataSource = data;
        console.log(data);
  });
}

  onChangeView() {
    console.log('cambio de vista');
    this.view = !this.view;
    this.getMedicos();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  created() {
    if (this.form.valid) {
      this.medicosService
      .registrar(this,form.value as Medicos)
      .subscribe((data) => {
        Swal.fire ('registro guardado','','success');
        this.getMedicos();
      });
      this.form.reset();
    }
  }

update(id: number){
  if (this.form.valid){
    let obj_Medicos = this.form.value as Medicos;
    obj_Medicos.idMedicos = id;
    this.medicosService.actualizar(id, obj_Medicos).subscribe({
      next: (data) => {
        Swal.fire('registro actualizado','','success');
        this.getMedicos
      },
      error: (error) =>{
        Swal.fire('Error','','error');
        console.log(error);

      },
      complete: () => {
        this.modalService.dismissAll();

      },

    });
    this.form.reset();
  }
}

delete(id_registro: Number,nombre_registro: string) {
const swalWithBootstrapButtons =Swal.mixin({
  custtomClass: {
    confirButton: 'btn btn-primary mx-2',
    cancelButton: 'btn btn-danger mx-2',
  },
  buttonsStyling: false,
   });
    swalWithBootstrapButtons
    .fire({
      title: '¿Estás seguro?',
      text: `Estas por eliminar ${nombre_registro}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Quiero eliminarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    })
    .then((result) =>{
      if (result.IsCconfirmed) {
        this.medicosService.eliminar(id_registro).subscribe({
          next: (data) => {
            this.getMedicos();
            swalWithBootstrapButtons.fire(
              'Eliminado',
              `${nombre_registro} ha sido eliminado.`,
                'success'
            );
          }
          error: (error) => {
            swalWithBootstrapButtons.fire('Error', '', 'error');
            console.log(error);
        },
        complete: () => {
          console.log('complete');
      },
    });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    swalWithBootstrapButtons.fire('Cancelado', '', 'error');
  }
});




      let new_object: Medicos = this.form.value as Medicos;
      let new_objects = [...this.dataSource, new_object];
      this.dataSource = new_objects;
      this.form.reset();
    }
  }
}
