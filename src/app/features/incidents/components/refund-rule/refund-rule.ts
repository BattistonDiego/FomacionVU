import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RefundScenarios } from './refund-scenarios/refund-scenarios';
import { RefundSteps } from './refund-steps/refund-steps';
import { DetailSection } from '../detail-section/detail-section';
import { TipBox } from '../tip-box/tip-box';
import { RefundRule } from '../../models/incident-type.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/**
 * "Regla de anulación y reembolso (SAV)": before/after cards, step by step in the system and
 * a tip. Rendered only for incident types that define `refundRule`. Colours: tokens only.
 */
@Component({
  selector: 'app-refund-rule',
  imports: [DetailSection, TipBox, RefundScenarios, RefundSteps, RichTextView],
  template: `
    @let r = rule();
    <app-detail-section [heading]="r.title" headingId="refund-rule-title">
      <app-refund-scenarios [scenarios]="r.scenarios" />
      <app-refund-steps [title]="r.stepsTitle" [steps]="r.steps" />
      <app-tip-box><app-rich-text [text]="r.tip" /></app-tip-box>
    </app-detail-section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundRuleSection {
  readonly rule = input.required<RefundRule>();
}
