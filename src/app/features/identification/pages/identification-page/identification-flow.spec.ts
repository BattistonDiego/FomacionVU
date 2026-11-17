import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../../../app.routes';
import { USER_STORAGE_KEY } from '../../../../core/user/user-session.service';

/** End-to-end flow with the real routes, guards and localStorage. */
describe('Identification flow', () => {
  let harness: RouterTestingHarness;
  const router = () => TestBed.inject(Router);
  const root = () => harness.fixture.nativeElement as HTMLElement;
  const type = async (value: string) => {
    const input = root().querySelector<HTMLInputElement>('#user-name')!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await harness.fixture.whenStable();
  };
  const submitButton = () => root().querySelector<HTMLButtonElement>('button[type="submit"]')!;

  const start = async (url: string) => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding())] });
    harness = await RouterTestingHarness.create(url);
  };

  afterEach(() => localStorage.removeItem(USER_STORAGE_KEY));

  it('1. first visit without a saved name opens the identification screen', async () => {
    await start('/');
    expect(router().url).toBe('/identificacion');
    expect(root().querySelector('h1')?.textContent).toContain('¡Bienvenido a SupportHub!');
    expect(root().querySelector<HTMLInputElement>('#user-name')?.placeholder).toBe('Introduce tu nombre');
  });

  it('8. keeps the button disabled for an empty or blank name', async () => {
    await start('/identificacion');
    expect(submitButton().disabled).toBe(true);
    await type('    ');
    expect(submitButton().disabled).toBe(true);
    await type('Ana');
    expect(submitButton().disabled).toBe(false);
  });

  it('2. saves the trimmed name and opens the dashboard; the sidebar shows it', async () => {
    await start('/identificacion');
    await type('  Ana García  ');
    submitButton().click();
    await harness.fixture.whenStable();
    expect(localStorage.getItem(USER_STORAGE_KEY)).toBe('Ana García');
    expect(router().url).toBe('/');
    expect(root().querySelector('.profile__name')?.textContent?.trim()).toBe('Ana García');
    expect(root().querySelector('.profile__role')?.textContent?.trim()).toBe('Agente');
    expect(root().querySelector('app-user-menu app-avatar')?.textContent?.trim()).toBe('A');
  });

  it('3–4. with a saved name the app opens directly on the dashboard', async () => {
    localStorage.setItem(USER_STORAGE_KEY, 'Ana');
    await start('/');
    expect(router().url).toBe('/');
    await harness.navigateByUrl('/identificacion');
    expect(router().url).toBe('/');
  });

  it('5. a direct internal URL without a saved name goes to identification', async () => {
    await start('/descuentos');
    expect(router().url).toBe('/identificacion');
  });

  it('6–7. "Cambiar usuario" forgets the name, and a new name replaces it', async () => {
    localStorage.setItem(USER_STORAGE_KEY, 'Ana');
    await start('/incidencias');

    root().querySelector<HTMLButtonElement>('.profile__more')!.click();
    await harness.fixture.whenStable();
    const item = root().querySelector<HTMLButtonElement>('[role="menuitem"]')!;
    expect(item.textContent?.trim()).toBe('Cambiar usuario');
    item.click();
    await harness.fixture.whenStable();

    expect(localStorage.getItem(USER_STORAGE_KEY)).toBeNull();
    expect(router().url).toBe('/identificacion');

    await type('Bruno');
    submitButton().click();
    await harness.fixture.whenStable();
    expect(router().url).toBe('/');
    expect(root().querySelector('.profile__name')?.textContent?.trim()).toBe('Bruno');
    expect(root().querySelector('app-user-menu app-avatar')?.textContent?.trim()).toBe('B');
  });
});
