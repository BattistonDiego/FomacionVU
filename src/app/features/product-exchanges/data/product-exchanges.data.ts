import { ExchangeStep, ProductExchangesContent } from '../models/product-exchange.model';
import { code, strong } from '../../../shared/models/rich-text.model';

/**
 * "Cambios de producto": transcribed from the source document "Cambios de producto.pdf"
 * (4 pages, "PROCEDIMIENTO para CAMBIOS"). Layout follows the Magic Patterns prototype.
 *
 * Rules:
 * - Body texts are literal from the PDF (bold as in the PDF). Where the prototype rewords a
 *   sentence, the PDF wins.
 * - Short labels that only exist in the prototype (step titles, card titles, "Solo con EDI",
 *   quick-access summaries, page subtitle) are UI labels, not procedure content.
 * - Keep internal and French terms exactly: EDI, LOG, incidencia, “Echange”, échange,
 *   “retractacion”, modificaciones, contabilidad, abimé, “colis acepté oui/non”,
 *   souhaite annuler: “non”, Mirakl, Cembraypay, carrefour.
 * - Do not add steps, cases or exceptions.
 *
 * Corrections (source → interface):
 * - fix: "cual es" → "cuál es" (×3)
 * - fix: "(ni el producto original ni el nuevo),salvo" → "…nuevo), salvo"
 * - fix: "lacuenta" → "la cuenta"
 * - fix: "¿CUANDO OFRECEMOS CAMBIO A LOS CLIENTES?" → "¿Cuándo ofrecemos cambio a los clientes?"
 * - fix: "plazos de entrega.." → list shown as chips, the open end kept as a "…" chip.
 *
 * Presentation decisions (D3–D5): the lists in parentheses are shown as chips; the Baleares
 * explanation is split into its 4 actions with the source words; "Informar al cliente" is
 * split into pay / refund, each with its literal sentences.
 */

const ADD_PRODUCT: ExchangeStep = {
  icon: 'add-product',
  title: 'Añadir el nuevo producto',
  blocks: [
    {
      kind: 'text',
      text: [
        strong('Añadimos el producto nuevo en modificaciones'),
        ', asegurándonos de seleccionar el modelo correcto que ya hemos confirmado anteriormente con el cliente',
      ],
    },
    { kind: 'chips', items: ['modelo', 'unidades', 'opción de entrega', '…'] },
  ],
};

const DISCOUNTS: ExchangeStep = {
  icon: 'discounts',
  title: 'Descuentos y bonos',
  blocks: [
    {
      kind: 'text',
      text: [
        'Descuentos/bonos, tenemos que ponerlo como ',
        strong('código promocional'),
        ', desde la pestaña de modificaciones.',
      ],
    },
  ],
};

const BALEARICS: ExchangeStep = {
  icon: 'balearics',
  title: 'Envíos a Baleares',
  blocks: [
    {
      kind: 'text',
      text: [
        'Si el envío es a ',
        strong('Baleares'),
        ', tenemos que ',
        strong('añadir el coste suplementario'),
        ' de envío.',
      ],
    },
    {
      kind: 'substeps',
      intro: ['Para saber el coste tenemos que:'],
      items: [
        ['entrar en la cuenta del cliente'],
        ['añadir el producto a la cesta para que nos muestre el coste suplementario a Baleares'],
        ['una vez comprobado, eliminamos el producto de la cesta'],
        ['y salimos de la cuenta del cliente'],
      ],
    },
  ],
};

