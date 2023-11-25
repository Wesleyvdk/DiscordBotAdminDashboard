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
  pages: {
    signIn: '/sign-in'
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const customToken = token as unknown as CustomJWT;
        customToken.customToken.accessToken = account.access_token;
        return {
          ...token,
          customToken,
          accessToken: account.accessToken
          // any other token properties you want to add
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const customToken = token as unknown as CustomJWT;
      session.accessToken = customToken.customToken.accessToken;
      return session;
    }
  }
});
