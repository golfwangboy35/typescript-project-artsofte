import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { TransactionDto } from './transaction.dto';

export const RECENT_TRANSACTIONS_API_PATH = '/api/transactions/recent';
export const TRANSACTIONS_API_PATH = '/api/transactions';
export const TRANSACTION_CATEGORIES_API_PATH = '/api/transactions/categories';

export interface TransactionFilters {
  search?: string;
  type?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionApi {
  private readonly http = inject(HttpClient);

  getRecent(): Observable<TransactionDto[]> {
    return this.http.get<TransactionDto[]>(RECENT_TRANSACTIONS_API_PATH);
  }

  getAll(filters: TransactionFilters = {}): Observable<TransactionDto[]> {
    const params: Record<string, string> = {};
    if (filters.search) params['search'] = filters.search;
    if (filters.type) params['type'] = filters.type;
    if (filters.category) params['category'] = filters.category;
    return this.http.get<TransactionDto[]>(TRANSACTIONS_API_PATH, { params });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(TRANSACTION_CATEGORIES_API_PATH);
  }
}
