import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideCircleAlert } from '@lucide/angular';

import { NewsPriority } from '../../models/news.model';

/** "IMPORTANTE" (solid red) + grey tags. Used in the list cards and in the detail hero. */
@Component({
  selector: 'app-news-badges',
  imports: [LucideCircleAlert],
  template: `
    @if (priority() === 'important') {
      <span class="badge badge--important">
        <svg lucideCircleAlert [size]="13" [strokeWidth]="2.25" aria-hidden="true"></svg>
        Importante
      </span>
    }
    @for (tag of tags(); track tag) {
      <span class="badge">{{ tag }}</span>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      background: var(--color-surface-subtle);
      border: 1px solid var(--color-border);
      font-size: 12px;
      font-weight: 600;
      line-height: 1.5;
      color: var(--color-text);
    }

    .badge--important {
      border-color: var(--color-primary);
      background: var(--color-primary);
      color: var(--color-on-primary);
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsBadges {
  readonly priority = input.required<NewsPriority>();
  readonly tags = input<readonly string[]>([]);
}
