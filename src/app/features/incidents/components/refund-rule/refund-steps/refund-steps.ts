import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideCheck } from '@lucide/angular';

import { RefundStep } from '../../../models/incident-type.model';

/** "Paso a paso en el sistema": vertical stepper; automatic steps are shown in green. */
@Component({
  selector: 'app-refund-steps',
  imports: [LucideCheck],
  template: `
    <div class="steps card">
      <h3 class="steps__title">{{ title() }}</h3>
      <ol class="steps__list">
        @for (step of steps(); track $index) {
          <li class="step" [class.step--auto]="step.automatic">
            <span class="step__marker" aria-hidden="true">
              @if (step.automatic) {
                <svg lucideCheck [size]="16" [strokeWidth]="2.5"></svg>
              } @else {
                {{ $index + 1 }}
              }
            </span>
            <p class="step__body">
              <!-- &ngsp; keeps a real space between the parts (read as separate words). -->
              <span>{{ step.text }}</span>
              @if (step.chip) {
                &ngsp;<span class="step__chip">{{ step.chip }}</span>
              }
              @if (step.automatic) {
                &ngsp;<span class="step__badge">Automático</span>
              }
            </p>
          </li>
        }
      </ol>
    </div>
  `,
  styleUrl: './refund-steps.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundSteps {
  readonly title = input.required<string>();
  readonly steps = input.required<readonly RefundStep[]>();
}
