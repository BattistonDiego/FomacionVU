import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideArrowRight, LucideMessageCircle } from '@lucide/angular';

import { DeliveryScenario } from '../../models/additional-payment.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/** One of the two "cita fijada" scenarios (< 72 h in red, > 72 h in dark). */
@Component({
  selector: 'app-delivery-scenario',
  imports: [RichTextView, LucideArrowRight, LucideMessageCircle],
  templateUrl: './delivery-scenario.html',
  styleUrl: './delivery-scenario.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-urgent]': 'scenario().tone === "urgent"' },
})
export class DeliveryScenarioCard {
  readonly scenario = input.required<DeliveryScenario>();
}
