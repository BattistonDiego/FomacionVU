/**
 * Literal text split into segments so parts can be styled without rewriting the text.
 *
 * - `string`            → plain text.
 * - `{ highlight }`     → emphasised value (e.g. "50 %").
 * - `{ unconfirmed }`   → term kept exactly as received but pending confirmation
 *                         (shown with a visual flag, never corrected by guessing).
 */
export type RichTextSegment =
  | string
  | { readonly highlight: string }
  | { readonly unconfirmed: string };

export type RichText = readonly RichTextSegment[];

export const highlight = (value: string): RichTextSegment => ({ highlight: value });

export const unconfirmed = (value: string): RichTextSegment => ({ unconfirmed: value });

export function richTextToPlain(text: RichText): string {
  return text
    .map((segment) =>
      typeof segment === 'string'
        ? segment
        : 'highlight' in segment
          ? segment.highlight
          : segment.unconfirmed,
    )
    .join('');
}

/** Terms flagged as pending confirmation inside a text. */
export function unconfirmedTerms(text: RichText): string[] {
  return text.flatMap((segment) =>
    typeof segment !== 'string' && 'unconfirmed' in segment ? [segment.unconfirmed] : [],
  );
}
