import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideSearchX } from '@lucide/angular';

import { IncidentTable } from '../../components/incident-table/incident-table';
import { IncidentListState } from '../../services/incident-list-state';
import { IncidentTypesService } from '../../services/incident-types.service';
import { FilterChips } from '../../../../shared/components/filter-chips/filter-chips';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { SearchInput } from '../../../../shared/components/search-input/search-input';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';

/** Query-string keys, so a search can be shared or restored with "Volver". */
const QUERY_PARAM = 'q';
const OPENED_BY_PARAM = 'abre';

@Component({
  selector: 'app-incident-list-page',
  imports: [PageHeader, SearchInput, FilterChips, IncidentTable, LucideSearchX],
  templateUrl: './incident-list-page.html',
  styleUrl: './incident-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentListPage {
  private readonly incidentTypes = inject(IncidentTypesService);
  private readonly listState = inject(IncidentListState);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly breadcrumbs: readonly BreadcrumbItem[] = [
    { label: 'Inicio', link: '/inicio' },
    { label: 'Operaciones' },
    { label: 'Incidencias' },
  ];

  // The URL is read once; afterwards these signals are the source of truth and are
  // mirrored back to the URL (replaceUrl) so typing never fights with navigation.
  protected readonly query = signal(this.route.snapshot.queryParamMap.get(QUERY_PARAM) ?? '');
  protected readonly openedBy = signal(this.initialOpenedBy());

  protected readonly total = this.incidentTypes.getAll().length;
  private readonly searchResults = computed(() => this.incidentTypes.search(this.query()));
  protected readonly results = computed(() =>
    this.incidentTypes.filterByOpenedBy(this.searchResults(), this.openedBy()),
  );
  protected readonly openedByOptions = computed(() =>
    this.incidentTypes.getOpenedByOptions(this.searchResults()),
  );
  protected readonly searchCount = computed(() => this.searchResults().length);
  protected readonly isFiltered = computed(
    () => this.query().trim() !== '' || this.openedBy() !== null,
  );

  protected readonly resultSummary = computed(() => {
    const shown = this.results().length;
    return this.isFiltered()
      ? `${shown} de ${this.total} ${incidentNoun(this.total)}`
      : `${shown} ${incidentNoun(shown)}`;
  });

  constructor() {
    effect(() => {
      const queryParams = {
        [QUERY_PARAM]: this.query().trim() || null,
        [OPENED_BY_PARAM]: this.openedBy(),
      };
      this.listState.lastQueryParams.set(queryParams);
      void this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        replaceUrl: true,
      });
    });
  }

  protected clearFilters(): void {
    this.query.set('');
    this.openedBy.set(null);
  }

  private initialOpenedBy(): string | null {
    const value = this.route.snapshot.queryParamMap.get(OPENED_BY_PARAM);
    return this.incidentTypes.isOpenedByValue(value) ? value : null;
  }
}

function incidentNoun(count: number): string {
  return count === 1 ? 'tipo de incidencia' : 'tipos de incidencia';
}
