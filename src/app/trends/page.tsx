// src/app/trend/page.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';

const PLATFORMS = [
  {
    label: '🔴 유튜브', id: 'youtube', color: '#ef4444',
    subs: [
      { label: '전체 인기 동영상', id: '' },
      { label: '🎵 노래/음악', id: '10' },
      { label: '🎮 게임 비디오', id: '20' },
      { label: '🎬 엔터테인먼트', id: '24' }
    ]
  },
  {
    label: '🌐 구글 트렌드', id: 'google', color: '#4285f4',
    subs: [
      { label: '⏱️ 4시간 기준', id: '4h' },
      { label: '📅 24시간 기준 (기본)', id: '24h' },
      { label: '⏳ 48시간 기준', id: '48h' },
      { label: '🗓️ 지난 7일', id: '7d' }
    ]
  },
  {
    label: '🔥 레딧', id: 'reddit', color: '#f97316',
    subs: [
      { label: '인기 전체(All)', id: '' },
      { label: '👾 게임갤', id: 'gaming' },
      { label: '🎬 영화갤', id: 'movies' }
    ]
  },
  {
    label: '🎮 트위치', id: 'twitch', color: '#a855f7',
    subs: [
      { label: '종합 라이브 방송', id: '' }
    ]
  },
  {
    label: '🎵 틱톡', id: 'tiktok', color: '#00f2fe',
    subs: [
      { label: '실시간 트렌딩 챌린지', id: '' }
    ]
  },
  {
    label: '🟢 네이버', id: 'naver', color: '#22c55e',
    subs: [
      { label: '통합 인기 검색어', id: '' },
      { label: '👗 패션/의류 쇼핑', id: 'fashion' },
      { label: '💻 IT/가전 디지털', id: 'tech' }
    ]
  }
];

const REGIONS = [
  { label: '🇰🇷 한국', id: 'KR' },
  { label: '🇺🇸 미국', id: 'US' },
  { label: '🇯🇵 일본', id: 'JP' }
];

interface TreemapItem {
  name: string;
  actualViews?: number;
  displayTraffic?: string;
  thumbnail?: string;
  newsList?: NewsItem[]; // ⭐ 구글 트렌드 연관 뉴스 기사 타이틀 필드 추가
  platform?: string;
  videoId?: string;
  url?: string;
  author?: string;
  ups?: number;
  numComments?: number;
  [key: string]: any;
}

export interface NewsItem {
  title: string;
  snippet?: string;
  url?: string;
}

interface LayoutResult extends TreemapItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Squarified Treemap 알고리즘
function computeTreemap(data: TreemapItem[], width: number, height: number): LayoutResult[] {
  if (!data || data.length === 0 || width <= 0 || height <= 0) return [];

  const totalValue = data.reduce((acc, cur) => acc + (cur.actualViews || 100), 0);
  if (totalValue === 0) return [];

  const totalArea = width * height;
  const items = data.map(item => ({
    ...item,
    area: ((item.actualViews || 100) / totalValue) * totalArea
  })).sort((a, b) => b.area - a.area);

  const results: LayoutResult[] = [];
  let rx = 0, ry = 0, rw = width, rh = height;

  function getWorstRatio(row: any[], length: number) {
    if (row.length === 0) return Infinity;
    let sum = 0;
    let maxArea = -Infinity;
    let minArea = Infinity;
    for (const item of row) {
      sum += item.area;
      if (item.area > maxArea) maxArea = item.area;
      if (item.area < minArea) minArea = item.area;
    }
    const sumSq = sum * sum;
    const lenSq = length * length;
    return Math.max((lenSq * maxArea) / sumSq, sumSq / (lenSq * minArea));
  }

  function layoutRow(row: any[], length: number) {
    const isHorizontal = rw >= rh;
    const rowAreaSum = row.reduce((acc, item) => acc + item.area, 0);
    if (rowAreaSum === 0) return;

    const rowThickness = rowAreaSum / length;
    let currentOffset = isHorizontal ? ry : rx;

    for (const item of row) {
      const itemLength = item.area / rowThickness;
      if (isHorizontal) {
        results.push({
          ...item,
          x: rx,
          y: currentOffset,
          w: rowThickness,
          h: itemLength
        });
        currentOffset += itemLength;
      } else {
        results.push({
          ...item,
          x: currentOffset,
          y: ry,
          w: itemLength,
          h: rowThickness
        });
        currentOffset += itemLength;
      }
    }

    if (isHorizontal) {
      rx += rowThickness;
      rw = Math.max(0, rw - rowThickness);
    } else {
      ry += rowThickness;
      rh = Math.max(0, rh - rowThickness);
    }
  }

  let i = 0;
  let currentRow: any[] = [];

  while (i < items.length) {
    const item = items[i];
    const length = Math.min(rw, rh);

    if (length <= 0) break;

    const ratioBefore = getWorstRatio(currentRow, length);
    const ratioAfter = getWorstRatio([...currentRow, item], length);

    if (currentRow.length === 0 || ratioAfter <= ratioBefore) {
      currentRow.push(item);
      i++;
    } else {
      layoutRow(currentRow, length);
      currentRow = [];
    }
  }

  if (currentRow.length > 0) {
    const length = Math.min(rw, rh);
    layoutRow(currentRow, length);
  }

  return results;
}

function RedditLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`${className} text-orange-500 fill-current`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.23-1.72l1.32-4.17 4.31.91c.03.95.82 1.71 1.79 1.71 1 0 1.8-0.81 1.8-1.8s-0.81-1.8-1.8-1.8c-0.74 0-1.38.47-1.64 1.12l-4.78-1.01c-0.24-0.05-0.48.09-0.55.33l-1.5 4.74c-2.43.06-4.67.71-6.33 1.73-0.56-0.75-1.45-1.22-2.4-1.22-1.65 0-3 1.35-3 3 0 1.12.63 2.1 1.56 2.62-0.04.19-0.06.39-0.06.59 0 4.14 4.7 7.5 10.5 7.5s10.5-3.36 10.5-7.5c0-0.2-0.02-0.4-0.06-0.59.92-0.52 1.56-1.5 1.56-2.62zm-18 1c0-0.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5zm11 4.5c-1.77 1.77-5.13 1.77-6.9 0-0.15-0.15-0.15-0.39 0-0.54.15-0.15.39-0.15.54 0 1.48 1.48 4.33 1.48 5.81 0 .15-0.15.39-0.15.54 0 .15.15.15.39 0 .54zm-1.5-3c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"/>
    </svg>
  );
}

function YoutubeLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`${className} text-red-600 fill-current`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function GoogleLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.14 1 1.2 5.92 1.2 12s4.94 11 11.04 11c6.363 0 10.596-4.477 10.596-10.766 0-.726-.078-1.282-.175-1.949H12.24z"/>
    </svg>
  );
}

function isValidThumbnail(url?: string) {
  if (!url) return false;
  const invalidTokens = ['self', 'default', 'nsfw', 'image', 'spoiler'];
  return !invalidTokens.includes(url.trim().toLowerCase()) && url.startsWith('http');
}

