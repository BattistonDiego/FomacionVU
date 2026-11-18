import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  LucideArrowDownRight,
  LucideArrowUpRight,
  LucideCircleAlert,
  LucideFilePlus,
  LucideMail,
  LucidePackage,
  LucidePackagePlus,
  LucideShip,
  LucideTicketPercent,
  LucideTruck,
  LucideUndo2,
} from '@lucide/angular';

import { ExchangeFlow } from '../../models/product-exchange.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/** One exchange procedure ("Pedidos sin EDI" / "Pedidos con EDI") as a numbered timeline. */
@Component({
  selector: 'app-exchange-flow',
  imports: [
    RichTextView,
    LucideArrowDownRight,
    LucideArrowUpRight,
    LucideCircleAlert,
    LucideFilePlus,
    LucideMail,
    LucidePackage,
    LucidePackagePlus,
    LucideShip,
    LucideTicketPercent,
    LucideTruck,
    LucideUndo2,
  ],
  templateUrl: './exchange-flow.html',
  styleUrl: './exchange-flow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-strong]': "flow().tone === 'strong'" },
})
export class ExchangeFlowCard {
  readonly flow = input.required<ExchangeFlow>();
}
