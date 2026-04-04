import { Component } from '@angular/core';

export interface DashboardTransaction {
  id: string;
  title: string;
  category: string;
  amountRub: number;
  dateLabel: string;
  kind: 'income' | 'expense';
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly summary = {
    balanceRub: -919_700,
    incomeRub: 90_000,
    expensesRub: 1_009_700,
    transactionCount: 5,
  };

  readonly transactions: DashboardTransaction[] = [
    {
      id: '1',
      title: 'Проект для клиента',
      category: 'Фриланс',
      amountRub: 45_000,
      dateLabel: '15 мар.',
      kind: 'income',
    },
    {
      id: '2',
      title: 'Кино и ресторан',
      category: 'Развлечения',
      amountRub: 8_500,
      dateLabel: '14 мар.',
      kind: 'expense',
    },
    {
      id: '3',
      title: 'Зарплата',
      category: 'Работа',
      amountRub: 45_000,
      dateLabel: '10 мар.',
      kind: 'income',
    },
    {
      id: '4',
      title: 'Продукты',
      category: 'Быт',
      amountRub: 12_300,
      dateLabel: '9 мар.',
      kind: 'expense',
    },
    {
      id: '5',
      title: 'Транспорт',
      category: 'Быт',
      amountRub: 2_100,
      dateLabel: '8 мар.',
      kind: 'expense',
    },
  ];
}
