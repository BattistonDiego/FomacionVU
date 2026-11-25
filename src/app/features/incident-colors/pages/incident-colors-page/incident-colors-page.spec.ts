import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { IncidentColorsPage } from './incident-colors-page';

describe('IncidentColorsPage', () => {
  let page: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'colores', component: IncidentColorsPage }])],
    });
    page = (await RouterTestingHarness.create('/colores')).routeNativeElement as HTMLElement;
  });

  it('shows the header texts in Spanish', () => {
    expect(page.querySelector('h1')?.textContent).toContain('Colores de incidencias');
    expect(page.textContent).toContain(
      'Consulta el significado de los colores de las incidencias y descubre qué departamento es responsable de cada gestión.',
    );
    expect(page.textContent).toContain('Buscar por color');
  });

  it('renders the colour index and one block per colour', () => {
    expect(page.querySelectorAll('.index .chip').length).toBe(10);
    expect(page.querySelectorAll('app-color-category').length).toBe(10);
  });

  it('paints the band and labels with the documentation colour', () => {
    const green = page.querySelector<HTMLElement>(
      'app-color-category .band__row:not(.band__row--head)',
    );
    expect(green?.style.background).toBe('rgb(216, 228, 188)'); // #D8E4BC
  });

  it('shows the assignment badges and the Reprise exception', () => {
    expect(page.querySelectorAll('.assign--yes').length).toBe(2);
    expect(page.querySelectorAll('.assign--no').length).toBe(6);
    expect(page.querySelector('.role__exception')?.textContent).toContain('EXCEPCIÓN:');
  });

  it('says that Administrador has no description in the source', () => {
    expect(page.textContent).toContain('Sin descripción en la documentación original.');
  });
});
