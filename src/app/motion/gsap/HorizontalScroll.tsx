"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextMask() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() =>{
    const pin = gsap.fromTo(
      triggerRef.current,
      { x: 0 },
      {
        x: "-200vw",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true, // 화면 고정
        },
      }
    );
    return () => {pin.kill()};
  }, [])

  return (
    <section ref={sectionRef} className="overflow-hidden bg-slate-900">
      <div ref={triggerRef} className="flex w-[300vw] h-screen items-center px-10 gap-10">
        <div className="w-[80vw] h-[60vh] bg-indigo-500 rounded-3xl flex-shrink-0" />
        <div className="w-[80vw] h-[60vh] bg-purple-500 rounded-3xl flex-shrink-0" />
        <div className="w-[80vw] h-[60vh] bg-pink-500 rounded-3xl flex-shrink-0" />
      </div>
    </section>
  )
}