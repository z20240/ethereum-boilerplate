import NextAuth from 'next-auth';
import { MoralisNextAuthProvider } from '@moralisweb3/next';

export default NextAuth({
  providers: [MoralisNextAuthProvider()],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.user.address = '0x2ff895e051f7A1c29c2D3bdAB35C4960E3E1ec72';
      }
      return token;
    },
    async session({ session, token }) {
      (session as { user: unknown }).user = token.user;
      session.user.address = '0x2ff895e051f7A1c29c2D3bdAB35C4960E3E1ec72';
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});
