import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { DashboardSummaryDto } from './dashboard-summary.dto';

export const DASHBOARD_SUMMARY_API_PATH = '/api/dashboard/summary';

@Injectable({
  providedIn: 'root',
})
export class DashboardSummaryApi {
  private readonly http = inject(HttpClient);

  getSummary(): Observable<DashboardSummaryDto> {
    return this.http.get<DashboardSummaryDto>(DASHBOARD_SUMMARY_API_PATH);
  }
}
