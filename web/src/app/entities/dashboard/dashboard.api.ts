import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { DashboardSummaryDto } from './dashboard-summary.dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardApi {
  private readonly http = inject(HttpClient);

  getSummary(): Observable<DashboardSummaryDto> {
    return this.http.get<DashboardSummaryDto>('/api/dashboard/summary');
  }
}
