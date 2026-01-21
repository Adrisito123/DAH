export interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  autor: string;
  fechaPublicacion: Date;
  imagenUrl: string;
  link?: string;
}