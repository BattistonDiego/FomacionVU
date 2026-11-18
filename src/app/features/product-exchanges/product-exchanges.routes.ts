import { Routes } from '@angular/router';

export const PRODUCT_EXCHANGES_ROUTES: Routes = [
  {
    path: '',
    title: 'Cambios de producto · SupportHub',
    loadComponent: () =>
      import('./pages/product-exchanges-page/product-exchanges-page').then(
        (m) => m.ProductExchangesPage,
      ),
  },
];
