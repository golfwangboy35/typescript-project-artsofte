import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { NotificationService } from '@entities/notification/notification.service';
import type { Notification } from '@entities/notification/notification.model';

@Injectable()
export class NotificationsFacade {
  private readonly notificationService = inject(NotificationService);

  readonly notifications = signal<Notification[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  get unreadCount(): number {
    return this.notifications().filter((n) => !n.isRead).length;
  }

  load(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.notificationService
      .getAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (notifications) => this.notifications.set(notifications),
        error: () => this.error.set('Не удалось загрузить уведомления.'),
      });
  }

  markAsRead(id: string): void {
    this.notifications.update((list) =>
      list.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
    this.notificationService.markAsRead(id).subscribe();
  }

  markAllAsRead(): void {
    this.notifications.update((list) => list.map((n) => ({ ...n, isRead: true })));
    this.notificationService.markAllAsRead().subscribe();
  }
}
