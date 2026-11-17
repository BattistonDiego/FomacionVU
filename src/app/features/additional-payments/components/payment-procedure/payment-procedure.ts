import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideChevronRight, LucidePlus } from '@lucide/angular';

import { EscaladeTexts } from '../escalade-texts/escalade-texts';
import { ReasonIcon } from '../reason-icon/reason-icon';
import { ProcedureSection } from '../../models/additional-payment.model';
import { CopySnippet } from '../../../../shared/components/copy-snippet/copy-snippet';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/** "Procedimiento general": the three numbered steps (prototype screens 1–3). */
@Component({
  selector: 'app-payment-procedure',
  imports: [ReasonIcon, EscaladeTexts, CopySnippet, RichTextView, LucideChevronRight, LucidePlus],
  templateUrl: './payment-procedure.html',
  styleUrl: './payment-procedure.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentProcedure {
  readonly procedure = input.required<ProcedureSection>();
}
