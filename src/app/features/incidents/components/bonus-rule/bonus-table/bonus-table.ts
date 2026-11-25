import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BonusTable } from '../../../models/incident-type.model';
import { BonusValuePipe } from '../bonus-value.pipe';

/**
 * Bonus table: two-level header (groups + delay sub-columns), one row per delivery type.
 * Scrolls horizontally on narrow screens. Value style comes from its `kind`, not its text.
 */
@Component({
  selector: 'app-bonus-table',
  imports: [BonusValuePipe],
  templateUrl: './bonus-table.html',
  styleUrl: './bonus-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BonusTableView {
  readonly table = input.required<BonusTable>();

  /** Group index of each value column, to colour and separate the groups. */
  protected groupOf(table: BonusTable, columnIndex: number): number {
    let start = 0;
    for (const [index, group] of table.groups.entries()) {
      start += group.columns.length;
      if (columnIndex < start) {
        return index;
      }
    }
    return table.groups.length - 1;
  }

  /** First column of a group (gets the vertical separator), except the first group. */
  protected startsGroup(table: BonusTable, columnIndex: number): boolean {
    return (
      columnIndex > 0 && this.groupOf(table, columnIndex) !== this.groupOf(table, columnIndex - 1)
    );
  }
}
