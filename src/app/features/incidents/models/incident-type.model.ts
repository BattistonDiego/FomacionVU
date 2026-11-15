import { ContentBlock } from '../../../shared/models/content-block.model';

/**
 * An incident type as described in the original documentation
 * (columns: Tipo de incidencia · Concepto · ¿Quién abre? · ¿Quién la va a gestionar?).
 *
 * Only fields that exist in the source are modelled. Future information
 * (required data, procedures, related articles…) should be added as new
 * optional fields so existing entries and components keep working unchanged.
 */
export interface IncidentType {
  /** URL slug, e.g. `pr1-danado`. */
  readonly id: string;
  /** Code from the source, e.g. `PR1`. Some types have none. */
  readonly code?: string;
  /** Spanish name — the main title in the UI. */
  readonly nameEs: string;
  /** Original French name, preserved exactly as in the source. */
  readonly nameFr: string;
  /** "Concepto" column. */
  readonly concept: readonly ContentBlock[];
  /** "¿Quién abre?" column, literal value. */
  readonly openedBy: string;
  /** "¿Quién la va a gestionar?" column, one block per line of the source cell. */
  readonly managedBy: readonly ContentBlock[];
  /** Flag about the source document itself (shown with ⚠️). */
  readonly sourceWarning?: string;
}
