// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/store/store';

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
  session: any; // atau bisa ketikkan session: Session | null jika sudah import dari 'next-auth'
}

export default function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
