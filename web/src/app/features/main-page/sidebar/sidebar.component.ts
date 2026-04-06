import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LogoutFacade } from '@features/auth/logout/logout.facade';

export interface SidebarNavItem {
  label: string;
  icon: string;
  /** When set, uses routerLink; otherwise a non-navigating stub link. */
  path: string | null;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  providers: [LogoutFacade],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly logoutFacade = inject(LogoutFacade);

  readonly navItems: SidebarNavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', path: '/' },
    { label: 'Profile', icon: 'person', path: null },
    { label: 'Settings', icon: 'settings', path: null },
    { label: 'Analytics', icon: 'analytics', path: null },
  ];

  onStubClick(event: Event): void {
    event.preventDefault();
  }

  logout(): void {
    this.logoutFacade.logout();
  }
}
