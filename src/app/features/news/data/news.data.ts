import { News } from '../models/news.model';
import { emphasis, strong } from '../../../shared/models/rich-text.model';

/**
 * Announcements of the "Novedades" section, newest first is not required: NewsService sorts
 * them by `publishedAt`. To publish a new one, add an object with a unique `id` and `slug`.
 *
 * Content rules: texts exactly as given by the content owner. No real customer data on the
 * public site: names are reduced to initials and order numbers are masked.
 */
export const NEWS: readonly News[] = [
  {
    id: 'boton-recogida-2026-11',
    slug: 'boton-de-recogida-en-las-incidencias',
    title: 'Botón de “Recogida” en las incidencias',
    headline: 'Botón de “Recogida” en las incidencias: márcalo siempre antes de asignar a LOG',
    summary:
      '¡Hola equipo! Por favor, prestad mucha atención a este punto porque es prioritario para vuestro día a día con las recogidas (reprises).',
    publishedAt: '2026-11-24',
    priority: 'important',
    tags: ['Procedimiento', 'SC Madrid Tareas'],
    readingMinutes: 2,
    intro:
      '¡Hola equipo! Por favor, prestad mucha atención a este punto porque es prioritario para vuestro día a día con las recogidas (reprises).',
    sections: [
      {
        kind: 'rule',
        title: 'La regla',
        text: [
          'En cada incidencia que requiera una recogida, debéis seleccionar el ',
          strong('botón de recogida en el BO'),
          ', en la zona de abajo de la incidencia, ',
          emphasis('ANTES de asignar el caso a LOG'),
          '.',
        ],
        steps: [
          {
            title: 'Abre la incidencia en el BO',
            text: 'Comprueba que el caso es apto para Shop return.',
          },
          {
            title: 'Pincha el botón de recogida',
            mandatory: true,
            options: [
              { icon: 'pickup-only', label: 'Solo recogida' },
              { icon: 'pickup-and-resend', label: 'Recogida y nuevo envío' },
            ],
          },
          {
            title: 'Ahora sí: asigna a LOG',
            text: 'Nunca antes de haber hecho el clic de recogida.',
          },
        ],
      },
      {
        kind: 'comparison',
        title: '¿Por qué es tan importante?',
        text: [
          'Ese clic no es solo informativo: es lo que ',
          strong('activa automáticamente el Shop return'),
          ' y envía al cliente las instrucciones para devolver su paquete.',
        ],
        positive: {
          title: 'Con el clic de recogida',
          items: [
            'Marcas recogida en el BO',
            'Se activa el Shop return automáticamente',
            'El cliente recibe las instrucciones al momento',
          ],
        },
        negative: {
          title: 'Sin el clic',
          items: [
            'Se asigna a LOG sin marcar',
            'No sale nada al cliente',
            'Espera hasta que alguien de LOG lo haga manualmente',
          ],
        },
      },
      {
        kind: 'pair',
        cards: [
          {
            kind: 'example',
            eyebrow: 'Ejemplo real',
            // Masked on purpose (public site): no real customer data.
            title: 'Pedido Nº 2611••••17',
            subtitle: 'Clienta: E. T.',
            events: [
              { label: '05/11', text: 'Se asigna a LOG sin seleccionar la recogida.' },
              {
                label: '8 días de espera',
                text: 'La clienta vuelve a llamar enfadada para preguntar cómo hacer la devolución.',
                highlight: true,
              },
              { label: '13/11', text: 'Por fin sale el Shop return.' },
            ],
            note: 'Todo esto se habría evitado con un solo clic.',
          },
          {
            kind: 'metrics',
            eyebrow: '¿Cómo vamos?',
            title: 'Desde octubre, ¡genial en la gran mayoría!',
            metrics: [
              { value: '~92 %', label: 'casos bien marcados', tone: 'success' },
              { value: '~500', label: 'casos sin marcar (8 %)', tone: 'danger' },
            ],
            progress: { success: 92, danger: 8 },
            progressLabel: '92 % de casos bien marcados y 8 % sin marcar',
            text: 'Con los retrasos actuales en logística, esos clientes esperan innecesariamente.',
          },
        ],
      },
      {
        kind: 'reminder',
        title: 'Recordatorio clave',
        items: [
          {
            tone: 'do',
            text: [
              'Pinchar ',
              strong('siempre'),
              ' el botón de recogida en el BO en cuanto el caso sea apto para Shop return.',
            ],
          },
          {
            tone: 'dont',
            text: [strong('Nunca'), ' asignéis una recogida a LOG sin haber hecho ese clic antes.'],
          },
        ],
      },
    ],
  },
];
