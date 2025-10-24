import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  template: `
    <div class="p-6 bg-indigo-700 text-white shadow-xl rounded-lg mb-8">
      <h1 class="text-3xl sm:text-4xl font-extrabold mb-1">
        {{ titulo }}
      </h1>
      <p class="text-indigo-200 text-lg">
        {{ subtitulo }}
      </p>
    </div>
  `,
  // Estilos básicos para asegurar que ocupe todo el ancho
  styles: [`
    :host {
      display: block;
    }
  `],
  
  standalone: true, 
  imports: [CommonModule, IonicModule] 
})
export class AppHeaderComponent implements OnInit {

  // Inputs para personalizar el contenido desde el padre
  @Input() titulo: string = "Portal de Noticias";
  @Input() subtitulo: string = "La información más relevante del día.";

  constructor() { }

  ngOnInit() {}
}