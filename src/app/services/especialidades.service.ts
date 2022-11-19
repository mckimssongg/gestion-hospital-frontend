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
  // private baseUrl = 'http://localhost:8080/';
  private baseUrl = 'https://upana-db-hospital.herokuapp.com/';
  constructor(private httpClient: HttpClient) {}

  /**
   * @returns Observable<Especialidades[]>
   * @description Obtiene el listado de especialidades
   */
  obtenerLista(): Observable<Especialidades[]> {
    return this.httpClient.get<Especialidades[]>(
      `${this.baseUrl}especialidades/`
    );
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
  registrar(obj: Especialidades): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}especialidades/`, obj);
  }
  eliminar(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}especialidades/${id}`);
  }
  actualizar(id: number, obj: Especialidades): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}especialidades/${id}`, obj);
  }
}
