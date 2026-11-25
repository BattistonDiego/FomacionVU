import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { HomePage } from './home-page';
import { NewsService } from '../../../news/services/news.service';

describe('HomePage', () => {
  afterEach(() => localStorage.clear());

  let harness: RouterTestingHarness;
  const page = () => harness.routeNativeElement as HTMLElement;
  const texts = (selector: string) =>
    [...page().querySelectorAll(selector)].map((el) => el.textContent?.replace(/\s+/g, ' ').trim());
  const search = async (value: string) => {
    const input = page().querySelector<HTMLInputElement>('input[type="search"]')!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await harness.fixture.whenStable();
  };

  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: HomePage },
          { path: '**', children: [] },
        ]),
      ],
    });
    harness = await RouterTestingHarness.create('/');
    await TestBed.inject(NewsService).ready;
    await harness.fixture.whenStable();
  });

  it('shows the greeting and the search field in Spanish', () => {
    expect(page().querySelector('h1')?.textContent).toContain('¡Bienvenido a SupportHub!');
    expect(page().textContent).toContain(
      'Toda la información que necesitas para gestionar la atención al cliente, organizada en un solo lugar.',
    );
    expect(page().querySelector('input')?.placeholder).toBe(
      'Buscar procedimientos, incidencias, novedades...',
    );
  });

  it('shows the banner of the latest important unread announcement', () => {
    const banner = page().querySelector('app-news-banner .banner');
    expect(banner?.textContent).toContain('Nuevo · Importante');
    expect(banner?.textContent).toContain(
      'Botón de “Recogida” en las incidencias: márcalo siempre antes de asignar a LOG',
    );
    expect(banner?.querySelector('a')?.getAttribute('href')).toBe(
      '/novedades/boton-de-recogida-en-las-incidencias',
    );
    expect(banner?.querySelector('button')?.getAttribute('aria-label')).toBe('Cerrar aviso');
  });

  it('closes the banner without marking the announcement as read', async () => {
    page().querySelector<HTMLButtonElement>('app-news-banner button')!.click();
    await harness.fixture.whenStable();
    expect(page().querySelector('app-news-banner .banner')).toBeNull();
    const news = TestBed.inject(NewsService);
    expect(news.unreadCount()).toBe(1);
    expect(news.isRead('boton-recogida-2026-11')).toBe(false);
  });

  it('finds announcements in the search', async () => {
    await search('shop return');
    expect(texts('.results__group')).toContain('Novedades');
    expect(texts('.results .result__title')).toContain('Botón de “Recogida” en las incidencias');
  });

  it('shows one card per implemented operational module, with its route', () => {
    expect(texts('.module__name')).toEqual([
      'Incidencias',
      'Descuentos',
      'Pagos adicionales',
      'Colores de incidencias',
      'Cambios de producto',
    ]);
    expect([...page().querySelectorAll('a.module')].map((a) => a.getAttribute('href'))).toEqual([
      '/incidencias',
      '/descuentos',
      '/pagos-adicionales',
      '/colores-de-incidencias',
      '/cambios-de-producto',
    ]);
  });

  it('ends after the modules section (no extra content)', () => {
    expect(page().lastElementChild?.classList).toContain('modules');
  });

  it('searches the content of the modules', async () => {
    await search('paiement');
    expect(texts('.results .result__title')).toContain('Pagos adicionales');
    await search('marketplaces');
    expect(texts('.results .result__title')).toEqual(['Descuentos']);
  });

  it('lists incident types and links to the full search in Incidencias', async () => {
    await search('stock');
    expect(texts('.results .result__title')).toContain('Rotura de stock PR2');
    expect(page().querySelector('.results__all')?.getAttribute('href')).toBe(
      '/incidencias?q=stock',
    );
  });

  it('says when nothing is found', async () => {
    await search('zzzz');
    expect(page().querySelector('.results__empty')?.textContent).toContain('zzzz');
  });

  it('opens the first result with Enter', async () => {
    await search('marketplaces');
    page()
      .querySelector('input')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/descuentos');
  });
});
