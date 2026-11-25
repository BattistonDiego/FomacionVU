import { TestBed } from '@angular/core/testing';

import { IncidentTypesService } from './incident-types.service';

describe('IncidentTypesService', () => {
  let service: IncidentTypesService;
  const names = (items: readonly { nameEs: string }[]) => items.map((item) => item.nameEs);

  beforeEach(() => {
    service = TestBed.inject(IncidentTypesService);
  });

  it('returns every incident type for an empty query', () => {
    expect(service.search('').length).toBe(18);
    expect(service.search('   ').length).toBe(18);
  });

  it('ignores accents and case', () => {
    expect(names(service.search('PREPARACION'))).toContain('Error de preparación');
    expect(names(service.search('abime'))).toEqual([
      'Dañado',
      'Dañado durante la preparación en almacén',
    ]);
  });

  it('searches the French name, the concept and the responsibilities', () => {
    expect(names(service.search('colis manquant'))).toContain('Paquete faltante');
    expect(names(service.search('silla coja'))).toEqual(['Problema de Calidad']);
    expect(names(service.search('Remboursement'))).toEqual(['Anulación antes de la expedición']);
  });

  it('searches the refund rule section (scenarios, highlights, steps, chips and tip)', () => {
    const codes = (query: string) => service.search(query).map((item) => item.code);
    // PR12 also matches: its bonus section says "no hacemos reembolsos" and talks about the
    // "gastos de envío" and the "valor del producto".
    expect(codes('reembolso')).toEqual(['PR12', 'PR7']);
    expect(codes('gastos de envío')).toEqual(['PR12', 'PR7']);
    expect(codes('reembolso total')).toEqual(['PR7']);
    expect(codes('desea anular')).toEqual(['PR7']);
    expect(codes('reclamaciones')).toEqual(['PR7']);
    // Internal values of the model are not indexed.
    expect(codes('attention')).toEqual([]);
    expect(codes('minus')).toEqual([]);
  });

  it('searches the bonus rule section (notice, criteria, table and examples)', () => {
    const codes = (query: string) => service.search(query).map((item) => item.code);
    expect(codes('bono')).toEqual(['PR12']);
    expect(codes('Messagerie')).toEqual(['PR12']);
    expect(codes('no hacemos reembolsos')).toEqual(['PR12']);
    expect(codes('tiempo de retraso')).toEqual(['PR12']);
    expect(codes('importe fijo')).toEqual(['PR12']);
    // Internal values of the model are not indexed.
    expect(codes('percent')).toEqual([]);
    expect(codes('shipping')).toEqual([]);
  });

  it('requires every term to match', () => {
    expect(names(service.search('cambiar EDI'))).toEqual(['Cambio']);
  });

  it('matches the beginning of words, so "EDI" does not match "pedido" or "expedición"', () => {
    expect(service.search('EDI').map((item) => item.code)).toEqual(['PR12', 'PR7', 'PR8', 'PR5']);
  });

  it('matches codes exactly, so PR1 does not return PR12', () => {
    expect(service.search('PR1').map((item) => item.code)).toEqual(['PR1', 'PR1']);
    expect(service.search('pr12').map((item) => item.code)).toEqual(['PR12']);
    expect(service.search('PR2').length).toBe(5);
  });

  it('filters by "¿Quién abre?"', () => {
    const all = service.getAll();
    expect(service.filterByOpenedBy(all, 'LOG').length).toBe(6);
    expect(service.filterByOpenedBy(all, null).length).toBe(18);
  });

  it('lists the "¿Quién abre?" values, most frequent first, counted within a scope', () => {
    expect(service.getOpenedByOptions()).toEqual([
      { value: 'SC/CLIENTE', label: 'SC/CLIENTE', count: 9 },
      { value: 'LOG', label: 'LOG', count: 6 },
      { value: 'SC', label: 'SC', count: 2 },
      { value: 'SC/LOG/AUTO', label: 'SC/LOG/AUTO', count: 1 },
    ]);
    const counts = service.getOpenedByOptions(service.search('EDI')).map((option) => option.count);
    expect(counts).toEqual([3, 0, 1, 0]);
  });

  it('finds an incident by id', () => {
    expect(service.getById('pr5-cambio')?.nameFr).toBe('Echange');
    expect(service.getById('does-not-exist')).toBeUndefined();
    expect(service.getById(null)).toBeUndefined();
  });
});
