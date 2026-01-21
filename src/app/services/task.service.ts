// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { Noticia } from '../interfaces/noticia';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Rashford (28) y Ansu Fati (23) cumplen años con números parecidos',
      resumen: 'Marcus Rashford cumple 28 años este viernes 31 de octubre, precisamente el mismo día que Ansu Fati, uno de los jugadores a los que el inglés suplió en el Barça, llega a los 23',
      autor: 'Mundo Deportivo',
      fechaPublicacion: new Date('2025/10/31'),
      imagenUrl: 'https://www.mundodeportivo.com/files/image_948_465/files/fp/uploads/2025/10/31/69046e81e3d65.r_d.185-116-15721.png',
    },
    {
      id: 2,
      titulo: 'Gabi, exjugador del Atlético de Madrid, sobre Vinicius',
      resumen: 'Gabi, exjugador del Atlético de Madrid, sobre Vinicius: "Es inaceptable y egocéntrico pedir perdón y dejar fuera al entrenador. Es lo que más detesto de un futbolista"',
      autor: 'Mundo Deportivo',
      fechaPublicacion: new Date('2025/10/31'),
      imagenUrl: 'https://www.mundodeportivo.com/files/image_948_465/files/fp/uploads/2025/10/31/6904650b08807.r_d.3055-992-1876.jpeg',
    },
    {
      id: 3,
      titulo: 'Pedro dejará la Lazio',
      resumen: 'Tras el partido de ayer del club italiano ante el Pisa, el jugador español anunció que será su última temporada en el equipo de Roma.',
      autor: 'as',
      fechaPublicacion: new Date('2025/10/31'),
      imagenUrl: 'https://img.asmedia.epimg.net/resizer/v2/TECPKP7QHQP4AWM6IIRQDHM4VA.jpg?auth=8d50526dcebe01c13c31b5939ad68a6f688148be6add75ab5e3b3c3732a41152&width=1200&height=675&focal=2505%2C1388',
    },
    {
      id: 4,
      titulo: 'La última oportunidad para Neymar',
      resumen: 'El astro brasileño finaliza contrato con Santos y analiza su futuro mientras busca una última oportunidad para brillar en el Mundial 2026',
      autor: 'SuperDeporte',
      fechaPublicacion: new Date('2025/10/31'),
      imagenUrl: 'https://estaticos-cdn.prensaiberica.es/clip/77cb9c75-800c-4429-a074-482f87e2835e_16-9-discover-aspect-ratio_default_0.webp',
    },
    {
      id: 5,
      titulo: 'El equipo más en forma de Europa se llama Bayern de Múnich',
      resumen: '30 goles a favor y cuatro en contra en ocho partidos disputados saldados con otro triunfos. Los números del Bayern de Múnich esta temporada en la Bundesliga siembran el pánico entre sus rivales y no es para menos.',
      autor: 'Marca',
      fechaPublicacion: new Date('2025/10/31'),
      imagenUrl: 'https://objetos-xlk.estaticos-marca.com/files/article_660_widen_webp/uploads/2025/10/28/6900ed0c38499.webp',
    },
    {
      id: 6,
      titulo: 'Claudia Pina se desploma en FC 26: su precio se reduce a la mitad',
      resumen: 'Es la delantera de moda entre los jugadores de FC 26, pero Claudia Pina ha empezado a perder fuerza en el juego.',
      autor: 'Marca',
      fechaPublicacion: new Date('2025/10/31'),
      imagenUrl: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ4hU_J1UZHHbBFyJPeVM0WSTTtTfmBf1Izk6OYVRUUn23ZgWCPOn_vj768IHy6rP5IIdmFpxt_vWduJNk',
    },
    {
      id: 7,
      titulo: 'Julen Lopetegui, optimista con el Sevilla de Matías Almeyda',
      resumen: 'Julen Lopetegui siempre encuentra un momento para recordar con cariño su etapa en el Sevilla FC.',
      autor: 'Marca',
      fechaPublicacion: new Date('2025/10/31'),
      imagenUrl: 'https://piks.eldesmarque.com/thumbs/660/bin/2021/11/01/lopetegui_en_el_entrenamiento_del_sevilla_foto_kiko_hurtado_002.jpeg',
    },
    {
      id: 8,
      titulo: 'El hijo mayor de Cristiano Ronaldo debuta con la sub-16 de Portugal',
      resumen: 'Cristiano Ronaldo Júnior debutó con la selección sub-16 y participó en la victoria sobre Turquía (2-0).',
      autor: 'Economía Hoy',
      fechaPublicacion: new Date('2025/10/31'),
      imagenUrl: 'https://estaticos-cdn.prensaiberica.es/clip/e6d6d0ba-a047-43ef-aed9-e297fc6eb202_16-9-discover-aspect-ratio_default_0.webp',
    },
  ];

  constructor() {}

  getNoticias(): Noticia[] {
    return [...this.noticias];
  }

  getNoticiaById(id: number): Noticia | undefined {
    return this.noticias.find(n => n.id === id);
  }

  agregarNoticia(noticia: Noticia) {
    if (!noticia.titulo?.trim()) return;

    const nueva: Noticia = {
      ...noticia,
      id: Date.now(),
      fechaPublicacion: new Date(),
    };

    this.noticias.unshift(nueva);
  }
}
