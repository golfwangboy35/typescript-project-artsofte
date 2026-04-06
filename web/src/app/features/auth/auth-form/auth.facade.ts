import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, finalize, from, map, switchMap } from 'rxjs';

import { SessionService } from '@/app/entities/session/session.service';
import type { AuthCommand, AuthMode } from './auth.model';

@Injectable()
export class AuthFacade {
  private readonly sessionService = inject(SessionService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  submit(mode: AuthMode, command: AuthCommand) {
    this.isLoading.set(true);
    this.error.set(null);

    const request$ =
      mode === 'login'
        ? this.sessionService.signIn({ email: command.email, password: command.password })
        : this.sessionService.signUp({ email: command.email, password: command.password });

    return request$.pipe(
      switchMap(() => from(this.router.navigateByUrl('/'))),
      map(() => void 0),
      catchError(() => {
        this.error.set('Не удалось выполнить запрос. Проверьте данные и попробуйте снова.');
        return EMPTY;
      }),
      finalize(() => this.isLoading.set(false)),
    );
  }
}
