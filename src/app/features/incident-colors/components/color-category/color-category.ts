import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideArrowDownToLine, LucideBan, LucideTriangleAlert } from '@lucide/angular';

import { BandExample } from '../band-example/band-example';
import { IncidentColorCategory } from '../../models/incident-color.model';
import { swatchBackground, swatchCode } from '../../models/swatch-style';

/**
 * One colour of the documentation (prototype): swatch + band example on the left,
 * the explanation of each status on the right, aligned in two columns.
 */
@Component({
  selector: 'app-color-category',
  imports: [BandExample, LucideArrowDownToLine, LucideBan, LucideTriangleAlert],
  templateUrl: './color-category.html',
  styleUrl: './color-category.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.--category-color]': 'category().swatch.stripeHex ?? category().swatch.hex' },
})
export class ColorCategory {
  readonly category = input.required<IncidentColorCategory>();

  protected readonly background = computed(() => swatchBackground(this.category().swatch));
  protected readonly code = computed(() => swatchCode(this.category().swatch));
  protected readonly titleId = computed(() => `${this.category().id}-title`);
}
