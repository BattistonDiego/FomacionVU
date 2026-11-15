import { RichText } from '../../../shared/models/rich-text.model';

/** Result of one cell of the "Para hacer un pedido" table. */
export interface DiscountOutcome {
  readonly result: RichText;
  /** How the discount is applied. */
  readonly method: string;
}

/** One row of the table: time since the flash sale ended. */
export interface FlashSaleEndedRow {
  readonly timeSinceOfferEnded: string;
  readonly inStock: DiscountOutcome;
  readonly outOfStock: DiscountOutcome;
}

/** Section 1 — order not placed yet, flash sale no longer active. */
export interface NewOrderSection {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly columns: {
    readonly time: string;
    readonly inStock: string;
    readonly outOfStock: string;
  };
  readonly rows: readonly FlashSaleEndedRow[];
}

export interface DiscountProposal {
  /** "1.ª propuesta", "2.ª propuesta". */
  readonly label: string;
  readonly text: RichText;
  /** When this proposal may be used, if restricted. */
  readonly condition?: string;
}

/** Section 2 card: delivery situation of an already validated order. */
export interface ValidatedOrderScenario {
  readonly situation: string;
  /** Only the proposals present in the documentation. */
  readonly proposals: readonly DiscountProposal[];
}

/** Section 2 — order already validated, flash sale active now. */
export interface ValidatedOrderSection {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly scenarios: readonly ValidatedOrderScenario[];
}

/** Section 3 — conditions to communicate to the customer. */
export interface DiscountConditions {
  readonly id: string;
  readonly title: string;
  /** Instruction for the agent, shown prominently. */
  readonly lead: string;
  readonly items: readonly string[];
}

export interface DiscountsContent {
  readonly newOrder: NewOrderSection;
  readonly validatedOrder: ValidatedOrderSection;
  readonly conditions: DiscountConditions;
}
