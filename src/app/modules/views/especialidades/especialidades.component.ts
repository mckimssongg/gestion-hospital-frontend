import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css'],
})
export class EspecialidadesComponent implements OnInit {
  displayedColumns: string[] = ['id_especialidad', 'nombre', 'acciones'];

  dataSource: Especialidades[] = [];

  form = new FormGroup({
    nombre: new FormControl<string>(''),
  });

  constructor(private especialidadesService: EspecialidadesService) {}

  public is_open_modal: boolean = false;
  public view: boolean = false;

  ngOnInit(): void {
    this.getEspecialidades();
  }

  getEspecialidades() {
    this.especialidadesService.obtenerLista().subscribe((data) => {
      this.dataSource = data;
      console.log(data);
    });
  }

  onChangeView() {
    this.view = !this.view;
  }

  created() {
    if (this.form.valid) {
      this.especialidadesService
        .registrar(this.form.value as Especialidades)
        .subscribe((data) => {
          Swal.fire('Registro guardado', '', 'success');
          this.getEspecialidades();
        });
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
