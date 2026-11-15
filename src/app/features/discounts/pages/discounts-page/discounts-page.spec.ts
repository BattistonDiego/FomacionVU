import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { DiscountsPage } from './discounts-page';

describe('DiscountsPage', () => {
  let page: HTMLElement;
  const text = (selector: string) =>
    [...page.querySelectorAll(selector)].map((el) => el.textContent?.replace(/\s+/g, ' ').trim());

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'descuentos', component: DiscountsPage }])],
    });
    const harness = await RouterTestingHarness.create('/descuentos');
    page = harness.routeNativeElement as HTMLElement;
  });

  it('shows the header and the three sections in Spanish', () => {
    expect(page.querySelector('h1')?.textContent).toContain('Descuentos');
    expect(text('h2')).toEqual([
      'Para hacer un pedido',
      'Para un pedido ya validado',
      'Condiciones del descuento',
    ]);
  });

  it('renders the table with 3 rows and highlights "50 %"', () => {
    expect(page.querySelectorAll('app-flash-sale-table tbody tr').length).toBe(3);
    expect(page.querySelectorAll('app-flash-sale-table .rich-text__highlight').length).toBe(3);
  });

  it('renders literal texts without extra spaces around highlighted/flagged terms', () => {
    expect(text('app-flash-sale-table .result')).toContain('Se aplica el 50 % de la diferencia de precio.');
    expect(text('.proposal__text')).toContain(
      "Se aplica la diferencia de precio (añadiendo un 'déo (término pendiente de confirmación)' en la pestaña de modificaciones) + ESC a SUP SC.",
    );
  });

  it('flags "déo" as pending confirmation in both cards that use it', () => {
    expect(page.querySelectorAll('.rich-text__unconfirmed').length).toBe(2);
    expect(text('.proposal__pending')).toEqual([
      'Término «déo» pendiente de confirmación',
      'Término «déo» pendiente de confirmación',
    ]);
  });

  it('shows 2 proposals, 2 proposals and 1 proposal in the scenario cards', () => {
    const counts = [...page.querySelectorAll('app-proposal-card')].map(
      (card) => card.querySelectorAll('.proposal').length,
    );
    expect(counts).toEqual([2, 2, 1]);
  });

  it('lists the 5 conditions', () => {
    expect(page.querySelectorAll('.conditions__item').length).toBe(5);
  });
});
