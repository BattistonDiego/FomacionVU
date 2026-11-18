import { DOCUMENT, DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

/**
 * localStorage key holding the theme preference (`light` | `dark`).
 * Independent from the user's name (`supporthub_user`): changing one never touches the other.
 * The same key is read by the inline script in src/index.html — keep both in sync.
 */
export const THEME_STORAGE_KEY = 'supporthub_theme';

/** Default when nothing is saved (first visit). The OS preference is intentionally ignored. */
export const DEFAULT_THEME: Theme = 'light';

/** Browser UI colour (`<meta name="theme-color">`) per theme: the header background. */
const THEME_COLOR: Record<Theme, string> = { light: '#ffffff', dark: '#171313' };

/** How long the `theme-transition` class stays on <html> after a switch (ms). */
const TRANSITION_MS = 250;

/**
 * Single place that manages the light/dark theme: keeps the preference in a signal,
 * persists it, and applies it as `data-theme` on <html>. All colours come from the CSS
 * tokens in src/styles/_tokens.scss, so components update instantly without re-rendering.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly current = signal<Theme>(readStoredTheme());
  private transitionTimer: ReturnType<typeof setTimeout> | undefined;

  readonly theme = this.current.asReadonly();
  readonly isDark = computed(() => this.current() === 'dark');

  constructor() {
    // The inline script in index.html normally applied it already; this keeps the DOM
    // consistent in any case (e.g. tests, or storage blocked for the script).
    this.apply(this.current(), false);

    // Keep several open tabs in sync.
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) {
        const theme = readStoredTheme();
        this.current.set(theme);
        this.apply(theme, true);
      }
    };
    globalThis.addEventListener?.('storage', onStorage);
    inject(DestroyRef).onDestroy(() => {
      globalThis.removeEventListener?.('storage', onStorage);
      clearTimeout(this.transitionTimer);
    });
  }

  setTheme(theme: Theme): void {
    try {
      globalThis.localStorage?.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage unavailable (private mode…): the theme lasts for this session only.
    }
    this.current.set(theme);
    this.apply(theme, true);
  }

  toggle(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  private apply(theme: Theme, animate: boolean): void {
    const root = this.document.documentElement;
    if (animate && !prefersReducedMotion()) {
      root.classList.add('theme-transition');
      clearTimeout(this.transitionTimer);
      this.transitionTimer = setTimeout(
        () => root.classList.remove('theme-transition'),
        TRANSITION_MS,
      );
    }
    root.setAttribute('data-theme', theme);
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);
  }
}

function readStoredTheme(): Theme {
  try {
    const stored = globalThis.localStorage?.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function prefersReducedMotion(): boolean {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}
