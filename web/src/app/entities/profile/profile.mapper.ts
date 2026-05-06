import type { ProfileDto } from './profile.dto';
import type { Profile } from './profile.model';

export function mapProfileDto(dto: ProfileDto): Profile {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    currency: dto.currency,
    language: dto.language,
    avatarUrl: dto.avatar_url,
  };
}
