// src/app/pages/detalle-noticia/detalle-noticia.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Noticia } from 'src/app/interfaces/noticia';
import { AppHeaderComponent } from 'src/app/components/app-header/app-header.component';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule, IonicModule, AppHeaderComponent],
  template: `
<app-header titulo="Detalle Noticia"></app-header>
<ion-content class="ion-padding">
  <ion-card *ngIf="noticia">
    <img [src]="noticia.imagenUrl" alt="{{noticia.titulo}}">
    <ion-card-header>
      <ion-card-title>{{noticia.titulo}}</ion-card-title>
      <ion-card-subtitle>{{noticia.autor | uppercase}}</ion-card-subtitle>
      <p>Publicado: {{noticia.fechaPublicacion | date:'dd MMM yyyy'}}</p>
    </ion-card-header>
    <ion-card-content>
      <p>{{noticia.resumen}}</p>
    </ion-card-content>
  </ion-card>
  <p *ngIf="!noticia">Noticia no encontrada.</p>
</ion-content>
  `
})
export class DetalleNoticiaPage implements OnInit {
  noticia: Noticia | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noticia = this.taskService.getNoticiaById(id);
  }
}
