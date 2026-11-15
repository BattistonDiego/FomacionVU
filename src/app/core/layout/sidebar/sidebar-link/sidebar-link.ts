import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';

import { LayoutService } from '../../layout.service';
import { NavItem } from '../../../navigation/navigation.model';

@Component({
  selector: 'app-sidebar-link',
  imports: [RouterLink, RouterLinkActive, LucideDynamicIcon],
  template: `
    <a
      class="nav-link"
      [class.nav-link--soon]="!item().available"
      [routerLink]="'/' + item().path"
      routerLinkActive="nav-link--active"
      ariaCurrentWhenActive="page"
      [attr.title]="tooltip()"
      (click)="layout.closeMobileNav()"
    >
      <svg class="nav-link__icon" [lucideIcon]="item().icon" [size]="18"></svg>
      <span class="nav-link__label">{{ item().label }}</span>
    </a>
  `,
  styleUrl: './sidebar-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarLink {
  /** Closes the mobile drawer even when the link points to the current page (no navigation). */
  protected readonly layout = inject(LayoutService);

  readonly item = input.required<NavItem>();
  readonly collapsed = input(false);

  protected readonly tooltip = computed(() => {
    const item = this.item();
    if (this.collapsed()) {
      return item.available ? item.label : `${item.label} · Próximamente`;
    }
    return item.available ? null : 'Próximamente';
  });
}
