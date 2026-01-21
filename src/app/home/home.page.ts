import { Component } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TaskService } from '../services/task.service';
import { Noticia } from '../interfaces/noticia';
import { TaskItemComponent } from '../components/task-item/task-noticia.component';
import { AppHeaderComponent } from '../components/app-header/app-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule, TaskItemComponent, AppHeaderComponent],
  template: `
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>Inicio</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true" class="ion-padding">
  <div class="container mx-auto max-w-screen-xl">
    <app-header titulo="Noticias de Última sobre futbol" subtitulo="La actualidad de lo mejor del deporte"></app-header>

    <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-fab-button (click)="toggleFormulario()" class="fab-transparente">
        <span class="fab-plus">{{ mostrarFormulario ? '×' : '+' }}</span>
      </ion-fab-button>
    </ion-fab>

    <div *ngIf="mostrarFormulario" class="formulario-desplegable">
      <ion-list>
        <ion-item><ion-input label="Título" label-placement="floating" placeholder="Título de la noticia" [(ngModel)]="nuevaNoticia.titulo"></ion-input></ion-item>
        <ion-item><ion-textarea label="Resumen" label-placement="floating" placeholder="Resumen breve" [(ngModel)]="nuevaNoticia.resumen"></ion-textarea></ion-item>
        <ion-item><ion-input label="Autor" label-placement="floating" placeholder="Autor" [(ngModel)]="nuevaNoticia.autor"></ion-input></ion-item>
        <ion-item><ion-input label="URL de Imagen" label-placement="floating" placeholder="https://..." [(ngModel)]="nuevaNoticia.imagenUrl"></ion-input></ion-item>
      </ion-list>
      <ion-button expand="block" (click)="agregarNoticia()">Añadir Noticia</ion-button>
    </div>

    <ion-grid *ngIf="!cargando && noticias.length > 0" class="px-4">
      <ion-row class="ion-align-items-start">
        <ion-col size="12" size-sm="6" size-md="4" size-lg="3" *ngFor="let item of noticias; trackBy: trackById" class="ion-padding-bottom">
          <app-task-item [noticia]="item" [cargando]="cargando" (mostrarDetalles)="mostrarDetallesNoticia($event)" (eliminarNoticia)="eliminarNoticia($event)"></app-task-item>
        </ion-col>
      </ion-row>
    </ion-grid>

    <div *ngIf="!cargando && noticias.length === 0" class="text-center ion-padding-top">
      <h1 class="text-2xl font-bold text-gray-800">No hay noticias</h1>
      <p class="text-gray-600">Añade una noticia para empezar.</p>
    </div>
  </div>
</ion-content>
  `,
})
export class HomePage {
  noticias: Noticia[] = [];
  cargando = true;
  mostrarFormulario = false;
  nuevaNoticia: Partial<Noticia> = {};
  skeletons = Array(8);

  constructor(
    private taskService: TaskService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarNoticias();
    setTimeout(() => this.cargando = false, 2000);
  }

  cargarNoticias() {
    this.noticias = this.taskService.getNoticias();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  async agregarNoticia() {
    if (!this.nuevaNoticia.titulo?.trim() || !this.nuevaNoticia.resumen?.trim()) {
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor, completa el título y el resumen.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.taskService.agregarNoticia(this.nuevaNoticia as Noticia);
    this.nuevaNoticia = {};
    this.cargarNoticias();
    this.mostrarFormulario = false;

    const toast = await this.toastController.create({
      message: 'Noticia añadida correctamente',
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  trackById(index: number, item: Noticia) {
    return item.id;
  }

  mostrarDetallesNoticia(noticia: Noticia) {
    console.log('Detalles de noticia:', noticia);
  }

  eliminarNoticia(id: number) {
    console.log('Eliminar noticia ID:', id);
  }
}
