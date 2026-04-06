import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { TransactionDto } from './transaction.dto';

export const RECENT_TRANSACTIONS_API_PATH = '/api/transactions/recent';

@Injectable({
  providedIn: 'root',
})
export class TransactionApi {
  private readonly http = inject(HttpClient);

  getRecent(): Observable<TransactionDto[]> {
    return this.http.get<TransactionDto[]>(RECENT_TRANSACTIONS_API_PATH);
  }
}
