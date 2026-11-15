import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { Header } from '../header/header';
import { LayoutService } from '../layout.service';
import { Sidebar } from '../sidebar/sidebar';

/** Application frame: sidebar + top bar + routed content. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-collapsed]': 'layout.sidebarCollapsed()',
    '(document:keydown.escape)': 'layout.closeMobileNav()',
  },
})
export class Shell {
  protected readonly layout = inject(LayoutService);
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    let previousPath = '';
    const subscription = inject(Router)
      .events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.layout.closeMobileNav();
        // Scroll to top only when the page changes, not when only the query string
        // changes (e.g. while typing in the incident search).
        const path = event.urlAfterRedirects.split(/[?#]/)[0];
        if (previousPath && path !== previousPath) {
          globalThis.scrollTo?.({ top: 0 });
        }
        previousPath = path;
      });
    inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
  }

  protected skipToContent(): void {
    this.main().nativeElement.focus();
  }
}
