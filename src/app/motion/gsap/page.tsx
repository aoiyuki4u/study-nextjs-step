"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ImageReveal from '@/app/motion/gsap/ImageReveal';
import TextMask from '@/app/motion/gsap/TextMask';
import CustomCursor from '@/app/motion/gsap/CustomCursor';
import HorizontalScroll from '@/app/motion/gsap/HorizontalScroll';
import DDayCounter from '@/app/motion/gsap/DDayCounter';
import SlotCounter from '@/app/motion/gsap/SlotCounter';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const boxRef = useRef(null);

  const boxScroll = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // const handleLoad = () => {ScrollTrigger.refresh();};
    // const handleResize = () => {ScrollTrigger.refresh();};

    // window.addEventListener("load", () => ScrollTrigger.refresh());
    // window.addEventListener("resize", () => ScrollTrigger.refresh());

    // 컴포넌트 마운트된 후 전체 리프레시
    // const timer = setTimeout(() => {
    //   ScrollTrigger.refresh();
    // }, 100);
    
    gsap.fromTo(
      boxRef.current,
      {opacity:0, y:200},
      {opacity:1, y:0, duration:1.5, ease:"power3.out"},
    )

    gsap.to(boxScroll.current, {
      x: () => window.innerWidth - 160,
      rotation: 360,
      borderRadius: "50%",
      backgroundColor: "#3b82f6",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
        // markers: true,
      },
    });

    // return () => {
    //   window.removeEventListener("load", handleLoad);
    //   window.removeEventListener("resize", handleResize);
    //   clearTimeout(timer);
    // };
  }, [])
  return (
    <main className="bg-slate-900">
      <section className="flex h-screen items-center justify-center">
        <div 
          ref={boxRef}
          className="w-1/2 h-1/2 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl cursor-pointer"
        >
          <ul>
            <li>useRef와 useEffect를 사용</li>
            <li>직접 엘리먼트 조작</li>
          </ul>
        </div>
      </section>

      <section ref={containerRef} className="stiky h-screen bg-gray-50">
        <h2 className="mb-10 text-xl font-bold text-gray-500">GSAP Scroll Scrub</h2>
        <div className="w-full h-screen">
          <div
            ref={boxScroll}
            className="w-32 h-32 bg-orange-500 rounded-xl shadow-2xl flex items-center justify-center text-white font-bold"
          >BOX</div>
        </div>        
      </section>

      <section>
        <HorizontalScroll />
      </section>

      <section>
        <ImageReveal />
      </section>

      <section>
        <TextMask />
      </section>

      <section>
        <CustomCursor />
      </section>

      <section>
        <DDayCounter />
      </section>

      <section>
        {/* <SlotCounter /> */}
        <SlotCounter value={8967} />
      </section>

      <div className="h-screen"></div>
    </main>
  )
}