/**
 * Literal text split into segments so parts can be styled without rewriting the text.
 *
 * - `string`            → plain text.
 * - `{ highlight }`     → emphasised value (e.g. "50 %").
 * - `{ unconfirmed }`   → term kept exactly as received but pending confirmation
 *                         (shown with a visual flag, never corrected by guessing).
 * - `{ strong }`        → bold words inside a sentence.
 * - `{ code }`          → system value shown in monospace (e.g. "paiement").
 */
export type RichTextSegment =
  | string
  | { readonly highlight: string }
  | { readonly unconfirmed: string }
  | { readonly strong: string }
  | { readonly code: string };

export type RichText = readonly RichTextSegment[];

export type RichTextKind = 'plain' | 'highlight' | 'unconfirmed' | 'strong' | 'code';

export const highlight = (value: string): RichTextSegment => ({ highlight: value });

export const unconfirmed = (value: string): RichTextSegment => ({ unconfirmed: value });

export const strong = (value: string): RichTextSegment => ({ strong: value });

export const code = (value: string): RichTextSegment => ({ code: value });

export function segmentKind(segment: RichTextSegment): RichTextKind {
  if (typeof segment === 'string') {
    return 'plain';
  }
  if ('highlight' in segment) {
    return 'highlight';
  }
  if ('unconfirmed' in segment) {
    return 'unconfirmed';
  }
  return 'strong' in segment ? 'strong' : 'code';
}

export function segmentText(segment: RichTextSegment): string {
  if (typeof segment === 'string') {
    return segment;
  }
  if ('highlight' in segment) {
    return segment.highlight;
  }
  if ('unconfirmed' in segment) {
    return segment.unconfirmed;
  }
  return 'strong' in segment ? segment.strong : segment.code;
}

export function richTextToPlain(text: RichText): string {
  return text.map(segmentText).join('');
}

/** Terms flagged as pending confirmation inside a text. */
export function unconfirmedTerms(text: RichText): string[] {
  return text.flatMap((segment) =>
    segmentKind(segment) === 'unconfirmed' ? [segmentText(segment)] : [],
  );
}
