"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  serverUrl: string;
  extension: string;
  totalFrames: number;
  baseImage: string;
  modelName:string;
}

export default function Car360Canvas({ serverUrl, extension, totalFrames, baseImage, modelName }: Props) {
  const [isMode360, setIsMode360] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]); // 이미지 객체 저장
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMode360(false);
    imagesRef.current = [];
    setCurrentIndex(0);
  }, [serverUrl]);

  const handleStart = async () => {
    setIsPreloading(true);
    setPreloadProgress(0);
    let loadedCount = 0;

    const promises = Array.from({ length: totalFrames }).map((_, i) => {
      return new Promise((resolve) => {
        const img = new window.Image();
        const frameNumber = String(i + 1).padStart(3, '0');
        img.src = `${serverUrl}/${frameNumber}.${extension}`;
        img.onload = () => {
          imagesRef.current[i] = img;
          loadedCount++;
          setPreloadProgress(Math.floor((loadedCount / totalFrames) * 100));
          resolve(null);
        };
        img.onerror = resolve;
      });
    });

    await Promise.all(promises);
    setTimeout(() => { setIsMode360(true); setIsPreloading(false); }, 500);
  };

  const drawCanvas = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    canvas.width = rect.width * window.devicePixelRatio;//devicePixelRatio:고해상도모니터지원(레티나)
    canvas.height = rect.height * window.devicePixelRatio;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    //drawImage(이미지객체, 이미지좌표x,y, 이미지너비,높이, 캔버스좌표x,y, 캔버스너비,높이)
    ctx.drawImage(img, 0, 0, img.width, img.height, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  };

  useEffect(() => {
    if (isMode360) {
      const timer = requestAnimationFrame(() => drawCanvas(currentIndex));//requestAnimationFrame:애니메이션용 프레임 전용함수
      return () => cancelAnimationFrame(timer);
    }
  }, [currentIndex, isMode360]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    // setPointerCapture:pointerdown 이벤트 내에서 사용됨, 포인터가 해당 요소를 벗어나도 pointerup 발생 전까지 이벤트가 계속 해당 요소로 전송
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 5) {
      if (diff > 0) setCurrentIndex((prev) => (prev + 1) % totalFrames);
      else setCurrentIndex((prev) => (prev - 1 + totalFrames) % totalFrames);
      startX.current = e.clientX;
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
          <canvas ref={canvasRef} className="w-full h-full block" />
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