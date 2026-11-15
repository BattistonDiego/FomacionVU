/**
 * Lower-cases, strips accents and collapses whitespace so that
 * "preparacion" matches "preparación" and "ABIME" matches "Abimé".
 */
export function normalizeForSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalized words of a text. Punctuation and separators such as "/" split words,
 * so "SC/CLIENTE" yields ["sc", "cliente"].
 */
export function tokenize(value: string): string[] {
  return normalizeForSearch(value)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/**
 * True when every query term is the beginning of some word of the text.
 * Prefix matching avoids false positives such as "edi" inside "pedido".
 */
export function matchesAllTermsByPrefix(words: readonly string[], terms: readonly string[]): boolean {
  return terms.every((term) => words.some((word) => word.startsWith(term)));
}
