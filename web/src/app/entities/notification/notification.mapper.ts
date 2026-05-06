import type { NotificationDto } from './notification.dto';
import type { Notification } from './notification.model';

export function mapNotificationDto(dto: NotificationDto): Notification {
  return {
    id: dto.id,
    title: dto.title,
    message: dto.message,
    createdAt: dto.created_at,
    isRead: dto.is_read,
    type: dto.type,
  };
}
