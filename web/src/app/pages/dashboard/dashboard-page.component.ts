import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DashboardFacade } from './dashboard.facade';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  providers: [DashboardFacade],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private readonly facade = inject(DashboardFacade);

  protected readonly summary = this.facade.summary;
  protected readonly transactions = this.facade.transactions;
  protected readonly isLoading = this.facade.isLoading;
  protected readonly error = this.facade.error;

  constructor() {
    this.facade.load();
  }
}
