"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// useGSAP 라이브러리에서 제공하는 훅 사용
// ㄴ useEffect, useLayoutEffect -> useGSAP
// ㄴ 컴포넌트가 재렌더링 될때 애니메이션 중복 방지

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SlotCounterProps {
  value: number;
  duration?: number;
}

export default function SlotCounter({ value, duration = 2 }: SlotCounterProps) {
  const containerRef = useRef(null);
  
  const digits = String(value).split("");
  const itemHeight = 60; // 숫자 개별 높이

  useGSAP(() => {
    ScrollTrigger.refresh();

    const tl = gsap.fromTo(
      ".digit-strip",
      { y: 0 },
      {
        y: (index) => -(parseInt(digits[index]) * itemHeight),
        duration: duration,
        ease: "back.out(1)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current, 
          start: "top 75%",
          toggleActions: "restart none none none",
          // markers: true,
          // invalidateOnRefresh: true,
        },
      }
    );

    // return () => {
    //   tl.kill();
    //   ScrollTrigger.getAll().forEach(t => t.kill());
    // };
  }, { scope: containerRef, dependencies: [value] });

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className="flex justify-center items-center overflow-hidden h-[60px] font-mono"
        style={{ height: `${itemHeight}px` }}
      >
        {digits.map((_, i) => (
          <div 
            key={i} 
            className="relative w-[40px] flex justify-center"
            style={{ height: `${itemHeight}px` }}
          >
            <div className="digit-strip absolute top-0 flex flex-col">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <span 
                  key={num} 
                  className="text-6xl font-bold text-amber-50 flex justify-center items-center"
                  style={{ height: `${itemHeight}px` }}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}