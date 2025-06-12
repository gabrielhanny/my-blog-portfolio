export interface UserPayload {
  id: number;
  name: string;
  email: string;
  image?: string;
  headline?: string;
  bio?: string;
  token: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name?: string;
    email: string;
    image?: string | null;
    headline?: string | null;
    bio?: string | null;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
