import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideMenu } from '@lucide/angular';

import { Brand } from '../brand/brand';
import { LayoutService } from '../layout.service';
import { CURRENT_USER } from '../../user/current-user';
import { Avatar } from '../../../shared/components/avatar/avatar';

/** Top bar. On small screens it holds the menu button that opens the sidebar drawer. */
@Component({
  selector: 'app-header',
  imports: [Brand, Avatar, LucideMenu],
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
      <app-avatar [name]="user.name" [size]="34" />
    </header>
  `,
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly layout = inject(LayoutService);
  protected readonly user = CURRENT_USER;
}
