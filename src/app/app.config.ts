import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';
import { provideLucideConfig } from '@lucide/angular';

import { routes } from './app.routes';
import { AppTitleStrategy } from './core/title/app-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Route params and route data are bound to component inputs (e.g. `id`, `heading`).
    provideRouter(routes, withComponentInputBinding()),
    provideLucideConfig({ size: 18, strokeWidth: 1.75 }),
    // Same browser tab title ("SupportHub | Manual de Atención") on every route.
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
