import { DiscountProposal, DiscountsContent } from '../models/discount.model';
import { highlight, unconfirmed } from '../../../shared/models/rich-text.model';

/**
 * Discount rules for flash-sale price claims, as provided by the content owner.
 *
 * Rules:
 * - Text is literal. Do not add conditions, exceptions or proposals that are not provided.
 * - "déo" is kept exactly as received and flagged as pending confirmation (`unconfirmed`).
 * - "ESC a SUP SC" is an internal term and is kept as is.
 * - "Entregado entre 14 y 30 días" has only a 1.ª propuesta in the documentation.
 * - The "*" after "diferencia" is kept; the documentation does not say what it refers to.
 */

const PROMO_CODE_METHOD = 'Añadiendo un código promocional en la pestaña de modificaciones.';

const SECOND_PROPOSAL_CONDITION =
  'Solo si el cliente rechaza la 1.ª propuesta e indica que va a anular la compra.';

const FULL_DIFFERENCE = { result: ['Se aplica la diferencia de precio.'], method: PROMO_CODE_METHOD };

const HALF_DIFFERENCE = {
  result: ['Se aplica el ', highlight('50 %'), ' de la diferencia de precio.'],
  method: PROMO_CODE_METHOD,
};

const PRICE_DIFFERENCE_WITH_ESCALATION: DiscountProposal = {
  label: '2.ª propuesta',
  text: [
    "Se aplica la diferencia de precio (añadiendo un '",
    unconfirmed('déo'),
    "' en la pestaña de modificaciones) + ESC a SUP SC.",
  ],
  condition: SECOND_PROPOSAL_CONDITION,
};

const voucher = (percentage: string): DiscountProposal => ({
  label: '1.ª propuesta',
  text: ['Bono descuento del ', highlight(percentage), ' de la diferencia*.'],
});

export const DISCOUNTS: DiscountsContent = {
  newOrder: {
    id: 'para-hacer-un-pedido',
    title: 'Para hacer un pedido',
    summary: 'Venta flash que ya no está activa',
    description: 'Si el cliente reclama un precio de venta flash que ya no está activo.',
    columns: {
      time: 'Tiempo desde que acabó la oferta',
      inStock: 'Producto en stock',
      outOfStock: 'Producto que no está en stock',
    },
    rows: [
      {
        timeSinceOfferEnded: 'Dentro de las primeras 24 h',
        inStock: FULL_DIFFERENCE,
        outOfStock: FULL_DIFFERENCE,
      },
      {
        timeSinceOfferEnded: 'Dentro de los primeros 7 días',
        inStock: FULL_DIFFERENCE,
        outOfStock: HALF_DIFFERENCE,
      },
      {
        timeSinceOfferEnded: 'Más de 7 días',
        inStock: HALF_DIFFERENCE,
        outOfStock: HALF_DIFFERENCE,
      },
    ],
  },

  validatedOrder: {
    id: 'para-un-pedido-ya-validado',
    title: 'Para un pedido ya validado',
    summary: 'Venta flash que ahora está activa',
    description: 'Si el cliente reclama un precio de venta flash que ahora está activo.',
    scenarios: [
      {
        situation: 'Pedido no entregado',
        proposals: [voucher('130 %'), PRICE_DIFFERENCE_WITH_ESCALATION],
      },
      {
        situation: 'Entregado hace menos de 14 días',
        proposals: [voucher('130 %'), PRICE_DIFFERENCE_WITH_ESCALATION],
      },
      {
        situation: 'Entregado entre 14 y 30 días',
        // Only one proposal in the documentation: do not add a 2.ª propuesta.
        proposals: [voucher('10 %')],
      },
    ],
  },

  conditions: {
    id: 'condiciones-del-descuento',
    title: 'Condiciones del descuento',
    lead: 'Al hablar con el cliente hay que informarle de todas estas condiciones.',
    items: [
      'Este descuento es aplicable sobre la cesta (no incluye gastos de envío).',
      'No es aplicable en marketplaces.',
      'No es aplicable sobre productos de vendedor externo.',
      'Tiempo de uso: 3 meses.',
      'Un solo uso.',
    ],
  },
};
