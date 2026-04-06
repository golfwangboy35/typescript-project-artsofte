import type { SessionDto } from './session.dto';
import type { Session } from './session.model';

export function mapSessionDto(dto: SessionDto): Session {
  return {
    token: dto.token,
    email: dto.email,
  };
}
