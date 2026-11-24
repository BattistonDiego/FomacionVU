import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideCheck, LucideLightbulb, LucideX } from '@lucide/angular';

import { ComparisonSection } from '../../models/news.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/** "¿Por qué es tan importante?": what happens with (green) and without (red) the action. */
@Component({
  selector: 'app-news-comparison',
  imports: [RichTextView, LucideCheck, LucideLightbulb, LucideX],
  template: `
    @let s = section();
    <section class="comparison card" aria-labelledby="news-comparison-title">
      <h2 class="comparison__title" id="news-comparison-title">
        <span class="comparison__icon" aria-hidden="true"
          ><svg lucideLightbulb [size]="18"></svg
        ></span>
        {{ s.title }}
      </h2>
      <p class="comparison__text"><app-rich-text [text]="s.text" /></p>

      <div class="columns">
        @for (column of [s.positive, s.negative]; track $index; let positive = $first) {
          <div class="column" [class.column--negative]="!positive">
            <h3 class="column__title">
              @if (positive) {
                <svg lucideCheck [size]="16" [strokeWidth]="2.25" aria-hidden="true"></svg>
              } @else {
                <svg lucideX [size]="16" [strokeWidth]="2.25" aria-hidden="true"></svg>
              }
              {{ column.title }}
            </h3>
            <ol class="column__list">
              @for (item of column.items; track $index) {
                <li class="column__item">{{ $index + 1 }} · {{ item }}</li>
              }
            </ol>
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './news-comparison.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComparison {
  readonly section = input.required<ComparisonSection>();
}
