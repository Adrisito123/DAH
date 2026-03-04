import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { pin, camera, shareSocial, pulse } from 'ionicons/icons';


import { close, settingsOutline, add, searchOutline, filterOutline, trashOutline, createOutline } from 'ionicons/icons';

import { TaskService } from '../services/task.service';
import { SettingsService } from '../services/settings.services';
import { Noticia } from '../interfaces/noticia';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
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
  fotoUrl: string | undefined;
  coordenadas: { lat: number, lng: number } | undefined;

  nuevaNoticia: Partial<Noticia> = { titulo: '', resumen: '', autor: '', imagenUrl: '' };

  constructor(
    private taskService: TaskService,
    private settingsService: SettingsService,
    private toastController: ToastController
  ) {
    addIcons({ close, settingsOutline, add, searchOutline, filterOutline, trashOutline,createOutline });
  }

  ngOnInit() {
    this.cargarNombre();
    this.cargarNoticias();
  }
  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    this.fotoUrl = image.webPath;
  }

  async obtenerUbicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coordenadas = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }

  abrirMapas() {
    if (this.coordenadas) {
      const url = `https://www.google.com/maps?q=${this.coordenadas.lat},${this.coordenadas.lng}`;
      window.open(url, '_blank');
    }
  }

  async cargarNombre() {
    const n = await this.settingsService.getNombre();
    this.nombre = n || 'Usuario';
  }
  async compartirApp() {
    await Share.share({
      title: 'Mi App de Noticias',
      text: 'Mira qué noticia acabo de publicar!',
      url: 'http://miweb.com',
      dialogTitle: 'Compartir con amigos',
    });
  }

  async vibrar() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }

  public esqueletoCajas: number[] = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12];
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
  noticiaEditandoId: string | number | null = null;

  // Función para abrir el formulario con los datos de la noticia
  editarNoticia(noticia: Noticia) {
    this.noticiaEditandoId = noticia.id!;
    this.nuevaNoticia = { ...noticia }; // Copiamos los datos al formulario
    this.mostrarFormulario = true;
    // Hacemos scroll hacia arriba para ver el formulario
    window.scrollTo(0, 0);
  }

  // Modificamos la función de guardar para que sirva para ambos casos
  guardarNoticia() {
    if (!this.nuevaNoticia.titulo || !this.nuevaNoticia.resumen) return;

    if (this.noticiaEditandoId) {
      // CASO EDITAR
      const noticiaEditada = { ...this.nuevaNoticia, id: this.noticiaEditandoId } as Noticia;
      this.taskService.actualizarNoticia(noticiaEditada).subscribe(() => {
        this.mostrarToast('Noticia actualizada');
        this.finalizarFormulario();
      });
    } else {
      // CASO AGREGAR (Tu lógica anterior)
      this.agregarNoticia(); 
    }
  }

  finalizarFormulario() {
    this.mostrarFormulario = false;
    this.noticiaEditandoId = null;
    this.nuevaNoticia = { titulo: '', resumen: '', autor: '', imagenUrl: '' };
    this.cargarNoticias();
  }

  trackById(i: number, item: Noticia) { return item.id; }
}