import { LucideIcon } from '@lucide/angular';

export interface NavItem {
  readonly label: string;
  /** Top-level route path, without leading slash (`''` = home). */
  readonly path: string;
  readonly icon: LucideIcon;
  /**
   * `true` → implemented: shown in the sidebar and on the home page.
   * `false` → planned: hidden from the menu; its route shows "Módulo en preparación".
   */
  readonly available: boolean;
  /** Short description for the home page card. */
  readonly description?: string;
  /** Counter shown next to the label (hidden when 0). `unread-news` = unread announcements. */
  readonly badge?: 'unread-news';
}

export interface NavSection {
  /** Sections without label (e.g. "Inicio") render their items directly. */
  readonly label?: string;
  readonly items: readonly NavItem[];
}
