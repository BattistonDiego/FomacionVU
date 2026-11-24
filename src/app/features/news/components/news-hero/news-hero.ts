import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { News } from '../../models/news.model';
import { formatNewsDate } from '../../utils/news-date';
import { NewsBadges } from '../news-badges/news-badges';

/** Top card of an announcement: badges, date, reading time, title and introduction. */
@Component({
  selector: 'app-news-hero',
  imports: [NewsBadges],
  template: `
    @let n = news();
    <header class="hero card">
      <div class="hero__top">
        <app-news-badges [priority]="n.priority" [tags]="n.tags" />
        <p class="hero__meta">
          Publicado el <time [attr.datetime]="n.publishedAt">{{ date() }}</time> ·
          {{ n.readingMinutes }} min de lectura
        </p>
      </div>
      <h1 class="hero__title">{{ n.title }}</h1>
      <p class="hero__intro">{{ n.intro }}</p>
    </header>
  `,
  styles: `
    :host {
      display: block;
    }

    .hero {
      padding: 32px;
    }

    .hero__top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px 24px;
    }

    .hero__meta {
      font-size: 13px;
      color: var(--color-text-secondary);
    }

    .hero__title {
      margin-top: 22px;
      font-size: 34px;
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: var(--color-text-strong);
    }

    .hero__intro {
      max-width: 720px;
      margin-top: 16px;
      font-size: 16.5px;
      line-height: 1.7;
      color: var(--color-text);
    }

    @media (max-width: 639.98px) {
      .hero {
        padding: 22px 18px;
      }

      .hero__title {
        font-size: 26px;
      }

      .hero__intro {
        font-size: 15.5px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsHero {
  readonly news = input.required<News>();
  protected readonly date = computed(() => formatNewsDate(this.news().publishedAt));
}
