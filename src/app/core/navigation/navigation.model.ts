import { LucideIcon } from '@lucide/angular';

export interface NavItem {
  readonly label: string;
  /** Top-level route path, without leading slash. */
  readonly path: string;
  readonly icon: LucideIcon;
  /** `false` → the route shows the "Módulo en preparación" page. */
  readonly available: boolean;
}

export interface NavSection {
  readonly label: string;
  readonly items: readonly NavItem[];
}
