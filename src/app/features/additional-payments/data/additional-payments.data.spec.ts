import { ADDITIONAL_PAYMENTS } from './additional-payments.data';
import { richTextToPlain } from '../../../shared/models/rich-text.model';

describe('ADDITIONAL_PAYMENTS (procedure provided by the content owner)', () => {
  const { procedure, after, appointment } = ADDITIONAL_PAYMENTS;

  it('keeps the three steps in order', () => {
    expect([
      procedure.calculate.title,
      procedure.paymentLine.title,
      procedure.escalade.title,
    ]).toEqual(['Calcular el importe', 'Añadir la línea de pago', 'Abrir escalade a Contabilidad']);
  });

  it('describes how to calculate each amount', () => {
    expect(
      procedure.calculate.cases.map((c) => [c.title, c.qualifier ?? '', c.description]),
    ).toEqual([
      ['Cambio de tipo de entrega', '(LC → LS)', 'Restando la diferencia de precio.'],
      [
        'Coste de almacenaje',
        '',
        'Preguntando por escalade a LOG cuánto costaría el almacenaje durante el tiempo que solicite el cliente.',
      ],
      [
        'Coste de segunda entrega',
        '',
        'El coste de entrega LC de los productos que compró el cliente.',
      ],
    ]);
  });

  it('shows the system path, the assignee and the subject', () => {
    expect(procedure.paymentLine.path.map((item) => item.label)).toEqual([
      'Modificaciones',
      'Añadir un producto',
      'Gastos…',
    ]);
    expect(procedure.escalade.assignTo).toBe('Compta');
    expect(procedure.escalade.subject).toBe('paiement');
  });

  it('keeps the escalade texts and values exactly as given', () => {
    expect(procedure.escalade.texts.map((t) => [t.title, ...t.examples])).toEqual([
      ['Cambio de tipo de entrega', 'LM 36', 'LS 7'],
      ['Segunda entrega', 'deuxième livraison 98,99'],
      ['Costes de almacenaje', 'frais de stockage 37,40'],
    ]);
  });

  it('lists the 5 steps after the escalade and the "Importante" note', () => {
    expect(after.steps.map((s) => s.actor)).toEqual([
      'Agente',
      'Contabilidad',
      'Cliente',
      'Cliente',
      'Contabilidad',
    ]);
    expect(after.important.text).toBe(
      'No es necesario que pidáis respuesta al escalade. Contabilidad ya se encarga de todo lo demás.',
    );
  });

  it('does not mix up the < 72 h and > 72 h procedures', () => {
    const [a, b] = appointment.scenarios;
    expect(a.badge).toBe('< 72 h');
    expect(a.order).toEqual(['Primero LOG', 'Después Contabilidad']);
    expect(richTextToPlain(a.steps![0])).toContain(
      'debemos pasar la solicitud a LOG para anular la cita',
    );
    expect(richTextToPlain(a.alert.text)).toBe(
      'Hay que explicarle al cliente que su cita de entrega será anulada.',
    );

    expect(b.badge).toBe('> 72 h');
    expect(b.order).toEqual([
      'Primero Contabilidad',
      'Después el pago del cliente',
      'Gestión de LOG',
    ]);
    expect(richTextToPlain(b.alert.text)).toBe(
      'Es importante decir al cliente que tiene que hacer el pago el mismo día, en cuanto reciba la solicitud de pago.',
    );
    expect(b.alert.note).toBe(
      'Esto es necesario para evitar que se haga la entrega con un tipo de entrega diferente.',
    );
  });
});
