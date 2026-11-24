import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ExampleCard } from '../../models/news.model';

/** "Ejemplo real": a case told as a vertical timeline. */
@Component({
  selector: 'app-news-example',
  template: `
    @let c = card();
    <article class="example card" aria-labelledby="news-example-title">
      <p class="eyebrow">{{ c.eyebrow }}</p>
      <h2 class="example__title" id="news-example-title">{{ c.title }}</h2>
      @if (c.subtitle) {
        <p class="example__subtitle">{{ c.subtitle }}</p>
      }
      <ol class="timeline">
        @for (event of c.events; track $index) {
          <li class="event" [class.event--highlight]="event.highlight">
            <p class="event__label">{{ event.label }}</p>
            <p class="event__text">{{ event.text }}</p>
          </li>
        }
      </ol>
      @if (c.note) {
        <p class="example__note">{{ c.note }}</p>
      }
    </article>
  `,
  styles: `
    :host {
      display: block;
    }

    .example {
      height: 100%;
      padding: 28px;
    }

    .eyebrow {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--color-text-secondary);
    }

    .example__title {
      margin-top: 4px;
      font-size: 21px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--color-text-strong);
    }

    .example__subtitle {
      margin-top: 2px;
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    .timeline {
      margin-top: 20px;
    }

    .event {
      position: relative;
      padding: 0 0 18px 26px;

      // Marker
      &::before {
        content: '';
        position: absolute;
        top: 4px;
        left: 0;
        width: 11px;
        height: 11px;
        border-radius: var(--radius-full);
        background: var(--color-icon);
      }

      // Line to the next marker
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        top: 18px;
        bottom: 2px;
        left: 5px;
        width: 1px;
        background: var(--color-border-strong);
      }

      &--highlight::before {
        background: var(--color-primary);
      }
    }

    .event__label {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-text-strong);

      .event--highlight & {
        color: var(--color-primary-dark);
      }
    }

    .event__text {
      margin-top: 2px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--color-text);
    }

    .example__note {
      margin-top: 4px;
      padding: 12px 14px;
      border-radius: var(--radius-md);
      background: var(--color-surface-subtle);
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-strong);
    }

    @media (max-width: 639.98px) {
      .example {
        padding: 22px 18px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsExample {
  readonly card = input.required<ExampleCard>();
}
