import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RichText, RichTextSegment } from '../../models/rich-text.model';

type SegmentKind = 'plain' | 'highlight' | 'unconfirmed';

/**
 * Renders a `RichText`: plain text, highlighted values and unconfirmed terms.
 * The template is kept on one line on purpose: whitespace between segments would
 * otherwise be rendered and alter the literal text (e.g. "'déo'" → "' déo '").
 */
@Component({
  selector: 'app-rich-text',
  // prettier-ignore
  template: `@for (segment of text(); track $index) {@switch (kind(segment)) {@case ('highlight') {<span class="rich-text__highlight">{{ value(segment) }}</span>}@case ('unconfirmed') {<span class="rich-text__unconfirmed" title="Término pendiente de confirmación">{{ value(segment) }}<span class="visually-hidden"> (término pendiente de confirmación)</span></span>}@default {<ng-container>{{ value(segment) }}</ng-container>}}}`,
  styleUrl: './rich-text.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextView {
  readonly text = input.required<RichText>();

  protected kind(segment: RichTextSegment): SegmentKind {
    if (typeof segment === 'string') {
      return 'plain';
    }
    return 'highlight' in segment ? 'highlight' : 'unconfirmed';
  }

  protected value(segment: RichTextSegment): string {
    if (typeof segment === 'string') {
      return segment;
    }
    return 'highlight' in segment ? segment.highlight : segment.unconfirmed;
  }
}
