import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LogoutFacade } from '@features/auth/logout/logout.facade';
import { SessionService } from '@entities/session/session.service';
import { NotificationService } from '@entities/notification/notification.service';

export interface SidebarNavItem {
  label: string;
  icon: string;
  path: string | null;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, MatBadgeModule, RouterLink, RouterLinkActive],
  providers: [LogoutFacade],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private readonly logoutFacade = inject(LogoutFacade);
  private readonly sessionService = inject(SessionService);
  private readonly notificationService = inject(NotificationService);

  readonly unreadCount = signal(0);

  get userEmail(): string {
    return this.sessionService.session()?.email ?? '';
  }

  get userInitials(): string {
    return this.userEmail.slice(0, 2).toUpperCase();
  }

  get userName(): string {
    return this.userEmail.split('@')[0];
  }

  readonly navItems: SidebarNavItem[] = [
    { label: 'Панель управления', icon: 'dashboard', path: '/' },
    { label: 'Транзакции', icon: 'receipt_long', path: '/transactions' },
    { label: 'Бюджеты', icon: 'account_balance_wallet', path: null },
    { label: 'Цели', icon: 'flag', path: null },
    { label: 'Аналитика', icon: 'bar_chart', path: null },
    { label: 'Уведомления', icon: 'notifications', path: '/notifications' },
    { label: 'Профиль', icon: 'person', path: '/profile' },
  ];

  ngOnInit(): void {
    this.notificationService.getUnreadCount().subscribe({
      next: (count) => this.unreadCount.set(count),
    });
  }

  onStubClick(event: Event): void {
    event.preventDefault();
  }

  logout(): void {
    this.logoutFacade.logout();
  }
}
