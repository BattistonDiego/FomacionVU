import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';

import { NewsComparison } from '../../components/news-comparison/news-comparison';
import { NewsExample } from '../../components/news-example/news-example';
import { NewsHero } from '../../components/news-hero/news-hero';
import { NewsMetrics } from '../../components/news-metrics/news-metrics';
import { NewsReadFooter } from '../../components/news-read-footer/news-read-footer';
import { NewsReminder } from '../../components/news-reminder/news-reminder';
import { NewsRule } from '../../components/news-rule/news-rule';
import { NewsService } from '../../services/news.service';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';

/** /novedades/:slug — one announcement, rendered section by section from its data. */
@Component({
  selector: 'app-news-detail-page',
  imports: [
    RouterLink,
    Breadcrumb,
    NewsHero,
    NewsRule,
    NewsComparison,
    NewsExample,
    NewsMetrics,
    NewsReminder,
    NewsReadFooter,
    LucideArrowLeft,
  ],
  template: `
    @if (!service.loaded()) {
      <!-- Announcements still loading (a few ms): render nothing rather than "not found". -->
    } @else if (news(); as n) {
      <app-breadcrumb [items]="breadcrumbs()" />
      <article class="detail">
        <app-news-hero [news]="n" />
        @for (section of n.sections; track $index) {
          @switch (section.kind) {
            @case ('rule') {
              <app-news-rule [section]="section" />
            }
            @case ('comparison') {
              <app-news-comparison [section]="section" />
            }
            @case ('pair') {
              <div class="pair">
                @for (card of section.cards; track $index) {
                  @if (card.kind === 'example') {
                    <app-news-example [card]="card" />
                  } @else {
                    <app-news-metrics [card]="card" />
                  }
                }
              </div>
            }
            @case ('reminder') {
              <app-news-reminder [section]="section" />
            }
          }
        }
        <app-news-read-footer [newsId]="n.id" />
      </article>
    } @else {
      <div class="not-found">
        <h1 class="not-found__title">Comunicado no encontrado</h1>
        <p class="not-found__text">
          Puede que la dirección no sea correcta o que el comunicado ya no esté disponible.
        </p>
        <a class="button button--secondary" routerLink="/novedades">
          <svg lucideArrowLeft [size]="16" aria-hidden="true"></svg>
          Volver a Novedades
        </a>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .detail {
      display: flex;
      flex-direction: column;
      gap: 28px;
      margin-top: 24px;
    }

    .pair {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }

    @media (max-width: 959.98px) {
      .pair {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .not-found {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .not-found__title {
      font-size: 28px;
      font-weight: 700;
      color: var(--color-text-strong);
    }

    .not-found__text {
      color: var(--color-text-secondary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailPage {
  protected readonly service = inject(NewsService);

  /** Bound from the route parameter (withComponentInputBinding). */
  readonly slug = input('');

  protected readonly news = computed(() => this.service.bySlug(this.slug()));
  protected readonly breadcrumbs = computed<readonly BreadcrumbItem[]>(() => [
    { label: 'Novedades', link: '/novedades' },
    { label: this.news()?.title ?? '' },
  ]);
}
