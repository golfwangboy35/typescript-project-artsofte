import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@/app/core/services/auth.service';
import { AuthFormMode } from '@/app/features/auth/models/auth-form-mode';
import { emailValidator, passwordMatchValidator } from '@/app/features/auth/models/validation';

@Component({
  selector: 'app-auth-form',
  standalone: false,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent implements OnInit {
  @Input() mode: AuthFormMode = 'login';

  form!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.mode === 'login') {
      this.form = this.fb.nonNullable.group({
        email: ['', [Validators.required, emailValidator]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
      return;
    }

    this.form = this.fb.nonNullable.group(
      {
        email: ['', [Validators.required, emailValidator]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: [passwordMatchValidator] },
    );
  }

  get isLogin(): boolean {
    return this.mode === 'login';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.login();
    void this.router.navigate(['/']);
  }
}
