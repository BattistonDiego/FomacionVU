import { RichText } from '../../../shared/models/rich-text.model';

/** Selects the icon of each "no podemos hacer cambios" case. */
export type RestrictionIcon =
  | 'internal-marketplace'
  | 'external-marketplace'
  | 'pickup-point'
  | 'pack'
  | 'payment-method'
  | 'financing';

/** One case in which an exchange is not possible. */
export interface ExchangeRestriction {
  readonly icon: RestrictionIcon;
  /** Short label (prototype). */
  readonly title: string;
  readonly text: RichText;
  /** Full row in the grid (long lists, Alma). */
  readonly wide?: boolean;
}

/** Alma financing: a) lower value → allowed, b) higher value → not possible. */
export interface FinancingOption {
  /** "a)" / "b)" as in the source. */
  readonly marker: string;
  readonly title: string;
  readonly text: RichText;
  readonly allowed: boolean;
}

export interface FinancingCase {
  readonly title: string;
  readonly options: readonly FinancingOption[];
}

export interface RestrictionsSection {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly subtitle: string;
  readonly cases: readonly ExchangeRestriction[];
  readonly financing: FinancingCase;
}

/** "Cuestiones a tener en cuenta antes de iniciar la gestión del cambio". */
export interface ConfirmProductCard {
  readonly title: string;
  readonly text: RichText;
  /** Items of the source list "(tamaño, ángulo, …)", kept literally. */
  readonly items: readonly string[];
  readonly footer: RichText;
}

export interface AvoidChainCard {
  readonly title: string;
  readonly text: RichText;
  readonly note: RichText;
}

export interface BeforeSection {
  readonly title: string;
  readonly confirm: ConfirmProductCard;
  readonly avoid: AvoidChainCard;
}

export type StepIcon =
  'open-incident' | 'add-product' | 'discounts' | 'return-costs' | 'balearics' | 'inform';

/** Building blocks of a step, rendered in order. */
export type StepBlock =
  | { readonly kind: 'text'; readonly text: RichText }
  /** Literal list shown as chips (D3: the source "…" is kept as the last chip). */
  | { readonly kind: 'chips'; readonly items: readonly string[] }
  /** Numbered sub-steps (D4: Baleares), with the source words. */
  | { readonly kind: 'substeps'; readonly intro: RichText; readonly items: readonly RichText[] }
  /** Highlighted mandatory information (red box). */
  | { readonly kind: 'alert'; readonly text: RichText }
  /** "Informar al cliente" split into pay / refund (D5), each with its literal sentences. */
  | {
      readonly kind: 'outcome';
      readonly direction: 'pay' | 'refund';
      readonly title: string;
      readonly text: RichText;
    };

export interface ExchangeStep {
  readonly icon: StepIcon;
  /** Short step title (prototype). */
  readonly title: string;
  /** Small tag next to the title, e.g. "Solo con EDI". */
  readonly badge?: string;
  readonly blocks: readonly StepBlock[];
}

/** "Pedidos sin EDI" / "Pedidos con EDI". */
export interface ExchangeFlow {
  readonly id: string;
  readonly title: string;
  /** Incident type to open, e.g. "Echange". */
  readonly incidentType: string;
  /** `neutral` = light header (sin EDI), `strong` = dark header + red numbers (con EDI). */
  readonly tone: 'neutral' | 'strong';
  readonly steps: readonly ExchangeStep[];
}

export interface ManagementSection {
  readonly title: string;
  readonly intro: string;
  readonly flows: readonly ExchangeFlow[];
}

export interface OtherCasesSection {
  readonly title: string;
  readonly text: RichText;
  readonly items: readonly { readonly icon: 'no-incident' | 'no-cost'; readonly text: string }[];
}

export interface WhenToOfferSection {
  readonly title: string;
  readonly goal: string;
  readonly cases: readonly {
    readonly icon: 'cancellation' | 'out-of-stock';
    readonly title: string;
    readonly text: RichText;
  }[];
}

export interface ProductExchangesContent {
  readonly restrictions: RestrictionsSection;
  readonly before: BeforeSection;
  readonly management: ManagementSection;
  readonly otherCases: OtherCasesSection;
  readonly whenToOffer: WhenToOfferSection;
}
