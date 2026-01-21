// src/app/app.routes.ts
import { Route } from '@angular/router';
import { HomePage } from './home/home.page';
import { DetalleNoticiaPage } from './pages/detalle-noticia/detalle-noticia.page';

export const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./pages/detalle-noticia/detalle-noticia.page').then(m => m.DetalleNoticiaPage),
  },
];
