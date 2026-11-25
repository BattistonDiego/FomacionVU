import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { ProductExchangesPage } from './product-exchanges-page';

describe('ProductExchangesPage', () => {
  let page: HTMLElement;
  const texts = (selector: string, root: ParentNode = page) =>
    [...root.querySelectorAll(selector)].map((el) => el.textContent?.replace(/\s+/g, ' ').trim());

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'cambios', component: ProductExchangesPage }])],
    });
    page = (await RouterTestingHarness.create('/cambios')).routeNativeElement as HTMLElement;
  });

  it('shows the header and the sections of the procedure in Spanish', () => {
    expect(page.querySelector('h1')?.textContent).toContain('Cambios de producto');
    expect(texts('h2')).toEqual([
      'Casos en los que NO podemos hacer cambios',
      'Cuestiones a tener en cuenta antes de iniciar la gestión del cambio',
      'La gestión del cambio',
      'Otros casos',
      '¿Cuándo ofrecemos cambio a los clientes?',
    ]);
  });

  it('offers 3 quick-access cards', () => {
    expect(texts('.quick-nav__title')).toEqual([
      'Casos sin cambio',
      'Pedidos sin EDI',
      'Pedidos con EDI',
    ]);
  });

  it('shows both flows side by side with their incident type and numbered steps', () => {
    const flows = page.querySelectorAll('app-exchange-flow');
    expect(flows.length).toBe(2);
    expect(texts('.flow__subtitle')).toEqual([
      'Incidencia tipo «Echange»',
      'Incidencia tipo «retractacion»',
    ]);
    expect(texts('.step__number', flows[0])).toEqual(['1', '2', '3', '4', '5']);
    expect(texts('.step__number', flows[1])).toEqual(['1', '2', '3', '4', '5', '6']);
    expect(flows[1].classList).toContain('is-strong');
    expect(texts('.step__badge', flows[1])).toEqual(['Solo con EDI']);
  });

  it('highlights the mandatory "colis acepté" information in the EDI flow', () => {
    const alert = page.querySelector('app-exchange-flow.is-strong .alert');
    expect(alert?.textContent?.replace(/\s+/g, ' ')).toContain(
      'Muy importante rellenar bien la información “colis acepté oui/non” y souhaite annuler: “non”.',
    );
  });

  it('marks the Alma higher-value case as not possible', () => {
    expect(texts('.option--denied .option__title')).toEqual([
      'b) Si el nuevo producto es de MAYOR valor: no es posible',
    ]);
  });

  it('moves focus to the section when a quick-access card is used', () => {
    const scroll = vi.fn();
    Element.prototype.scrollIntoView = scroll;
    page.querySelectorAll<HTMLButtonElement>('.quick-nav__card')[2].click();
    expect(document.activeElement?.id).toBe('pedidos-con-edi-title');
    expect(scroll).toHaveBeenCalled();
  });
});
