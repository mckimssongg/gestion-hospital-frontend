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
    private modalService: NgbModal
  ) {}

  public view: boolean = false;
  ngOnInit(): void {
    this.service.obtenerLista().subscribe((data) => {
      this.dataSource = data;
    });
    //Traer especialidades
    this.especialidadesService.obtenerLista().subscribe((data) => {
      this.Especialidades_Option = data;
    });
    //Traer medicos
    // this.medicosService.obtenerLista().subscribe((data) => {
    //   this.Medicos_Option = data;
    // });
    //Traer pacientes
    // this.pacientesService.obtenerLista().subscribe((data) => {
    //   this.Pacientes_Option = data;
    // });
  }

  onChangeView() {
    this.view = !this.view;
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  format(dateString: string) {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  created() {
    if (this.form.valid) {
      // let new_object: Consultas = this.form.value as Consultas;
      // let new_objects = [...this.dataSource, new_object];
      // this.dataSource = new_objects;
      this.form.reset();
    }
  }
}
