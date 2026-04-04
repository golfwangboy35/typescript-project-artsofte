import { Injectable } from '@angular/core';

const AUTH_STORAGE_KEY = 'auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  }

  login(): void {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  }

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
