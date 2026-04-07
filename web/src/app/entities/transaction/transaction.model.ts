export interface Transaction {
  id: string;
  title: string;
  category: string;
  amountRub: number;
  dateLabel: string;
  kind: 'income' | 'expense';
}
