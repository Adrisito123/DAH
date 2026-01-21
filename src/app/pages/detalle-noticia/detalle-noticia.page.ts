import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router'; 
import { TaskService } from 'src/app/services/task.service';
import { Noticia } from 'src/app/interfaces/noticia';
import { AppHeaderComponent } from 'src/app/components/app-header/app-header.component';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AppHeaderComponent, RouterLink],
  template: `
    <app-header titulo="Detalle de Noticia" subtitulo=""></app-header>

    <ion-content class="ion-padding">
      <div *ngIf="noticia; else noData">
        <ion-card>
          <img [src]="noticia.imagenUrl" alt="{{ noticia.titulo }}" class="noticia-imagen"/>
          <ion-card-header>
            <ion-card-title>{{ noticia.titulo }}</ion-card-title>
            <ion-card-subtitle>{{ noticia.autor | uppercase }}</ion-card-subtitle>
            <span class="text-xs text-gray-500">Publicado: {{ noticia.fechaPublicacion | date:'dd MMM yyyy' }}</span>
          </ion-card-header>
          <ion-card-content>
            <p>{{ noticia.resumen }}</p>
          </ion-card-content>
        </ion-card>
      </div>

      <ng-template #noData>
        <p class="text-center">No se encontró la noticia.</p>
      </ng-template>
    </ion-content>
  `,
})
export class DetalleNoticiaPage implements OnInit {

  public noticia: Noticia | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    // 1️⃣ Obtener el ID de la URL
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    
    // 2️⃣ Convertir el ID a número
    const noticiaId = idParam ? +idParam : 0;

    // 3️⃣ Buscar la noticia en TaskService
    this.noticia = this.taskService.getNoticiaById(noticiaId);
  }
}
