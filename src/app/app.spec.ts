import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';

describe('App routing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding())],
    });
  });

  it('redirects the root URL to the incident list', async () => {
    const harness = await RouterTestingHarness.create('/');
    expect(TestBed.inject(Router).url).toBe('/incidencias');
    expect(harness.routeNativeElement?.textContent).toContain('Tipos de incidencia');
  });

  it('shows the placeholder page for modules not implemented yet', async () => {
    const harness = await RouterTestingHarness.create('/glosario');
    const text = harness.routeNativeElement?.textContent ?? '';
    expect(text).toContain('Glosario');
    expect(text).toContain('Módulo en preparación');
  });
});
