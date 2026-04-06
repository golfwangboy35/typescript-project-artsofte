import { inject, Injectable, signal } from '@angular/core';
import { map, tap, type Observable } from 'rxjs';

import { mapSessionDto } from './session.mapper';
import type { Session } from './session.model';
import type { SignInDto, SignUpDto } from './session.dto';
import { SessionApi } from './session.api';

const SESSION_STORAGE_KEY = 'finance-app-session';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly api = inject(SessionApi);

  readonly session = signal<Session | null>(null);

  constructor() {
    this.hydrateFromStorage();
  }

  isAuthenticated(): boolean {
    return this.session() !== null;
  }

  signIn(command: SignInDto): Observable<void> {
    return this.api.signIn(command).pipe(
      tap((dto) => this.persistSession(mapSessionDto(dto))),
      map(() => void 0),
    );
  }

  signUp(command: SignUpDto): Observable<void> {
    return this.api.signUp(command).pipe(
      tap((dto) => this.persistSession(mapSessionDto(dto))),
      map(() => void 0),
    );
  }

  clearSession(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
    this.session.set(null);
  }

  private persistSession(session: Session): void {
    this.session.set(session);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
  }

  private hydrateFromStorage(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as Session;
      if (parsed?.token) {
        this.session.set(parsed);
      }
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }
}
