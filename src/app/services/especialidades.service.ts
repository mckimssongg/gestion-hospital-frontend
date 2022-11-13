import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Consultas,
  Especialidades,
  Medicos,
  Laboratorios,
  Pacientes,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  //Url de la API que obtiene el listado de los empleados
  private baseUrl = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) {}
}
