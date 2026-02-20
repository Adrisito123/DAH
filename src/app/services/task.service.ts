import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../interfaces/noticia';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

 
  getNoticias(busqueda: string = '', campo: string = 'id', sentido: string = 'desc'): Observable<Noticia[]> {
    let orden = sentido === 'desc' ? `-${campo}` : campo;
    let urlFinal = `${this.url}?_sort=${orden}`;
    
    if (busqueda && busqueda.trim() !== '') {
      urlFinal += `&q=${busqueda.trim()}`;
    }

    console.log('URL Final enviada:', urlFinal);
    return this.http.get<Noticia[]>(urlFinal);
  }

  // Mantenemos este para la página de detalle
getNoticiaById(id: string | number): Observable<Noticia> {
    // En lugar de /noticias/6, usamos /noticias?id=6
    return this.http.get<Noticia[]>(`${this.url}?id=${id}`).pipe(
      map(noticias => noticias[0]) // Cogemos la primera (y única) que coincida
    );
  }

  // Crear noticia (POST)
  agregarNoticia(noticia: any): Observable<Noticia> {
    return this.http.post<Noticia>(this.url, noticia);
  }

  // Borrar noticia (DELETE)
  eliminarNoticia(id: number | string): Observable<any> {
  // Convertimos a string para la URL, pero JSON Server 
  // lo entenderá si el ID coincide en valor
  return this.http.delete(`${this.url}/${id}`);
}

  actualizarNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.put<Noticia>(`${this.url}/${noticia.id}`, noticia);
  }
}