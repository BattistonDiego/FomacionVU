import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideMessageSquareText } from '@lucide/angular';

/** SupportHub logo + name. Links to the start route. */
@Component({
  selector: 'app-brand',
  imports: [RouterLink, LucideMessageSquareText],
  template: `
    <a routerLink="/" class="brand" aria-label="SupportHub">
      <span class="brand__logo"
        ><svg lucideMessageSquareText [size]="18" [strokeWidth]="2"></svg
      ></span>
      @if (showName()) {
        <span class="brand__name">SupportHub</span>
      }
    </a>
  `,
  styleUrl: './brand.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Brand {
  readonly showName = input(true);
}
