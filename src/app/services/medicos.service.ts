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
  constructor(private httpClient: HttpClient) {}

  /**
   * @returns Observable<Medicos[]>
   * @description Obtiene el listado de medicos
   */
  obtenerLista(): Observable<Medicos[]> {
    return this.httpClient.get<Medicos[]>(`${baseUrl}medicos/`);
  }

  /**
   * @param empleado Especialidades
   * @returns Observable<Object>
   * @description Crea un nuevo empleado
   * @example
   * {
   * id_especialidad: number,
   * nombre: string
   * }
   */
   registrar(obj: Medicos): Observable<Object> {
    return this.httpClient.post(`${baseUrl}medicos/`, obj);
  }
  eliminar(id: number): Observable<Object> {
    return this.httpClient.delete(`${baseUrl}medicos/${id}`);
  }
  actualizar(id: number, obj: Medicos): Observable<Object> {
    return this.httpClient.put(`${baseUrl}medicos/${id}/`, obj);
  }
}