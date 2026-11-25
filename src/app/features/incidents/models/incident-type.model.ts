import { ContentBlock } from '../../../shared/models/content-block.model';
import { RichText } from '../../../shared/models/rich-text.model';

/** One outcome of the cancellation rule (e.g. before / after shipping). */
export interface RefundScenario {
  /** `success` = green (full refund), `attention` = orange (partial refund). */
  readonly tone: 'success' | 'attention';
  /** Title split around the keyword so it can be coloured without rewriting the text:
   *  "Anulación " + "ANTES" + " de la expedición". */
  readonly titleStart: string;
  readonly titleKeyword: string;
  readonly titleEnd: string;
  readonly subtitle: string;
  /** Highlighted result, e.g. "Reembolso total". */
  readonly outcome: string;
  /** Optional badge next to the result, e.g. "100%". */
  readonly badge?: string;
  /** What is added (`plus`) or deducted (`minus`). */
  readonly detail: string;
  readonly detailSign: 'plus' | 'minus';
}

/** One step done by the agent in the system. */
export interface RefundStep {
  readonly text: string;
  /** System value shown as a field chip, e.g. "¿Desea anular?: Sí". */
  readonly chip?: string;
  /** Done by the system, not by the agent (green, "AUTOMÁTICO"). */
  readonly automatic?: boolean;
}

/** "Regla de anulación y reembolso (SAV)" section of an incident type. */
export interface RefundRule {
  readonly title: string;
  readonly scenarios: readonly RefundScenario[];
  readonly stepsTitle: string;
  readonly steps: readonly RefundStep[];
  readonly tip: RichText;
}

/** A bonus amount: fixed euros or a percentage of the shipping costs. */
export interface BonusValue {
  readonly kind: 'fixed' | 'percent';
  readonly value: number;
}

/** Column group of the bonus table (e.g. "Gastos de envío menos de 150 €"). */
export interface BonusColumnGroup {
  readonly title: string;
  readonly legend: string;
  /** `neutral` = grey header, `info` = blue header. */
  readonly tone: 'neutral' | 'info';
  /** Sub-columns, e.g. "1h – 24h", "Más de 24h". */
  readonly columns: readonly string[];
}

export interface BonusRow {
  /** Delivery type, e.g. "Messagerie". */
  readonly label: string;
  /** One value per sub-column, in group order. */
  readonly values: readonly BonusValue[];
}

export interface BonusTable {
  /** Accessible caption (visually hidden). */
  readonly caption: string;
  /** Header of the first column, e.g. "Tipo de entrega". */
  readonly rowHeader: string;
  readonly groups: readonly BonusColumnGroup[];
  readonly rows: readonly BonusRow[];
}

/** "How to read the table" item. */
export interface BonusCriterion {
  readonly icon: 'shipping-cost' | 'delay';
  readonly text: RichText;
}

/** "Bonos por retraso en la entrega" section of an incident type. */
export interface BonusRule {
  readonly title: string;
  readonly notice: RichText;
  readonly criteria: readonly BonusCriterion[];
  readonly table: BonusTable;
  readonly examples: readonly RichText[];
}

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
  /** Cancellation and refund rule (SAV). Only types that have it show the section. */
  readonly refundRule?: RefundRule;
  /** Delay bonus rule. Only types that have it show the section. */
  readonly bonusRule?: BonusRule;
}
