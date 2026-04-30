import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/learn/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // console.log('Login attempt:', email);
      // console.log('auth : ' + auth)
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/learn/dashboard');
      if (isOnDashboard) {
        // console.log('isOnDashboard : ' + isOnDashboard)
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // console.log('isLoggedIn : ' + isLoggedIn)
        return Response.redirect(new URL('/learn/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;