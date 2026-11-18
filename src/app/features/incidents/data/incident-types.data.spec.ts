import { INCIDENT_TYPES } from './incident-types.data';

describe('INCIDENT_TYPES (transcription of the source documentation)', () => {
  it('contains the 18 incident types identified so far', () => {
    expect(INCIDENT_TYPES.length).toBe(18);
  });

  it('has unique, URL-safe ids', () => {
    const ids = INCIDENT_TYPES.map((incident) => incident.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('fills every field that exists in the source', () => {
    for (const incident of INCIDENT_TYPES) {
      expect(incident.nameEs.trim()).not.toBe('');
      expect(incident.nameFr.trim()).not.toBe('');
      expect(incident.openedBy.trim()).not.toBe('');
      expect(incident.concept.length).toBeGreaterThan(0);
      expect(incident.managedBy.length).toBeGreaterThan(0);
      for (const block of [...incident.concept, ...incident.managedBy]) {
        if (block.type !== 'pending') {
          expect(block.text.trim()).not.toBe('');
        }
      }
    }
  });

  it('keeps the 5 remaining cut-off fragments as pending (P3–P4), never guessed', () => {
    const pending = (id: string) => {
      const incident = INCIDENT_TYPES.find((item) => item.id === id);
      return [...(incident?.concept ?? []), ...(incident?.managedBy ?? [])].filter(
        (block) => block.type === 'pending',
      ).length;
    };
    const total = INCIDENT_TYPES.reduce((sum, incident) => sum + pending(incident.id), 0);
    expect(total).toBe(5);
    expect(pending('servicio-no-cumplido')).toBe(0); // P1 confirmed by the content owner
    expect(pending('pr2-rotura-de-stock')).toBe(0); // P2 confirmed, P4 line removed
    expect(pending('pr2-danado-durante-la-preparacion-en-almacen')).toBe(1); // P4
    expect(pending('pr2-no-conforme-en-la-descarga-del-contenedor')).toBe(1); // P4
    expect(pending('pr2-faltante-en-la-descarga-del-contenedor')).toBe(1); // P4
    expect(pending('pr2-no-localizado-en-el-transportista')).toBe(2); // P3 + P4
  });

  it('keeps #8 name as in the source, with its ⚠️ warning', () => {
    const pr8 = INCIDENT_TYPES.find((incident) => incident.code === 'PR8');
    expect(pr8?.nameEs).toBe('Anulación antes de la expedición');
    expect(pr8?.nameFr).toBe('Retractation APRES expedition');
    expect(pr8?.sourceWarning).toBe(
      'Este nombre se mantiene tal como figura en la documentación original y coincide con el de PR7 (Retractation AVANT expedition).',
    );
    expect(INCIDENT_TYPES.filter((incident) => incident.sourceWarning).length).toBe(1);
  });
});
