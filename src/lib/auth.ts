// src/lib/auth.ts
import { LoginPayload, RegisterPayload, LoginResponse } from '@/types/auth';

import { fetchAPI } from './api';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return await fetchAPI<LoginResponse>('auth/login', {
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
