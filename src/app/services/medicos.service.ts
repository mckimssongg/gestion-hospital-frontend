import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicos } from '../interfaces';
import { baseUrlPro as baseUrl } from './index';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';
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
  constructor(private httpClient: HttpClient, private storage: Storage) {}

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

  subirArchivo($event: any) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `images/${file.name}`);
    console.log('......................', file, imgRef);
    uploadBytes(imgRef, file)
      .then((x) => {
        this.getImages();
      })
      .catch((error) => console.log(error));
  }

  getImages(list_images: string[] = []) {
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
      .then(async (images) => {
        list_images = [];
        for (let image of images.items) {
          const url = await getDownloadURL(image);
          list_images.push(url);
        }
      })
      .catch((error) => console.log(error));
  }
}
