import { Routes } from '@angular/router';

export const INCIDENT_COLORS_ROUTES: Routes = [
  {
    path: '',
    title: 'Colores de incidencias · SupportHub',
    loadComponent: () =>
      import('./pages/incident-colors-page/incident-colors-page').then((m) => m.IncidentColorsPage),
  },
];
