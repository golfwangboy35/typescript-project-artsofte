import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SessionService } from '@entities/session/session.service';

export const authGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  if (sessionService.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
