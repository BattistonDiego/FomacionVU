import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideChevronLeft, LucideChevronRight, LucideDynamicIcon, LucideX } from '@lucide/angular';

import { Brand } from '../brand/brand';
import { LayoutService } from '../layout.service';
import { SidebarLink } from './sidebar-link/sidebar-link';
import { NAV_FOOTER_ITEMS, NAV_SECTIONS } from '../../navigation/navigation.config';
import { CURRENT_USER } from '../../user/current-user';
import { Avatar } from '../../../shared/components/avatar/avatar';

@Component({
  selector: 'app-sidebar',
  imports: [Brand, SidebarLink, Avatar, LucideDynamicIcon, LucideX],
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
  protected readonly sections = NAV_SECTIONS;
  protected readonly footerItems = NAV_FOOTER_ITEMS;
  protected readonly user = CURRENT_USER;
  protected readonly chevronLeft = LucideChevronLeft;
  protected readonly chevronRight = LucideChevronRight;
}
