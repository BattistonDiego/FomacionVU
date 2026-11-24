import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { NewsDetailPage } from './news-detail-page';
import { NewsService } from '../../services/news.service';

describe('NewsDetailPage', () => {
  let harness: RouterTestingHarness;
  const page = () => harness.routeNativeElement as HTMLElement;
  const texts = (selector: string) =>
    [...page().querySelectorAll(selector)].map((el) => el.textContent?.replace(/\s+/g, ' ').trim());

  const open = async (slug: string) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(
          [
            { path: 'novedades/:slug', component: NewsDetailPage },
            { path: '**', children: [] },
          ],
          withComponentInputBinding(),
        ),
      ],
    });
    harness = await RouterTestingHarness.create(`/novedades/${slug}`);
    await TestBed.inject(NewsService).ready;
    await harness.fixture.whenStable();
  };

  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('renders the announcement from its data, top to bottom', async () => {
    await open('boton-de-recogida-en-las-incidencias');
    expect(texts('.breadcrumb__item')).toEqual([
      'Novedades',
      'Botón de “Recogida” en las incidencias',
    ]);
    expect(page().querySelector('h1')?.textContent).toContain(
      'Botón de “Recogida” en las incidencias',
    );
    expect(texts('app-news-badges .badge')).toEqual([
      'Importante',
      'Procedimiento',
      'SC Madrid Tareas',
    ]);
    expect(page().querySelector('.hero__meta')?.textContent?.replace(/\s+/g, ' ')).toContain(
      'Publicado el 24 nov 2026 · 2 min de lectura',
    );
    expect(texts('h2')).toEqual([
      'La regla',
      '¿Por qué es tan importante?',
      'Pedido Nº 2611••••17',
      'Desde octubre, ¡genial en la gran mayoría!',
      'Recordatorio clave',
    ]);
  });

  it('shows the 3 steps of the rule, the 2nd one mandatory with its options', async () => {
    await open('boton-de-recogida-en-las-incidencias');
    expect(texts('.step__label')).toEqual(['Paso 1', 'Paso 2 · Obligatorio', 'Paso 3']);
    expect(page().querySelectorAll('.step--mandatory').length).toBe(1);
    expect(texts('.option')).toEqual(['Solo recogida', 'Recogida y nuevo envío']);
    expect(page().querySelector('.rich-text__emphasis')?.textContent).toBe(
      'ANTES de asignar el caso a LOG',
    );
  });

  it('shows the comparison, the anonymised example and the metrics', async () => {
    await open('boton-de-recogida-en-las-incidencias');
    expect(texts('.column__title')).toEqual(['Con el clic de recogida', 'Sin el clic']);
    expect(texts('.column__item')[0]).toBe('1 · Marcas recogida en el BO');
    expect(page().textContent).toContain('Clienta: E. T.');
    expect(page().textContent).not.toContain('Turpaud');
    expect(texts('.event__label')).toEqual(['05/11', '8 días de espera', '13/11']);
    expect(texts('.figure__value')).toEqual(['~92 %', '~500']);
    expect(page().querySelector('.bar')?.getAttribute('aria-label')).toBe(
      '92 % de casos bien marcados y 8 % sin marcar',
    );
  });

  it('"Entendido" marks it as read and "Deshacer" reverts it', async () => {
    await open('boton-de-recogida-en-las-incidencias');
    const news = TestBed.inject(NewsService);
    const button = () => page().querySelector<HTMLButtonElement>('app-news-read-footer button')!;

    expect(button().textContent).toContain('Entendido');
    button().click();
    await harness.fixture.whenStable();
    expect(news.unreadCount()).toBe(0);
    expect(page().querySelector('app-news-read-footer')?.textContent).toContain(
      'Marcado como leído. ¡Gracias, equipo!',
    );
    expect(button().textContent).toContain('Deshacer');

    button().click();
    await harness.fixture.whenStable();
    expect(news.unreadCount()).toBe(1);
    expect(button().textContent).toContain('Entendido');
  });

  it('shows a not-found state for an unknown slug', async () => {
    await open('no-existe');
    expect(page().querySelector('h1')?.textContent).toContain('Comunicado no encontrado');
    expect(page().querySelector('a')?.getAttribute('href')).toBe('/novedades');
  });
});
