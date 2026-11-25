import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';
import { USER_STORAGE_KEY } from './core/user/user-session.service';
import { NewsService } from './features/news/services/news.service';

describe('App routing', () => {
  beforeEach(() => {
    localStorage.setItem(USER_STORAGE_KEY, 'Ana');
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding())],
    });
  });

  afterEach(() => localStorage.removeItem(USER_STORAGE_KEY));

  it('opens on the welcome dashboard', async () => {
    const harness = await RouterTestingHarness.create('/');
    expect(TestBed.inject(Router).url).toBe('/');
    expect(harness.routeNativeElement?.textContent).toContain('¡Bienvenido a SupportHub!');
  });

  it('redirects the old "/inicio" address and unknown URLs to the dashboard', async () => {
    await RouterTestingHarness.create('/inicio');
    expect(TestBed.inject(Router).url).toBe('/');
    await TestBed.inject(Router).navigateByUrl('/no-existe');
    expect(TestBed.inject(Router).url).toBe('/');
  });

  it('keeps every operational module route working', async () => {
    const harness = await RouterTestingHarness.create('/incidencias');
    await TestBed.inject(NewsService).ready; // announcements are loaded on demand
    for (const [url, heading] of [
      ['/incidencias', 'Tipos de incidencia'],
      ['/descuentos', 'Descuentos'],
      ['/pagos-adicionales', 'Pagos adicionales'],
      ['/colores-de-incidencias', 'Colores de incidencias'],
      ['/cambios-de-producto', 'Cambios de producto'],
      ['/novedades', 'Novedades'],
      ['/novedades/boton-de-recogida-en-las-incidencias', 'Botón de “Recogida” en las incidencias'],
    ]) {
      await harness.navigateByUrl(url);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(heading);
    }
    // Loads 7 lazy routes in a row (~3 s with the whole suite running): above the 5 s default
    // it failed intermittently, so this test gets its own limit.
    // TODO: if more routes are added, split this into one test per route (e.g. `it.each`)
    // instead of raising the limit again.
  }, 15_000);

  it('keeps the placeholder page for planned modules', async () => {
    const harness = await RouterTestingHarness.create('/escalados');
    const text = harness.routeNativeElement?.textContent ?? '';
    expect(text).toContain('Escalados');
    expect(text).toContain('Módulo en preparación');
  });
});
