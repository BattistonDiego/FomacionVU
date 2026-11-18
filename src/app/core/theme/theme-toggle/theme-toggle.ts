import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LucideMoon, LucideSun } from '@lucide/angular';

import { ThemeService } from '../theme.service';

/**
 * Light/dark switch. The icon shows the mode the button switches TO (moon in light mode,
 * sun in dark mode), and the tooltip/label name that action.
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [LucideMoon, LucideSun],
  template: `
    <button
      type="button"
      class="toggle"
      [attr.aria-label]="label()"
      [attr.aria-pressed]="theme.isDark()"
      (click)="theme.toggle()"
    >
      @if (theme.isDark()) {
        <svg lucideSun [size]="19"></svg>
      } @else {
        <svg lucideMoon [size]="19"></svg>
      }
    </button>
    <span class="tooltip" aria-hidden="true">{{ label() }}</span>
  `,
  styleUrl: './theme-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  protected readonly label = computed(() =>
    this.theme.isDark() ? 'Activar modo claro' : 'Activar modo oscuro',
  );
}
