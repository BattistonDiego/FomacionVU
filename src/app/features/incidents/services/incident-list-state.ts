import { Injectable, signal } from '@angular/core';
import { Params } from '@angular/router';

/**
 * Remembers the last search/filter of the incident list so that "Volver" links
 * from the detail page return to the same results.
 */
@Injectable({ providedIn: 'root' })
export class IncidentListState {
  readonly lastQueryParams = signal<Params>({});
}
