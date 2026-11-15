import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideConstruction } from '@lucide/angular';

import { PageHeader } from '../../components/page-header/page-header';
import { BreadcrumbItem } from '../../models/breadcrumb.model';

/** Route data for placeholder pages (bound to inputs via `withComponentInputBinding`). */
export interface ComingSoonData {
  readonly heading: string;
  readonly section?: string;
  readonly isHome?: boolean;
}

@Component({
  selector: 'app-coming-soon-page',
  imports: [PageHeader, RouterLink, LucideConstruction],
  templateUrl: './coming-soon-page.html',
  styleUrl: './coming-soon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingSoonPage {
  readonly heading = input.required<string>();
  readonly section = input<string>();
  readonly isHome = input(false);

  protected readonly breadcrumbs = computed<BreadcrumbItem[]>(() => {
    if (this.isHome()) {
      return [{ label: 'Inicio' }];
    }
    const section = this.section();
    return [
      { label: 'Inicio', link: '/inicio' },
      ...(section ? [{ label: section }] : []),
      { label: this.heading() },
    ];
  });
}
