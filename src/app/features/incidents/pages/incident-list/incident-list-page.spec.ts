import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { IncidentListPage } from './incident-list-page';

describe('IncidentListPage', () => {
  let harness: RouterTestingHarness;

  const page = () => harness.routeNativeElement as HTMLElement;
  const rows = () => page().querySelectorAll('.row');
  const summary = () => page().querySelector('.summary')?.textContent ?? '';

  const open = async (url = '/incidencias') => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'incidencias', component: IncidentListPage }])],
    });
    harness = await RouterTestingHarness.create(url);
  };

  const typeInSearch = async (value: string) => {
    const input = page().querySelector<HTMLInputElement>('input[type="search"]')!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await harness.fixture.whenStable();
  };

  it('shows the header texts in Spanish and the 18 incident types', async () => {
    await open();
    expect(page().querySelector('h1')?.textContent).toContain('Tipos de incidencia');
    expect(page().textContent).toContain(
      'Consulta los diferentes tipos de incidencia y encuentra rápidamente la información que necesitas.',
    );
    expect(page().textContent).toContain('Inicio');
    expect(page().textContent).toContain('Operaciones');
    expect(page().querySelector('input')?.placeholder).toBe('Buscar tipos de incidencia...');
    expect(rows().length).toBe(18);
    expect(summary()).toContain('18 tipos de incidencia');
  });

  it('filters while typing and mirrors the query in the URL', async () => {
    await open();
    await typeInSearch('stock');
    expect(rows().length).toBe(1);
    expect(summary()).toContain('1 de 18 tipos de incidencia');
    expect(TestBed.inject(Router).url).toBe('/incidencias?q=stock');
  });

  it('filters by the "¿Quién abre?" chips', async () => {
    await open();
    const logChip = [...page().querySelectorAll<HTMLButtonElement>('.chip')].find((chip) =>
      chip.textContent?.trim().startsWith('LOG'),
    )!;
    logChip.click();
    await harness.fixture.whenStable();
    expect(rows().length).toBe(6);
    expect(logChip.getAttribute('aria-pressed')).toBe('true');
    expect(TestBed.inject(Router).url).toBe('/incidencias?abre=LOG');
  });

  it('shows an empty state whose button clears search and filters', async () => {
    await open();
    await typeInSearch('zzzz');
    expect(rows().length).toBe(0);
    expect(page().textContent).toContain('No se han encontrado tipos de incidencia');

    page().querySelector<HTMLButtonElement>('.empty button')!.click();
    await harness.fixture.whenStable();
    expect(rows().length).toBe(18);
  });

  it('restores search and filter from the URL', async () => {
    await open('/incidencias?q=EDI&abre=SC');
    expect(rows().length).toBe(1);
    expect(page().querySelector<HTMLInputElement>('input')?.value).toBe('EDI');
  });

  it('ignores an unknown "abre" value in the URL', async () => {
    await open('/incidencias?abre=XYZ');
    expect(rows().length).toBe(18);
  });
});
