import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { ProfileDto, UpdateProfileDto } from './profile.dto';

export const PROFILE_API_PATH = '/api/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileApi {
  private readonly http = inject(HttpClient);

  getProfile(): Observable<ProfileDto> {
    return this.http.get<ProfileDto>(PROFILE_API_PATH);
  }

  updateProfile(dto: UpdateProfileDto): Observable<ProfileDto> {
    return this.http.patch<ProfileDto>(PROFILE_API_PATH, dto);
  }
}
