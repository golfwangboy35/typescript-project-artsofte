import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@/app/entities/session/session.service';

@Injectable()
export class LogoutFacade {
  private readonly sessionService = inject(SessionService);
  private readonly router = inject(Router);

  logout(): void {
    this.sessionService.clearSession();
    void this.router.navigateByUrl('/login');
  }
}
