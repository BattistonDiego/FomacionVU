import { Injectable, inject } from '@angular/core';

import { AVAILABLE_MODULES } from '../../../core/navigation/navigation.config';
import { NavItem } from '../../../core/navigation/navigation.model';
import { ADDITIONAL_PAYMENTS } from '../../additional-payments/data/additional-payments.data';
import { DISCOUNTS } from '../../discounts/data/discounts.data';
import { INCIDENT_COLOR_GROUPS } from '../../incident-colors/data/incident-colors.data';
import { IncidentType } from '../../incidents/models/incident-type.model';
import { IncidentTypesService } from '../../incidents/services/incident-types.service';
import { collectStrings } from '../../../shared/utils/collect-strings';
import { matchesAllTermsByPrefix, tokenize } from '../../../shared/utils/search';

/**
 * Content indexed for each module, by route path. Incident types are searched with the
 * existing IncidentTypesService instead, so they can be listed one by one.
 */
const MODULE_CONTENT: Readonly<Record<string, unknown>> = {
  descuentos: DISCOUNTS,
  'pagos-adicionales': ADDITIONAL_PAYMENTS,
  'colores-de-incidencias': INCIDENT_COLOR_GROUPS,
};

export interface HomeSearchResults {
  readonly modules: readonly NavItem[];
  /** First incident types found (see `incidentTotal`). */
  readonly incidents: readonly IncidentType[];
  readonly incidentTotal: number;
}

const MAX_INCIDENTS = 5;

/** Search of the home page: implemented modules (name, description, content) + incident types. */
@Injectable({ providedIn: 'root' })
export class HomeSearchService {
  private readonly incidentTypes = inject(IncidentTypesService);

  private readonly moduleIndex = new Map(
    AVAILABLE_MODULES.map((module) => [
      module.path,
      tokenize(
        [module.label, module.description ?? '', ...collectStrings(MODULE_CONTENT[module.path])].join(' '),
      ),
    ]),
  );

  /** `null` when the query is empty. */
  search(query: string): HomeSearchResults | null {
    const terms = tokenize(query);
    if (terms.length === 0) {
      return null;
    }
    const modules = AVAILABLE_MODULES.filter((module) =>
      matchesAllTermsByPrefix(this.moduleIndex.get(module.path) ?? [], terms),
    );
    const incidents = this.incidentTypes.search(query);
    return {
      modules,
      incidents: incidents.slice(0, MAX_INCIDENTS),
      incidentTotal: incidents.length,
    };
  }
}
