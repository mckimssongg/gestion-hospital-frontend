import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css'],
})
export class EspecialidadesComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id_especialidad', 'nombre', 'acciones'];

  list_especialidades: Especialidades[] = [
    { id_especialidad: 220, nombre: 'Dulce' },
  ];

  dataSource = this.list_especialidades;

  form = new FormGroup({
    nombre: new FormControl<string>(''),
    id_especialidad: new FormControl<number | null>(null),
  });

  constructor() {}

  public is_open_modal: boolean = false;
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

  openModal() {
    this.is_open_modal = true;
  }

  update(id: number) {
    console.log(id);
  }
  delete() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }
}
