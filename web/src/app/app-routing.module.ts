import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '@/app/core/guards/auth.guard';
import { guestAuthGuard } from '@/app/core/guards/guest-auth.guard';
import { MainLayoutComponent } from '@/app/core/layout/main-layout/main-layout.component';
import { LoginPageComponent } from '@/app/features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from '@/app/features/auth/pages/register-page/register-page.component';
import { DashboardComponent } from '@/app/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [guestAuthGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [guestAuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
