import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, nickname } = body;

    // 1. 회원가입 프로세스
    if (action === 'signup') {
      const existingUser = await sql`SELECT * FROM trend_users WHERE username = ${username};`;
      if (existingUser.rowCount > 0) {
        return NextResponse.json({ success: false, message: '이미 존재하는 아이디입니다.' }, { status: 400 });
      }

      await sql`
        INSERT INTO trend_users (username, password, nickname)
        VALUES (${username}, ${password}, ${nickname});
      `;
      return NextResponse.json({ success: true, message: '회원가입 성공!' });
    }

    // 2. 로그인 프로세스
    if (action === 'login') {
      const userResult = await sql`
        SELECT username, nickname FROM trend_users 
        WHERE username = ${username} AND password = ${password};
      `;
      if (userResult.rowCount === 0) {
        return NextResponse.json({ success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
      }

      return NextResponse.json({ success: true, user: userResult.rows[0] });
    }

    return NextResponse.json({ success: false, message: '잘못된 액션 요청' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}