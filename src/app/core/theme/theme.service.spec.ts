import { TestBed } from '@angular/core/testing';

import { USER_STORAGE_KEY, UserSessionService } from '../user/user-session.service';
import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

describe('ThemeService', () => {
  const root = document.documentElement;
  const create = () => {
    TestBed.resetTestingModule();
    return TestBed.inject(ThemeService);
  };

  beforeEach(() => {
    localStorage.clear();
    root.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
    root.removeAttribute('data-theme');
    root.classList.remove('theme-transition');
  });

  it('uses the light theme on a first visit (nothing saved)', () => {
    const theme = create();
    expect(theme.theme()).toBe('light');
    expect(theme.isDark()).toBe(false);
    expect(root.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it('saves the dark theme and applies it to <html> immediately', () => {
    const theme = create();
    theme.toggle();
    expect(theme.theme()).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(root.getAttribute('data-theme')).toBe('dark');
  });

  it('restores the saved theme after a reload', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const theme = create();
    expect(theme.theme()).toBe('dark');
    expect(root.getAttribute('data-theme')).toBe('dark');
  });

  it('ignores unknown stored values', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    expect(create().theme()).toBe('light');
  });

  it('switches back to light and saves it', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const theme = create();
    theme.toggle();
    expect(theme.theme()).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(root.getAttribute('data-theme')).toBe('light');
  });

  it('never touches the saved user name', () => {
    localStorage.setItem(USER_STORAGE_KEY, 'Diego');
    const theme = create();
    theme.toggle();
    theme.toggle();
    expect(localStorage.getItem(USER_STORAGE_KEY)).toBe('Diego');
  });

  it('keeps the theme when the user changes ("Cambiar usuario")', () => {
    localStorage.setItem(USER_STORAGE_KEY, 'Diego');
    const theme = create();
    theme.setTheme('dark');
    TestBed.inject(UserSessionService).clear();
    expect(localStorage.getItem(USER_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(theme.theme()).toBe('dark');
  });

  it('follows a theme change made in another tab', () => {
    const theme = create();
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    window.dispatchEvent(new StorageEvent('storage', { key: THEME_STORAGE_KEY }));
    expect(theme.theme()).toBe('dark');
    expect(root.getAttribute('data-theme')).toBe('dark');
  });

  it('adds the transition class only while switching', () => {
    const theme = create();
    expect(root.classList.contains('theme-transition')).toBe(false);
    vi.useFakeTimers();
    try {
      theme.toggle();
      expect(root.classList.contains('theme-transition')).toBe(true);
      vi.advanceTimersByTime(300);
      expect(root.classList.contains('theme-transition')).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});
