import { Routes } from '@angular/router';

export const ADDITIONAL_PAYMENTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Pagos adicionales · SupportHub',
    loadComponent: () =>
      import('./pages/additional-payments-page/additional-payments-page').then(
        (m) => m.AdditionalPaymentsPage,
      ),
  },
];
