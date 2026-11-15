import { Routes } from '@angular/router';

import { NAV_FOOTER_ITEMS, NAV_SECTIONS } from './navigation.config';
import { ComingSoonData } from '../../shared/pages/coming-soon/coming-soon-page';

/** One placeholder route per navigation entry that is not available yet. */
export function comingSoonRoutes(): Routes {
  const entries = [
    ...NAV_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({ item, section: section.label })),
    ),
    ...NAV_FOOTER_ITEMS.map((item) => ({ item, section: undefined })),
  ];

  return entries
    .filter(({ item }) => !item.available)
    .map(({ item, section }) => {
      const data: ComingSoonData = { heading: item.label, section, isHome: item.path === 'inicio' };
      return {
        path: item.path,
        title: `${item.label} · SupportHub`,
        loadComponent: () =>
          import('../../shared/pages/coming-soon/coming-soon-page').then((m) => m.ComingSoonPage),
        data,
      };
    });
}
