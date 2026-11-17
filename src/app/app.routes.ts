import { Routes } from '@angular/router';

import { comingSoonRoutes } from './core/navigation/coming-soon.routes';
import { Shell } from './core/layout/shell/shell';
import { IDENTIFICATION_PATH, guestOnlyGuard, requireUserGuard } from './core/user/user.guards';

export const routes: Routes = [
  // Identification screen (outside the shell). Skipped when a name is already saved.
  {
    path: IDENTIFICATION_PATH,
    canActivate: [guestOnlyGuard],
    loadComponent: () =>
      import('./features/identification/pages/identification-page/identification-page').then(
        (m) => m.IdentificationPage,
      ),
  },
  // Internal area: requires a saved name, including direct URLs and page reloads.
  {
    path: '',
    component: Shell,
    canActivate: [requireUserGuard],
    canActivateChild: [requireUserGuard],
    children: [
      // Welcome dashboard: the application opens here.
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/home/pages/home-page/home-page').then((m) => m.HomePage),
      },
      // Old address of "Inicio" (still used by module breadcrumbs).
      { path: 'inicio', redirectTo: '' },
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
      {
        path: 'pagos-adicionales',
        loadChildren: () =>
          import('./features/additional-payments/additional-payments.routes').then(
            (m) => m.ADDITIONAL_PAYMENTS_ROUTES,
          ),
      },
      {
        path: 'colores-de-incidencias',
        loadChildren: () =>
          import('./features/incident-colors/incident-colors.routes').then(
            (m) => m.INCIDENT_COLORS_ROUTES,
          ),
      },
      // Planned modules (hidden from the menu) → "Módulo en preparación".
      ...comingSoonRoutes(),
      { path: '**', redirectTo: '' },
    ],
  },
];
