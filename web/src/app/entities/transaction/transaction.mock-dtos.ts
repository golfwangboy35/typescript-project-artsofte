import type { TransactionDto } from './transaction.dto';

export const MOCK_TRANSACTION_DTOS: TransactionDto[] = [
  {
    id: '1',
    title: 'Проект для клиента',
    category_name: 'Фриланс',
    amount: 45_000,
    transaction_date: '15 мар.',
    type: 'income',
  },
  {
    id: '2',
    title: 'Кино и ресторан',
    category_name: 'Развлечения',
    amount: 8_500,
    transaction_date: '14 мар.',
    type: 'expense',
  },
  {
    id: '3',
    title: 'Зарплата',
    category_name: 'Работа',
    amount: 45_000,
    transaction_date: '10 мар.',
    type: 'income',
  },
  {
    id: '4',
    title: 'Продукты',
    category_name: 'Быт',
    amount: 12_300,
    transaction_date: '9 мар.',
    type: 'expense',
  },
  {
    id: '5',
    title: 'Транспорт',
    category_name: 'Быт',
    amount: 2_100,
    transaction_date: '8 мар.',
    type: 'expense',
  },
];
