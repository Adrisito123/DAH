// src/app/pages/home/home.page.ts
import { Component } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Noticia } from 'src/app/interfaces/noticia';
import { TaskItemComponent } from 'src/app/components/task-item/task-noticia.component';
import { AppHeaderComponent } from 'src/app/components/app-header/app-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule, TaskItemComponent, AppHeaderComponent],
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>Inicio</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <app-header titulo="Noticias de fútbol" subtitulo="Actualidad deportiva"></app-header>

  <ion-fab vertical="top" horizontal="end" slot="fixed">
    <ion-fab-button (click)="toggleFormulario()">{{ mostrarFormulario ? '×' : '+' }}</ion-fab-button>
  </ion-fab>

  <div *ngIf="mostrarFormulario">
    <ion-list>
      <ion-item>
        <ion-input placeholder="Título" [(ngModel)]="nuevaNoticia.titulo"></ion-input>
      </ion-item>
      <ion-item>
        <ion-textarea placeholder="Resumen" [(ngModel)]="nuevaNoticia.resumen"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-input placeholder="Autor" [(ngModel)]="nuevaNoticia.autor"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input placeholder="URL de Imagen" [(ngModel)]="nuevaNoticia.imagenUrl"></ion-input>
      </ion-item>
    </ion-list>
    <ion-button expand="block" (click)="agregarNoticia()">Añadir Noticia</ion-button>
  </div>

  <ion-grid>
    <ion-row>
      <ion-col size="12" size-md="4" *ngFor="let item of noticias; trackBy: trackById">
        <app-task-item 
          [noticia]="item" 
          (mostrarDetalles)="verDetalle($event)"
        ></app-task-item>
      </ion-col>
    </ion-row>
  </ion-grid>

  <div *ngIf="noticias.length === 0">No hay noticias</div>
</ion-content>
  `
})
export class HomePage {
  noticias: Noticia[] = [];
  mostrarFormulario = false;
  nuevaNoticia: Partial<Noticia> = {};

  constructor(private taskService: TaskService, private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    this.noticias = this.taskService.getNoticias();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  agregarNoticia() {
    if (!this.nuevaNoticia.titulo?.trim() || !this.nuevaNoticia.resumen?.trim()) return;
    this.taskService.agregarNoticia(this.nuevaNoticia as Noticia);
    this.nuevaNoticia = {};
    this.noticias = this.taskService.getNoticias();
    this.mostrarFormulario = false;
  }

  trackById(index: number, item: Noticia) {
    return item.id;
  }

  verDetalle(noticia: Noticia) {
    this.router.navigate(['/detalle', noticia.id]);
  }
}
