import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { Noticia } from '../../interfaces/noticia';

@Component({
  selector: 'app-task-noticia',
  // Si te sigue dando error aquí, asegúrate de que el archivo físico se llama EXACTAMENTE así
  templateUrl: './task-noticia.component.html', 
  styleUrls: ['./task-noticia.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TaskItemComponent {
  @Input() noticia!: Noticia;
  @Output() eliminar = new EventEmitter<Noticia>();

  constructor(private router: Router) {
    addIcons({ trash });
  }

  onMostrarDetalles() {
    // Coincidiendo con tu path: 'detalle/:id'
    if (this.noticia && this.noticia.id) {
      this.router.navigate(['/detalle', this.noticia.id]);
    }
  }

  onEliminarNoticia() {
    this.eliminar.emit(this.noticia);
  }
}