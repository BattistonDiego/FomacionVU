import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

import { FilterOption } from '../../models/filter-option.model';

let nextId = 0;

/** Single-choice chip group with an "all" option. Two-way bindable: `[(selected)]`. */
@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.html',
  styleUrl: './filter-chips.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterChips {
  /** Visible label of the group (e.g. "¿Quién abre?"). */
  readonly label = input.required<string>();
  readonly options = input.required<readonly FilterOption[]>();
  readonly allLabel = input('Todas');
  readonly allCount = input<number>();
  /** `null` means "all". */
  readonly selected = model<string | null>(null);

  protected readonly labelId = `filter-chips-label-${nextId++}`;
}
