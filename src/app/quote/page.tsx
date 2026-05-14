"use client";
import { useEffect, useState, useRef } from "react";
import { useCarStore } from "@/store/useCarStore";
import Image from 'next/image';

export default function CarEstimation(){
  const { cars, fetchCars, selectedCar, setCar, selectedOptionIds, toggleOption, isLoading } = useCarStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMode360, setIsMode360] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // 회전 선택된 이미지 index
  const [isDragging, setIsDragging] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);

  const startX = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null); // 캔버스 접근 변수
  const imagesRef = useRef<HTMLImageElement[]>([]); // 이미지 객체 저장
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const drawCanvas = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect(); // 캔버스 화면 크기 측정
    // devicePixelRatio:물리적px(ex.레티나)
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 이미지 비율
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio);

    const w = img.width * ratio;
    const h = img.height * ratio;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    // drawImage(이미지객체, 이미지좌표x,y, 이미지너비,높이, 캔버스좌표x,y, 캔버스너비,높이)
    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, w, h);    
  };

  useEffect(() => {
    if (isMode360) {
      drawCanvas(currentIndex);
    }
  }, [currentIndex, isMode360]);

  useEffect(() => {
    const handleResize = () => {
      if (isMode360) drawCanvas(currentIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMode360, currentIndex]);

  //선택된 차량 옵션 > filter로 선택된 옵션만 > reduce 필터링된 배열 돌며 가격을 합산
  const totalOptionPrice = selectedCar?.options
    .filter((opt) => selectedOptionIds.includes(opt.opt_id))
    .reduce((acc, cur) => acc + cur.opt_price, 0) || 0;
  const totalAmount = (selectedCar?.base_price || 0) + totalOptionPrice;

  // 이미지 로딩
  const handleStart360 = async () => {
    if (!selectedCar || isPreloading) return;
    
    setIsPreloading(true);
    setPreloadProgress(0);
    imagesRef.current = []; // 이전 이미지 객체 초기화

    const total = selectedCar.total_frames;
    let loadedCount = 0;

    const promises = Array.from({ length: total }).map((_, i) => {
      return new Promise((resolve) => {
        const img = new window.Image(); // 이미지 객체 생성
        const frameNumber = String(i + 1).padStart(3, '0');
        // 이미지이름 : 001~060
        // str.padStart(targetLength[, padString]) : 문자열의 앞을 채우는 함수
        // targetLength:문자열 길이, padString:채우는 문자열
        img.src = `${selectedCar.img_server_url}/${frameNumber}.${selectedCar.img_extension}`;
        
        img.onload = () => {
          imagesRef.current[i] = img;
          loadedCount++;
          setPreloadProgress(Math.floor((loadedCount / total) * 100));
          resolve(null);
        };
        img.onerror = resolve;
      });
    });

    await Promise.all(promises); // 이미지 모두 다운 대기

    setTimeout(() => {setIsMode360(true);}, 500);
    setTimeout(() => {setIsPreloading(false);}, 600);
  };
  
  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if (!isDragging || !isMode360 || !selectedCar) return;
  //   const diff = startX.current - e.clientX;
  //   if (Math.abs(diff) > 5) {
  //     if (diff > 0) {
  //       setCurrentIndex(prev => (prev + 1) % selectedCar.total_frames);
  //     } else {
  //       setCurrentIndex(prev => (prev - 1 + selectedCar.total_frames) % selectedCar.total_frames);
  //     }
  //     startX.current = e.clientX;
  //   }
  // }; 
  // const handleTouchStart = (e: React.TouchEvent) => {
  //   setIsDragging(true);
  //   startX.current = e.touches[0].clientX;
  // };
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    // setPointerCapture:pointerdown 이벤트 내에서 사용되어, 포인터가 해당 요소를 벗어나도 pointerup 발생 전까지 이벤트가 계속 해당 요소로 전송
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isMode360 || !selectedCar) return;

    const currentX = e.clientX;
    const diff = startX.current - currentX;

    if (Math.abs(diff) > 5) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % selectedCar.total_frames);
      } else {
        setCurrentIndex((prev) => (prev - 1 + selectedCar.total_frames) % selectedCar.total_frames);
      }
      startX.current = currentX;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    //releasePointerCapture:setPointerCapture 해제
  };

  // // MO
  // const handleTouchMove = (e: React.TouchEvent) => {
  //   if (!isDragging || !isMode360 || !selectedCar) return;
    
  //   // 드레그 시 상하 스크롤 방지
  //   if (e.cancelable) e.preventDefault();

  //   const currentX = e.touches[0].clientX;
  //   const diff = startX.current - currentX;

  //   if (Math.abs(diff) > 5) {
  //     if (diff > 0) {
  //       setCurrentIndex((prev) => (prev + 1) % selectedCar.total_frames);
  //     } else {
  //       setCurrentIndex((prev) => (prev - 1 + selectedCar.total_frames) % selectedCar.total_frames);
  //     }
  //     startX.current = currentX;
  //   }
  // };

  if (isLoading) return <div className="p-10">loading...</div>;
  
  return (
    <div className="h-full p-8">
      <header className="mb-10">
        <h1 className="text-2xl font-bold">Request a Quote</h1>
      </header>

      <div ref={containerRef} className="grid grid-cols-12 gap-8 items-start">
        {/* 촤측 */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Model Selection</label>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center hover:bg-white hover:border-slate-400 transition-all shadow-sm"
            >
              <span className="font-bold">{selectedCar?.model_name || "모델을 선택하세요"}</span>
              <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
                {cars.map((car) => (
                  <div
                    key={car.model_id}
                    onClick={() => { setCar(car); setIsMode360(false); setIsOpen(false); }}
                    className="p-4 hover:bg-slate-50 cursor-pointer border-b last:border-0 flex justify-between items-center group"
                  >
                    <span className="font-medium group-hover:text-blue-600">{car.model_name}</span>
                    <span className="text-xs text-slate-400">{car.base_price?.toLocaleString()}원~</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>        

        {/* 중앙 */}
        <div className="col-span-12 lg:col-span-6 relative aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
          {selectedCar ? (
            <>
              <div 
                className="relative w-full h-full"
                // onMouseDown={(e) => { setIsDragging(true); startX.current = e.clientX; }}
                // onMouseMove={handleMouseMove}
                // onMouseUp={() => setIsDragging(false)}
                // onMouseLeave={() => setIsDragging(false)}
                // onTouchStart={handleTouchStart}
                // onTouchMove={handleTouchMove}
                // onTouchEnd={() => setIsDragging(false)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {isMode360 ? (
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full block touch-none"
                  />
                ) : (
                  <Image
                    src={selectedCar.model_base_img}
                    alt={selectedCar.model_name}
                    fill
                    className="object-contain pointer-events-none"
                    priority
                  />
                )}
                {!isMode360 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                    {isPreloading ? (
                      <div className="flex flex-col items-center gap-4 w-64">
                        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                          <div 
                              className="h-full bg-blue-600 transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                              style={{ width: `${preloadProgress}%` }}
                            />
                        </div>
                        <span className="text-white font-bold text-sm tracking-widest uppercase">
                          Loading {preloadProgress}%
                        </span>
                      </div>
                    ) : (
                      <button 
                        onClick={handleStart360}
                        className="group flex flex-col items-center gap-2 bg-white/90 p-6 rounded-full shadow-2xl hover:scale-110 transition-transform"
                      >
                        <span className="text-xs font-black tracking-widest text-slate-800">360° VIEW</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {isMode360 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/50 text-white text-[10px] rounded-full backdrop-blur-sm pointer-events-none">
                  DRAG TO ROTATE
                </div>
              )}
            </>
            ) : (
              <div className="text-slate-300 italic">Model Selection</div>
            )
          }
        </div>

        {/* 우측 */}
        <div className="col-span-12 lg:col-span-3 flex flex-col h-full min-h-[600px] pr-2">
          <div className="flex-grow space-y-4 overflow-y-auto max-h-[500px]">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Option</h3>
            <div className="flex flex-col gap-y-2">
              {selectedCar?.options.map((option) => (
                <div
                  key={option.opt_id}
                  onClick={() => toggleOption(option.opt_id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                    selectedOptionIds.includes(option.opt_id)
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="font-semibold text-sm">{option.opt_name}</span>
                  <span className={`text-sm ${selectedOptionIds.includes(option.opt_id) ? 'text-slate-400' : 'text-slate-500'}`}>
                    +{option.opt_price.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t-2 border-slate-500">
            <div className="mb-6">
              <div className="">
                <p className="text-xm text-slate-400">기본가 : {selectedCar?.base_price.toLocaleString() || 0}원</p>
                <p className="text-xm text-blue-600">옵션 :  {totalOptionPrice.toLocaleString()}원</p>
              </div>
              <div className="mt-4 pt-4 border-t-1 border-slate-300">
                <p className="text-xs text-slate-400 font-bold mb-1">TOTAL ESTIMATE</p>
                <h4 className="text-4xl font-black tracking-tight">{totalAmount.toLocaleString()}<span className="text-lg ml-1">원</span></h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}