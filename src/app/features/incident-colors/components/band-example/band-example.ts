import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { IncidentColorCategory } from '../../models/incident-color.model';
import { swatchBackground } from '../../models/swatch-style';

/**
 * Schematic band of the incident list (prototype): one coloured row per status.
 * The texts of the real screenshots are illegible in the source, so cells are placeholders.
 */
@Component({
  selector: 'app-band-example',
  templateUrl: './band-example.html',
  styleUrl: './band-example.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandExample {
  readonly category = input.required<IncidentColorCategory>();

  protected readonly background = computed(() => swatchBackground(this.category().swatch));
  /** One row per status; a single unlabeled row when the documentation lists none. */
  protected readonly rows = computed(() => {
    const labels = this.category().roles.map((role) => role.label);
    return labels.length ? labels : [''];
  });
}
