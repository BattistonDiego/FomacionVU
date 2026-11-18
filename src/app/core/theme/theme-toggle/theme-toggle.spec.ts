import { TestBed } from '@angular/core/testing';

import { THEME_STORAGE_KEY } from '../theme.service';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  const render = async () => {
    const fixture = TestBed.createComponent(ThemeToggle);
    await fixture.whenStable();
    return fixture;
  };

  it('offers the dark mode while in light mode', async () => {
    const fixture = await render();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Activar modo oscuro');
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(fixture.nativeElement.querySelector('.tooltip')?.textContent).toContain(
      'Activar modo oscuro',
    );
  });

  it('switches theme on click and updates its label', async () => {
    const fixture = await render();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(button.getAttribute('aria-label')).toBe('Activar modo claro');
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });
});
