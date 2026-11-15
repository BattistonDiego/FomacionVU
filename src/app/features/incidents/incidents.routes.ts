import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';

import { IncidentTypesService } from './services/incident-types.service';

const incidentTitle: ResolveFn<string> = (route) => {
  const incident = inject(IncidentTypesService).getById(route.paramMap.get('id'));
  if (!incident) {
    return 'Tipo de incidencia no encontrado · SupportHub';
  }
  // #7 and #8 share the Spanish name, so the code keeps tab titles distinguishable.
  return [incident.nameEs, incident.code, 'SupportHub'].filter(Boolean).join(' · ');
};

export const INCIDENTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Tipos de incidencia · SupportHub',
    loadComponent: () =>
      import('./pages/incident-list/incident-list-page').then((m) => m.IncidentListPage),
  },
  {
    path: ':id',
    title: incidentTitle,
    loadComponent: () =>
      import('./pages/incident-detail/incident-detail-page').then((m) => m.IncidentDetailPage),
  },
];
