import {  Component, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { Laboratorios } from 'src/app/interfaces/laboratorios';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboratoriosService } from 'src/app/services/laboratorios.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css'],
})
export class LaboratoriosComponent implements OnInit{
  displayedColumns: string[] = ['idExamen', 'descripcion','nombre','acciones'];

  dataSource: Laboratorios[]=[];

  form = new FormGroup({
    descripcion: new FormControl<string>(''),
    nombre: new FormControl<string>('')
  });
  constructor(
    private laboratoriosService: LaboratoriosService,
    private modalService: NgbModal
  ){}

  public is_open_modal: boolean = false;
  public view: boolean = false;
  
  ngOnInit(): void {
    this.getLaboratorios();
  }

  getLaboratorios() {
    this.laboratoriosService.obtenerLista().subscribe((data) => {
      this.dataSource = data;
      console.log(data);
    });
  }

  onChangeView() {
    this.view = !this.view;
    this.getLaboratorios();
  }

  created() {
    if (this.form.valid) {
      this.laboratoriosService
        .registrar(this.form.value as Laboratorios)
        .subscribe((data) => {
          console.log()
          Swal.fire('Registro guardado', '', 'success');
          this.getLaboratorios();
        });
      this.form.reset();
    }
  }

  update(id: number) {
    if (this.form.valid) {
      let obj_Laboratorios = this.form.value as Laboratorios;
      obj_Laboratorios.idExamen = id;
      this.laboratoriosService.actualizar(id, obj_Laboratorios).subscribe({
        next: (data) => {
          Swal.fire('Registro actualizado', '', 'success');
          this.getLaboratorios();
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
  delete(idExamen: number, nombre_registro: string) {
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
          this.laboratoriosService.eliminar(idExamen).subscribe({
            next: (data) => {
              this.getLaboratorios();
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