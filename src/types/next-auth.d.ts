// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      token: string;
      id: number;
      headline?: string;
      bio?: string;
      image?: string;
    };
  }

  interface User extends DefaultUser {
    token: string;
    id: number;
    headline?: string;
    bio?: string;
    image?: string;
  }

  interface JWT {
    accessToken: string;
    id: number;
    name: string;
    email: string;
    picture?: string;
    headline?: string;
  }
}
