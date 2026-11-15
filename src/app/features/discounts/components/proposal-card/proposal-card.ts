import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideInfo, LucideTriangleAlert } from '@lucide/angular';

import { ValidatedOrderScenario } from '../../models/discount.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';
import { unconfirmedTerms } from '../../../../shared/models/rich-text.model';

/** One delivery situation of "Para un pedido ya validado" with its proposals. */
@Component({
  selector: 'app-proposal-card',
  imports: [RichTextView, LucideInfo, LucideTriangleAlert],
  templateUrl: './proposal-card.html',
  styleUrl: './proposal-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalCard {
  readonly scenario = input.required<ValidatedOrderScenario>();

  /** Terms pending confirmation, listed under the proposal that contains them. */
  protected readonly pendingTerms = computed(() =>
    this.scenario().proposals.map((proposal) => unconfirmedTerms(proposal.text)),
  );
}