export const PRODUCT_EXCHANGES: ProductExchangesContent = {
  restrictions: {
    id: 'casos-sin-cambio',
    title: 'Casos en los que NO podemos hacer cambios',
    summary: 'Restricciones antes de ofrecer un cambio',
    subtitle: 'Compruébalo antes de ofrecer o gestionar cualquier cambio.',
    cases: [
      {
        icon: 'internal-marketplace',
        title: 'Mirakl',
        text: ['Productos Mirakl (marketplace interno)'],
      },
      {
        icon: 'external-marketplace',
        title: 'Marketplace externo',
        text: ['Pedidos realizados a través de marketplace externo (Amazon/Worten/carrefour/Allegro…)'],
      },
      {
        icon: 'pickup-point',
        title: 'GLS · Point Relay · Pick up Point',
        text: [
          'No podemos realizar cambio en productos enviados por ',
          strong('GLS, Point Relay ni Pick up Point (a puntos de entrega) (ni el producto original ni el nuevo)'),
          ', ',
          strong('salvo si aún no tienen EDI'),
          '.',
        ],
      },
      {
        icon: 'pack',
        title: 'Partes de un pack',
        text: ['Partes de un pack. Si el cliente quiere hacer un cambio hay que cambiar el pack completo.'],
      },
      {
        icon: 'payment-method',
        title: 'Klarna · Cafineo · Cembraypay · Sequra',
        text: ['Pedidos pagados con Klarna / Klarna Over Time / Cafineo / Cembraypay / Sequra'],
        wide: true,
      },
    ],
    financing: {
      title: 'Pedidos financiados con Alma',
      options: [
        {
          marker: 'a)',
          title: 'Si el nuevo producto es de MENOR valor: no hay ningún problema',
          text: ['Procedemos con el cambio de forma habitual.'],
          allowed: true,
        },
        {
          marker: 'b)',
          title: 'Si el nuevo producto es de MAYOR valor: no es posible',
          text: [
            'La plataforma de Alma no permite añadir importes extra a una financiación ya aprobada. Por lo tanto el échange no es posible.',
          ],
          allowed: false,
        },
      ],
    },
  },

  before: {
    title: 'Cuestiones a tener en cuenta antes de iniciar la gestión del cambio',
    confirm: {
      title: 'Confirmar el nuevo producto',
      text: ['Antes de gestionar el cambio confirmar bien con el cliente cuál es el nuevo producto'],
      items: [
        'tamaño',
        'ángulo',
        'color',
        'precio',
        'unidades',
        'opción de entrega elegida',
        'plazos de entrega',
        '…',
      ],
      footer: ['y anotarlo en la incidencia.'],
    },
    avoid: {
      title: 'Evitar cambios sobre cambios',
      text: [
        'Tenemos que evitar hacer cambio sobre cambio, ya que los movimientos contables no quedan limpios, más aún cuando el pago inicial sea en 3 cuotas.',
      ],
      note: ['Es mejor hacer un nuevo pedido con el cliente en línea y anular el anterior. Aunque podemos hacer excepciones.'],
    },
  },

  management: {
    title: 'La gestión del cambio',
    intro: 'Tenemos dos casos principales, pedidos sin EDI y pedidos con EDI.',
    flows: [
      {
        id: 'pedidos-sin-edi',
        title: 'Pedidos sin EDI',
        incidentType: 'Echange',
        tone: 'neutral',
        steps: [
          {
            icon: 'open-incident',
            title: 'Abrir incidencia',
            blocks: [
              {
                kind: 'text',
                text: [
                  'Abrimos incidencia tipo “',
                  strong('Echange'),
                  '”. Dejando indicado que el cliente quiere hacer el cambio y cuál es el modelo nuevo.',
                ],
              },
            ],
          },
          ADD_PRODUCT,
          DISCOUNTS,
          BALEARICS,
          {
            icon: 'inform',
            title: 'Informar al cliente sobre diferencias de precio',
            blocks: [
              {
                kind: 'outcome',
                direction: 'pay',
                title: 'Pagar la diferencia',
                text: [
                  'Informar al cliente de que, en caso de tener que ',
                  strong('pagar la diferencia'),
                  ' de precio porque el precio del nuevo producto sea mayor, recibirá un email de nuestro departamento de contabilidad para avisarle de que ya tiene disponible una línea de pago en su espacio de cliente para acceder y pagar. Si lo prefiere, puede llamarnos y facilitar los datos de su tarjeta para hacer el pago.',
                ],
              },
              {
                kind: 'outcome',
                direction: 'refund',
                title: 'Reembolsar la diferencia',
                text: [
                  'En caso de que el nuevo precio sea menor y haya que ',
                  strong('reembolsarle la diferencia'),
                  ', se hará en la misma forma de pago que usó en su compra.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'pedidos-con-edi',
        title: 'Pedidos con EDI',
        incidentType: 'retractacion',
        tone: 'strong',
        steps: [
          {
            icon: 'open-incident',
            title: 'Abrir incidencia',
            blocks: [
              {
                kind: 'text',
                text: [
                  'Abrimos incidencia tipo “',
                  strong('retractacion'),
                  '”. Dejando indicado que el cliente quiere hacer el cambio y cuál es el modelo nuevo. Si no está entregado aún, afectamos a LOG para que paren el envío.',
                ],
              },
              {
                kind: 'alert',
                text: [
                  'Muy importante rellenar bien la información ',
                  code('“colis acepté oui/non”'),
                  ' y souhaite annuler: ',
                  strong('“non”'),
                  '.',
                ],
              },
            ],
          },
          ADD_PRODUCT,
          DISCOUNTS,
          {
            icon: 'return-costs',
            title: 'Costes logísticos de devolución',
            badge: 'Solo con EDI',
            blocks: [
              {
                kind: 'text',
                text: [
                  'Si el ',
                  strong('pedido'),
                  ' ya ha sido ',
                  strong('expedido'),
                  ', tendremos que añadir los ',
                  strong('costes logísticos de devolución'),
                  ' en la pestaña de “modificaciones”.',
                ],
              },
              { kind: 'text', text: ['A tener en cuenta diferentes costes si ya ha sido entregado o todavía no.'] },
              { kind: 'text', text: ['El cálculo es exactamente igual que si anulase e hiciese un nuevo pedido.'] },
            ],
          },
          BALEARICS,
          {
            icon: 'inform',
            title: 'Informar al cliente',
            blocks: [
              {
                kind: 'outcome',
                direction: 'pay',
                title: 'Pagar alguna diferencia',
                text: [
                  strong('Informar al cliente'),
                  ', que en caso de tener que ',
                  strong('pagar alguna diferencia'),
                  ' de coste, recibirá un email de parte de nuestro departamento de contabilidad informando que tiene el pago listo y que puede pagarlo desde su espacio de cliente, o llamándonos y facilitándonos sus datos de la tarjeta para hacer el pago.',
                ],
              },
              {
                kind: 'outcome',
                direction: 'refund',
                title: 'Reembolsar alguna diferencia',
                text: [
                  'Y que en caso de que haya que ',
                  strong('reembolsarle alguna diferencia'),
                  ' a él, se hará de la misma forma de pago.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  otherCases: {
    title: 'Otros casos',
    text: [
      strong('Si ya hay una incidencia abierta abimé o problema de calidad'),
      ' y el cliente quiere hacer un cambio, los pasos serían los mismos pero:',
    ],
    items: [
      { icon: 'no-incident', text: 'No tenemos que abrir ninguna incidencia porque ya está abierta.' },
      { icon: 'no-cost', text: 'No tenemos que añadir ningún tipo de coste de devolución.' },
    ],
  },

  whenToOffer: {
    title: '¿Cuándo ofrecemos cambio a los clientes?',
    goal: 'La finalidad de ofrecer cambios es evitar anulaciones/retractaciones.',
    cases: [
      {
        icon: 'cancellation',
        title: 'Cuando el cliente solicita anular',
        text: [
          'En caso de que un cliente solicite anular, tratamos de salvar el pedido y, en caso de que, tras ver las limitaciones (no es enviado por GLS, no es marketplace, no está financiado), sea posible el cambio, lo ofrecemos.',
        ],
      },
      {
        icon: 'out-of-stock',
        title: 'En caso de ruptura de stock',
        text: [
          'En caso de ruptura de stock, o cualquier incidencia en el producto en la que ya no se dispone de stock, podemos ofrecer un cambio, sin embargo, si el cliente no responde al tercer intento, pasamos la incidencia para anulación y reembolso.',
        ],
      },
    ],
  },
};
