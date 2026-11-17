/**
 * Collects every string value inside a data structure (objects, arrays, rich-text segments).
 * Used to index module content for search without coupling to each module's data shape.
 */
export function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) {
      collectStrings(item, out);
    }
  } else if (value && typeof value === 'object') {
    for (const item of Object.values(value)) {
      collectStrings(item, out);
    }
  }
  return out;
}
