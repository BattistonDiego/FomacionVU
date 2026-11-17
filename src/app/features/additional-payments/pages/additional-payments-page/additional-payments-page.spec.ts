import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { AdditionalPaymentsPage } from './additional-payments-page';

describe('AdditionalPaymentsPage', () => {
  let page: HTMLElement;
  const texts = (selector: string) =>
    [...page.querySelectorAll(selector)].map((el) => el.textContent?.replace(/\s+/g, ' ').trim());

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'pagos', component: AdditionalPaymentsPage }])],
    });
    page = (await RouterTestingHarness.create('/pagos')).routeNativeElement as HTMLElement;
  });

  it('shows the header and the sections in Spanish', () => {
    expect(page.querySelector('h1')?.textContent).toContain('Pagos adicionales');
    expect(texts('h2')).toEqual([
      'Procedimiento general',
      '¿Qué ocurre después?',
      '¡OJO! Cambio de tipo de entrega con cita fijada',
    ]);
  });

  it('numbers the 3 steps and the 5 follow-up steps', () => {
    expect(texts('.step__eyebrow')).toEqual(['Paso 1', 'Paso 2', 'Paso 3']);
    expect(page.querySelectorAll('.flow__step').length).toBe(5);
  });

  it('renders the subject and examples as copyable snippets', () => {
    expect(texts('app-copy-snippet .snippet__value')).toEqual([
      'paiement',
      'LM 36',
      'LS 7',
      'deuxième livraison 98,99',
      'frais de stockage 37,40',
    ]);
  });

  it('keeps literal text around bold words (no extra spaces)', () => {
    expect(texts('.step__description')[2]).toBe("Abrir escalade y afectarlo a Compta con el asunto 'paiement'.");
  });

  it('renders the two scenarios with their own order and alert', () => {
    const scenarios = page.querySelectorAll('app-delivery-scenario');
    expect(scenarios.length).toBe(2);
    expect(scenarios[0].classList).toContain('is-urgent');
    expect(scenarios[1].classList).not.toContain('is-urgent');
    expect(scenarios[0].querySelectorAll('.scenario__step').length).toBe(4);
    expect(texts('.alert__title')).toEqual(['Comunicar al cliente', '¡IMPORTANTE!']);
  });
});
