import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ProfileFacade } from './profile.facade';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [ProfileFacade],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly facade = inject(ProfileFacade);

  protected readonly profile = this.facade.profile;
  protected readonly isLoading = this.facade.isLoading;
  protected readonly isSaving = this.facade.isSaving;
  protected readonly saveSuccess = this.facade.saveSuccess;
  protected readonly error = this.facade.error;

  protected name = signal('');
  protected currency = signal('RUB');
  protected language = signal('ru');

  protected readonly currencies = [
    { value: 'RUB', label: 'RUB - Российский рубль' },
    { value: 'USD', label: 'USD - Доллар США' },
    { value: 'EUR', label: 'EUR - Евро' },
  ];

  protected readonly languages = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
  ];

  constructor() {
    this.facade.load();

    effect(() => {
      const p = this.profile();
      if (p) {
        this.name.set(p.name);
        this.currency.set(p.currency);
        this.language.set(p.language);
      }
    });
  }

  protected getInitials(): string {
    const n = this.profile()?.name ?? '';
    return n.slice(0, 2).toUpperCase();
  }

  protected save(): void {
    this.facade.save({
      name: this.name(),
      currency: this.currency(),
      language: this.language(),
    });
  }
}
