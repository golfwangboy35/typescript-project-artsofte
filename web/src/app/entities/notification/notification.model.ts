export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  type: 'transaction' | 'system' | 'alert';
}
