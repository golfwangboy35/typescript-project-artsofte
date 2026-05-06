import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NotificationsFacade } from './notifications.facade';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  providers: [NotificationsFacade],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.scss',
})
export class NotificationsPageComponent {
  private readonly facade = inject(NotificationsFacade);

  protected readonly notifications = this.facade.notifications;
  protected readonly isLoading = this.facade.isLoading;
  protected readonly error = this.facade.error;

  protected get unreadCount(): number {
    return this.facade.unreadCount;
  }

  constructor() {
    this.facade.load();
  }

  protected markAsRead(id: string): void {
    this.facade.markAsRead(id);
  }

  protected markAllAsRead(): void {
    this.facade.markAllAsRead();
  }

  protected typeIcon(type: string): string {
    const icons: Record<string, string> = {
      transaction: 'receipt_long',
      system: 'info',
      alert: 'warning',
    };
    return icons[type] ?? 'notifications';
  }
}
