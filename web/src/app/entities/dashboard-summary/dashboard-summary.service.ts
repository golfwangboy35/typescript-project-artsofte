import { inject, Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { DashboardSummaryApi } from './dashboard-summary.api';
import { mapDashboardSummaryDto } from './dashboard-summary.mapper';
import type { DashboardSummary } from './dashboard-summary.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardSummaryService {
  private readonly api = inject(DashboardSummaryApi);

  getSummary(): Observable<DashboardSummary> {
    return this.api.getSummary().pipe(map(mapDashboardSummaryDto));
  }
}
