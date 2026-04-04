import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@/app/core/services/auth.service';

export interface SidebarNavItem {
  label: string;
  icon: string;
  /** When set, uses routerLink; otherwise a non-navigating stub link. */
  path: string | null;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly navItems: SidebarNavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', path: '/' },
    { label: 'Profile', icon: 'person', path: null },
    { label: 'Settings', icon: 'settings', path: null },
    { label: 'Analytics', icon: 'analytics', path: null },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  onStubClick(event: Event): void {
    event.preventDefault();
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
