import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ReasonIcon } from '../reason-icon/reason-icon';
import { EscalationText } from '../../models/additional-payment.model';
import { CopySnippet } from '../../../../shared/components/copy-snippet/copy-snippet';

/** Paso 3 — "Texto a escribir en el escalade según el motivo", with copyable examples. */
@Component({
  selector: 'app-escalade-texts',
  imports: [ReasonIcon, CopySnippet],
  template: `
    <h4 class="texts__title">{{ title() }}</h4>
    <ul class="texts card">
      @for (item of texts(); track item.reason) {
        <li class="text-row">
          <div class="text-row__name">
            <span class="text-row__icon"><app-reason-icon [reason]="item.reason" /></span>
            {{ item.title }}
          </div>
          <div class="text-row__body">
            @if (item.instruction) {
              <p class="text-row__instruction">{{ item.instruction }}</p>
              <p class="text-row__examples-label">Ejemplos</p>
            }
            <div class="text-row__examples">
              @for (example of item.examples; track example) {
                <app-copy-snippet [value]="example" />
              }
            </div>
          </div>
        </li>
      }
    </ul>
  `,
  styleUrl: './escalade-texts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EscaladeTexts {
  readonly title = input.required<string>();
  readonly texts = input.required<readonly EscalationText[]>();
}
