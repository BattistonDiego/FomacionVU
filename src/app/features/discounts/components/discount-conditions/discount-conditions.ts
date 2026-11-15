import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideCheck, LucideMegaphone } from '@lucide/angular';

import { DiscountConditions } from '../../models/discount.model';

/** Conditions the agent must communicate to the customer (highlighted block). */
@Component({
  selector: 'app-discount-conditions',
  imports: [LucideCheck, LucideMegaphone],
  templateUrl: './discount-conditions.html',
  styleUrl: './discount-conditions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountConditionsBlock {
  readonly conditions = input.required<DiscountConditions>();
}
