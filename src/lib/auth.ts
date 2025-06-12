// src/app/lib/auth.ts
import { fetchAPI } from './api';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export function login(payload: LoginPayload) {
  return fetchAPI<{ token: string }>('auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function register(payload: RegisterPayload) {
  return fetchAPI('auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
