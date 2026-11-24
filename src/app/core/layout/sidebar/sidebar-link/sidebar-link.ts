import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';

import { LayoutService } from '../../layout.service';
import { NavItem } from '../../../navigation/navigation.model';
import { NewsService } from '../../../../features/news/services/news.service';

@Component({
  selector: 'app-sidebar-link',
  imports: [RouterLink, RouterLinkActive, LucideDynamicIcon],
  template: `
    <a
      class="nav-link"
      [class.nav-link--soon]="!item().available"
      [routerLink]="'/' + item().path"
      routerLinkActive="nav-link--active"
      [routerLinkActiveOptions]="{ exact: item().path === '' }"
      ariaCurrentWhenActive="page"
      [attr.title]="tooltip()"
      (click)="layout.closeMobileNav()"
    >
      <span class="nav-link__icon-wrap">
        <svg class="nav-link__icon" [lucideIcon]="item().icon" [size]="18"></svg>
        @if (badgeCount()) {
          <span class="nav-link__dot" aria-hidden="true"></span>
        }
      </span>
      <span class="nav-link__label">{{ item().label }}</span>
      @if (badgeCount(); as count) {
        <span class="nav-link__badge" aria-hidden="true">{{ count }}</span>
        <span class="visually-hidden">, {{ count }} sin leer</span>
      }
    </a>
  `,
  styleUrl: './sidebar-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarLink {
  /** Closes the mobile drawer even when the link points to the current page (no navigation). */
  protected readonly layout = inject(LayoutService);

  private readonly news = inject(NewsService);

  readonly item = input.required<NavItem>();
  readonly collapsed = input(false);

  /** 0 → no badge. */
  protected readonly badgeCount = computed(() =>
    this.item().badge === 'unread-news' ? this.news.unreadCount() : 0,
  );

  protected readonly tooltip = computed(() => {
    const item = this.item();
    if (this.collapsed()) {
      if (this.badgeCount()) {
        return `${item.label} · ${this.badgeCount()} sin leer`;
      }
      return item.available ? item.label : `${item.label} · Próximamente`;
    }
    return item.available ? null : 'Próximamente';
  });
}
