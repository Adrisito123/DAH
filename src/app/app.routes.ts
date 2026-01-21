import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    // Carga perezosa del componente HomePage
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'detalle-noticia/:id',
    // Carga perezosa de la página de detalles
    loadComponent: () => import('./pages/detalle-noticia/detalle-noticia.page').then( m => m.DetalleNoticiaPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];