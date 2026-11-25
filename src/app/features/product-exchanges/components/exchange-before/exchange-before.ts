import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  LucideClipboardCheck,
  LucideNotebookPen,
  LucideRepeat2,
  LucideTriangleAlert,
} from '@lucide/angular';

import { BeforeSection } from '../../models/product-exchange.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/** The two cards of "Cuestiones a tener en cuenta antes de iniciar la gestión del cambio". */
@Component({
  selector: 'app-exchange-before',
  imports: [
    RichTextView,
    LucideClipboardCheck,
    LucideNotebookPen,
    LucideRepeat2,
    LucideTriangleAlert,
  ],
  templateUrl: './exchange-before.html',
  styleUrl: './exchange-before.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeBefore {
  readonly section = input.required<BeforeSection>();
}
