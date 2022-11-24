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
import { baseUrlPro as baseUrl } from './index';


@Injectable({
  providedIn: 'root',
})
export class PacienteService {
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
  constructor(private httpClient: HttpClient) {}

  /**
   * @returns Observable<Pacientes[]>
   * @description Obtiene el listado de pacientes
   */
  obtenerLista(): Observable<Pacientes[]> {
    return this.httpClient.get<Pacientes[]>(`${baseUrl}pacientes/`);
  }
  /**
   * @param empleado Pacientes
   * @returns Observable<Object>
   * @description Crea un nuevo empleado
   * @example
   * {
   * id_especialidad: number,
   * nombre: string
   * }
   */
  registrar(obj: Pacientes): Observable<Object> {
    return this.httpClient.post(`${baseUrl}pacientes/`, obj);
  }
  eliminar(id: number): Observable<Object> {
    return this.httpClient.delete(`${baseUrl}pacientes/${id}`);
  }
  actualizar(id: number, obj: Pacientes): Observable<Object> {
    return this.httpClient.put(`${baseUrl}pacientes/${id}/`, obj);
  }
}