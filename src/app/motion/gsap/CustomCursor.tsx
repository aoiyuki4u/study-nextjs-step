"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() =>{
    // 마우스가 화면 밖에 있을 때 커서를 숨기기 위한 초기 설정
    // gsap.set([cursorRef.current, followerRef.current], { 
    //   opacity: 0, 
    //   scale: 0 
    // });

    const cursorXSetter = gsap.quickSetter(cursorRef.current, "x", "px");
    const cursorYSetter = gsap.quickSetter(cursorRef.current, "y", "px");

    // 큰 원 중앙 정렬
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to([cursorRef.current, followerRef.current], { 
        opacity: 1, 
        scale: 1, 
        duration: 0.3 
      });

      // 작은 점
      cursorXSetter(e.clientX);
      cursorYSetter(e.clientY);

      // 큰 원
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto", // 애니메이션 충돌 방지
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursorRef.current, followerRef.current], { 
        opacity: 0, 
        scale: 0, 
        duration: 0.3 
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const handleMouseEnter = () => {
      gsap.to(followerRef.current, { scale: 2, backgroundColor: "rgba(99, 102, 241, 0.3)", ease:"bounce.in", });
    };
    const handleMouseLeaveHover = () => {
      gsap.to(followerRef.current, { scale: 1, backgroundColor: "transparent" });
    };

    // 링크, 버튼 이벤트 연결
    const links = document.querySelectorAll("button, a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeaveHover);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeaveHover);
      });
    };
  }, [])

  return (
    <>
      <div className="">
        <div className="p-20">
          <Link href="/motion/gsap" style={{ color: 'white', fontWeight: 'bold' }}>CustomCursor</Link>
          <pre className="text-white">
            <code className="language-js">
              {`useRef<HTMLDivElement>(null) : 특정 Html Tag를 가리킴`}
            </code>
          </pre>
        </div>
        
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-2 h-2 bg-indigo-600 rounded-full pointer-events-none z-[9999] opacity-0"
          style={{ transform: 'translate(-50%, -50%)' }}
        />

        <div
          ref={followerRef}
          className="fixed top-0 left-0 w-12 h-12 border border-indigo-600 rounded-full pointer-events-none z-[9998] opacity-0"
        />
      </div>
    </>
  )
}