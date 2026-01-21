import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Noticia } from 'src/app/interfaces/noticia';
import { IonicModule } from '@ionic/angular';
import { CommonModule, UpperCasePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-item',
  template: `
<ng-container *ngIf="!cargando; else skeleton">
  <ion-card class="h-full">
    <div class="imagen-container">
      <img [src]="noticia?.imagenUrl" alt="{{ noticia?.titulo }}" class="noticia-imagen"/>
    </div>
    <ion-card-header class="p-0 pb-3">
      <ion-card-subtitle>
        {{ noticia?.autor | uppercase }}
      </ion-card-subtitle>
      <ion-card-title>
        {{ noticia?.titulo }}
      </ion-card-title>
    </ion-card-header>
    <ion-card-content class="p-0 pt-0 flex flex-col h-full">
      <p class="text-sm mb-2 line-clamp-3 flex-grow">
        {{ noticia?.resumen }}
      </p>
      <div class="card-footer text-xs text-gray-500 mt-3 flex justify-between items-center">
        <span>Publicado: {{ noticia?.fechaPublicacion | date:'dd MMM yyyy' }}</span>
        <div class="space-x-2 flex items-center">
          <ion-button size="small" fill="outline" color="primary" (click)="onMostrarDetalles()">
              Detalles
          </ion-button>
          <ion-button size="small" fill="clear" color="danger" (click)="onEliminarNoticia()">
            <ion-icon slot="icon-only" name="trash"></ion-icon>
          </ion-button>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</ng-container>

<ng-template #skeleton>
  <ion-card class="h-full">
    <div class="imagen-container">
      <ion-skeleton-text animated style="width: 100%; height: 160px;"></ion-skeleton-text>
    </div>
    <ion-card-header class="p-0 pb-3">
      <ion-card-subtitle>
        <ion-skeleton-text animated style="width: 50%;"></ion-skeleton-text>
      </ion-card-subtitle>
      <ion-card-title>
        <ion-skeleton-text animated style="width: 80%;"></ion-skeleton-text>
      </ion-card-title>
    </ion-card-header>
    <ion-card-content class="p-0 pt-0 flex flex-col h-full">
      <p class="text-sm mb-2">
        <ion-skeleton-text animated style="width: 100%;"></ion-skeleton-text>
        <ion-skeleton-text animated style="width: 90%;"></ion-skeleton-text>
      </p>
      <div class="card-footer mt-3 flex justify-between items-center">
        <ion-skeleton-text animated style="width: 80px;"></ion-skeleton-text>
        <div class="space-x-2 flex">
          <ion-skeleton-text animated style="width: 20px; height: 20px;"></ion-skeleton-text>
          <ion-skeleton-text animated style="width: 20px; height: 20px;"></ion-skeleton-text>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</ng-template>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule, UpperCasePipe, DatePipe],
})
export class TaskItemComponent {
  @Input() noticia!: Noticia;
  @Input() cargando: boolean = false;

  @Output() mostrarDetalles = new EventEmitter<Noticia>();
  @Output() eliminarNoticia = new EventEmitter<number>();

  onMostrarDetalles() {
    this.mostrarDetalles.emit(this.noticia);
  }

  onEliminarNoticia() {
    this.eliminarNoticia.emit(this.noticia.id);
  }
}
