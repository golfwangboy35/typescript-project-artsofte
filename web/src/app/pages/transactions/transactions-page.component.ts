import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TransactionsFacade } from './transactions.facade';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [TransactionsFacade],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
})
export class TransactionsPageComponent {
  private readonly facade = inject(TransactionsFacade);

  protected readonly transactions = this.facade.transactions;
  protected readonly categories = this.facade.categories;
  protected readonly isLoading = this.facade.isLoading;
  protected readonly error = this.facade.error;

  protected search = signal('');
  protected selectedType = signal('all');
  protected selectedCategory = signal('all');

  constructor() {
    this.facade.loadCategories();
    this.facade.load();
  }

  protected applyFilters(): void {
    this.facade.load({
      search: this.search() || undefined,
      type: this.selectedType() !== 'all' ? this.selectedType() : undefined,
      category: this.selectedCategory() !== 'all' ? this.selectedCategory() : undefined,
    });
  }

  protected resetFilters(): void {
    this.search.set('');
    this.selectedType.set('all');
    this.selectedCategory.set('all');
    this.facade.load();
  }
}
