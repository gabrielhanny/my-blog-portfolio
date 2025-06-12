// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { login } from '@/lib/auth';
import { UserPayload } from '@/types/auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<UserPayload | null> {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await login({
            email: credentials.email,
            password: credentials.password,
          });

          // ✅ pastikan login() return UserPayload langsung
          if (res?.token) {
            return {
              id: res.id,
              name: res.name || res.email,
              email: res.email,
              image: res.image || null,
              headline: res.headline || null,
              bio: res.bio || null,
              token: res.token,
            };
          }

          return null;
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
        const u = user as UserPayload;
        token.accessToken = u.token;
        token.id = u.id;
        token.name = u.name;
        token.email = u.email;
        token.picture = u.image;
        token.headline = u.headline;
        token.bio = u.bio;
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
});

export { handler as GET, handler as POST };
