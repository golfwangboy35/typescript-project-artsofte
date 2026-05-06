import { inject, Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { TransactionApi, type TransactionFilters } from './transaction.api';
import { mapTransactionDto } from './transaction.mapper';
import type { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly api = inject(TransactionApi);

  getRecent(): Observable<Transaction[]> {
    return this.api.getRecent().pipe(map((dtos) => dtos.map(mapTransactionDto)));
  }

  getAll(filters: TransactionFilters = {}): Observable<Transaction[]> {
    return this.api.getAll(filters).pipe(map((dtos) => dtos.map(mapTransactionDto)));
  }

  getCategories(): Observable<string[]> {
    return this.api.getCategories();
  }
}
