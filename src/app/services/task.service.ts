import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../interfaces/noticia';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // GET: Lista completa
  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.url);
  }

  // MEJORA 1: Búsqueda en servidor (?q=)
  buscarNoticias(termino: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.url}?q=${termino}`);
  }

  // MEJORA 2: Ordenación dinámica (?_sort= & _order=)
  getNoticiasOrdenadas(campo: string, orden: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.url}?_sort=${campo}&_order=${orden}`);
  }

  getNoticiaById(id: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.url}/${id}`);
  }

  agregarNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.url, noticia);
  }

  eliminarNoticia(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}