import { inject, Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { TransactionApi } from './transaction.api';
import { mapTransactionDto } from './transaction.mapper';
import type { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly api = inject(TransactionApi);

  getRecent(): Observable<Transaction[]> {
    return this.api.getRecent().pipe(map((transactions) => transactions.map(mapTransactionDto)));
  }
}
