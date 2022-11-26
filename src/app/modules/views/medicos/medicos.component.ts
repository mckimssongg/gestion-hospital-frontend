import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Medicos } from 'src/app/interfaces/medicos';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit {
  displayedColumns: string[] = [
    'idMedico',
    'cmp',
    'apellidos',
    'nombres',
    'foto',
    'acciones',
  ];

  images: string[] = [];
  file: any;
  imgRef: any;
  dataSource: Medicos[] = [];
  cargandoData: boolean = false;

  form = new FormGroup({
    cmp: new FormControl<number | null>(null, [Validators.required]),
    apellidos: new FormControl<string>('', [Validators.required]),
    nombres: new FormControl<string>('', [Validators.required]),
    foto: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private medicoService: MedicosService,
    private modalService: NgbModal,
    private storage: Storage
  ) {}

  public is_open_modal: boolean = false;
  public view: boolean = false;

  ngOnInit(): void {
    this.getMedicos();
    this.getImages();
  }

  subirArchivo = ($event: any) => {
    this.file = $event.target.files[0];
    this.imgRef = ref(this.storage, `images/${this.file.name}`);
    this.form.setValue({
      cmp: this.form.value.cmp || null,
      apellidos: this.form.value.apellidos || '',
      nombres: this.form.value.nombres || '',
      foto: this.file.name,
    });
  };

  subirCloud() {
    uploadBytes(this.imgRef, this.file)
      .then((x) => {
        this.getImages();
      })
      .catch((error) => console.log(error));
  }

  getOneImage(image: string): string {
    let imgURL = '';
    this.images.forEach((img) => {
      if (img.includes(image)) {
        imgURL = img;
      }
    });
    return imgURL;
  }

  getImages() {
    this.cargandoData = true;
    const imagesRef = ref(this.storage, 'images');
    listAll(imagesRef)
      .then(async (images) => {
        this.images = [];
        for (let image of images.items) {
          const url = await getDownloadURL(image);
          this.images.push(url);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        //set images a dataSource
        this.dataSource.forEach((medico) => {
          medico.foto = this.getOneImage(medico.foto);
        });
        console.log(this.dataSource);
        this.cargandoData = false;
      });
    this.cargandoData = false;
  }

  getMedicos() {
    this.medicoService.obtenerLista().subscribe((data) => {
      this.dataSource = data;
      console.log(data);
    });
  }

  onChangeView() {
    this.view = !this.view;
    this.getMedicos();
    this.getImages();
    console.log(this.images);
  }

  initValuesForm(element: Medicos) {
    this.form.setValue({
      cmp: element.cmp,
      apellidos: element.apellidos,
      nombres: element.nombres,
      foto: element.foto,
    });
  }

  created() {
    if (this.form.valid) {
      this.subirCloud();
      this.medicoService
        .registrar(this.form.value as Medicos)
        .subscribe((data) => {
          Swal.fire('Registro guardado', '', 'success');
          this.getMedicos();
        });

      this.form.reset();
    }
  }

  update(id: number) {
    if (this.form.valid) {
      let obj_Medico = this.form.value as Medicos;
      this.subirCloud();
      obj_Medico.idMedico = id;
      this.medicoService.actualizar(id, obj_Medico).subscribe({
        next: (data) => {
          Swal.fire('Registro actualizado', '', 'success');
          this.getMedicos();
        },
        error: (error) => {
          Swal.fire('Error', '', 'error');
          console.log(error);
        },
        complete: () => {
          this.modalService.dismissAll();
          this.imgRef = null;
          this.file = null;
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
          this.medicoService.eliminar(id_registro).subscribe({
            next: (data) => {
              this.getMedicos();
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
//_________________________________________________
