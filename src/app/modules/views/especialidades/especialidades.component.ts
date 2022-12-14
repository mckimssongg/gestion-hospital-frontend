import { Component, OnInit } from '@angular/core';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private especialidadesService: EspecialidadesService,
    private modalService: NgbModal
  ) {}

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
    this.getEspecialidades();
  }

  initValuesForm(element: Especialidades) {
    this.form.setValue({
      nombre: element.nombre
    });
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

  update(id: number) {
    if (this.form.valid) {
      let obj_Especialidad = this.form.value as Especialidades;
      obj_Especialidad.idEspecialidad = id;
      this.especialidadesService.actualizar(id, obj_Especialidad).subscribe({
        next: (data) => {
          Swal.fire('Registro actualizado', '', 'success');
          this.getEspecialidades();
        },
        error: (error) => {
          Swal.fire('Error', '', 'error');
          console.log(error);
        },
        complete: () => {
          this.modalService.dismissAll();
        },
      });
      this.form.reset();
    }
  }
  delete(id_registro: number, nombre_registro: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary mx-2',
        cancelButton: 'btn btn-danger mx-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '??Est??s seguro?',
        text: `Estas por eliminar ${nombre_registro}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Quiero eliminarlo!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.especialidadesService.eliminar(id_registro).subscribe({
            next: (data) => {
              this.getEspecialidades();
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                `${nombre_registro} ha sido eliminado.`,
                'success'
              );
            },
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
  }
}
