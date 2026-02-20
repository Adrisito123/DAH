import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Noticia } from '../../interfaces/noticia';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-noticia.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class TaskItemComponent {
  @Input() noticia!: Noticia;
  @Output() eliminar = new EventEmitter<Noticia>();

  onEliminar() {
    console.log('Hijo: Click en eliminar de la noticia:', this.noticia.id);
    this.eliminar.emit(this.noticia); // Emitimos el objeto noticia completo
  }
}