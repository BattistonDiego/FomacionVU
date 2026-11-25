import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideInfo } from '@lucide/angular';

import { AfterSection } from '../../models/additional-payment.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/** "¿Qué ocurre después?": horizontal timeline (vertical on narrow screens) + "Importante". */
@Component({
  selector: 'app-after-flow',
  imports: [RichTextView, LucideInfo],
  template: `
    @let s = section();
    <section class="after" aria-labelledby="after-title">
      <h2 id="after-title" class="after__title">{{ s.title }}</h2>
      <ol class="flow">
        @for (step of s.steps; track $index; let first = $first) {
          <li class="flow__step" [class.flow__step--first]="first">
            <span class="flow__marker"
              ><span class="flow__number">{{ $index + 1 }}</span></span
            >
            <p class="flow__actor">{{ step.actor }}</p>
            <p class="flow__text"><app-rich-text [text]="step.text" /></p>
          </li>
        }
      </ol>
      <div class="important card" role="note">
        <svg lucideInfo class="important__icon" [size]="20"></svg>
        <div>
          <p class="important__title">{{ s.important.title }}</p>
          <p class="important__text">{{ s.important.text }}</p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './after-flow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AfterFlow {
  readonly section = input.required<AfterSection>();
}
