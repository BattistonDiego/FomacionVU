import { Injectable, signal } from '@angular/core';

const COLLAPSED_STORAGE_KEY = 'supporthub.sidebar-collapsed';

/** UI state of the application shell: collapsed sidebar (desktop) and drawer (mobile). */
@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly sidebarCollapsed = signal(readFlag(COLLAPSED_STORAGE_KEY));
  readonly mobileNavOpen = signal(false);

  toggleSidebar(): void {
    const collapsed = !this.sidebarCollapsed();
    this.sidebarCollapsed.set(collapsed);
    writeFlag(COLLAPSED_STORAGE_KEY, collapsed);
  }

  openMobileNav(): void {
    this.mobileNavOpen.set(true);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }
}

// Storage can be unavailable (private mode, blocked cookies): the preference is optional.
function readFlag(key: string): boolean {
  try {
    return globalThis.localStorage?.getItem(key) === 'true';
  } catch {
    return false;
  }
}

function writeFlag(key: string, value: boolean): void {
  try {
    globalThis.localStorage?.setItem(key, String(value));
  } catch {
    // Ignore: the sidebar simply won't remember its state.
  }
}
