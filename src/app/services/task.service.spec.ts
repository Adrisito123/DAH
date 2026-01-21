import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Noticia } from '../interfaces/noticia';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [IonicModule], 
})
export class HomePage {
  noticias: Noticia[] = [];
  cargando = true;
  mostrarFormulario = false;
  nuevaNoticia: Partial<Noticia> = {};

  constructor(private TaskService: TaskService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.noticias = this.TaskService.getNoticias();
    this.cargando = false;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  agregarNoticia() {
    if (!this.nuevaNoticia.titulo || !this.nuevaNoticia.titulo.trim()) return;
    this.TaskService.agregarNoticia(this.nuevaNoticia as Noticia);
    this.nuevaNoticia = {};
    this.cargarNoticias();
    this.mostrarFormulario = false;
  }

  trackById(index: number, item: Noticia) {
    return item.id;
  }

  mostrarDetallesNoticia(noticia: Noticia) {
    console.log('Detalles de noticia:', noticia);
  }

  eliminarNoticia(noticia: Noticia) {
    // Implementa eliminar si quieres
    console.log('Eliminar noticia:', noticia);
  }
}
