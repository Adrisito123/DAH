import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular'; // Añadimos AlertController
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Noticia } from '../../interfaces/noticia';
import { addIcons } from 'ionicons';
import { trashOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetalleNoticiaPage implements OnInit {
  noticia?: Noticia;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toastController: ToastController,
    private alertController: AlertController // Para confirmar antes de borrar
  ) {
    addIcons({ trashOutline, personCircleOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getNoticiaById(id).subscribe({
        next: (data) => this.noticia = data,
        error: () => this.router.navigate(['/home']) // Si no existe, volvemos
      });
    }
  }

  // MÉTODO PARA ELIMINAR
  async eliminarNoticia() {
    if (!this.noticia?.id) return;

    // Opcional: Confirmación para evitar borrados accidentales
    const alert = await this.alertController.create({
      header: '¿Borrar noticia?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.taskService.eliminarNoticia(this.noticia!.id.toString()).subscribe({
              next: () => {
                this.mostrarToast('Noticia eliminada correctamente');
                this.router.navigate(['/home']); // Redirigir al Home
              },
              error: () => this.mostrarToast('Error al eliminar')
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}