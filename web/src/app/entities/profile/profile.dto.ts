export interface ProfileDto {
  id: string;
  name: string;
  email: string;
  currency: string;
  language: string;
  avatar_url: string | null;
}

export interface UpdateProfileDto {
  name?: string;
  currency?: string;
  language?: string;
}
