// src/app/api/trends/route.ts
import { NextResponse } from 'next/server';

// 🛠️ XML 특수 문자(&amp;, &quot;, &#39;, &lt;, &gt;) 디코딩용 헬퍼 함수
function decodeXmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') // CDATA 태그가 있을 경우 내부 텍스트만 추출
    .trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform') || 'youtube';
  const subCategory = searchParams.get('subCategory') || '';
  const region = searchParams.get('region') || 'KR';

  try {
    // 🔴 1. [유튜브 인기 급상승]
    if (platform === 'youtube') {
      const YOUTUBE_KEY = 'AIzaSyCv2B_hgNMbpFEnwbQojgpb1fG5CNYGUzE';
      let YOUTUBE_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=${region}&maxResults=20&key=${YOUTUBE_KEY}`;
      
      if (subCategory) {
        YOUTUBE_URL += `&videoCategoryId=${subCategory}`;
      }

      const res = await fetch(YOUTUBE_URL, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error('Youtube API fetch failed');
      const data = await res.json();

      if (!data.items) return NextResponse.json([]);

      const youtubeTrends = data.items.map((item: any) => ({
        name: decodeXmlEntities(item.snippet.title),
        views: parseInt(item.statistics.viewCount) || 0,
        actualViews: parseInt(item.statistics.viewCount) || 0,
        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || '',
        url: `https://youtube.com/watch?v=${item.id}`,
        channelTitle: item.snippet.channelTitle,
        platform: 'youtube'
      }));

      return NextResponse.json(youtubeTrends);
    }

    // 🌐 2. [구글 트렌드 RSS] (연관 뉴스 3개, URL 및 특수문자 처리 완벽 반영)
    if (platform === 'google') {
      const geoMap: { [key: string]: string } = { KR: 'KR', US: 'US', JP: 'JP', GB: 'GB' };
      const targetGeo = geoMap[region] || 'KR';
      const GOOGLE_RSS_URL = `https://trends.google.co.kr/trending/rss?geo=${targetGeo}`;

      const res = await fetch(GOOGLE_RSS_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Google RSS fetch failed');
      const xmlText = await res.text();

      // 간단 정규식을 이용해 XML에서 <item> 단위 분리 및 수집
      const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g) || [];

      const googleTrends = itemMatches.map((itemXml) => {
        const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
        const trafficMatch = itemXml.match(/<ht:approx_traffic>([\s\S]*?)<\/ht:approx_traffic>/);
        const pictureMatch = itemXml.match(/<ht:picture>([\s\S]*?)<\/ht:picture>/);

        const rawTitle = titleMatch ? titleMatch[1] : 'Unknown Trend';
        const trafficStr = trafficMatch ? trafficMatch[1] : '0';
        const thumbnail = pictureMatch ? pictureMatch[1] : '';

        // 📰 연관 뉴스 아이템 최대 3개 매핑 추출 영역
        const newsList: { title: string; url: string }[] = [];
        const newsItemMatches = itemXml.match(/<ht:news_item>([\s\S]*?)<\/ht:news_item>/g) || [];

        // 최대 3개 순회
        const maxNewsCount = Math.min(newsItemMatches.length, 3);
        for (let i = 0; i < maxNewsCount; i++) {
          const newsXml = newsItemMatches[i];
          const newsTitleMatch = newsXml.match(/<ht:news_item_title>([\s\S]*?)<\/ht:news_item_title>/);
          const newsUrlMatch = newsXml.match(/<ht:news_item_url>([\s\S]*?)<\/ht:news_item_url>/);

          if (newsTitleMatch) {
            newsList.push({
              title: decodeXmlEntities(newsTitleMatch[1]), // 특수문자 디코딩
              url: newsUrlMatch ? newsUrlMatch[1].trim() : 'https://news.google.com'
            });
          }
        }

        return {
          name: decodeXmlEntities(rawTitle), // 키워드 특수문자 디코딩
          views: parseInt(trafficStr.replace(/[^0-9]/g, '')) || 100,
          actualViews: parseInt(trafficStr.replace(/[^0-9]/g, '')) || 0,
          displayTraffic: trafficStr,
          thumbnail: thumbnail,
          newsList: newsList, // 정제된 3개 뉴스 배열 전달
          url: `https://trends.google.co.kr/trends/explore?q=${encodeURIComponent(rawTitle)}&geo=${targetGeo}`,
          platform: 'google'
        };
      });

      return NextResponse.json(googleTrends);
    }

    // 🔥 3. [레딧 인기 피드]
    if (platform === 'reddit') {
      const targetSub = subCategory ? `r/${subCategory}` : 'r/all';
      const REDDIT_URL = `https://www.reddit.com/${targetSub}/hot.json?limit=25`;

      const res = await fetch(REDDIT_URL, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PopularTrendRadar/1.0' },
        next: { revalidate: 60 }
      });

      if (!res.ok) throw new Error('Reddit Fetch Failed');
      const redditData = await res.json();

      if (!redditData.data?.children) return NextResponse.json([]);

      const redditTrends = redditData.data.children.map((child: any) => {
        const info = child.data;
        return {
          name: decodeXmlEntities(info.title),
          views: info.score || 0,
          actualViews: info.ups || 0,
          author: info.author || 'unknown',
          ups: info.ups || 0,
          numComments: info.num_comments || 0,
          url: info.url ? info.url : `https://www.reddit.com${info.permalink}`,
          thumbnail: info.thumbnail && info.thumbnail.startsWith('http') ? info.thumbnail : '',
          platform: 'reddit'
        };
      });

      return NextResponse.json(redditTrends);
    }

    return NextResponse.json({ error: 'Unsupported platform' }, { status: 400 });

  } catch (error: any) {
    console.error('API Route Error Handler:', error);
    // 서버 오류 시 클라이언트 대시보드가 크래시 나지 않도록 빈 배열로 우아하게 대체
    return NextResponse.json([], { status: 200 });
  }
}