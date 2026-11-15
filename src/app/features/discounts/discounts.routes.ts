import { Routes } from '@angular/router';

export const DISCOUNTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Descuentos · SupportHub',
    loadComponent: () =>
      import('./pages/discounts-page/discounts-page').then((m) => m.DiscountsPage),
  },
];
