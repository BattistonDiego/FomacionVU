import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  LucideBan,
  LucideBoxes,
  LucideCircleX,
  LucideCreditCard,
  LucideGlobe,
  LucideLandmark,
  LucideMapPin,
  LucideStore,
} from '@lucide/angular';

import { RestrictionsSection } from '../../models/product-exchange.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/** "Casos en los que NO podemos hacer cambios", including the Alma financing case. */
@Component({
  selector: 'app-exchange-restrictions',
  imports: [
    RichTextView,
    LucideBan,
    LucideBoxes,
    LucideCircleX,
    LucideCreditCard,
    LucideGlobe,
    LucideLandmark,
    LucideMapPin,
    LucideStore,
  ],
  templateUrl: './exchange-restrictions.html',
  styleUrl: './exchange-restrictions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeRestrictions {
  readonly section = input.required<RestrictionsSection>();
}
