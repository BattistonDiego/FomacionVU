import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RichText, segmentKind, segmentText } from '../../models/rich-text.model';

/**
 * Renders a `RichText`: plain text, highlighted values, bold words, system codes and
 * unconfirmed terms. The template is kept on one line on purpose: whitespace between
 * segments would otherwise be rendered and alter the literal text (e.g. "'déo'" → "' déo '").
 */
@Component({
  selector: 'app-rich-text',
  // prettier-ignore
  template: `@for (segment of text(); track $index) {@switch (kind(segment)) {@case ('highlight') {<span class="rich-text__highlight">{{ value(segment) }}</span>}@case ('unconfirmed') {<span class="rich-text__unconfirmed" title="Término pendiente de confirmación">{{ value(segment) }}<span class="visually-hidden"> (término pendiente de confirmación)</span></span>}@case ('strong') {<strong class="rich-text__strong">{{ value(segment) }}</strong>}@case ('code') {<code class="rich-text__code">{{ value(segment) }}</code>}@default {<ng-container>{{ value(segment) }}</ng-container>}}}`,
  styleUrl: './rich-text.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextView {
  readonly text = input.required<RichText>();

  protected readonly kind = segmentKind;
  protected readonly value = segmentText;
}
