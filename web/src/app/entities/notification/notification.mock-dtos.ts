import type { NotificationDto } from './notification.dto';

export const MOCK_NOTIFICATION_DTOS: NotificationDto[] = [
  { id: '1', title: 'Зарплата поступила', message: 'На ваш счёт поступило 75 000 ₽ от работодателя.', created_at: '01 мар. 2026', is_read: true, type: 'transaction' },
  { id: '2', title: 'Крупный расход', message: 'Зафиксирован расход 35 000 ₽ по категории «Жильё».', created_at: '02 мар. 2026', is_read: true, type: 'alert' },
  { id: '3', title: 'Новая транзакция', message: 'Расход 3 500 ₽ в категории «Еда».', created_at: '05 мар. 2026', is_read: false, type: 'transaction' },
  { id: '4', title: 'Новая транзакция', message: 'Расход 1 200 ₽ в категории «Транспорт».', created_at: '10 мар. 2026', is_read: false, type: 'transaction' },
  { id: '5', title: 'Напоминание', message: 'Не забудьте внести ежемесячные накопления.', created_at: '11 мар. 2026', is_read: false, type: 'system' },
  { id: '6', title: 'Новая транзакция', message: 'Расход 5 000 ₽ в категории «Развлечения».', created_at: '12 мар. 2026', is_read: false, type: 'transaction' },
  { id: '7', title: 'Доход зачислен', message: 'Фриланс-оплата 15 000 ₽ зачислена на счёт.', created_at: '15 мар. 2026', is_read: false, type: 'transaction' },
  { id: '8', title: 'Системное сообщение', message: 'Обновление приложения: добавлены новые категории расходов.', created_at: '16 мар. 2026', is_read: false, type: 'system' },
  { id: '9', title: 'Превышение бюджета', message: 'Расходы на «Развлечения» превысили плановый бюджет на 15%.', created_at: '17 мар. 2026', is_read: false, type: 'alert' },
  { id: '10', title: 'Новая транзакция', message: 'Расход 2 500 ₽ в категории «Здоровье».', created_at: '17 мар. 2026', is_read: false, type: 'transaction' },
  { id: '11', title: 'Накопления', message: 'Вы отложили 10 000 ₽ на отпуск. Отличная работа!', created_at: '18 мар. 2026', is_read: false, type: 'system' },
  { id: '12', title: 'Доход зачислен', message: 'Подработка: 8 000 ₽ поступило на счёт.', created_at: '20 мар. 2026', is_read: false, type: 'transaction' },
];
