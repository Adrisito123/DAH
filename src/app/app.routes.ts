import { Route, provideRouter } from '@angular/router';

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
  {
    path: 'settings',
    loadComponent: () => import('./services/settings.page').then(m => m.SettingsPage),
  },
{
  path: 'detalle-noticia/:id', // Debe ser exactamente este nombre
  loadComponent: () => import('./pages/detalle-noticia/detalle-noticia.page').then( m => m.DetalleNoticiaPage)
},
];

export const appRoutes = provideRouter(routes);
