import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

/** Browser tab title of the application (also set in src/index.html for the first paint). */
export const APP_TITLE = 'SupportHub | Manual de Atención';

/**
 * Shows the application name on every route. Route-level `title` values are kept in the
 * route configs but are not displayed.
 */
@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(_snapshot: RouterStateSnapshot): void {
    this.title.setTitle(APP_TITLE);
  }
}
