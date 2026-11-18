import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideMenu } from '@lucide/angular';

import { Brand } from '../brand/brand';
import { LayoutService } from '../layout.service';
import { ThemeToggle } from '../../theme/theme-toggle/theme-toggle';
import { UserSessionService } from '../../user/user-session.service';
import { Avatar } from '../../../shared/components/avatar/avatar';

/**
 * Top bar: light/dark switch and avatar. On small screens it also holds the menu button
 * that opens the sidebar drawer.
 */
@Component({
  selector: 'app-header',
  imports: [Brand, Avatar, LucideMenu, ThemeToggle],
  template: `
    <header class="header">
      <button
        type="button"
        class="header__menu"
        (click)="layout.openMobileNav()"
        aria-label="Abrir menú"
        aria-controls="app-sidebar"
        [attr.aria-expanded]="layout.mobileNavOpen()"
      >
        <svg lucideMenu [size]="20"></svg>
      </button>
      <app-brand class="header__brand" />
      <span class="header__spacer"></span>
      <app-theme-toggle />
      @if (userName(); as name) {
        <app-avatar [name]="name" [size]="34" [attr.title]="name" />
      }
    </header>
  `,
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly layout = inject(LayoutService);
  protected readonly userName = inject(UserSessionService).name;
}
