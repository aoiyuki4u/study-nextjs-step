"use client";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';

interface Props {
  serverUrl: string;
  extension: string;
  totalFrames: number;
  baseImage: string;
  modelName:string;
}

export default function Car360Images({ serverUrl, extension, totalFrames, baseImage, modelName }: Props) {
  const [isMode360, setIsMode360] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // 회전 선택된 이미지 index
  const [isDragging, setIsDragging] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const startX = useRef(0);

  const handleStart = async () => {
    // if (!selectedCar || isPreloading) return;
    
    setIsPreloading(true);
    setPreloadProgress(0);

    let loadedCount = 0;

    const promises = Array.from({ length: totalFrames }).map((_, i) => {
      return new Promise((resolve) => {
        const img = new window.Image(); // 이미지 객체 생성
        const frameNumber = String(i + 1).padStart(3, '0');
        // 이미지이름 : 001~060
        // str.padStart(targetLength[, padString]) : 문자열의 앞을 채우는 함수
        // targetLength:문자열 길이, padString:채우는 문자열
        img.src = `${serverUrl}/${frameNumber}.${extension}`;
        
        img.onload = () => {
          loadedCount++;
          setPreloadProgress(Math.floor((loadedCount / totalFrames) * 100));
          resolve(null);
        };
        img.onerror = resolve;
      });
    });

    await Promise.all(promises); // 이미지 모두 다운 대기
    setTimeout(() => { setIsMode360(true); setIsPreloading(false); }, 500);
  };

  const get360ImageUrl = (index: number) => {
    const frameNumber = String(index + 1).padStart(3, '0');
    // str.padStart(targetLength[, padString]) : 문자열의 앞을 채우는 함수
    // targetLength:문자열 길이, padString:채우는 문자열
    return `${serverUrl}/${frameNumber}.${extension}`;
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    // setPointerCapture:pointerdown 이벤트 내에서 사용되어, 포인터가 해당 요소를 벗어나도 pointerup 발생 전까지 이벤트가 계속 해당 요소로 전송
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isMode360) return;

    const currentX = e.clientX;
    const diff = startX.current - currentX;

    if (Math.abs(diff) > 5) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % totalFrames);
      } else {
        setCurrentIndex((prev) => (prev - 1 + totalFrames) % totalFrames);
      }
      startX.current = currentX;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    //releasePointerCapture:setPointerCapture 해제
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl shadow-inner bg-slate-100">
      {isMode360 ? (
        <div 
          className="w-full h-full touch-none cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <Image
            src={get360ImageUrl(currentIndex)}
            alt={modelName}
            fill
            className="object-contain pointer-events-none"
            unoptimized={isMode360} 
            // unoptimized : Nextjs Image 최적화 하지 말고 원본 사용
            priority // priority : Lazy Loading 에서 제외 즉시 로드
          />
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <img src={baseImage} alt={modelName} className="w-full h-full object-contain" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5">
            {isPreloading ? (
              <div className="w-48 space-y-2 bg-white/80 p-4 rounded-xl shadow-lg">
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all" style={{ width: `${preloadProgress}%` }} />
                </div>
                <p className="text-[10px] text-center font-bold text-slate-600">LOADING {preloadProgress}%</p>
              </div>
            ) : (
              <button 
                onClick={handleStart}
                className="group flex flex-col items-center gap-2 bg-white/95 p-6 rounded-full shadow-2xl hover:scale-110 transition-transform border border-slate-100"
              >
                <span className="text-xs font-black tracking-widest text-slate-800">360° VIEW</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}