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
export class LaboratoriosService {
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
   * @returns Observable<Laboratorios[]>
   * @description Obtiene el listado de Laboratorios
   */
  obtenerLista(): Observable<Laboratorios[]> {
    return this.httpClient.get<Laboratorios[]>(`${this.baseUrl}examenes/`);
  }

  /**
   * @param empleado Laboratorios
   * @returns Observable<Object>
   * @description Crea un nuevo empleado
   * @example
   * {
   * id_especialidad: number,
   * nombre: string
   * }
   */
  registrar(obj: Laboratorios): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}examenes/`, obj);
  }
  eliminar(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}examenes/${id}`);
  }
  actualizar(id: number, obj: Laboratorios): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}examenes/${id}/`, obj);
  }
}
