import { IncidentType } from '../models/incident-type.model';
import { note, PENDING, text } from '../../../shared/models/content-block.model';

/**
 * Incident types transcribed from the original documentation (spreadsheet screenshot,
 * columns: Tipo de incidencia · Concepto · ¿Quién abre? · ¿Quién la va a gestionar?).
 *
 * Transcription rules (validated with the content owner):
 * - Text is literal. Only evident Spanish typos/accents are corrected; each correction is
 *   noted below as `fix: "source" → "interface"`.
 * - French names and system labels (COLIS ACEPTE OUI/NON, REENVIO, ANULACION, à Valider,
 *   Remboursement…) are kept exactly as in the source.
 * - Fragments cut off in the source are `PENDING`: never completed by guessing.
 * - Lines are joined only when the source cell wraps mid-sentence; otherwise each source
 *   line stays a separate block.
 *
 * STATUS: INCOMPLETE. Page 2 of the source (rows after #18) has not been verified yet.
 * Pending fragments to confirm: P3 (#18), P4 (#15–#18).
 */
export const INCIDENT_TYPES: readonly IncidentType[] = [
  // #1 — source: "Abimé (PR1) / Dañado"
  {
    id: 'pr1-danado',
    code: 'PR1',
    nameEs: 'Dañado',
    nameFr: 'Abimé',
    concept: [text('Artículo roto por acción externa Tela rota, golpe, producto roto...')],
    openedBy: 'SC/CLIENTE',
    // P6: the first line touches the top edge of the source cell — readable, to double-check.
    managedBy: [
      text('(COLIS ACEPTE OUI) SAV'),
      text('(COLIS ACEPTE NON + REENVIO) SUP SC'),
      text('(COLIS ACEPTE NON + ANULACION) LOG'),
    ],
  },

  // #2 — source: "Probleme de Qualité  (PR1) / Problema de Calidad"
  {
    id: 'pr1-problema-de-calidad',
    code: 'PR1',
    nameEs: 'Problema de Calidad',
    nameFr: 'Probleme de Qualité',
    concept: [
      text(
        'Defecto de Fabricación, el producto deja de funcionar, no se corresponde a las características anunciadas, no se puede montar, faltan piezas, silla coja, mal pintado...',
      ),
    ],
    openedBy: 'SC/CLIENTE',
    // P6: same as #1.
    managedBy: [
      text('(COLIS ACEPTE OUI) SAV'),
      text('(COLIS ACEPTE NON + REENVIO) SUP SC'),
      text('(COLIS ACEPTE NON + ANULACION) LOG'),
    ],
  },

  // #3 — source: "Erreur de Preparation (PR4) / Error de preparacion"
  // fix: "preparacion" → "preparación" · "angulo" → "ángulo"
  {
    id: 'pr4-error-de-preparacion',
    code: 'PR4',
    nameEs: 'Error de preparación',
    nameFr: 'Erreur de Preparation',
    concept: [
      text('No se corresponde con el producto solicitado o uno de los bultos no es correcto.'),
      text(
        'Por ejemplo, recibe el mismo paquete repetido o diferente color, ángulo dcho en vez izq.',
      ),
      text('recibe una mesa en lugar de un armario..'),
    ],
    openedBy: 'SC/CLIENTE',
    managedBy: [text('SUP SC/SAV + LOG')],
  },

  // #4 — source: "Colis manquant (PR4) / Paquete faltante"
  // fix: "no valido" → "no válido"
  {
    id: 'pr4-paquete-faltante',
    code: 'PR4',
    nameEs: 'Paquete faltante',
    nameFr: 'Colis manquant',
    concept: [
      text('Recibe al menos 1 bulto menos de los que conforman el producto.'),
      text('(no válido si el producto solo está compuesto de 1 bulto)'),
      text('Ejemplo: de un armario de 5 bultos solamente recibe 4 ó 3.'),
      note(
        'OJO si recibe 4 bultos correctos + 1 incorrecto no sería colis manquant sino Erreur de preparation',
      ),
    ],
    openedBy: 'SC/CLIENTE',
    managedBy: [text('SUP SC/SAV + LOG')],
  },

  // #5 — source: "Ne passe pas (PR3) / No pasa"
  // fix: "escaleras.O" → "escaleras. O"
  {
    id: 'pr3-no-pasa',
    code: 'PR3',
    nameEs: 'No pasa',
    nameFr: 'Ne passe pas',
    concept: [
      text(
        'El cliente no tuvo en cuenta las medidas de los paquetes que conforman el producto y al ir a hacer la entrega los paquetes no pasan por la puerta, ascensor/escaleras. O no hay espacio para montar',
      ),
    ],
    openedBy: 'SC/CLIENTE',
    managedBy: [text('LOG')],
  },

  // #6 — source: "Retard de Livraison (PR12) / Retraso en la entrega"
  {
    id: 'pr12-retraso-en-la-entrega',
    code: 'PR12',
    nameEs: 'Retraso en la entrega',
    nameFr: 'Retard de Livraison',
    concept: [
      text('El producto no ha sido entregado y ya se ha sobrepasado la fecha indicada al cliente.'),
      note('OJO solo podemos abrir esta incidencia siempre que el pedido tenga EDI.'),
    ],
    openedBy: 'SC/CLIENTE',
    managedBy: [text('LOG')],
  },

  // #7 — source: "Retractation AVANT expedition / Anulacion antes de la expedicion (PR7)"
  // fix: "Anulacion" → "Anulación" · "expedicion" → "expedición"
  {
    id: 'pr7-anulacion-antes-de-la-expedicion',
    code: 'PR7',
    nameEs: 'Anulación antes de la expedición',
    nameFr: 'Retractation AVANT expedition',
    concept: [
      text(
        'Anulación en la que el pedido aún no ha salido de nuestros almacenes, el cliente quiere anular el pedido porque no le gusta, no lo quiere, no le combina bien...',
      ),
      note('OJO: también se puede utilizar a veces para cambios en los que el pedido tenga EDI'),
    ],
    openedBy: 'SC/CLIENTE',
    managedBy: [text('EDI (LOG)'), text('NO EDI (Remboursement)')],
  },

  // #8 — source: "Retractation APRES expedition (PR8) Anulacion antes de la expedicion (PR8)"
  // fix: "Anulacion" → "Anulación" · "expedicion" → "expedición"
  // The Spanish name says "antes" although this is the APRES type. Kept exactly as in the
  // source by decision of the content owner, with a ⚠️ warning.
  {
    id: 'pr8-anulacion-antes-de-la-expedicion',
    code: 'PR8',
    nameEs: 'Anulación antes de la expedición',
    nameFr: 'Retractation APRES expedition',
    concept: [
      text(
        'Anulación en la que el pedido ya ha salido de nuestros almacenes, el cliente quiere anular el pedido porque no le gusta, no lo quiere, no le combina bien...',
      ),
      note('OJO: también se puede utilizar a veces para cambios en los que el pedido tenga EDI'),
    ],
    openedBy: 'SC/CLIENTE',
    managedBy: [text('(COLIS ACEPTE OUI) à Valider (SUP) + LOG'), text('(COLIS ACEPTE NON) LOG')],
    sourceWarning:
      'Este nombre se mantiene tal como figura en la documentación original y coincide con el de PR7 (Retractation AVANT expedition).',
  },

  // #9 — source: "Echange / Cambio (PR5)"
  // "(Ver requisitos para cambios)" refers to a document that was not provided: no link.
  {
    id: 'pr5-cambio',
    code: 'PR5',
    nameEs: 'Cambio',
    nameFr: 'Echange',
    concept: [
      text(
        'El cliente quiere cambiar uno de los productos (o todos). (Ver requisitos para cambios)',
      ),
      note('OJO: este tipo de incidencia solo la utilizamos cuando aún no se ha generado EDI'),
    ],
    openedBy: 'SC',
    managedBy: [text('à Valider (SUP)')],
  },

  // #10 — source: "Incident pièce detachée SAV/ Incidencia de pieza de repuesto" (no code)
  // fix: "peude" → "puede"
  {
    id: 'incidencia-de-pieza-de-repuesto',
    nameEs: 'Incidencia de pieza de repuesto',
    nameFr: 'Incident pièce detachée SAV',
    concept: [
      text(
        'Solamente se puede abrir sobre piezas de repuesto enviadas para solucionar incidencias',
      ),
      text(
        'Independientemente del problema que ocurra sobre la pieza reenviada (retraso, daño, pieza errónea...)',
      ),
    ],
    openedBy: 'SC/CLIENTE',
    managedBy: [text('SAV')],
  },

  // #11 — source: "Non avéré/ No comprobado" (no code)
  // fix: double space before "si hay algo" → single space
  {
    id: 'no-comprobado',
    nameEs: 'No comprobado',
    nameFr: 'Non avéré',
    concept: [
      text(
        'Solamente lo utilizamos cuando el cliente quiere hacer una anulación y ha habido alguna incidencia anterior en el producto en la que se haya gestionado algún reenvío, para que el supervisor revise antes de efectuar cualquier gestión si hay algo pendiente de recoger',
      ),
    ],
    openedBy: 'SC',
    managedBy: [text('SUP SC')],
  },

  // #12 — source: "Souffrance (PR6) / Sufrimiento"
  // fix: "SC/LOG/Automatica" → "SC/LOG/Automática"
  {
    id: 'pr6-sufrimiento',
    code: 'PR6',
    nameEs: 'Sufrimiento',
    nameFr: 'Souffrance',
    concept: [
      text(
        'Por algún error o falta del cliente se genera algún problema para la entrega del pedido.',
      ),
      text(
        'Por ejemplo el cliente no contesta a las llamadas del transportista, o no le pueden contactar porque el teléfono es erróneo, o algún dato de su dirección está mal y esto ha generado un problema para poder hacer la entrega.',
      ),
    ],
    openedBy: 'SC/LOG/AUTO',
    managedBy: [text('SC/LOG/Automática')],
  },

  // #13 — source: "Prestation non Respectée/ Servicio no cumplido" (no code)
  {
    id: 'servicio-no-cumplido',
    nameEs: 'Servicio no cumplido',
    nameFr: 'Prestation non Respectée',
    concept: [
      text('El transportista no ha respetado alguna de las prestaciones concertadas.'),
      text(
        'Por ejemplo, hora o día de la cita, no lo montan aunque el cliente contrató montaje...',
      ),
    ],
    openedBy: 'LOG',
    managedBy: [text('LOG')],
  },

  // #14 — source: "Rupture de stock (PR2) / Rotura de stock"
  {
    id: 'pr2-rotura-de-stock',
    code: 'PR2',
    nameEs: 'Rotura de stock',
    nameFr: 'Rupture de stock',
    concept: [
      text('No hay stock en el almacén'),
      text(
        'no coinciden las unidades del producto según el sistema con las que realmente hay físicamente',
      ),
    ],
    openedBy: 'LOG',
    managedBy: [text('LOG/SC')],
  },

  // #15 — source: "Abimé preparation entrepot (PR2) / Dañado durante la preparación en almacén"
  {
    id: 'pr2-danado-durante-la-preparacion-en-almacen',
    code: 'PR2',
    nameEs: 'Dañado durante la preparación en almacén',
    nameFr: 'Abimé preparation entrepot',
    concept: [text('Se daña el producto a la hora de preparar el envío')],
    openedBy: 'LOG',
    managedBy: [
      text('LOG/SC'),
      PENDING, // P4
    ],
  },

  // #16 — source: "Non conforme decharg TC (PR2) / No conforme en la descarga del contenedor"
  {
    id: 'pr2-no-conforme-en-la-descarga-del-contenedor',
    code: 'PR2',
    nameEs: 'No conforme en la descarga del contenedor',
    nameFr: 'Non conforme decharg TC',
    concept: [
      text(
        'El producto no se puede enviar porque no cumple con las características que el fabricante había anunciado',
      ),
    ],
    openedBy: 'LOG',
    managedBy: [
      text('LOG/SC'),
      PENDING, // P4
    ],
  },

  // #17 — source: "Absent Dechargement TC (PR2) / Faltante en la descarga del contenedor"
  {
    id: 'pr2-faltante-en-la-descarga-del-contenedor',
    code: 'PR2',
    nameEs: 'Faltante en la descarga del contenedor',
    nameFr: 'Absent Dechargement TC',
    concept: [
      text('Llega el contenedor del fabricante a nuestros almacenes pero este producto no viene.'),
    ],
    openedBy: 'LOG',
    managedBy: [
      text('LOG/SC'),
      PENDING, // P4
    ],
  },

  // #18 — source: "Absent chez le transporteur (PR2) / No localizado en el transportista"
  // fix: "trasnportista" → "transportista"
  {
    id: 'pr2-no-localizado-en-el-transportista',
    code: 'PR2',
    nameEs: 'No localizado en el transportista',
    nameFr: 'Absent chez le transporteur',
    concept: [
      text(
        'El producto ha salido de nuestros almacenes pero no llega a la delegación del transportista',
      ),
      PENDING, // P3: second line cut off in the source.
    ],
    openedBy: 'LOG',
    managedBy: [
      text('LOG/SC'),
      PENDING, // P4
    ],
  },
];
