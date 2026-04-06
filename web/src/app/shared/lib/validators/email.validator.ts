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
