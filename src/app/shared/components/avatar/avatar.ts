import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Circle with the first letter of the person's name. Purely informative (not interactive). */
@Component({
  selector: 'app-avatar',
  template: `{{ initials() }}`,
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    '[attr.aria-label]': 'name()',
    '[style.--avatar-size.px]': 'size()',
  },
})
export class Avatar {
  readonly name = input.required<string>();
  readonly size = input(32);

  protected readonly initials = computed(() => this.name().trim().charAt(0).toLocaleUpperCase('es-ES'));
}
