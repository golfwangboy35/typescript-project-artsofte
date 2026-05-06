import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { NotificationDto } from './notification.dto';

export const NOTIFICATIONS_API_PATH = '/api/notifications';
export const NOTIFICATIONS_UNREAD_COUNT_API_PATH = '/api/notifications/unread-count';

@Injectable({
  providedIn: 'root',
})
export class NotificationApi {
  private readonly http = inject(HttpClient);

  getAll(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(NOTIFICATIONS_API_PATH);
  }

  getUnreadCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(NOTIFICATIONS_UNREAD_COUNT_API_PATH);
  }

  markAsRead(id: string): Observable<NotificationDto> {
    return this.http.patch<NotificationDto>(`${NOTIFICATIONS_API_PATH}/${id}/read`, {});
  }

  markAllAsRead(): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(`${NOTIFICATIONS_API_PATH}/read-all`, {});
  }
}
