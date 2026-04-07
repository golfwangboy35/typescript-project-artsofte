export type AuthMode = 'login' | 'register';

export interface AuthCommand {
  email: string;
  password: string;
  confirmPassword?: string;
}
