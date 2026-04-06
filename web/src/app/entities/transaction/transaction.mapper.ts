import type { TransactionDto } from './transaction.dto';
import type { Transaction } from './transaction.model';

export function mapTransactionDto(dto: TransactionDto): Transaction {
  return {
    id: dto.id,
    title: dto.title,
    category: dto.category_name,
    amountRub: dto.amount,
    dateLabel: dto.transaction_date,
    kind: dto.type,
  };
}
