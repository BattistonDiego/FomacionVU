import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideClock, LucidePackage, LucidePackageX } from '@lucide/angular';

import { NewOrderSection } from '../../models/discount.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/**
 * "Para hacer un pedido" table. Below 760px of available width each row
 * becomes a stacked card (container query), as in the incident table.
 */
@Component({
  selector: 'app-flash-sale-table',
  imports: [RichTextView, LucideClock, LucidePackage, LucidePackageX],
  templateUrl: './flash-sale-table.html',
  styleUrl: './flash-sale-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlashSaleTable {
  readonly section = input.required<NewOrderSection>();
}
