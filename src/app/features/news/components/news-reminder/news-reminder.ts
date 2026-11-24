import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideCheck, LucideX } from '@lucide/angular';

import { ReminderSection } from '../../models/news.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/** "Recordatorio clave": dark block with what to do (check) and never do (cross). */
@Component({
  selector: 'app-news-reminder',
  imports: [RichTextView, LucideCheck, LucideX],
  template: `
    @let s = section();
    <section class="reminder" aria-labelledby="news-reminder-title">
      <h2 class="reminder__title" id="news-reminder-title">{{ s.title }}</h2>
      <ul class="reminder__list">
        @for (item of s.items; track $index) {
          <li class="item">
            @if (item.tone === 'do') {
              <span class="item__icon item__icon--do">
                <svg lucideCheck [size]="15" [strokeWidth]="2.5" aria-hidden="true"></svg>
                <span class="visually-hidden">Sí:</span>
              </span>
            } @else {
              <span class="item__icon item__icon--dont">
                <svg lucideX [size]="15" [strokeWidth]="2.5" aria-hidden="true"></svg>
                <span class="visually-hidden">No:</span>
              </span>
            }
            <span><app-rich-text [text]="item.text" /></span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .reminder {
      padding: 32px;
      border-radius: var(--radius-lg);
      background: var(--color-panel-strong);
      color: var(--color-on-panel-strong);
    }

    .reminder__title {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .reminder__list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
      gap: 16px;
      margin-top: 20px;
    }

    .item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: var(--radius-md);
      background: color-mix(in srgb, var(--color-on-panel-strong) 8%, transparent);
      font-size: 15px;
      line-height: 1.55;
    }

    .item__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: var(--radius-full);
      flex-shrink: 0;

      &--do {
        background: var(--color-success);
        color: var(--color-on-success);
      }

      &--dont {
        background: var(--color-primary);
        color: var(--color-on-primary);
      }
    }

    @media (max-width: 639.98px) {
      .reminder {
        padding: 22px 18px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsReminder {
  readonly section = input.required<ReminderSection>();
}
