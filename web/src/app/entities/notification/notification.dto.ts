export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
  type: 'transaction' | 'system' | 'alert';
}
