import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { SessionDto, SignInDto, SignUpDto } from './session.dto';

export const SIGN_IN_API_PATH = '/api/auth/login';
export const SIGN_UP_API_PATH = '/api/auth/register';

@Injectable({
  providedIn: 'root',
})
export class SessionApi {
  private readonly http = inject(HttpClient);

  signIn(command: SignInDto): Observable<SessionDto> {
    return this.http.post<SessionDto>(SIGN_IN_API_PATH, command);
  }

  signUp(command: SignUpDto): Observable<SessionDto> {
    return this.http.post<SessionDto>(SIGN_UP_API_PATH, command);
  }
}
