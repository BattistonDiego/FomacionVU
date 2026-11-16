import { INCIDENT_COLOR_CATEGORIES, INCIDENT_COLOR_GROUPS } from './incident-colors.data';

describe('INCIDENT_COLORS (transcription of the "Colores incidencias" documentation)', () => {
  const byId = (id: string) => INCIDENT_COLOR_CATEGORIES.find((c) => c.id === id)!;

  it('has the 10 colours in the order of the documentation', () => {
    expect(INCIDENT_COLOR_CATEGORIES.map((c) => c.title)).toEqual([
      'Verdes SC y SUP SC',
      'Azul SAV y SUP SAV',
      'Salmón LOG y SUP Log',
      'Salmón oscuro. Transporteur (Transportista)',
      'Fucsia. Reprise (Recogidas)',
      'Morado. Contabilidad',
      'Gris. Remboursement (Reembolso)',
      'Gris con rayas. Cliente',
      'Appros. Marrón',
      'Administrador',
    ]);
    expect(new Set(INCIDENT_COLOR_CATEGORIES.map((c) => c.id)).size).toBe(10);
  });

  it('uses the colours measured on the documentation bands', () => {
    expect(INCIDENT_COLOR_CATEGORIES.map((c) => c.swatch.hex)).toEqual([
      '#D8E4BC', '#B8CCE4', '#E6B8B7', '#DC9B9A', '#F67FB6',
      '#CCC0DA', '#D9D9D9', '#F5F5F5', '#C4BD97', '#FCD5B4',
    ]);
    expect(byId('gris-con-rayas-cliente').swatch.stripeHex).toBe('#E8E8E8');
  });

  it('associates each status with its colour', () => {
    expect(INCIDENT_COLOR_CATEGORIES.map((c) => c.roles.map((r) => r.label))).toEqual([
      ['SC', 'SUP SC'],
      ['SAV', 'SUP SAV'],
      ['LOG', 'SUP LOG'],
      ['Transporteur'],
      ['Reprise'],
      ['Echange'],
      ['Remboursement'],
      ['Client'],
      ['APPROS'],
      [],
    ]);
  });

  it('marks "afectamos" only where the text says it explicitly', () => {
    const rules = INCIDENT_COLOR_CATEGORIES.flatMap((c) =>
      c.roles.map((r) => `${r.label}:${r.assignment ?? '-'}`),
    );
    expect(rules).toEqual([
      'SC:-', 'SUP SC:afectamos', 'SAV:-', 'SUP SAV:-', 'LOG:-', 'SUP LOG:no-afectamos',
      'Transporteur:no-afectamos', 'Reprise:no-afectamos', 'Echange:no-afectamos',
      'Remboursement:afectamos', 'Client:no-afectamos', 'APPROS:no-afectamos',
    ]);
  });

  it('keeps the Reprise exception and adds no description to Administrador', () => {
    expect(byId('fucsia-reprise').roles[0].exception).toBe(
      'Afectamos aquí las incidencias cuando facilitamos la etiqueta en los Colis postal (GLS) y queda a la espera de envío por parte del cliente.',
    );
    expect(byId('administrador').roles).toEqual([]);
  });

  it('groups LOG, Transporteur and Reprise under "Bloque rosas"', () => {
    const rosas = INCIDENT_COLOR_GROUPS.find((g) => g.title === 'Bloque rosas')!;
    expect(rosas.categories.map((c) => c.shortLabel)).toEqual(['Salmón LOG y SUP Log', 'Transporteur', 'Reprise']);
  });
});
