import { Component, Input } from '@angular/core'; 
import { IonicModule } from '@ionic/angular';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, NgClass]
})
export class AppHeaderComponent {

  @Input({ required: true }) titulo: string = 'Título Predeterminado';
  @Input() subtitulo: string = 'Subtítulo Predeterminado';
  @Input() backgroundColor: string = 'bg-indigo-700'; 

  constructor() { }
}