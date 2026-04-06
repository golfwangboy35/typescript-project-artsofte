import type { Routes } from '@angular/router';

import { authGuard } from '@/app/app/guards/auth.guard';
import { guestAuthGuard } from '@/app/app/guards/guest-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@/app/core/layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@/app/pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@/app/pages/login/login-page.component').then((m) => m.LoginPageComponent),
    canActivate: [guestAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@/app/pages/register/register-page.component').then((m) => m.RegisterPageComponent),
    canActivate: [guestAuthGuard],
  },
  { path: '**', redirectTo: '' },
];
