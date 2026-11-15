import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideLucideConfig } from '@lucide/angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Route params and route data are bound to component inputs (e.g. `id`, `heading`).
    provideRouter(routes, withComponentInputBinding()),
    provideLucideConfig({ size: 18, strokeWidth: 1.75 }),
  ],
};
