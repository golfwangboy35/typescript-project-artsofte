import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { ProfileService } from '@entities/profile/profile.service';
import type { Profile } from '@entities/profile/profile.model';
import type { UpdateProfileDto } from '@entities/profile/profile.dto';

@Injectable()
export class ProfileFacade {
  private readonly profileService = inject(ProfileService);

  readonly profile = signal<Profile | null>(null);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly error = signal<string | null>(null);
  readonly saveSuccess = signal(false);

  load(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.profileService
      .getProfile()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (profile) => this.profile.set(profile),
        error: () => this.error.set('Не удалось загрузить профиль.'),
      });
  }

  save(dto: UpdateProfileDto): void {
    this.isSaving.set(true);
    this.saveSuccess.set(false);
    this.error.set(null);

    this.profileService
      .updateProfile(dto)
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: (profile) => {
          this.profile.set(profile);
          this.saveSuccess.set(true);
          setTimeout(() => this.saveSuccess.set(false), 3000);
        },
        error: () => this.error.set('Не удалось сохранить изменения.'),
      });
  }
}
