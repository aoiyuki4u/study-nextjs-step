import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/learn/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          // .object({ email: z.string().email(), password: z.string().min(6) })
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          // console.log('입력 비번:', password);
          // console.log('DB 해시값:', user.password);
          // console.log('일치 여부:', passwordsMatch);
          //비번 암호화가 다를 경유 생성해서 베셀 쿼리로 넣어서 처리
          // UPDATE users 
          // SET password = '생성한 testHash' 
          // WHERE email = 'user@nextmail.com';
          // const testHash = await bcrypt.hash('123456', 10);
          // console.log('방금 만든 123456의 해시:', testHash);
          // console.log('DB에서 온 해시:', user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});