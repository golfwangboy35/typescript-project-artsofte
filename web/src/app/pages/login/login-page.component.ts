import { Component } from '@angular/core';

import { AuthFormComponent } from '@/app/features/auth/auth-form/auth-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
