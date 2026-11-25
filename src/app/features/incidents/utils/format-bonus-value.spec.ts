import { formatBonusValue } from './format-bonus-value';

describe('formatBonusValue', () => {
  // Spanish format: no-break space (U+00A0) between the number and the symbol.
  it('formats fixed amounts in euros', () => {
    expect(formatBonusValue({ kind: 'fixed', value: 20 })).toBe('20 €');
    expect(formatBonusValue({ kind: 'fixed', value: 12.5 })).toBe('12,5 €');
  });

  it('formats percentages', () => {
    expect(formatBonusValue({ kind: 'percent', value: 30 })).toBe('30 %');
    expect(formatBonusValue({ kind: 'percent', value: 40 })).toBe('40 %');
  });
});
