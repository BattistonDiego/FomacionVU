import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Component } from '@angular/core';

import { Sidebar } from './sidebar';
import { NewsService } from '../../../features/news/services/news.service';

@Component({ selector: 'app-host', imports: [Sidebar], template: '<app-sidebar />' })
class Host {}

describe('Sidebar', () => {
  let harness: RouterTestingHarness;
  const page = () => harness.routeNativeElement as HTMLElement;
  const texts = (selector: string) =>
    [...page().querySelectorAll(selector)].map((el) => el.textContent?.replace(/\s+/g, ' ').trim());

  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', component: Host }])],
    });
    harness = await RouterTestingHarness.create('/novedades/algo');
    await TestBed.inject(NewsService).ready;
    await harness.fixture.whenStable();
  });

  afterEach(() => localStorage.clear());

  it('has a "Comunicación" section with "Novedades" between Inicio and Operaciones', () => {
    expect(texts('.nav-section__label')).toEqual(['Comunicación', 'Operaciones']);
    expect(texts('.nav-link__label').slice(0, 3)).toEqual(['Inicio', 'Novedades', 'Incidencias']);
  });

  it('marks Novedades as the current page on its routes', () => {
    const link = page().querySelector('a[href="/novedades"]');
    expect(link?.getAttribute('aria-current')).toBe('page');
    expect(link?.classList).toContain('nav-link--active');
  });

  it('shows the number of unread announcements and hides it at 0', async () => {
    const link = () => page().querySelector('a[href="/novedades"]')!;
    expect(link().querySelector('.nav-link__badge')?.textContent).toBe('1');
    expect(link().textContent).toContain('1 sin leer');

    TestBed.inject(NewsService).markAsRead('boton-recogida-2026-11');
    await harness.fixture.whenStable();
    expect(link().querySelector('.nav-link__badge')).toBeNull();
  });
});
