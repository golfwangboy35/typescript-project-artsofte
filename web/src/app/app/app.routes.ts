import type { Routes } from '@angular/router';

import { authGuard } from '@features/auth/guards/auth.guard';
import { guestAuthGuard } from '@features/auth/guards/guest-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/main-page/layout/main-layout.component').then((m) => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/dashboard/dashboard-page.component').then((m) => m.DashboardPageComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@pages/login/login-page.component').then((m) => m.LoginPageComponent),
    canActivate: [guestAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@pages/register/register-page.component').then((m) => m.RegisterPageComponent),
    canActivate: [guestAuthGuard],
  },
  { path: '**', redirectTo: '' },
];
