import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultas } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
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
   * @returns Observable<Especialidades[]>
   * @description Obtiene el listado de especialidades
   */
  obtenerLista(): Observable<Consultas[]> {
    return this.httpClient.get<Consultas[]>(`${this.baseUrl}consultas/`);
  }

  /**
   * @param empleado Especialidades
   * @returns Observable<Object>
   * @description Crea una nueva consulta
   * @example
   * {
    id_consulta: number,
    fecha: string,
    num_consultorio: number,
    id_especialidad: number,
    id_medico: number,
    id_paciente: number
   * }
   */
  registrar(obj: Consultas): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}consultas/`, obj);
  }
  eliminar(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}consultas/${id}`);
  }
  actualizar(id: number, obj: Consultas): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}consultas/${id}/`, obj);
  }
}
