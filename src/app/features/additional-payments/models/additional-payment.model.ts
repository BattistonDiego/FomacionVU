import { RichText } from '../../../shared/models/rich-text.model';

/** Reason for the additional payment; also selects the icon in the UI. */
export type PaymentReason = 'delivery-change' | 'storage' | 'second-delivery';

/** Paso 1 — how to calculate the amount for each situation. */
export interface AmountCase {
  readonly reason: PaymentReason;
  readonly title: string;
  /** Secondary part of the title, e.g. "(LC → LS)". */
  readonly qualifier?: string;
  readonly description: string;
}

/** Paso 3 — text to write in the escalade for each reason. */
export interface EscalationText {
  readonly reason: PaymentReason;
  readonly title: string;
  readonly instruction?: string;
  readonly examples: readonly string[];
}

/** One element of a navigation path in the internal system (Paso 2). */
export interface SystemPathItem {
  readonly label: string;
  /** Shown with a "+" icon, like the "+ Añadir un producto" button. */
  readonly isAddAction?: boolean;
}

export interface ProcedureStep {
  readonly title: string;
  readonly description: RichText;
}

export interface ProcedureSection {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly calculate: ProcedureStep & { readonly cases: readonly AmountCase[] };
  readonly paymentLine: ProcedureStep & { readonly path: readonly SystemPathItem[] };
  readonly escalade: ProcedureStep & {
    readonly assignTo: string;
    readonly subject: string;
    readonly textsTitle: string;
    readonly texts: readonly EscalationText[];
  };
}

/** "¿Qué ocurre después?" timeline. */
export interface FlowStep {
  readonly actor: string;
  readonly text: RichText;
}

export interface AfterSection {
  readonly title: string;
  readonly steps: readonly FlowStep[];
  readonly important: { readonly title: string; readonly text: string };
}

export interface DeliveryScenario {
  readonly badge: string;
  readonly label: string;
  readonly title: string;
  /** `urgent` = red (less than 72 h), `normal` = dark. */
  readonly tone: 'urgent' | 'normal';
  /** Numbered steps (Escenario A) … */
  readonly steps?: readonly RichText[];
  /** … or a single paragraph (Escenario B). */
  readonly text?: RichText;
  /** Order of the departments, shown as a chain. */
  readonly order: readonly string[];
  readonly alert: { readonly title: string; readonly text: RichText; readonly note?: string };
}

/** "¡OJO! Cambio de tipo de entrega con cita fijada". */
export interface AppointmentSection {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly navTitle: string;
  readonly description: RichText;
  readonly question: string;
  readonly scenarios: readonly DeliveryScenario[];
}

export interface AdditionalPaymentsContent {
  readonly procedure: ProcedureSection;
  readonly after: AfterSection;
  readonly appointment: AppointmentSection;
}
