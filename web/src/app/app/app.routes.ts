import type { Routes } from '@angular/router';

import { authGuard } from '@features/auth/guards/auth.guard';
import { guestAuthGuard } from '@features/auth/guards/guest-auth.guard';
import { DashboardPageComponent } from '@pages/dashboard/dashboard-page.component';
import { MainLayoutComponent } from '@features/main-page/layout/main-layout.component';
import { LoginPageComponent } from '@pages/login/login-page.component';
import { RegisterPageComponent } from '@pages/register/register-page.component';
import { TransactionsPageComponent } from '@pages/transactions/transactions-page.component';
import { NotificationsPageComponent } from '@pages/notifications/notifications-page.component';
import { ProfilePageComponent } from '@pages/profile/profile-page.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => DashboardPageComponent },
      { path: 'transactions', loadComponent: () => TransactionsPageComponent },
      { path: 'notifications', loadComponent: () => NotificationsPageComponent },
      { path: 'profile', loadComponent: () => ProfilePageComponent },
    ],
  },
  {
    path: 'login',
    loadComponent: () => LoginPageComponent,
    canActivate: [guestAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () => RegisterPageComponent,
    canActivate: [guestAuthGuard],
  },
  { path: '**', redirectTo: '' },
];
