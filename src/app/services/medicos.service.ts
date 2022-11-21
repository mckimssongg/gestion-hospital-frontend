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
export class MedicosService {
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
   * @returns Observable<Medicos[]>
   * @description Obtiene el listado de medicos
   */
  obtenerLista(): Observable<Medicos[]> {
    return this.httpClient.get<Medicos[]>(`${this.baseUrl}medicos/`);
  }
}
