import { credentials } from '@/lib/constants';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username',
          value: credentials.username,
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
          value: credentials.password,
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          },
        );

        if (res.ok) {
          return res.json();
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return { ...session, ...token };
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
