import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { NewsListPage } from './news-list-page';
import { NewsService } from '../../services/news.service';

describe('NewsListPage', () => {
  let harness: RouterTestingHarness;
  const page = () => harness.routeNativeElement as HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'novedades', component: NewsListPage },
          { path: '**', children: [] },
        ]),
      ],
    });
    harness = await RouterTestingHarness.create('/novedades');
    await TestBed.inject(NewsService).ready;
    await harness.fixture.whenStable();
  });

  afterEach(() => localStorage.clear());

  it('lists the announcements with priority, title, date and link', () => {
    expect(page().querySelector('h1')?.textContent).toContain('Novedades');
    const item = page().querySelector('a.item');
    expect(item?.getAttribute('href')).toBe('/novedades/boton-de-recogida-en-las-incidencias');
    expect(item?.querySelector('.badge--important')?.textContent).toContain('Importante');
    expect(item?.querySelector('.item__title')?.textContent).toContain(
      'Botón de “Recogida” en las incidencias',
    );
    expect(item?.querySelector('time')?.textContent).toBe('24 nov 2026');
  });

  it('flags unread announcements and updates when read', async () => {
    expect(page().querySelector('.item__unread')?.textContent).toContain('No leído');
    TestBed.inject(NewsService).markAsRead('boton-recogida-2026-11');
    await harness.fixture.whenStable();
    expect(page().querySelector('.item__unread')).toBeNull();
  });
});
