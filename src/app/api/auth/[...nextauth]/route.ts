// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type AuthOptions, type User } from 'next-auth';
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

          const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${credentials.email}`
          );

          if (!userRes.ok) return null;

          const user = await userRes.json();

          return {
            id: user.id,
            name: user.name || user.email,
            email: user.email,
            image: user.avatarUrl ?? undefined,
            headline: user.headline ?? undefined,
            bio: user.bio ?? undefined,
            token: res.token,
          };
        } catch (err) {
          console.error('Authorize error:', err);
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
        token.picture = user.image;
        token.headline = user.headline;
        token.bio = user.bio;
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
        image: token.picture as string,
        headline: token.headline as string,
        bio: token.bio as string,
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
