import { IncidentColorCategory, IncidentColorGroup } from '../models/incident-color.model';

/**
 * "Colores incidencias" — transcribed from the original documentation (2 pages).
 *
 * Rules:
 * - Text is literal. Only evident Spanish typos are corrected (noted as `fix:`).
 * - French terms are kept as written (Echange, Remboursement, Client, APPROS, PB Qualité,
 *   colis accepté oui, Colis postal…).
 * - The "□" glyph after each label in the source (a broken arrow symbol) is not reproduced:
 *   the label and its description are shown as separate elements.
 * - Hex colours were measured on the bands of the documentation screenshots.
 * - `assignment` is set only where the text says it explicitly
 *   ("Aquí podemos afectar…" / "Nosotros no afectamos incidencias aquí").
 * - The text inside the screenshot bands (Affecté à, Statut…) is illegible in the source and is
 *   not transcribed; the UI shows a schematic band instead.
 */

const verdes: IncidentColorCategory = {
  id: 'verdes-sc-y-sup-sc',
  title: 'Verdes SC y SUP SC',
  shortLabel: 'Verdes SC y SUP SC',
  colorName: 'Verde',
  swatch: { hex: '#D8E4BC' },
  roles: [
    {
      label: 'SC',
      description:
        'Aquí encontraremos incidencias en las que hay que hablar con el cliente en busca de alguna información o para ofrecerle soluciones a su incidencia.',
    },
    {
      label: 'SUP SC',
      description:
        'Aquí podemos afectar incidencias para recoger un producto ya entregado, aquellas en las que tras una semana no conseguimos localizar al cliente, otras en las que es necesario revisar por el supervisor para autorizar gestiones excepcionales…',
      assignment: 'afectamos',
    },
  ],
};

const azul: IncidentColorCategory = {
  id: 'azul-sav-y-sup-sav',
  title: 'Azul SAV y SUP SAV',
  shortLabel: 'Azul SAV y SUP SAV',
  colorName: 'Azul',
  swatch: { hex: '#B8CCE4' },
  roles: [
    {
      label: 'SAV',
      // fix: "ósea" → "o sea". "p.r." kept as written (abbreviation not confirmed).
      description:
        'Incidencias a analizar por SAV (postventa), o sea Abimés o PB Qualité + colis accepté oui (imprescindibles fotos p.r. +300€)',
    },
    {
      label: 'SUP SAV',
      // fix: "cual de las soluciones" → "cuál de las soluciones"
      description:
        'Aquellas incidencias en las que el cliente, tras el análisis y propuestas de SAV ya ha indicado cuál de las soluciones quiere elegir (reenvío, gesto comercial, anulación…)',
    },
  ],
};

const salmon: IncidentColorCategory = {
  id: 'salmon-log-y-sup-log',
  title: 'Salmón LOG y SUP Log',
  shortLabel: 'Salmón LOG y SUP Log',
  colorName: 'Salmón',
  swatch: { hex: '#E6B8B7' },
  roles: [
    {
      label: 'LOG',
      description:
        'Aquí pasamos por ejemplo si queremos que LOG reclame algo a la empresa de transporte, anulaciones o cambios en las que ya hay EDI…',
    },
    {
      label: 'SUP LOG',
      description:
        'Nosotros no afectamos incidencias aquí, todo lo que queremos que LOG gestione lo tenemos que afectar a LOG. Esto es solo para su propia organización.',
      assignment: 'no-afectamos',
    },
  ],
};

const transporteur: IncidentColorCategory = {
  id: 'salmon-oscuro-transporteur',
  title: 'Salmón oscuro. Transporteur (Transportista)',
  shortLabel: 'Transporteur',
  colorName: 'Salmón oscuro',
  swatch: { hex: '#DC9B9A' },
  roles: [
    {
      label: 'Transporteur',
      description:
        'Nosotros no afectamos incidencias aquí. Aquí deja LOG las incidencias una vez que ya han reclamado a la empresa de transporte y está a la espera de que les conteste.',
      assignment: 'no-afectamos',
    },
  ],
};

