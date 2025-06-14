'use client';

import { useMutation } from '@tanstack/react-query';

import { register, RegisterPayload } from '@/lib/auth';

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterPayload) => register(data),
  });
}
