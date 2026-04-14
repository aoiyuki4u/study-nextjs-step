"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis 초기화
    const lenis = new Lenis({
      duration: 1.2,     // 스크롤이 멈출 때까지 걸리는 시간 (초)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 가속도 곡선
      smoothWheel: true, // 마우스 휠 부드럽게
    });

    // RAF(RequestAnimationFrame)를 통해 Lenis 업데이트 루프 생성
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 컴포넌트 언마운트 시 정리
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}