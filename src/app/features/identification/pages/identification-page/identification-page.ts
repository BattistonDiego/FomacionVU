import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowRight, LucideMessageSquareText, LucideUser } from '@lucide/angular';

import { ThemeToggle } from '../../../../core/theme/theme-toggle/theme-toggle';
import {
  USER_NAME_MAX_LENGTH,
  UserSessionService,
  normalizeUserName,
} from '../../../../core/user/user-session.service';

/** First screen: asks for the user's name and saves it (no authentication). */
@Component({
  selector: 'app-identification-page',
  imports: [LucideArrowRight, LucideMessageSquareText, LucideUser, ThemeToggle],
  templateUrl: './identification-page.html',
  styleUrl: './identification-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentificationPage {
  private readonly session = inject(UserSessionService);
  private readonly router = inject(Router);
  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  protected readonly maxLength = USER_NAME_MAX_LENGTH;
  protected readonly name = signal('');
  /** Disabled while empty or only spaces. */
  protected readonly canEnter = computed(() => normalizeUserName(this.name()) !== '');

  constructor() {
    afterNextRender(() => this.field().nativeElement.focus());
  }

  protected onInput(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }

  /** Button click or Enter in the field. */
  protected enter(event: Event): void {
    event.preventDefault();
    if (this.session.identify(this.name())) {
      void this.router.navigate(['/']);
    }
  }
}
