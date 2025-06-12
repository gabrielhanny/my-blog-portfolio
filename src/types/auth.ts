// types/auth.ts
export interface UserPayload {
  id: number;
  name: string;
  email: string;
  image?: string; // avatar URL
  headline?: string;
  bio?: string;
  token: string;
}
