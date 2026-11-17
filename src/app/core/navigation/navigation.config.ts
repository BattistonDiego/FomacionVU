import {
  LucideArrowUpRight,
  LucideBookOpen,
  LucideCircleAlert,
  LucideCirclePercent,
  LucideClock,
  LucideCreditCard,
  LucideGraduationCap,
  LucideLayoutGrid,
  LucideLibrary,
  LucideMapPin,
  LucidePalette,
  LucideSettings,
  LucideStar,
  LucideTruck,
} from '@lucide/angular';

import { NavItem, NavSection } from './navigation.model';

/**
 * Single source of truth for the sidebar and for the placeholder routes of modules
 * that are not implemented yet. To ship a module: set `available: true` and register
 * its feature routes in `app.routes.ts`.
 */
export const NAV_SECTIONS: readonly NavSection[] = [
  {
    label: 'Workspace',
    items: [
      { label: 'Inicio', path: 'inicio', icon: LucideLayoutGrid, available: false },
      {
        label: 'Base de conocimientos',
        path: 'base-de-conocimientos',
        icon: LucideLibrary,
        available: false,
      },
    ],
  },
  {
    label: 'Operaciones',
    items: [
      { label: 'Incidencias', path: 'incidencias', icon: LucideCircleAlert, available: true },
      { label: 'Escalados', path: 'escalados', icon: LucideArrowUpRight, available: false },
      {
        label: 'Logística y entregas',
        path: 'logistica-y-entregas',
        icon: LucideTruck,
        available: false,
      },
      { label: 'Códigos postales', path: 'codigos-postales', icon: LucideMapPin, available: false },
      { label: 'Descuentos', path: 'descuentos', icon: LucideCirclePercent, available: true },
      {
        label: 'Pagos adicionales',
        path: 'pagos-adicionales',
        icon: LucideCreditCard,
        available: true,
      },
      {
        label: 'Colores de incidencias',
        path: 'colores-de-incidencias',
        icon: LucidePalette,
        available: true,
      },
    ],
  },
  {
    label: 'Aprendizaje',
    items: [
      { label: 'Glosario', path: 'glosario', icon: LucideBookOpen, available: false },
      {
        label: 'Centro de formación',
        path: 'centro-de-formacion',
        icon: LucideGraduationCap,
        available: false,
      },
    ],
  },
  {
    label: 'Personal',
    items: [
      { label: 'Favoritos', path: 'favoritos', icon: LucideStar, available: false },
      {
        label: 'Vistos recientemente',
        path: 'vistos-recientemente',
        icon: LucideClock,
        available: false,
      },
    ],
  },
];

export const NAV_FOOTER_ITEMS: readonly NavItem[] = [
  {
    label: 'Configuración y contenido',
    path: 'configuracion',
    icon: LucideSettings,
    available: false,
  },
];
