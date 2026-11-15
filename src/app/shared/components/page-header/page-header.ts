import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { BreadcrumbItem } from '../../models/breadcrumb.model';

/** Breadcrumb + title + subtitle used at the top of every page. Extra actions can be projected. */
@Component({
  selector: 'app-page-header',
  imports: [Breadcrumb],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly breadcrumbs = input<readonly BreadcrumbItem[]>([]);
}
