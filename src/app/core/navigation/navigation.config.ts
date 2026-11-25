import {
  LucideArrowLeftRight,
  LucideArrowUpRight,
  LucideCircleAlert,
  LucideCirclePercent,
  LucideCreditCard,
  LucideHouse,
  LucideMapPin,
  LucideMegaphone,
  LucidePalette,
  LucideTruck,
} from '@lucide/angular';

import { NavItem, NavSection } from './navigation.model';

/**
 * Single source of truth for the sidebar, the home page cards and the placeholder routes.
 * To ship a planned module: set `available: true`, add its `description` and register its
 * feature routes in `app.routes.ts`.
 */
export const HOME_ITEM: NavItem = { label: 'Inicio', path: '', icon: LucideHouse, available: true };

/** Team communication (not an operational module: no home page card). */
export const COMMUNICATION_ITEMS: readonly NavItem[] = [
  {
    label: 'Novedades',
    path: 'novedades',
    icon: LucideMegaphone,
    available: true,
    badge: 'unread-news',
  },
];

export const OPERATIONS_ITEMS: readonly NavItem[] = [
  {
    label: 'Incidencias',
    path: 'incidencias',
    icon: LucideCircleAlert,
    available: true,
    description: 'Consulta los tipos de incidencia y sus responsables.',
  },
  {
    label: 'Descuentos',
    path: 'descuentos',
    icon: LucideCirclePercent,
    available: true,
    description: 'Consulta las condiciones y propuestas de descuento.',
  },
  {
    label: 'Pagos adicionales',
    path: 'pagos-adicionales',
    icon: LucideCreditCard,
    available: true,
    description: 'Conoce cómo gestionar solicitudes de pagos adicionales.',
  },
  {
    label: 'Colores de incidencias',
    path: 'colores-de-incidencias',
    icon: LucidePalette,
    available: true,
    description: 'Identifica los colores y las responsabilidades de cada departamento.',
  },
  {
    label: 'Cambios de producto',
    path: 'cambios-de-producto',
    icon: LucideArrowLeftRight,
    available: true,
    description: 'Consulta cuándo y cómo gestionar un cambio de producto.',
  },
  // Planned modules (not implemented yet): hidden from the menu, routes kept.
  { label: 'Escalados', path: 'escalados', icon: LucideArrowUpRight, available: false },
  {
    label: 'Logística y entregas',
    path: 'logistica-y-entregas',
    icon: LucideTruck,
    available: false,
  },
  { label: 'Códigos postales', path: 'codigos-postales', icon: LucideMapPin, available: false },
];

export const NAV_SECTIONS: readonly NavSection[] = [
  { items: [HOME_ITEM] },
  { label: 'Comunicación', items: COMMUNICATION_ITEMS },
  { label: 'Operaciones', items: OPERATIONS_ITEMS },
];

/** Implemented operational modules, in menu order (home page cards). */
export const AVAILABLE_MODULES: readonly NavItem[] = OPERATIONS_ITEMS.filter(
  (item) => item.available,
);
