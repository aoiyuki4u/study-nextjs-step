// src/app/api/auth/init/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. 유저 테이블 생성
    await sql`
      CREATE TABLE IF NOT EXISTS trend_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nickname VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. 즐겨찾기 보관함 테이블 생성
    await sql`
      CREATE TABLE IF NOT EXISTS trend_favorites (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        name TEXT NOT NULL,
        actual_views INT NOT NULL,
        video_id VARCHAR(255) NOT NULL,
        thumbnail TEXT,
        platform VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(username, video_id)
      );
    `;

    return NextResponse.json({ success: true, message: "Tables initialized successfully!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}