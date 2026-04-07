import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { emailValidator } from '@shared/validators/email.validator';
import { passwordMatchValidator } from '@shared/validators/password-match.validator';
import { AuthFacade } from './auth.facade';
import type { AuthMode } from './auth.model';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [AuthFacade],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(AuthFacade);
  private readonly destroyRef = inject(DestroyRef);

  @Input() mode: AuthMode = 'login';

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly registerForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [passwordMatchValidator] },
  );

  readonly hidePassword = signal(true);
  readonly hideConfirmPassword = signal(true);

  protected readonly isLoading = this.facade.isLoading;
  protected readonly error = this.facade.error;

  protected get activeForm(): FormGroup {
    return this.mode === 'login' ? this.loginForm : this.registerForm;
  }

  protected get isLogin(): boolean {
    return this.mode === 'login';
  }

  onSubmit(): void {
    const form = this.mode === 'login' ? this.loginForm : this.registerForm;

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    this.facade
      .submit(this.mode, form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
