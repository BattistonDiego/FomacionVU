import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideArrowLeftRight, LucideTruck, LucideWarehouse } from '@lucide/angular';

import { PaymentReason } from '../../models/additional-payment.model';

/** Icon for each payment reason, as in the prototype. */
@Component({
  selector: 'app-reason-icon',
  imports: [LucideArrowLeftRight, LucideTruck, LucideWarehouse],
  template: `
    @switch (reason()) {
      @case ('delivery-change') { <svg lucideArrowLeftRight [size]="size()"></svg> }
      @case ('storage') { <svg lucideWarehouse [size]="size()"></svg> }
      @case ('second-delivery') { <svg lucideTruck [size]="size()"></svg> }
    }
  `,
  styles: ':host { display: inline-flex; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReasonIcon {
  readonly reason = input.required<PaymentReason>();
  readonly size = input(16);
}
