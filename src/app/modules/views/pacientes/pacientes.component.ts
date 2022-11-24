import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pacientes } from 'src/app/interfaces/pacientes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    'id_paciente',
    'apellidos',
    'nombres',
    'direccion',
    'dni',
    'email',
    'telefono'
  ];

  dataSource: Pacientes[]=[]

  form = new FormGroup({
    apellidos: new FormControl<string>(''),
    nombres: new FormControl<string>(''),
    direccion: new FormControl<string>(''),
    dni: new FormControl<number | null>(null),
    email: new FormControl<string>(''),
    telefono: new FormControl<number | null>(null),
  });

  constructor( 
    private pacienteService: PacienteService,
    private modalService: NgbModal
  ){}

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

  created() {
    if (this.form.valid) {
      this.pacienteService
        .registrar(this.form.value as Pacientes)
        .subscribe((data) => {
          console.log()
          Swal.fire('Registro guardado', '', 'success');
          this.getPacientes();
        });
      this.form.reset();
    }
  }

  update(id: number) {
    if (this.form.valid) {
      let obj_Pacientes = this.form.value as Pacientes;
      obj_Pacientes.idPaciente= id;
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
  delete(idPaciente: number, nombre_registro: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary mx-2',
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
      .then((result) => {
        if (result.isConfirmed) {
          this.pacienteService.eliminar(idPaciente).subscribe({
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