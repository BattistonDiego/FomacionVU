import { BonusValue } from '../models/incident-type.model';

const EUROS = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const PERCENT = new Intl.NumberFormat('es-ES', { style: 'percent', maximumFractionDigits: 2 });

/** Spanish format of a bonus value: "20 €" or "30 %" (no-break space before the symbol). */
export function formatBonusValue({ kind, value }: BonusValue): string {
  return kind === 'fixed' ? EUROS.format(value) : PERCENT.format(value / 100);
}
