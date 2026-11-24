const FORMAT = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/** "2026-11-24" → "24 nov 2026". Parsed as a local date (no timezone shift). */
export function formatNewsDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  return FORMAT.format(new Date(year, month - 1, day));
}
