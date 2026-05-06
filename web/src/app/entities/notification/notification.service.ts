import { inject, Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { NotificationApi } from './notification.api';
import { mapNotificationDto } from './notification.mapper';
import type { Notification } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly api = inject(NotificationApi);

  getAll(): Observable<Notification[]> {
    return this.api.getAll().pipe(map((dtos) => dtos.map(mapNotificationDto)));
  }

  getUnreadCount(): Observable<number> {
    return this.api.getUnreadCount().pipe(map((res) => res.count));
  }

  markAsRead(id: string): Observable<Notification> {
    return this.api.markAsRead(id).pipe(map(mapNotificationDto));
  }

  markAllAsRead(): Observable<{ success: boolean }> {
    return this.api.markAllAsRead();
  }
}
