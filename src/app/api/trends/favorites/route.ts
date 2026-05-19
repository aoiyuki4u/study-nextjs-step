import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// 특정 유저의 보관함 리스트 불러오기
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  if (!username) return NextResponse.json([]);

  try {
    const result = await sql`
      SELECT name, actual_views as "actualViews", video_id as "videoId", thumbnail, platform 
      FROM trend_favorites WHERE username = ${username}
      ORDER BY created_at DESC;
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json([]);
  }
}

// 보관함에 트렌드 토글(저장/삭제)하기
export async function POST(request: Request) {
  try {
    const { username, item } = await request.json();
    if (!username || !item) return NextResponse.json({ success: false });

    // 이미 북마크했는지 대조
    const checkExist = await sql`
      SELECT id FROM trend_favorites WHERE username = ${username} AND video_id = ${item.videoId};
    `;

    if (checkExist.rowCount > 0) {
      // 존재하면 북마크 해제(Delete)
      await sql`DELETE FROM trend_favorites WHERE username = ${username} AND video_id = ${item.videoId};`;
      return NextResponse.json({ success: true, isFav: false });
    } else {
      // 존재하지 않으면 신규 북마크 삽입(Insert)
      await sql`
        INSERT INTO trend_favorites (username, name, actual_views, video_id, thumbnail, platform)
        VALUES (${username}, ${item.name}, ${item.actualViews}, ${item.videoId}, ${item.thumbnail}, ${item.platform});
      `;
      return NextResponse.json({ success: true, isFav: true });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}