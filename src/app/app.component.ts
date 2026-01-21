import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

// Importa la función y los iconos de Ionicons que se usarán en la app
import { addIcons } from 'ionicons';
import { trash, create } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  constructor() {
    // Registra los iconos para que estén disponibles en el HTML
    addIcons({ trash, create });
  }
}