import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { CustomJWT } from '../types/session';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization:
        'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds'
    })
  ],
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    }
  },
  pages: {
    signIn: '/auth/sign-in'
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const customToken = token as CustomJWT;
        customToken.accessToken = account.access_token;
        return {
          ...token,
          token,
          accessToken: customToken.accessToken

          // any other token properties you want to add
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const customToken = token as CustomJWT;
      session.accessToken = customToken.accessToken;
      return session;
    }
  }
});
