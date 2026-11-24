import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MetricsCard } from '../../models/news.model';

/** "¿Cómo vamos?": key figures and a two-colour progress bar. */
@Component({
  selector: 'app-news-metrics',
  template: `
    @let c = card();
    <article class="metrics card" aria-labelledby="news-metrics-title">
      <p class="eyebrow">{{ c.eyebrow }}</p>
      <h2 class="metrics__title" id="news-metrics-title">{{ c.title }}</h2>

      <dl class="figures">
        @for (metric of c.metrics; track metric.label) {
          <div class="figure" [class.figure--danger]="metric.tone === 'danger'">
            <dt class="figure__label">{{ metric.label }}</dt>
            <dd class="figure__value">{{ metric.value }}</dd>
          </div>
        }
      </dl>

      <div class="bar" role="img" [attr.aria-label]="c.progressLabel">
        <span class="bar__success" [style.width.%]="c.progress.success"></span>
        <span class="bar__danger" [style.width.%]="c.progress.danger"></span>
      </div>

      @if (c.text) {
        <p class="metrics__text">{{ c.text }}</p>
      }
    </article>
  `,
  styles: `
    :host {
      display: block;
    }

    .metrics {
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

    .metrics__title {
      margin-top: 4px;
      font-size: 21px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--color-text-strong);
    }

    .figures {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 32px;
      margin: 20px 0 0;
    }

    // Value first visually, label below (dt/dd order kept for screen readers).
    .figure {
      display: flex;
      flex-direction: column-reverse;
    }

    .figure__value {
      margin: 0;
      font-size: 38px;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--color-success-text);

      .figure--danger & {
        color: var(--color-primary-dark);
      }
    }

    .figure__label {
      margin-top: 4px;
      font-size: 13px;
      color: var(--color-text-secondary);
    }

    .bar {
      display: flex;
      height: 12px;
      margin-top: 18px;
      overflow: hidden;
      border-radius: var(--radius-full);
      background: var(--color-surface-subtle);
    }

    .bar__success {
      background: var(--color-success);
    }

    .bar__danger {
      background: var(--color-primary);
    }

    .metrics__text {
      margin-top: 18px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-secondary);
    }

    @media (max-width: 639.98px) {
      .metrics {
        padding: 22px 18px;
      }

      .figure__value {
        font-size: 32px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsMetrics {
  readonly card = input.required<MetricsCard>();
}
