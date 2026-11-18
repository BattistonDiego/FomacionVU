import { richTextToPlain } from '../../../shared/models/rich-text.model';
import { collectStrings } from '../../../shared/utils/collect-strings';
import { PRODUCT_EXCHANGES } from './product-exchanges.data';

describe('PRODUCT_EXCHANGES (transcription of "Cambios de producto.pdf")', () => {
  const { restrictions, management, whenToOffer } = PRODUCT_EXCHANGES;
  const allText = collectStrings(PRODUCT_EXCHANGES).join(' ');

  it('lists the 5 cases without exchange plus the Alma financing case', () => {
    expect(restrictions.cases.map((item) => item.title)).toEqual([
      'Mirakl',
      'Marketplace externo',
      'GLS · Point Relay · Pick up Point',
      'Partes de un pack',
      'Klarna · Cafineo · Cembraypay · Sequra',
    ]);
    expect(restrictions.financing.options.map((option) => option.allowed)).toEqual([true, false]);
  });

  it('keeps the GLS exception literally (salvo si aún no tienen EDI)', () => {
    expect(richTextToPlain(restrictions.cases[2].text)).toBe(
      'No podemos realizar cambio en productos enviados por GLS, Point Relay ni Pick up Point (a puntos de entrega) (ni el producto original ni el nuevo), salvo si aún no tienen EDI.',
    );
  });

  it('has 5 steps without EDI and 6 steps with EDI, in the source order', () => {
    const [withoutEdi, withEdi] = management.flows;
    expect(withoutEdi.incidentType).toBe('Echange');
    expect(withoutEdi.steps.map((step) => step.icon)).toEqual([
      'open-incident',
      'add-product',
      'discounts',
      'balearics',
      'inform',
    ]);
    expect(withEdi.incidentType).toBe('retractacion');
    expect(withEdi.steps.map((step) => step.icon)).toEqual([
      'open-incident',
      'add-product',
      'discounts',
      'return-costs',
      'balearics',
      'inform',
    ]);
  });

  it('keeps internal and French terms exactly as in the source', () => {
    for (const term of [
      '“colis acepté oui/non”',
      'souhaite annuler: ',
      '“non”',
      'échange',
      'abimé',
      'LOG',
      'modificaciones',
      'contabilidad',
      'Cembraypay',
      'carrefour',
    ]) {
      expect(allText).toContain(term);
    }
  });

  it('applies only the listed corrections', () => {
    expect(allText).not.toMatch(/\bcual es\b/);
    expect(allText).not.toContain('lacuenta');
    expect(allText).not.toContain('nuevo),salvo');
    expect(whenToOffer.title).toBe('¿Cuándo ofrecemos cambio a los clientes?');
  });
});
