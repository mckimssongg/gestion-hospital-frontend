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
export class EspecialidadesService {
  //Url de la API que obtiene el listado de los empleados
  /* get >>>>> es para traer datos
    post ("url")
    post >>>>> es para enviar datos
    post ("url", objeto)
    put >>>>> es para actualizar datos
    post ("url", objeto)
    delete >>>>> es para eliminar datos
    post ("url", objeto)
  */
  // private baseUrl = 'http://localhost:8080/';

  private baseUrl = 'https://upana-db-hospital.herokuapp.com/';
  constructor(private httpClient: HttpClient) {}

  /**
   * @returns Observable<Pacientes[]>
   * @description Obtiene el listado de pacientes
   */
  obtenerLista(): Observable<Pacientes[]> {
    return this.httpClient.get<Pacientes[]>(`${this.baseUrl}pacientes/`);
  }
}
