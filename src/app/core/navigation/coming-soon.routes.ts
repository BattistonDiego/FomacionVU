import { Routes } from '@angular/router';

import { NAV_SECTIONS } from './navigation.config';
import { ComingSoonData } from '../../shared/pages/coming-soon/coming-soon-page';

/** One placeholder route per planned (not yet available) navigation entry. */
export function comingSoonRoutes(): Routes {
  return NAV_SECTIONS.flatMap((section) =>
    section.items
      .filter((item) => !item.available)
      .map((item) => {
        const data: ComingSoonData = { heading: item.label, section: section.label };
        return {
          path: item.path,
          title: `${item.label} · SupportHub`,
          loadComponent: () =>
            import('../../shared/pages/coming-soon/coming-soon-page').then((m) => m.ComingSoonPage),
          data,
        };
      }),
  );
}
