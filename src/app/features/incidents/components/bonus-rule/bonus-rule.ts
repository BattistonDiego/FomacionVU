import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideBan, LucideClock, LucideTruck } from '@lucide/angular';

import { BonusTableView } from './bonus-table/bonus-table';
import { DetailSection } from '../detail-section/detail-section';
import { TipBox } from '../tip-box/tip-box';
import { BonusRule } from '../../models/incident-type.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/**
 * "Bonos por retraso en la entrega": "no refunds" notice, how to read the table, the bonus
 * table and worked examples. Rendered only for incident types that define `bonusRule`.
 */
@Component({
  selector: 'app-bonus-rule',
  imports: [
    DetailSection,
    TipBox,
    BonusTableView,
    RichTextView,
    LucideBan,
    LucideClock,
    LucideTruck,
  ],
  templateUrl: './bonus-rule.html',
  styleUrl: './bonus-rule.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BonusRuleSection {
  readonly rule = input.required<BonusRule>();
}
