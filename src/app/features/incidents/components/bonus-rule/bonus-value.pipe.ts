import { Pipe, PipeTransform } from '@angular/core';

import { BonusValue } from '../../models/incident-type.model';
import { formatBonusValue } from '../../utils/format-bonus-value';

/** `{{ value | bonusValue }}` → "20 €" / "30 %" (Spanish format, from the value's `kind`). */
@Pipe({ name: 'bonusValue' })
export class BonusValuePipe implements PipeTransform {
  transform(value: BonusValue): string {
    return formatBonusValue(value);
  }
}
