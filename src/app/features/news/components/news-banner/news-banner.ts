import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideMegaphone, LucideX } from '@lucide/angular';

import { NewsService } from '../../services/news.service';

/**
 * Home notice for the most recent important announcement not read yet.
 * The close button only hides it (stored separately): it does NOT mark the news as read.
 */
@Component({
  selector: 'app-news-banner',
  imports: [RouterLink, LucideArrowRight, LucideMegaphone, LucideX],
  template: `
    @if (service.banner(); as n) {
      <aside class="banner" aria-labelledby="news-banner-title">
        <span class="banner__icon" aria-hidden="true"><svg lucideMegaphone [size]="19"></svg></span>
        <div class="banner__text">
          <p class="banner__eyebrow">Nuevo · Importante</p>
          <p class="banner__title" id="news-banner-title">{{ n.headline ?? n.title }}</p>
        </div>
        <a class="banner__cta" [routerLink]="['/novedades', n.slug]">
          Leer comunicado
          <svg lucideArrowRight [size]="16" aria-hidden="true"></svg>
        </a>
        <button
          type="button"
          class="banner__close"
          aria-label="Cerrar aviso"
          title="Cerrar aviso"
          (click)="service.dismissBanner(n.id)"
        >
          <svg lucideX [size]="18"></svg>
        </button>
      </aside>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .banner {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
      padding: 16px 16px 16px 18px;
      border: 1px solid var(--color-primary-border);
      border-radius: var(--radius-lg);
      background: var(--color-primary-faint);
    }

    .banner__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      background: var(--color-primary);
      color: var(--color-on-primary);
      flex-shrink: 0;
    }

    .banner__text {
      flex: 1;
      min-width: 0;
    }

    .banner__eyebrow {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--color-primary-dark);
    }

    .banner__title {
      margin-top: 2px;
      font-size: 15px;
      font-weight: 600;
      color: var(--color-text-strong);
    }

    .banner__cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 42px;
      padding: 0 18px;
      border-radius: var(--radius-md);
      background: var(--color-primary);
      color: var(--color-on-primary);
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      transition: background-color 0.15s ease;

      &:hover {
        background: var(--color-primary-hover);
      }
    }

    .banner__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: 0;
      border-radius: var(--radius-md);
      background: transparent;
      color: var(--color-text-secondary);
      flex-shrink: 0;

      &:hover {
        background: var(--color-primary-soft);
        color: var(--color-text-strong);
      }
    }

    @media (max-width: 639.98px) {
      .banner {
        flex-wrap: wrap;
        position: relative;
        padding-right: 52px;
      }

      .banner__text {
        flex-basis: calc(100% - 56px);
      }

      .banner__cta {
        width: 100%;
        justify-content: center;
      }

      .banner__close {
        position: absolute;
        top: 10px;
        right: 8px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsBanner {
  protected readonly service = inject(NewsService);
}
