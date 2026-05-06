import type { TransactionDto } from './transaction.dto';

export const MOCK_ALL_TRANSACTION_DTOS: TransactionDto[] = [
  { id: '1', title: 'Зарплата за март', category_name: 'Зарплата', amount: 75_000, transaction_date: '01 мар. 2026', type: 'income' },
  { id: '2', title: 'Аренда квартиры', category_name: 'Жильё', amount: 35_000, transaction_date: '02 мар. 2026', type: 'expense' },
  { id: '3', title: 'Супермаркет', category_name: 'Еда', amount: 3_500, transaction_date: '05 мар. 2026', type: 'expense' },
  { id: '4', title: 'Метро', category_name: 'Транспорт', amount: 1_200, transaction_date: '10 мар. 2026', type: 'expense' },
  { id: '5', title: 'Кино и ресторан', category_name: 'Развлечения', amount: 5_000, transaction_date: '12 мар. 2026', type: 'expense' },
  { id: '6', title: 'Проект для клиента', category_name: 'Фриланс', amount: 15_000, transaction_date: '15 мар. 2026', type: 'income' },
  { id: '7', title: 'Интернет', category_name: 'Услуги', amount: 700, transaction_date: '16 мар. 2026', type: 'expense' },
  { id: '8', title: 'Спортзал', category_name: 'Здоровье', amount: 2_500, transaction_date: '17 мар. 2026', type: 'expense' },
  { id: '9', title: 'Накопления на отпуск', category_name: 'Накопления', amount: 10_000, transaction_date: '18 мар. 2026', type: 'expense' },
  { id: '10', title: 'Подработка', category_name: 'Фриланс', amount: 8_000, transaction_date: '20 мар. 2026', type: 'income' },
  { id: '11', title: 'Продукты на неделю', category_name: 'Еда', amount: 4_200, transaction_date: '22 мар. 2026', type: 'expense' },
  { id: '12', title: 'Такси', category_name: 'Транспорт', amount: 850, transaction_date: '25 мар. 2026', type: 'expense' },
];

export const MOCK_TRANSACTION_CATEGORIES: string[] = [
  'Зарплата', 'Жильё', 'Еда', 'Транспорт', 'Развлечения', 'Фриланс', 'Услуги', 'Здоровье', 'Накопления',
];
