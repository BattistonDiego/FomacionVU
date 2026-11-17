import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideChevronLeft, LucideChevronRight, LucideDynamicIcon, LucideX } from '@lucide/angular';

import { Brand } from '../brand/brand';
import { LayoutService } from '../layout.service';
import { SidebarLink } from './sidebar-link/sidebar-link';
import { UserMenu } from './user-menu/user-menu';
import { NAV_SECTIONS } from '../../navigation/navigation.config';

@Component({
  selector: 'app-sidebar',
  imports: [Brand, SidebarLink, UserMenu, LucideDynamicIcon, LucideX],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'app-sidebar',
    '[class.is-collapsed]': 'layout.sidebarCollapsed()',
    '[class.is-open]': 'layout.mobileNavOpen()',
  },
})
export class Sidebar {
  protected readonly layout = inject(LayoutService);
  /** Only implemented modules are listed; planned ones keep their route but stay hidden. */
  protected readonly sections = NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.available),
  })).filter((section) => section.items.length > 0);
  protected readonly chevronLeft = LucideChevronLeft;
  protected readonly chevronRight = LucideChevronRight;
}
