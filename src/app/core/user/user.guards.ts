import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserSessionService } from './user-session.service';

/** Route of the identification screen. */
export const IDENTIFICATION_PATH = 'identificacion';

/** Internal pages: without a saved name, go to the identification screen. */
export const requireUserGuard: CanActivateFn = () =>
  inject(UserSessionService).isIdentified() || inject(Router).createUrlTree(['/', IDENTIFICATION_PATH]);

/** Identification screen: if a name is already saved, go straight to the dashboard. */
export const guestOnlyGuard: CanActivateFn = () =>
  !inject(UserSessionService).isIdentified() || inject(Router).createUrlTree(['/']);
