import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight } from '@lucide/angular';

import { NewsBadges } from '../../components/news-badges/news-badges';
import { NewsService } from '../../services/news.service';
import { formatNewsDate } from '../../utils/news-date';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';

/** /novedades — every announcement, newest first, with its read state. */
@Component({
  selector: 'app-news-list-page',
  imports: [RouterLink, PageHeader, NewsBadges, LucideArrowRight],
  template: `
    <app-page-header
      title="Novedades"
      subtitle="Comunicados y avisos para el equipo."
      [breadcrumbs]="breadcrumbs"
    />

    <ul class="list">
      @for (n of service.all(); track n.id) {
        @let unread = !service.isRead(n.id);
        <li>
          <a class="item card" [class.item--unread]="unread" [routerLink]="['/novedades', n.slug]">
            <span class="item__top">
              <app-news-badges [priority]="n.priority" [tags]="n.tags" />
              @if (unread) {
                <span class="item__unread"
                  ><span class="item__dot" aria-hidden="true"></span>No leído</span
                >
              }
            </span>
            <span class="item__title">{{ n.title }}</span>
            <span class="item__summary">{{ n.summary }}</span>
            <span class="item__footer">
              <time [attr.datetime]="n.publishedAt">{{ date(n.publishedAt) }}</time>
              · {{ n.readingMinutes }} min de lectura
              <svg lucideArrowRight class="item__arrow" [size]="16" aria-hidden="true"></svg>
            </span>
          </a>
        </li>
      } @empty {
        @if (service.loaded()) {
          <li class="empty">Todavía no hay comunicados.</li>
        }
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
    }

    .list {
      display: grid;
      gap: 16px;
      margin-top: 28px;
    }

    .item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 22px 24px;
      transition: border-color 0.15s ease;

      &:hover {
        border-color: var(--color-border-strong);

        .item__arrow {
          transform: translateX(2px);
        }
      }

      &--unread {
        border-left: 3px solid var(--color-primary);
      }
    }

    .item__top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px 16px;
    }

    .item__unread {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--color-primary-dark);
    }

    .item__dot {
      width: 8px;
      height: 8px;
      border-radius: var(--radius-full);
      background: var(--color-primary);
    }

    .item__title {
      font-size: 19px;
      font-weight: 600;
      color: var(--color-text-strong);
    }

    .item__summary {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 14.5px;
      line-height: 1.55;
      color: var(--color-text-secondary);
    }

    .item__footer {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--color-text-secondary);
    }

    .item__arrow {
      margin-left: auto;
      color: var(--color-icon);
      transition: transform 0.15s ease;
    }

    .empty {
      color: var(--color-text-secondary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListPage {
  protected readonly service = inject(NewsService);
  protected readonly date = formatNewsDate;

  protected readonly breadcrumbs: readonly BreadcrumbItem[] = [
    { label: 'Inicio', link: '/inicio' },
    { label: 'Comunicación' },
    { label: 'Novedades' },
  ];
}
