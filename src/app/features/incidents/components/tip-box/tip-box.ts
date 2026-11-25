import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideLightbulb } from '@lucide/angular';

/**
 * Informative blue box with a light bulb (tips, worked examples). Same shape as the "OJO"
 * note. Projected paragraphs are stacked with a small gap.
 */
@Component({
  selector: 'app-tip-box',
  imports: [LucideLightbulb],
  template: `
    <div class="tip" role="note">
      <svg lucideLightbulb class="tip__icon" [size]="17" aria-hidden="true"></svg>
      <div class="tip__body"><ng-content /></div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .tip {
      display: flex;
      gap: 10px;
      padding: 14px 16px;
      border: 1px solid var(--color-info-border);
      border-radius: var(--radius-md);
      background: var(--color-info-bg);
      color: var(--color-info-text);
      line-height: 1.6;
    }

    .tip__icon {
      margin-top: 3px;
      color: var(--color-info-icon);
    }

    .tip__body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipBox {}
