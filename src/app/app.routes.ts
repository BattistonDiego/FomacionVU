import { Routes } from '@angular/router';

import { comingSoonRoutes } from './core/navigation/coming-soon.routes';
import { Shell } from './core/layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'incidencias' },
      {
        path: 'incidencias',
        loadChildren: () =>
          import('./features/incidents/incidents.routes').then((m) => m.INCIDENTS_ROUTES),
      },
      {
        path: 'descuentos',
        loadChildren: () =>
          import('./features/discounts/discounts.routes').then((m) => m.DISCOUNTS_ROUTES),
      },
      // Modules not implemented yet → "Módulo en preparación".
      ...comingSoonRoutes(),
      { path: '**', redirectTo: 'incidencias' },
    ],
  },
];
