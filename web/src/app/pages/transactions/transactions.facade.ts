import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { TransactionService } from '@entities/transaction/transaction.service';
import type { Transaction } from '@entities/transaction/transaction.model';
import type { TransactionFilters } from '@entities/transaction/transaction.api';

@Injectable()
export class TransactionsFacade {
  private readonly transactionService = inject(TransactionService);

  readonly transactions = signal<Transaction[]>([]);
  readonly categories = signal<string[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  load(filters: TransactionFilters = {}): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.transactionService
      .getAll(filters)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (transactions) => this.transactions.set(transactions),
        error: () => this.error.set('Не удалось загрузить транзакции.'),
      });
  }

  loadCategories(): void {
    this.transactionService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
    });
  }
}
