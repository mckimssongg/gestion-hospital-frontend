import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Consultas } from 'src/app/interfaces/consultas';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaService } from 'src/app/services/consulta.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Especialidades } from '../../../interfaces/especialidades';
import { Medicos } from '../../../interfaces/medicos';
import { Pacientes } from '../../../interfaces/pacientes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { MedicosService } from '../../../services/medicos.service';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent implements OnInit, OnChanges {
  displayedColumns: string[] = [
    'fecha',
    'num_consultorio',
    'id_especialidad',
    'id_medico',
    'id_paciente',
    'acciones',
  ];

  dataSource: Consultas[] = [];

  Especialidades_Option: Especialidades[] = [];
  Medicos_Option: Medicos[] = [];
  Pacientes_Option: Pacientes[] = [];

  form = new FormGroup({
    fecha: new FormControl<string>(''),
    num_consultorio: new FormControl<number | null>(null),
    id_especialidad: new FormControl<number | null>(null),
    id_medico: new FormControl<number | null>(null),
    id_paciente: new FormControl<number | null>(null),
  });

  constructor(
    private service: ConsultaService,
    private especialidadesService: EspecialidadesService,
    private medicosService: MedicosService,
    private pacienteService: PacienteService,
    private modalService: NgbModal
  ) {}

  public view: boolean = false;
  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.service.obtenerLista().subscribe((data) => {
      this.dataSource = data;
    });
    //Traer especialidades
    this.especialidadesService.obtenerLista().subscribe((data) => {
      this.Especialidades_Option = data;
    });
    // Traer medicos
    this.medicosService.obtenerLista().subscribe((data) => {
      this.Medicos_Option = data;
    });
    // Traer pacientes
    this.pacienteService.obtenerLista().subscribe((data) => {
      this.Pacientes_Option = data;
    });
  }

  onChangeView() {
    this.view = !this.view;
    // this.getAllData();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  format(dateString: string): string {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    //LocalDateTime 2007-12-03T10:15:30
    return `${year}-${month}-${day}T00:00:00`;
  }
  created() {
    if (this.form.valid) {
      let fecha_formatea = this.format(this.form.value.fecha as string);
      let obj_consulta: Consultas = this.form.value as Consultas;
      obj_consulta.fecha = fecha_formatea;
      this.service.registrar(obj_consulta as Consultas).subscribe({
        next: () => {
          Swal.fire('Registro guardado', '', 'success');
        },
        error: (err) => {
          Swal.fire('Error', err.error, 'error');
        },
        complete: () => {
          this.getAllData();
        },
      });
      this.form.reset();
    }
  }

  // para testear
  created2() {
    if (this.form.valid) {
      let fecha_formatea = this.format(this.form.value.fecha as string);
      let obj_consulta: Consultas = this.form.value as Consultas;
      obj_consulta.fecha = fecha_formatea;
      let list_consulta = [...this.dataSource, obj_consulta];
      this.dataSource = list_consulta;
      this.form.reset();
    }
  }
  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        let lista_consultas = this.dataSource.filter(
          (item) => item.id_consulta != id
        );
        this.dataSource = lista_consultas;
      }
    });
  }
}