const reprise: IncidentColorCategory = {
  id: 'fucsia-reprise',
  title: 'Fucsia. Reprise (Recogidas)',
  shortLabel: 'Reprise',
  colorName: 'Fucsia',
  swatch: { hex: '#F67FB6' },
  roles: [
    {
      label: 'Reprise',
      // fix: double space after "aquí." → single space
      description:
        'Nosotros no afectamos incidencias aquí. Aquí deja LOG afectadas, aquellas incidencias en las que hay que recoger un producto de casa del cliente y ya se ha dado la orden al transportista. A la espera de que sea recogido y se lo confirmen.',
      assignment: 'no-afectamos',
      exception:
        'Afectamos aquí las incidencias cuando facilitamos la etiqueta en los Colis postal (GLS) y queda a la espera de envío por parte del cliente.',
    },
  ],
};

const contabilidad: IncidentColorCategory = {
  id: 'morado-contabilidad',
  title: 'Morado. Contabilidad',
  shortLabel: 'Contabilidad',
  colorName: 'Morado',
  swatch: { hex: '#CCC0DA' },
  roles: [
    {
      label: 'Echange',
      description:
        'Nosotros no afectamos incidencias aquí, pero podemos encontrar incidencias si el cliente ha solicitado un cambio de producto que aún se está gestionando',
      assignment: 'no-afectamos',
    },
  ],
};

const remboursement: IncidentColorCategory = {
  id: 'gris-remboursement',
  title: 'Gris. Remboursement (Reembolso)',
  shortLabel: 'Remboursement',
  colorName: 'Gris',
  swatch: { hex: '#D9D9D9' },
  roles: [
    {
      label: 'Remboursement',
      description:
        'Aquí podemos afectar incidencias de anulación sin EDI. También podemos encontrar otro tipo de anulaciones en las que ya se haya parado el envío o recogido el producto.',
      assignment: 'afectamos',
    },
  ],
};

const cliente: IncidentColorCategory = {
  id: 'gris-con-rayas-cliente',
  title: 'Gris con rayas. Cliente',
  shortLabel: 'Cliente',
  colorName: 'Gris con rayas',
  // Measured on the documentation: light grey stripes (not the solid grey of Remboursement).
  swatch: { hex: '#F5F5F5', stripeHex: '#E8E8E8' },
  roles: [
    {
      label: 'Client',
      description:
        'Nosotros no afectamos incidencias aquí. Podemos encontrar incidencias de SAV en las que están a la espera de una decisión del cliente, o cambios en los que el cliente tiene que hacer un pago y estamos a la espera.',
      assignment: 'no-afectamos',
    },
  ],
};

const appros: IncidentColorCategory = {
  id: 'appros-marron',
  title: 'Appros. Marrón',
  shortLabel: 'Appros.',
  colorName: 'Marrón',
  swatch: { hex: '#C4BD97' },
  roles: [
    {
      label: 'APPROS',
      description:
        'Nosotros no afectamos incidencias aquí. Podemos encontrar incidencias de SAV en las que han solicitado como solución el envío de una pieza suelta y se está gestionando.',
      assignment: 'no-afectamos',
    },
  ],
};

const administrador: IncidentColorCategory = {
  id: 'administrador',
  title: 'Administrador',
  shortLabel: 'Administrador',
  colorName: 'Naranja',
  swatch: { hex: '#FCD5B4' },
  // The documentation only shows the heading and an example band: no description.
  roles: [],
};

export const INCIDENT_COLOR_GROUPS: readonly IncidentColorGroup[] = [
  { categories: [verdes, azul] },
  {
    title: 'Bloque rosas',
    note: 'Todo relacionado con envíos, recogidas, reclamaciones a transportista…',
    categories: [salmon, transporteur, reprise],
  },
  { categories: [contabilidad, remboursement, cliente, appros, administrador] },
];

export const INCIDENT_COLOR_CATEGORIES: readonly IncidentColorCategory[] =
  INCIDENT_COLOR_GROUPS.flatMap((group) => group.categories);
