import { AdditionalPaymentsContent } from '../models/additional-payment.model';
import { code, strong } from '../../../shared/models/rich-text.model';

/**
 * "Pagos adicionales" — procedure provided by the content owner (texts in the brief) and
 * the Magic Patterns prototype (Spanish wording of the steps given in Portuguese in the brief).
 *
 * Rules:
 * - Do not add steps or change their order.
 * - Keep the internal terms (LOG, Compta, escalade) and the French texts
 *   ("paiement", "deuxième livraison", "frais de stockage") exactly as given.
 * - Keep the example values exactly as given (LM 36, LS 7, 98,99, 37,40).
 * - < 72 h: LOG first (cancel the appointment), then Contabilidad.
 *   > 72 h: Contabilidad first and the customer must pay the same day.
 */
export const ADDITIONAL_PAYMENTS: AdditionalPaymentsContent = {
  procedure: {
    id: 'procedimiento-general',
    title: 'Procedimiento general',
    summary: 'Importe, línea de pago y escalade a Compta',
    description:
      'Estos son los pasos que debemos seguir para solicitar un pago adicional al cliente.',

    calculate: {
      title: 'Calcular el importe',
      description: ['Tenemos que tener claro el importe a pagar.'],
      cases: [
        {
          reason: 'delivery-change',
          title: 'Cambio de tipo de entrega',
          qualifier: '(LC → LS)',
          description: 'Restando la diferencia de precio.',
        },
        {
          reason: 'storage',
          title: 'Coste de almacenaje',
          description:
            'Preguntando por escalade a LOG cuánto costaría el almacenaje durante el tiempo que solicite el cliente.',
        },
        {
          reason: 'second-delivery',
          title: 'Coste de segunda entrega',
          description: 'El coste de entrega LC de los productos que compró el cliente.',
        },
      ],
    },

    paymentLine: {
      title: 'Añadir la línea de pago',
      description: [
        'Añadir la línea de pago en modificaciones (+añadir un producto: gastos…) con el concepto que corresponda.',
      ],
      path: [
        { label: 'Modificaciones' },
        { label: 'Añadir un producto', isAddAction: true },
        { label: 'Gastos…' },
      ],
    },

    escalade: {
      title: 'Abrir escalade a Contabilidad',
      description: [
        'Abrir escalade y afectarlo a ',
        strong('Compta'),
        " con el asunto 'paiement'.",
      ],
      assignTo: 'Compta',
      subject: 'paiement',
      textsTitle: 'Texto a escribir en el escalade según el motivo',
      texts: [
        {
          reason: 'delivery-change',
          title: 'Cambio de tipo de entrega',
          instruction:
            'Indicar el tipo de entrega que quiere el cliente y el coste que tiene que pagar.',
          examples: ['LM 36', 'LS 7'],
        },
        {
          reason: 'second-delivery',
          title: 'Segunda entrega',
          examples: ['deuxième livraison 98,99'],
        },
        { reason: 'storage', title: 'Costes de almacenaje', examples: ['frais de stockage 37,40'] },
      ],
    },
  },

  after: {
    title: '¿Qué ocurre después?',
    steps: [
      {
        actor: 'Agente',
        text: ['El agente abre el escalade a Compta con el asunto "', code('paiement'), '".'],
      },
      {
        actor: 'Contabilidad',
        text: ['Contabilidad prepara todo para que el cliente pueda realizar el pago.'],
      },
      {
        actor: 'Cliente',
        text: [
          'El cliente recibe un e-mail informándole de que tiene disponible la línea de pago en su área de cliente.',
        ],
      },
      { actor: 'Cliente', text: ['El cliente realiza el pago.'] },
      {
        actor: 'Contabilidad',
        text: [
          'Contabilidad avisa a LOG mediante escalade para que modifiquen el tipo de entrega o realicen la gestión correspondiente.',
        ],
      },
    ],
    important: {
      title: 'Importante',
      text: 'No es necesario que pidáis respuesta al escalade. Contabilidad ya se encarga de todo lo demás.',
    },
  },

  appointment: {
    id: 'cita-de-entrega-fijada',
    title: '¡OJO! Cambio de tipo de entrega con cita fijada',
    navTitle: '¿El cliente ya tiene cita de entrega?',
    summary: 'Comprueba primero si faltan más o menos de 72 h',
    description: [
      'Si solicitamos cambios en el tipo de entrega y el cliente ya tiene una cita de entrega fijada, debemos ',
      strong('comprobar cuánto tiempo falta para la entrega'),
      '.',
    ],
    question: '¿Cuánto falta para la entrega?',
    scenarios: [
      {
        badge: '< 72 h',
        label: 'Escenario A',
        title: 'Si faltan menos de 72 horas para la entrega',
        tone: 'urgent',
        steps: [
          [
            strong('Antes de solicitar el pago a Contabilidad'),
            ', debemos pasar la solicitud a LOG para ',
            strong('anular la cita'),
            '.',
          ],
          ['Indicar el motivo de la anulación.'],
          [
            'LOG anulará la cita y después afectará el escalade a Contabilidad para solicitar el pago al cliente.',
          ],
          ['A partir de ahí, continúa el procedimiento habitual.'],
        ],
        order: ['Primero LOG', 'Después Contabilidad'],
        alert: {
          title: 'Comunicar al cliente',
          text: ['Hay que explicarle al cliente que su cita de entrega será anulada.'],
        },
      },
      {
        badge: '> 72 h',
        label: 'Escenario B',
        title: 'Si faltan más de 72 horas para la entrega',
        tone: 'normal',
        text: [
          'El procedimiento será el normal, pasando ',
          strong('primero por Contabilidad'),
          '.',
        ],
        order: ['Primero Contabilidad', 'Después el pago del cliente', 'Gestión de LOG'],
        alert: {
          title: '¡IMPORTANTE!',
          text: [
            'Es importante decir al cliente que tiene que hacer ',
            strong('el pago el mismo día'),
            ', en cuanto reciba la solicitud de pago.',
          ],
          note: 'Esto es necesario para evitar que se haga la entrega con un tipo de entrega diferente.',
        },
      },
    ],
  },
};
