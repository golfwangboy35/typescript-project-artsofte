import { inject, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { DashboardApi } from './dashboard.api';
import { mapDashboardSummaryDto } from './dashboard-summary.mapper';
import type { DashboardSummary } from './dashboard-summary.model';
import { TransactionApi } from '@/app/entities/transaction/transaction.api';
import { mapTransactionDto } from '@/app/entities/transaction/transaction.mapper';
import type { Transaction } from '@/app/entities/transaction/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly transactionApi = inject(TransactionApi);
  private readonly dashboardApi = inject(DashboardApi);

  readonly summary = signal<DashboardSummary | null>(null);
  readonly transactions = signal<Transaction[]>([]);

  constructor() {
    forkJoin({
      transactions: this.transactionApi.getRecent(),
      summary: this.dashboardApi.getSummary(),
    })
      .pipe(
        take(1),
        map(({ transactions, summary }) => ({
          transactions: transactions.map(mapTransactionDto),
          summary: mapDashboardSummaryDto(summary),
        })),
      )
      .subscribe({
        next: ({ transactions, summary }) => {
          this.transactions.set(transactions);
          this.summary.set(summary);
        },
      });
  }
}