export default function TrendPage() {
  const [currentPlatform, setCurrentPlatform] = useState('youtube');
  const [currentSub, setCurrentSub] = useState('');
  const [currentRegion, setCurrentRegion] = useState('KR');

  const [trends, setTrends] = useState<TreemapItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [trendDetail, setTrendDetail] = useState<TreemapItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 700, height: 500 });

  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState<any | null>(null);

  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedUser = localStorage.getItem('trend_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    fetchTrendData();
    setTrendDetail(null);
    setBrokenImages(new Set());
  }, [currentPlatform, currentSub, currentRegion]);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: width || 700, height: height || 500 });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [currentPlatform]);

  const fetchTrendData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/trends?platform=${currentPlatform}&subCategory=${currentSub}&region=${currentRegion}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setTrends(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformChange = (platformId: string) => {
    setCurrentPlatform(platformId);
    if (platformId === 'google') {
      setCurrentSub('24h');
    } else {
      const plat = PLATFORMS.find(p => p.id === platformId);
      if (plat && plat.subs.length > 0) {
        setCurrentSub(plat.subs[0].id);
      } else {
        setCurrentSub('');
      }
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModal === 'login') {
      if (!username || !password) return;
      const fakeUser = { username, nickname: nickname || username.split('@')[0] };
      localStorage.setItem('trend_user', JSON.stringify(fakeUser));
      setUser(fakeUser);
    } else {
      if (!username || !password || !nickname) return;
      const fakeUser = { username, nickname };
      localStorage.setItem('trend_user', JSON.stringify(fakeUser));
      setUser(fakeUser);
    }
    setAuthModal(null);
    setUsername('');
    setPassword('');
    setNickname('');
  };

  const handleLogout = () => {
    localStorage.removeItem('trend_user');
    setUser(null);
  };

  const layoutedTrends = useMemo(() => {
    if (currentPlatform === 'reddit') return [];
    return computeTreemap(trends, dimensions.width, dimensions.height);
  }, [trends, dimensions, currentPlatform]);

  const activeColor = PLATFORMS.find(p => p.id === currentPlatform)?.color || '#ef4444';

  return (
    <div className="min-h-screen bg-[#070a12] text-gray-100 flex flex-col font-sans select-none">
      {/* HEADER BAR */}
      <header className="bg-[#0f1424] border-b border-gray-850 px-6 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center font-black text-black text-base shadow-lg">
            M
          </div>
          <div>
            <h1 className="text-sm font-black text-white tracking-wide uppercase">Trend Map</h1>
            <p className="text-[10px] text-gray-500 font-bold -mt-0.5 tracking-wider">REALTIME PLATFORM RADAR</p>
          </div>
        </div>

        <div className="flex bg-gray-900/90 p-1 rounded-xl border border-gray-800 shadow-inner max-w-xl overflow-x-auto">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => handlePlatformChange(p.id)}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
                currentPlatform === p.id
                  ? 'bg-gray-800 text-white shadow-md border border-gray-750'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-300 bg-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-850">
                👤 {user.nickname}님
              </span>
              <button onClick={handleLogout} className="text-[11px] font-bold text-gray-400 hover:text-red-400 bg-gray-900/50 hover:bg-red-950/20 px-2.5 py-1.5 rounded-lg border border-gray-850 transition-all">
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => setAuthModal('login')} className="text-xs font-bold text-black bg-yellow-400 hover:bg-yellow-500 px-3.5 py-1.5 rounded-lg shadow-md transition-all">
                로그인
              </button>
              <button onClick={() => setAuthModal('signup')} className="text-xs font-bold text-gray-300 bg-gray-900 hover:bg-gray-850 px-3.5 py-1.5 rounded-lg border border-gray-800 transition-all">
                회원가입
              </button>
            </div>
          )}
        </div>
      </header>

      {/* SUB CONTROLS */}
      <div className="bg-[#0b0f1d] border-b border-gray-900 px-6 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {PLATFORMS.find(p => p.id === currentPlatform)?.subs.map(s => (
            <button
              key={s.id}
              onClick={() => setCurrentSub(s.id)}
              className={`px-3 py-1 rounded-md font-bold text-[11px] transition-all ${
                currentSub === s.id
                  ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                  : 'bg-gray-900/40 text-gray-500 hover:text-gray-300 border border-transparent'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-gray-900/50 p-0.5 rounded-lg border border-gray-850 whitespace-nowrap">
          {REGIONS.map(r => (
            <button
              key={r.id}
              onClick={() => setCurrentRegion(r.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                currentRegion === r.id
                  ? 'bg-gray-800 text-white border border-gray-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN SCREEN PANELS */}
      <main className="flex-1 bg-[#0f1424] m-6 rounded-xl border border-gray-850 p-6 flex gap-6 overflow-hidden">
        {/* LEFT SIDE: VISUALIZATION AREA OR LIST VIEW */}
        <div className="flex-1 bg-gray-950/60 rounded-xl border border-gray-900 relative flex flex-col p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColor }} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {PLATFORMS.find(p => p.id === currentPlatform)?.label.split(' ')[1]} 실시간 트렌드 리포트
              </span>
            </div>
            <span className="text-[10px] text-gray-600 font-medium">
              {currentPlatform === 'reddit' ? '※ 최신 스레드 목록 피드입니다.' : '※ 사각형 면적은 강도를 나타냅니다. (클릭 시 상세조회)'}
            </span>
          </div>

          <div ref={containerRef} className="flex-1 relative bg-[#070a12] rounded-lg overflow-hidden border border-gray-900">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/20 backdrop-blur-xs z-10">
                <div 
                  className="w-7 h-7 border-2 border-t-transparent rounded-full animate-spin mb-3" 
                  style={{ borderColor: activeColor }}
                />
                <p className="text-xs font-bold text-gray-400 tracking-wide">실시간 데이터 수집 레이더 가동 중...</p>
              </div>
            ) : trends.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl mb-2">⚠️</span>
                <p className="text-xs text-gray-500 font-bold">표시할 트렌드 데이터가 존재하지 않습니다.</p>
              </div>
            ) : currentPlatform === 'reddit' ? (
              /* ==================== [레딧] 피드 리스트 UI ==================== */
              <div className="w-full h-full overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {trends.map((item, idx) => {
                  const isSelected = trendDetail?.name === item.name;
                  const hasValidThumb = isValidThumbnail(item.thumbnail) && !brokenImages.has(item.name);

                  return (
                    <div
                      key={idx}
                      onClick={() => setTrendDetail(item)}
                      className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex gap-4 ${
                        isSelected
                          ? 'bg-orange-950/20 border-orange-500 shadow-md'
                          : 'bg-[#0f1424]/60 border-gray-850 hover:border-gray-700 hover:bg-[#0f1424]'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-lg bg-gray-900 overflow-hidden shrink-0 border border-gray-800 flex items-center justify-center">
                        {hasValidThumb ? (
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={() => {
                              setBrokenImages(prev => {
                                const next = new Set(prev);
                                next.add(item.name);
                                return next;
                              });
                            }}
                          />
                        ) : (
                          <RedditLogoIcon className="w-7 h-7 opacity-80" />
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-sm font-bold bg-orange-600/10 text-orange-400 border border-orange-500/10">
                              r/{item.subCategory || currentSub || 'all'}
                            </span>
                            <span className="text-[10px] text-gray-500 font-semibold">
                              Posted by u/{item.author || 'unknown'}
                            </span>
                          </div>
                          <h3 className="text-xs font-bold text-white leading-snug truncate hover:text-clip hover:whitespace-normal line-clamp-2">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mt-2">
                          <span className="flex items-center gap-1 text-orange-400">
                            🔺 {item.ups?.toLocaleString() || 0}
                          </span>
                          <span className="flex items-center gap-1 text-blue-400">
                            💬 {item.numComments?.toLocaleString() || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ==================== [유튜브 / 구글 등] 트리맵 UI (뉴스 연관 타이틀 출력 최적화) ==================== */
              <div className="w-full h-full relative">
                {layoutedTrends.map((item, idx) => {
                  const isSelected = trendDetail?.name === item.name;
                  const hasValidThumb = isValidThumbnail(item.thumbnail) && !brokenImages.has(item.name);

                  return (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.w}px`,
                        height: `${item.h}px`,
                        border: '1px solid #070a12',
                      }}
                      onClick={() => setTrendDetail(item)}
                      className={`overflow-hidden flex flex-col justify-between transition-all duration-150 cursor-pointer relative group ${
                        isSelected
                          ? 'ring-2 ring-yellow-400 ring-inset z-10'
                          : 'bg-[#121829] hover:bg-[#161e33]'
                      }`}
                    >
                      {/* 사각형 배경 썸네일 */}
                      <div className="absolute inset-0 w-full h-full z-0 opacity-75 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-gray-950/40">
                        {hasValidThumb ? (
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={() => {
                              setBrokenImages(prev => {
                                const next = new Set(prev);
                                next.add(item.name);
                                return next;
                              });
                            }}
                          />
                        ) : (
                          <div className="opacity-40 scale-125">
                            {currentPlatform === 'youtube' && <YoutubeLogoIcon className="w-8 h-8" />}
                            {currentPlatform === 'google' && <GoogleLogoIcon className="w-8 h-8 text-gray-400" />}
                          </div>
                        )}
                      </div>

                      {/* 전면 텍스트 정보 오버레이 레이어 */}
                      <div className="p-2.5 relative z-10 flex flex-col justify-between h-full w-full bg-gradient-to-b from-gray-950/70 via-gray-950/40 to-gray-950/80">
                        <div className="min-w-0 space-y-1">
                          {/* 메인 키워드 토픽 */}
                          <p className="text-[14px] font-black tracking-tight leading-tight text-white line-clamp-2 break-all drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">
                            {item.name}
                          </p>
                          {/* ⭐ 연관 뉴스 타이틀 조건부 출력 (사각형 면적이 어느 정도 크고 데이터가 있을 때만 노출) */}
                          {currentPlatform === 'google' && item.newsTitle && item.w > 120 && item.h > 80 && (
                            <p className="text-[9px] font-medium text-gray-300 line-clamp-2 break-all opacity-85 group-hover:opacity-100 transition-opacity leading-normal bg-black/30 p-1 rounded-sm border border-white/5 shadow-xs">
                              📰 {item.newsTitle}
                            </p>
                          )}
                        </div>
                        <div className="flex justify-between items-end mt-1">
                          <span className="text-[12px] font-black text-gray-300 bg-black/50 px-1 py-0.5 rounded-sm backdrop-blur-xs">
                            {item.displayTraffic || `${item.actualViews?.toLocaleString()} views`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: INFORMATION PANEL (우측 상세 인스펙터 패널) */}
        <div className="w-80 bg-gray-950/40 rounded-xl border border-gray-900 p-5 flex flex-col shadow-xl shrink-0">
          <div className="border-b border-gray-900 pb-3 mb-4">
            <h2 className="text-xs font-black text-white tracking-wider uppercase">TREND RADAR INSPECTOR</h2>
            <p className="text-[9px] text-gray-500 font-bold tracking-wider uppercase mt-0.5">OBJECT REALTIME METRICS</p>
          </div>

          {trendDetail ? (
            <div className="flex-1 flex flex-col justify-between h-full">
              <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-1">
                <div className="w-full h-40 bg-gray-900 rounded-xl overflow-hidden border border-gray-850 flex items-center justify-center relative shadow-inner">
                  {(() => {
                    const hasValidThumb = isValidThumbnail(trendDetail.thumbnail) && !brokenImages.has(trendDetail.name);
                    return hasValidThumb ? (
                      <img
                        src={trendDetail.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={() => {
                          setBrokenImages(prev => {
                            const next = new Set(prev);
                            next.add(trendDetail.name);
                            return next;
                          });
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        {currentPlatform === 'reddit' && <RedditLogoIcon className="w-12 h-12 opacity-80" />}
                        {currentPlatform === 'youtube' && <YoutubeLogoIcon className="w-12 h-12 opacity-80" />}
                        {currentPlatform === 'google' && <GoogleLogoIcon className="w-12 h-12 text-gray-500 opacity-80" />}
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">No Thumbnail</span>
                      </div>
                    );
                  })()}
                  <span className="absolute bottom-2.5 right-2.5 text-[9px] bg-black/70 text-white font-black px-2 py-1 rounded-md border border-gray-800 backdrop-blur-xs uppercase tracking-wider">
                    {currentPlatform}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Keyword</span>
                  <h2 className="text-lg font-black text-white tracking-tight break-all">
                    {trendDetail.name}
                  </h2>
                </div>

                {/* ⭐ 변경 및 반영된 연관 뉴스 3개 링크 박스 영역 */}
                {trendDetail.newsList && trendDetail.newsList.length > 0 && (
                  <div className="mt-3 bg-gray-950/60 border border-gray-850 rounded-lg p-3 flex flex-col gap-2.5">
                    <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1">
                      📰 실시간 연관 뉴스 맥락 (최대 3개)
                    </p>
                    <div className="flex flex-col gap-2">
                      {trendDetail.newsList.map((news, idx) => (
                        <a
                          key={idx}
                          href={news.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block text-xs text-gray-300 font-medium leading-relaxed hover:text-yellow-400 border-b border-gray-900 last:border-0 pb-1.5 last:pb-0 transition-colors"
                        >
                          <div className="flex items-start gap-1.5">
                            <span className="text-gray-500 font-mono text-[10px] mt-0.5 group-hover:text-yellow-500">
                              {idx + 1}.
                            </span>
                            <span className="underline decoration-gray-700 group-hover:decoration-yellow-500/50 break-all">
                              {news.title}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-gray-900/60 border border-gray-900 p-2.5 rounded-lg">
                    <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">
                      {currentPlatform === 'reddit' ? 'Upvotes' : 'Traffic Weight'}
                    </span>
                    <span className="text-xs font-black text-yellow-400 mt-0.5 block">
                      {currentPlatform === 'reddit'
                        ? `🔺 ${trendDetail.ups?.toLocaleString() || 0}`
                        : trendDetail.displayTraffic || trendDetail.actualViews?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  <div className="bg-gray-900/60 border border-gray-900 p-2.5 rounded-lg">
                    <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">
                      {currentPlatform === 'reddit' ? 'Comments' : 'Radar Identity'}
                    </span>
                    <span className="text-xs font-black text-gray-300 mt-0.5 block truncate">
                      {currentPlatform === 'reddit'
                        ? `💬 ${trendDetail.numComments?.toLocaleString() || 0}`
                        : trendDetail.videoId ? `ID: ${trendDetail.videoId}` : 'Global Node'}
                    </span>
                  </div>
                </div>

                {currentPlatform === 'reddit' && (
                  <div className="bg-orange-950/10 border border-orange-900/20 p-3 rounded-lg space-y-1">
                    <div className="text-[9px] text-orange-400/70 font-black tracking-wider uppercase">SUBREDDIT INHERITANCE</div>
                    <div className="text-xs font-bold text-gray-200">r/{trendDetail.subCategory || 'all'}</div>
                    <div className="text-[10px] text-gray-500 mt-1">Author: u/{trendDetail.author || 'unknown'}</div>
                  </div>
                )}
              </div>

              {/* ACTION LINKS */}
              <div className="pt-2 mt-auto">
                {currentPlatform === 'reddit' && (
                  <a
                    href={trendDetail.url || `https://www.reddit.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-center rounded-lg font-bold text-xs transition-all shadow-md"
                  >
                    🔥 레딧 원문 스레드 이동하기
                  </a>
                )}

                {currentPlatform === 'google' && (
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(trendDetail.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg font-bold text-xs transition-all shadow-md"
                  >
                    🌐 구글에서 검색 결과 확인하기
                  </a>
                )}

                {currentPlatform === 'youtube' && trendDetail.videoId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trendDetail.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg font-bold text-xs transition-all shadow-md"
                  >
                    📺 유튜브 이동하기
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center border border-dashed border-gray-900 rounded-xl p-4">
              <span className="text-2xl opacity-40 mb-1.5">📡</span>
              <p className="text-[11px] text-gray-500 font-bold">인스펙터 대기 상태</p>
              <p className="text-[9px] text-gray-600 font-semibold mt-0.5">왼쪽 트렌드 노드를 선택하시면<br />실시간 매트릭스가 출력됩니다.</p>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER SYSTEM STATUS */}
      <footer className="bg-[#0b0f1d] border-t border-gray-900 px-6 py-2.5 flex items-center justify-between text-[10px] font-bold text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> GRID MATRIX STATUS: ACTIVE</span>
          <span>SYNC INTERVAL: 15MIN</span>
        </div>
        <div>© 2026 TREND MAP ENGINE. ALL RIGHTS RESERVED.</div>
      </footer>

      {/* AUTH MODAL */}
      {authModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-[#0f1424] border border-gray-850 w-80 p-5 rounded-xl shadow-2xl relative">
            <h3 className="text-xs font-black text-white tracking-wider uppercase mb-4">
              {authModal === 'login' ? 'SECURE SYSTEM LOGIN' : 'CREATE RADAR ACCOUNT'}
            </h3>
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email / Username</label>
                <input type="email" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden" placeholder="user@example.com" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden" placeholder="••••••••" />
              </div>
              {authModal === 'signup' && (
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Nickname</label>
                  <input type="text" required value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden" placeholder="표시될 이름" />
                </div>
              )}
              <button type="submit" className="w-full bg-yellow-400 text-black font-bold text-xs py-2.5 rounded-lg hover:bg-yellow-500 transition-all shadow-md mt-1">
                {authModal === 'login' ? '시스템 접속' : '계정 활성화'}
              </button>
            </form>
            <button onClick={() => setAuthModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 font-bold text-xs">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}