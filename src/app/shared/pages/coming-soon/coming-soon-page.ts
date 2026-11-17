import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideConstruction } from '@lucide/angular';

import { PageHeader } from '../../components/page-header/page-header';
import { BreadcrumbItem } from '../../models/breadcrumb.model';

/** Route data for placeholder pages (bound to inputs via `withComponentInputBinding`). */
export interface ComingSoonData {
  readonly heading: string;
  readonly section?: string;
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

  protected readonly breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const section = this.section();
    return [
      { label: 'Inicio', link: '/' },
      ...(section ? [{ label: section }] : []),
      { label: this.heading() },
    ];
  });
}
