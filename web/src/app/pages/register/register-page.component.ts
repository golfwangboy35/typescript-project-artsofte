import { Component } from '@angular/core';

import { AuthFormComponent } from '@features/auth/auth-form/auth-form.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {}
