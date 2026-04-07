import type { DashboardSummaryDto } from './dashboard-summary.dto';
import type { DashboardSummary } from './dashboard-summary.model';

export function mapDashboardSummaryDto(dto: DashboardSummaryDto): DashboardSummary {
  return {
    balanceRub: dto.balance_rub,
    incomeRub: dto.income_rub,
    expensesRub: dto.expenses_rub,
    transactionCount: dto.transaction_count,
  };
}
