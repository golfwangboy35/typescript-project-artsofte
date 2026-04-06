import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { SessionDto, SignInDto, SignUpDto } from './session.dto';

@Injectable({
  providedIn: 'root',
})
export class SessionApi {
  private readonly http = inject(HttpClient);

  signIn(command: SignInDto): Observable<SessionDto> {
    return this.http.post<SessionDto>('/api/auth/login', command);
  }

  signUp(command: SignUpDto): Observable<SessionDto> {
    return this.http.post<SessionDto>('/api/auth/register', command);
  }
}
