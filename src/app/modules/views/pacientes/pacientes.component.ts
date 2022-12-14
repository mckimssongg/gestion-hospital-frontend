import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/interfaces/pacientes';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  displayedColumns: string[] = [
    'idPaciente',
    'apellidos',
    'nombres',
    'direccion',
    'dni',
    'email',
    'telefono',
    'acciones',
  ];

  dataSource: Pacientes[] = [];

  form = new FormGroup({
    apellidos: new FormControl<string>('', [Validators.required]),
    nombres: new FormControl<string>('', [Validators.required]),
    direccion: new FormControl<string>('', [Validators.required]),
    dni: new FormControl<number | null>(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    telefono: new FormControl<number | null>(null, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
  });

  constructor(
    private pacienteService: PacienteService,
    private modalService: NgbModal
  ) {}

  public is_open_modal: boolean = false;
  public view: boolean = false;

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes() {
    this.pacienteService.obtenerLista().subscribe((data) => {
      this.dataSource = data;
      console.log(data);
    });
  }

  onChangeView() {
    this.view = !this.view;
    this.getPacientes();
  }

  initValuesForm(element: Pacientes) {
    this.form.setValue({
      apellidos: element.apellidos,
      nombres: element.nombres,
      direccion: element.direccion,
      dni: element.dni,
      email: element.email,
      telefono: element.telefono,
    });
  }

  created() {
    if (this.form.valid) {
      this.pacienteService
        .registrar(this.form.value as Pacientes)
        .subscribe((data) => {
          console.log();
          Swal.fire('Registro guardado', '', 'success');
          this.getPacientes();
        });
      this.form.reset();
    }
  }

  update(id: number) {
    if (this.form.valid) {
      let obj_Pacientes = this.form.value as Pacientes;
      obj_Pacientes.idPaciente = id;
      this.pacienteService.actualizar(id, obj_Pacientes).subscribe({
        next: (data) => {
          Swal.fire('Registro actualizado', '', 'success');
          this.getPacientes();
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
          this.pacienteService.eliminar(id_registro).subscribe({
            next: (data) => {
              this.getPacientes();
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
