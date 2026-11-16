import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ColorCategory } from '../../components/color-category/color-category';
import { INCIDENT_COLOR_CATEGORIES, INCIDENT_COLOR_GROUPS } from '../../data/incident-colors.data';
import { swatchBackground, swatchShortCode } from '../../models/swatch-style';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';

@Component({
  selector: 'app-incident-colors-page',
  imports: [PageHeader, ColorCategory],
  templateUrl: './incident-colors-page.html',
  styleUrl: './incident-colors-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentColorsPage {
  protected readonly groups = INCIDENT_COLOR_GROUPS;
  protected readonly categories = INCIDENT_COLOR_CATEGORIES;
  protected readonly background = swatchBackground;
  protected readonly code = swatchShortCode;

  protected readonly breadcrumbs: readonly BreadcrumbItem[] = [
    { label: 'Inicio', link: '/inicio' },
    { label: 'Operaciones' },
    { label: 'Colores de incidencias' },
  ];

  /** Colour index ("Buscar por color"): scroll to the colour and focus its heading. */
  protected goTo(id: string): void {
    const heading = document.getElementById(`${id}-title`);
    heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    heading?.focus({ preventScroll: true });
  }
}
