import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideCircleAlert,
  LucideDoorOpen,
  LucideFileExclamationPoint,
  LucideUsers,
} from '@lucide/angular';

import { IncidentListState } from '../../services/incident-list-state';
import { IncidentTypesService } from '../../services/incident-types.service';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { ContentBlocks } from '../../../../shared/components/content-blocks/content-blocks';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';

/** Detail page of one incident type (prototype 4), limited to the fields in the source. */
@Component({
  selector: 'app-incident-detail-page',
  imports: [
    RouterLink,
    Breadcrumb,
    ContentBlocks,
    LucideArrowLeft,
    LucideCircleAlert,
    LucideDoorOpen,
    LucideFileExclamationPoint,
    LucideUsers,
  ],
  templateUrl: './incident-detail-page.html',
  styleUrl: './incident-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentDetailPage {
  /** Route parameter `:id` (bound through `withComponentInputBinding`). */
  readonly id = input.required<string>();

  private readonly incidentTypes = inject(IncidentTypesService);
  protected readonly listQueryParams = inject(IncidentListState).lastQueryParams;

  protected readonly incident = computed(() => this.incidentTypes.getById(this.id()));

  protected readonly breadcrumbs = computed<BreadcrumbItem[]>(() => [
    { label: 'Inicio', link: '/inicio' },
    { label: 'Operaciones' },
    { label: 'Incidencias', link: '/incidencias', queryParams: this.listQueryParams() },
    { label: this.incident()?.nameEs ?? 'Tipo de incidencia no encontrado' },
  ]);
}
