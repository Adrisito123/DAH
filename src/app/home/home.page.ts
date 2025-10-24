import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TaskItemComponent } from '../components/task-item/task-item.component';
import { AppHeaderComponent } from '../components/app-header/app-header.component'; // CLAVE: Importar el Componente de Cabecera (Mejora 2)

// 1. Interfaz de Datos
export interface Noticia {
id: number;
titulo: string;
resumen: string;
autor: string;
fechaPublicacion: Date;
imagenUrl: string;
link?: string; 
  esDestacada: boolean; // CLAVE: Propiedad para Estilos Dinámicos (Mejora 1)
}

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],

standalone: true,
imports: [
IonicModule, 
CommonModule, 
FormsModule,
TaskItemComponent,
    AppHeaderComponent // CLAVE: Añadir el Componente de Cabecera al imports
] 
})
export class HomePage implements OnInit {

public noticias: Noticia[] = [
{
id: 1,
titulo: "Conflicto en Oriente Próximo",
resumen: "Israel pinta una línea fronteriza dentro de Gaza y avisa de que “responderá con fuego” a quien intente traspasarla",
autor: "El País",
fechaPublicacion: new Date('2025-10-17'),
imagenUrl: "https://imagenes.elpais.com/resizer/v2/4ABSRMNG2BD5VH7FE2OLV7ASNI.jpg?auth=f94792bf8f520611a099c02822bc39c0abd9879ef4c239d441e4e8a75d57c3e0&width=1200",
      esDestacada: true, // CLAVE: Marcada como Destacada
},
{
id: 2,
titulo: "Cuando tu robot gane un premio Nobel",
resumen: "No hay ningún problema de principio para que las máquinas diseñen otras máquinas, los sistemas generen otros sistemas y así hasta que la contribución humana no sea más que un lejano recuerdo",
autor: "Javier Sampedro",
fechaPublicacion: new Date('2025-10-16'),
imagenUrl: "https://imagenes.elpais.com/resizer/v2/4XCIT3T32ZES5C6XTDFDM66LHY.JPG?auth=e24fd219ce7caf147eba3d34c483a62b838585b74105a018e0bbbf22d0c7bae0&width=1000",
      esDestacada: false,
},
{
id: 3,
titulo: "Un nuevo negocio",
resumen: "Inversores, portales inmobiliarios e intermediarios se lucran con la compraventa y desocupación de estos inmuebles, que apenas representan el 0,06% del parque total",
autor: "Antonio NietoÁlvaro de la Rúa",
fechaPublicacion: new Date('2025-10-15'),
imagenUrl: "https://imagenes.elpais.com/resizer/v2/CW6ELPRSGRETHPAGF7NQSU6YNQ.jpg?auth=d72b37623ea3128d3e04ac3971e76df477aecc9e14989de4dcd73931a24cca82&width=828&height=466&smart=true",
      esDestacada: true, // CLAVE: Marcada como Destacada
},
{
id: 4,
titulo: "Bolivia vuelve a las urnas",
resumen: "El poder que conserva Evo Morales fuera de las instituciones tendrá un peso relevante en la gobernabilidad del país sea quien sea el ganador de la segunda vuelta",
autor: "José Andrés Rojo",
fechaPublicacion: new Date('2025-10-14'),
imagenUrl: "https://imagenes.elpais.com/resizer/v2/CIVNYEO6RRKR3F6HHVQR5BWVVY.jpg?auth=a5ef6b77a23ebcbf90b43dba72214b306d9505e4a91b20988b755f885e7da1a4&width=1000",
      esDestacada: false,
}
];


//Añadir propiedad: Agregamos esDestacada: boolean a la interfaz Noticia.
//Asignar valor: Asignamos true o false a esta propiedad en tus datos de ejemplo.
public isLoading: boolean = false; 

constructor() {}

  // CLAVE MEJORA 5: Propiedad calculada para el color de la cabecera
  public get headerColorClass(): string {
    // Busca si alguna noticia en la lista es destacada
    const hayNoticiaDestacada = this.noticias.some(n => n.esDestacada);
    
    // Si la hay, devuelve la clase de alerta; si no, devuelve la clase estándar
    return hayNoticiaDestacada ? "bg-red-700" : "bg-indigo-700";
  }

ngOnInit() {
}

trackById(index: number, noticia: Noticia): number {
return noticia.id;
}
}