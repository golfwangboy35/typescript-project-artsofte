import { inject, Injectable, signal } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';

import type { DashboardSummary } from '@entities/dashboard-summary/dashboard-summary.model';
import { DashboardSummaryService } from '@entities/dashboard-summary/dashboard-summary.service';
import { TransactionService } from '@entities/transaction/transaction.service';
import type { Transaction } from '@entities/transaction/transaction.model';

@Injectable()
export class DashboardFacade {
  private readonly dashboardSummaryService = inject(DashboardSummaryService);
  private readonly transactionService = inject(TransactionService);

  readonly summary = signal<DashboardSummary | null>(null);
  readonly transactions = signal<Transaction[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    forkJoin({
      summary: this.dashboardSummaryService.getSummary(),
      transactions: this.transactionService.getRecent(),
    })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: ({ summary, transactions }) => {
          this.summary.set(summary);
          this.transactions.set(transactions);
        },
        error: () => {
          this.error.set('Не удалось загрузить данные дашборда.');
        },
      });
  }
}
