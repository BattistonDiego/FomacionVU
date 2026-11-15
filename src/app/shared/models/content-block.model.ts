/**
 * A piece of text transcribed from the original documentation.
 *
 * - `text`    → literal text (only evident Spanish typos/accents are corrected).
 * - `note`    → literal text shown as a highlighted caution (e.g. sentences starting with "OJO").
 * - `pending` → a fragment that is cut off or illegible in the source. It is never completed
 *               by guessing: the UI shows a "pending confirmation" notice instead.
 *
 * Any module that renders documentation (incidents, glossary, procedures…) can reuse this type
 * together with the shared `<app-content-blocks>` component.
 */
export type ContentBlock =
  | { readonly type: 'text'; readonly text: string }
  | { readonly type: 'note'; readonly text: string }
  | { readonly type: 'pending' };

export const text = (value: string): ContentBlock => ({ type: 'text', text: value });

export const note = (value: string): ContentBlock => ({ type: 'note', text: value });

export const PENDING: ContentBlock = { type: 'pending' };

/** Readable text of the blocks (pending fragments contribute nothing). */
export function blocksToPlainText(blocks: readonly ContentBlock[]): string {
  return blocks
    .map((block) => (block.type === 'pending' ? '' : block.text))
    .filter(Boolean)
    .join(' ');
}

/** First literal text block, used for short previews. */
export function firstTextBlock(blocks: readonly ContentBlock[]): string | undefined {
  for (const block of blocks) {
    if (block.type === 'text') {
      return block.text;
    }
  }
  return undefined;
}
