import { type AuthOptions, type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { login } from '@/lib/auth';
import { LoginResponse } from '@/types/auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res: LoginResponse = await login({
            email: credentials.email,
            password: credentials.password,
          });

          if (!res?.token) return null;

      
          const payload = JSON.parse(
            Buffer.from(res.token.split('.')[1], 'base64').toString()
          );

          console.log('✅ JWT Payload:', payload);

          return {
            id: payload.id,
            name: credentials.email,
            email: credentials.email,
            token: res.token,
          };
        } catch (err) {
          console.error('❌ Authorize error:', err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        token: token.accessToken as string,
        id: token.id as number,
        name: token.name as string,
        email: token.email as string,
      };
      return session;
    },
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
