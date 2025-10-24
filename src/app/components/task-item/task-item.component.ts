import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular'; 
import { Noticia } from '../../home/home.page'; 

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  
  standalone: true, 
  
  // Incluye los Pipes necesarios (CommonModule)
  imports: [CommonModule, IonicModule] 
})
export class TaskItemComponent implements OnInit {

  // CLAVE MEJORA 4: El @Input ahora es opcional (noticia?: Noticia)
  @Input() noticia?: Noticia;

  constructor() { }

  ngOnInit() {}
}