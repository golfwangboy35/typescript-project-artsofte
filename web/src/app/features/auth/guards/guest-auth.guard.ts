import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SessionService } from '@entities/session/session.service';

/** Redirects authenticated users away from login/register to the app shell. */
export const guestAuthGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  if (!sessionService.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/']);
};
