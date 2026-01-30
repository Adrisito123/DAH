import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline, add, searchOutline, filterOutline } from 'ionicons/icons';

import { TaskService } from '../services/task.service';
import { SettingsService } from '../services/settings.services';
import { Noticia } from '../interfaces/noticia';
import { TaskItemComponent } from '../components/task-item/task-noticia.component';

@Component({
  selector: 'app-home', // <--- ANTES DECÍA 'app-task-noticia', ESO DABA EL ERROR
  templateUrl: './home.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, TaskItemComponent]
})
export class HomePage implements OnInit {
  noticias: Noticia[] = [];
  nombre: string = 'Usuario';
  mostrarFormulario = false;
  cargando = true;

  nuevaNoticia: Partial<Noticia> = {
    titulo: '',
    resumen: '',
    autor: '',
    imagenUrl: ''
  };

  constructor(
    private taskService: TaskService,
    private settingsService: SettingsService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    addIcons({ settingsOutline, add, searchOutline, filterOutline });
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.cargarNombre();
    await this.cargarNoticias();
  }

  async cargarNombre() {
    const nombreGuardado = await this.settingsService.getNombre();
    this.nombre = nombreGuardado || 'Usuario';
  }

  async cargarNoticias() {
    this.cargando = true;
    this.taskService.getNoticias().subscribe({
      next: (data) => {
        this.noticias = data;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error:', err);
      }
    });
  }

  buscar(event: any) {
    const texto = event.target.value;
    if (texto && texto.trim() !== '') {
      this.taskService.buscarNoticias(texto).subscribe(data => this.noticias = data);
    } else {
      this.cargarNoticias();
    }
  }

  cambiarOrden(event: any) {
    const criterio = event.detail.value;
    
    // Creamos una copia nueva del array para que Angular detecte el cambio
    const noticiasOrdenadas = [...this.noticias];

    switch (criterio) {
      case 'id_desc':
        // De más nuevas a más viejas (asumiendo que el ID sube)
        noticiasOrdenadas.sort((a, b) => Number(b.id) - Number(a.id));
        break;
        
      case 'titulo_asc':
        // Orden alfabético A-Z
        noticiasOrdenadas.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;

      case 'autor_asc':
        // Por nombre de autor
        noticiasOrdenadas.sort((a, b) => a.autor.localeCompare(b.autor));
        break;
    }

    // Reasignamos el array ordenado
    this.noticias = noticiasOrdenadas;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  async agregarNoticia() {
    if (!this.nuevaNoticia.titulo?.trim()) {
      this.mostrarToast('El título es obligatorio', 'warning');
      return;
    }

    const noticiaAGuardar: any = {
      titulo: this.nuevaNoticia.titulo,
      resumen: this.nuevaNoticia.resumen || '',
      autor: this.nuevaNoticia.autor || 'Anónimo',
      imagenUrl: this.nuevaNoticia.imagenUrl || 'https://via.placeholder.com/150',
      fechaPublicacion: new Date().toISOString()
    };

    this.taskService.agregarNoticia(noticiaAGuardar).subscribe({
      next: () => {
        this.mostrarToast('Noticia publicada con éxito', 'success');
        this.nuevaNoticia = { titulo: '', resumen: '', autor: '', imagenUrl: '' };
        this.mostrarFormulario = false;
        this.cargarNoticias();
      },
      error: () => this.mostrarToast('Error al guardar', 'danger')
    });
  }

  eliminarNoticia(noticia: Noticia) {
    if (!noticia.id) return;
    this.taskService.eliminarNoticia(noticia.id.toString()).subscribe({
      next: () => {
        this.mostrarToast('Noticia eliminada', 'success');
        this.cargarNoticias(); 
      }
    });
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }

  trackById(index: number, item: Noticia) {
    return item.id;
  }
}