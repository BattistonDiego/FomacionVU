import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideLightbulb } from '@lucide/angular';

import { RefundScenarios } from './refund-scenarios/refund-scenarios';
import { RefundSteps } from './refund-steps/refund-steps';
import { RefundRule } from '../../models/incident-type.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/**
 * "Regla de anulación y reembolso (SAV)": before/after cards, step by step in the system and
 * a tip. Rendered only for incident types that define `refundRule`. Colours: tokens only.
 */
@Component({
  selector: 'app-refund-rule',
  imports: [RefundScenarios, RefundSteps, RichTextView, LucideLightbulb],
  template: `
    @let r = rule();
    <section class="rule" aria-labelledby="refund-rule-title">
      <h2 id="refund-rule-title" class="rule__title">{{ r.title }}</h2>
      <app-refund-scenarios [scenarios]="r.scenarios" />
      <app-refund-steps [title]="r.stepsTitle" [steps]="r.steps" />
      <p class="tip" role="note">
        <svg lucideLightbulb class="tip__icon" [size]="17" aria-hidden="true"></svg>
        <span><app-rich-text [text]="r.tip" /></span>
      </p>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    // Divider from the "Concepto" block above.
    .rule {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 18px;
      padding-top: 28px;
      border-top: 1px solid var(--color-border);
    }

    // Same style as "Concepto" (.section-title of the detail page).
    .rule__title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-strong);
    }

    // Same shape as the "OJO" note, in informative blue.
    .tip {
      display: flex;
      gap: 10px;
      padding: 14px 16px;
      border: 1px solid var(--color-info-border);
      border-radius: var(--radius-md);
      background: var(--color-info-bg);
      color: var(--color-info-text);
      line-height: 1.6;
    }

    .tip__icon {
      margin-top: 3px;
      color: var(--color-info-icon);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundRuleSection {
  readonly rule = input.required<RefundRule>();
}
