import { inject, Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { ProfileApi } from './profile.api';
import { mapProfileDto } from './profile.mapper';
import type { Profile } from './profile.model';
import type { UpdateProfileDto } from './profile.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly api = inject(ProfileApi);

  getProfile(): Observable<Profile> {
    return this.api.getProfile().pipe(map(mapProfileDto));
  }

  updateProfile(dto: UpdateProfileDto): Observable<Profile> {
    return this.api.updateProfile(dto).pipe(map(mapProfileDto));
  }
}
