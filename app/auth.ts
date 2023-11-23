import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/sign-in'
  }
});
