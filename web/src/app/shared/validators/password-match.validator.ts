import { AbstractControl, ValidationErrors } from '@angular/forms';

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
