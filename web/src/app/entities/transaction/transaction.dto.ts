export interface TransactionDto {
  id: string;
  title: string;
  category_name: string;
  amount: number;
  transaction_date: string;
  type: 'income' | 'expense';
}
