import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Noticia } from '../../interfaces/noticia';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleNoticiaPage implements OnInit {
  noticia?: Noticia;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // JSON Server acepta buscar por ID como string en la URL aunque sea número
      this.taskService.getNoticiaById(id).subscribe({
        next: (data) => this.noticia = data,
        error: () => this.router.navigate(['/home'])
      });
    }
  }

  eliminarNoticia() {
    // IMPORTANTE: Validación para evitar el error "Object is possibly undefined"
    if (this.noticia && this.noticia.id !== undefined) {
      this.taskService.eliminarNoticia(this.noticia.id).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        }
      });
    }
  }
}