import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { LucideCheck } from '@lucide/angular';

import { NewsService } from '../../services/news.service';

/** "Entendido" → marks the announcement as read (updates the sidebar badge); "Deshacer" reverts. */
@Component({
  selector: 'app-news-read-footer',
  imports: [LucideCheck],
  template: `
    <footer class="footer card" aria-live="polite">
      @if (isRead()) {
        <p class="footer__text footer__text--done">
          <svg lucideCheck [size]="18" [strokeWidth]="2.25" aria-hidden="true"></svg>
          Marcado como leído. ¡Gracias, equipo!
        </p>
        <button type="button" class="button button--secondary" (click)="undo()">Deshacer</button>
      } @else {
        <p class="footer__text">¿Has leído todo el comunicado?</p>
        <button type="button" class="button footer__confirm" (click)="confirm()">
          <svg lucideCheck [size]="16" [strokeWidth]="2.25" aria-hidden="true"></svg>
          Entendido
        </button>
      }
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }

    .footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px 20px;
      padding: 18px 24px;
    }

    .footer__text {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15px;
      font-weight: 500;
      color: var(--color-text-strong);

      &--done {
        font-weight: 600;
        color: var(--color-success-text);
      }
    }

    .footer__confirm {
      height: 42px;
      padding: 0 18px;
      background: var(--color-primary);
      color: var(--color-on-primary);
      font-weight: 600;

      &:hover {
        background: var(--color-primary-hover);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsReadFooter {
  private readonly news = inject(NewsService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  readonly newsId = input.required<string>();
  protected readonly isRead = computed(() => this.news.isRead(this.newsId()));

  protected confirm(): void {
    this.news.markAsRead(this.newsId());
    this.keepFocus();
  }

  protected undo(): void {
    this.news.markAsUnread(this.newsId());
    this.keepFocus();
  }

  /** The clicked button is replaced: move keyboard focus to the new one. */
  private keepFocus(): void {
    afterNextRender(() => this.host.nativeElement.querySelector('button')?.focus(), {
      injector: this.injector,
    });
  }
}
