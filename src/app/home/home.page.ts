import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { close, settingsOutline, add, searchOutline, filterOutline, trashOutline } from 'ionicons/icons';

import { TaskService } from '../services/task.service';
import { SettingsService } from '../services/settings.services';
import { Noticia } from '../interfaces/noticia';
import { TaskItemComponent } from '../components/task-item/task-noticia.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, TaskItemComponent]
})
export class HomePage implements OnInit {
  noticias: Noticia[] = [];
  textoBusqueda: string = '';
  campoOrden: string = 'id';
  sentidoOrden: string = 'desc';
  nombre: string = 'Usuario';
  mostrarFormulario = false;
  cargando = true;

  nuevaNoticia: Partial<Noticia> = { titulo: '', resumen: '', autor: '', imagenUrl: '' };

  constructor(
    private taskService: TaskService,
    private settingsService: SettingsService,
    private toastController: ToastController
  ) {
    addIcons({ close, settingsOutline, add, searchOutline, filterOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarNombre();
    this.cargarNoticias();
  }

  async cargarNombre() {
    const n = await this.settingsService.getNombre();
    this.nombre = n || 'Usuario';
  }

  cargarNoticias() {
    this.cargando = true;
    this.taskService.getNoticias(this.textoBusqueda, this.campoOrden, this.sentidoOrden).subscribe({
      next: (data) => {
        this.noticias = [...data];
        setTimeout(() => this.cargando = false, 500);
      },
      error: () => this.cargando = false
    });
  }

  buscar(ev: any) {
    this.textoBusqueda = ev.target.value || '';
    this.cargarNoticias();
  }

  cambiarOrden(ev: any) {
    const parts = ev.detail.value.split('_');
    this.campoOrden = parts[0];
    this.sentidoOrden = parts[1];
    this.cargarNoticias();
  }

  toggleFormulario() { this.mostrarFormulario = !this.mostrarFormulario; }

  agregarNoticia() {
    // Validación básica
    if (!this.nuevaNoticia.titulo || !this.nuevaNoticia.resumen) {
      this.mostrarToast('Por favor, rellena título y resumen');
      return;
    }

    const noticiaAGuardar: Noticia = {
      titulo: this.nuevaNoticia.titulo,
      resumen: this.nuevaNoticia.resumen,
      autor: this.nuevaNoticia.autor || 'Redacción', // Valor por defecto
      imagenUrl: this.nuevaNoticia.imagenUrl || 'https://via.placeholder.com/400x200?text=Noticia', // Imagen por defecto
      fechaPublicacion: new Date().toISOString()
    };

    this.taskService.agregarNoticia(noticiaAGuardar).subscribe({
      next: () => {
        this.mostrarToast('¡Noticia añadida con éxito!');
        this.mostrarFormulario = false;
        // Limpiamos el formulario
        this.nuevaNoticia = { titulo: '', resumen: '', autor: '', imagenUrl: '' };
        this.cargarNoticias(); // Recarga la lista para ver la nueva
      }
    });
  }

  eliminarNoticia(noticia: Noticia) {
  if (noticia.id === undefined) return;

  console.log('Intentando borrar ID:', noticia.id);

  this.taskService.eliminarNoticia(noticia.id).subscribe({
    next: () => {
      console.log('Borrado exitoso en el servidor');
      this.mostrarToast('Noticia eliminada correctamente');
      this.cargarNoticias(); // Refrescamos la lista
    },
    error: (err) => {
      console.error('Error al borrar:', err);
      this.mostrarToast('No se pudo borrar: ID no encontrado');
    }
  });
}

  doRefresh(ev: any) {
    this.taskService.getNoticias().subscribe(data => {
      this.noticias = [...data];
      ev.target.complete();
    });
  }

  async mostrarToast(m: string) {
    const t = await this.toastController.create({ message: m, duration: 2000 });
    await t.present();
  }

  trackById(i: number, item: Noticia) { return item.id; }
}