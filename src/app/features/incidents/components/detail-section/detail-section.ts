import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Extra section of the incident detail main column (e.g. refund or bonus rules): divider from
 * the block above, title in the same style as "Concepto" and the projected content.
 */
@Component({
  selector: 'app-detail-section',
  template: `
    <section class="section" [attr.aria-labelledby]="headingId()">
      <h2 class="section__title" [id]="headingId()">{{ heading() }}</h2>
      <ng-content />
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    // Divider from the "Concepto" block above.
    .section {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 18px;
      padding-top: 28px;
      border-top: 1px solid var(--color-border);
    }

    // Same style as "Concepto" (.section-title of the detail page).
    .section__title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-strong);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailSection {
  readonly heading = input.required<string>();
  /** Id of the title, referenced by `aria-labelledby`. Must be unique on the page. */
  readonly headingId = input.required<string>();
}
