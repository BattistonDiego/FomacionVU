import { DISCOUNTS } from './discounts.data';
import { richTextToPlain, unconfirmedTerms } from '../../../shared/models/rich-text.model';

describe('DISCOUNTS (content provided by the content owner)', () => {
  const { newOrder, validatedOrder, conditions } = DISCOUNTS;

  it('has the three rows of "Para hacer un pedido" with the provided results', () => {
    const table = newOrder.rows.map((row) => [
      row.timeSinceOfferEnded,
      richTextToPlain(row.inStock.result),
      richTextToPlain(row.outOfStock.result),
    ]);
    expect(table).toEqual([
      [
        'Dentro de las primeras 24 h',
        'Se aplica la diferencia de precio.',
        'Se aplica la diferencia de precio.',
      ],
      [
        'Dentro de los primeros 7 días',
        'Se aplica la diferencia de precio.',
        'Se aplica el 50 % de la diferencia de precio.',
      ],
      [
        'Más de 7 días',
        'Se aplica el 50 % de la diferencia de precio.',
        'Se aplica el 50 % de la diferencia de precio.',
      ],
    ]);
    for (const row of newOrder.rows) {
      for (const outcome of [row.inStock, row.outOfStock]) {
        expect(outcome.method).toBe(
          'Añadiendo un código promocional en la pestaña de modificaciones.',
        );
      }
    }
  });

  it('has the three scenarios of "Para un pedido ya validado"', () => {
    expect(validatedOrder.scenarios.map((s) => s.situation)).toEqual([
      'Pedido no entregado',
      'Entregado hace menos de 14 días',
      'Entregado entre 14 y 30 días',
    ]);
  });

  it('does not add a 2.ª propuesta for "Entregado entre 14 y 30 días"', () => {
    const last = validatedOrder.scenarios[2];
    expect(last.proposals.length).toBe(1);
    expect(richTextToPlain(last.proposals[0].text)).toBe(
      'Bono descuento del 10 % de la diferencia*.',
    );
  });

  it('keeps "déo" literal, flagged as unconfirmed, and keeps "ESC a SUP SC"', () => {
    const second = validatedOrder.scenarios[0].proposals[1];
    expect(richTextToPlain(second.text)).toBe(
      "Se aplica la diferencia de precio (añadiendo un 'déo' en la pestaña de modificaciones) + ESC a SUP SC.",
    );
    expect(unconfirmedTerms(second.text)).toEqual(['déo']);
    expect(second.condition).toBe(
      'Solo si el cliente rechaza la 1.ª propuesta e indica que va a anular la compra.',
    );
  });

  it('lists the conditions exactly as provided', () => {
    expect([conditions.lead, ...conditions.items]).toEqual([
      'Al hablar con el cliente hay que informarle de todas estas condiciones.',
      'Este descuento es aplicable sobre la cesta (no incluye gastos de envío).',
      'No es aplicable en marketplaces.',
      'No es aplicable sobre productos de vendedor externo.',
      'Tiempo de uso: 3 meses.',
      'Un solo uso.',
    ]);
  });
});
