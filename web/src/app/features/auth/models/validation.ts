import { AbstractControl, ValidationErrors } from '@angular/forms';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates non-empty string as a simple email shape (RFC-like subset). */
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value == null || value === '') {
    return null;
  }
  return typeof value === 'string' && EMAIL_PATTERN.test(value) ? null : { email: true };
}

/** Cross-field: password and confirmPassword must match when both are non-empty. */
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password || !confirmPassword) {
    return null;
  }
  const p = password.value;
  const c = confirmPassword.value;
  if (p == null || p === '' || c == null || c === '') {
    return null;
  }
  return p === c ? null : { passwordMismatch: true };
}
