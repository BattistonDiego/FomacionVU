import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideTriangleAlert } from '@lucide/angular';

import { ContentBlock } from '../../models/content-block.model';
import { PendingText } from '../pending-text/pending-text';

/**
 * Renders transcribed documentation blocks: literal text, highlighted notes ("OJO")
 * and pending fragments. `compact` is used in tables and side cards.
 */
@Component({
  selector: 'app-content-blocks',
  imports: [LucideTriangleAlert, PendingText],
  templateUrl: './content-blocks.html',
  styleUrl: './content-blocks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.compact]': 'variant() === "compact"' },
})
export class ContentBlocks {
  readonly blocks = input.required<readonly ContentBlock[]>();
  readonly variant = input<'body' | 'compact'>('body');
}
