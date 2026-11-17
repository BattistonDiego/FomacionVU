import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LucideEllipsisVertical, LucideRefreshCw } from '@lucide/angular';

import { LayoutService } from '../../layout.service';
import { IDENTIFICATION_PATH } from '../../../user/user.guards';
import { USER_ROLE, UserSessionService } from '../../../user/user-session.service';
import { Avatar } from '../../../../shared/components/avatar/avatar';

/** User profile at the bottom of the sidebar, with the "Cambiar usuario" option. */
@Component({
  selector: 'app-user-menu',
  imports: [Avatar, LucideEllipsisVertical, LucideRefreshCw],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-collapsed]': 'collapsed()',
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'close(true)',
  },
})
export class UserMenu {
  /** Collapsed sidebar: only the avatar (name in a tooltip) and the menu button. */
  readonly collapsed = input(false);

  private readonly session = inject(UserSessionService);
  private readonly layout = inject(LayoutService);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  protected readonly role = USER_ROLE;
  protected readonly name = computed(() => this.session.name() ?? '');
  protected readonly open = signal(false);

  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly firstItem = viewChild<ElementRef<HTMLButtonElement>>('firstItem');

  protected toggle(): void {
    if (this.open()) {
      this.close();
      return;
    }
    this.open.set(true);
    afterNextRender(() => this.firstItem()?.nativeElement.focus(), { injector: this.injector });
  }

  protected close(focusTrigger = false): void {
    if (!this.open()) {
      return;
    }
    this.open.set(false);
    if (focusTrigger) {
      this.trigger().nativeElement.focus();
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  /** Forgets the saved name and goes back to the identification screen. */
  protected changeUser(): void {
    this.open.set(false);
    this.layout.closeMobileNav();
    this.session.clear();
    void this.router.navigate(['/', IDENTIFICATION_PATH]);
  }
}
