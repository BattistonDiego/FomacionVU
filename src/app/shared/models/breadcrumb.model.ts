import { Params } from '@angular/router';

export interface BreadcrumbItem {
  readonly label: string;
  /** Router link. Items without a link are rendered as plain text. */
  readonly link?: string;
  readonly queryParams?: Params | null;
}
