import { Routes } from '@angular/router';

export const NEWS_ROUTES: Routes = [
  {
    path: '',
    title: 'Novedades · SupportHub',
    loadComponent: () =>
      import('./pages/news-list-page/news-list-page').then((m) => m.NewsListPage),
  },
  {
    path: ':slug',
    title: 'Novedades · SupportHub',
    loadComponent: () =>
      import('./pages/news-detail-page/news-detail-page').then((m) => m.NewsDetailPage),
  },
];
