import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideMinus, LucidePlus } from '@lucide/angular';

import { RefundScenario } from '../../../models/incident-type.model';

/** Before / after shipping cards. Not colour-only: keyword (ANTES/DESPUÉS) and +/− sign. */
@Component({
  selector: 'app-refund-scenarios',
  imports: [LucideMinus, LucidePlus],
  template: `
    @for (s of scenarios(); track $index) {
      <article class="scenario" [class.scenario--attention]="s.tone === 'attention'">
        <h3 class="scenario__title">
          {{ s.titleStart }}<span class="scenario__keyword">{{ s.titleKeyword }}</span
          >{{ s.titleEnd }}
        </h3>
        <p class="scenario__subtitle">{{ s.subtitle }}</p>

        <div class="outcome">
          <p class="outcome__head">
            <span class="outcome__value">{{ s.outcome }}</span>
            @if (s.badge) {
              <span class="outcome__badge">{{ s.badge }}</span>
            }
          </p>
          <p class="outcome__detail">
            @if (s.detailSign === 'plus') {
              <svg lucidePlus class="outcome__sign" [size]="15" aria-hidden="true"></svg>
              <span class="visually-hidden">Incluye:&ngsp;</span>
            } @else {
              <svg lucideMinus class="outcome__sign" [size]="15" aria-hidden="true"></svg>
              <span class="visually-hidden">Se descuenta:&ngsp;</span>
            }
            <span>{{ s.detail }}</span>
          </p>
        </div>
      </article>
    }
  `,
  styleUrl: './refund-scenarios.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundScenarios {
  readonly scenarios = input.required<readonly RefundScenario[]>();
}
