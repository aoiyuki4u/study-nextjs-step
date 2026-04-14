"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImageReveal() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() =>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:containerRef.current,
        start:"top top", //컨테이너 화면 맨 위
        end:"+=250%", //스크롤 길이 화면 2.5배
        // scrub:1, 
        scrub:1.5, 
        pin:true,
        markers:false,
        invalidateOnRefresh: true,
      }
    })
    tl.to(imageRef.current,{
      scale:3.5, 
      duration:1,
      ease: "none"
    })
    .to(textRef.current, {
      opacity: 1,
      y: -50,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.4");
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-slate-950">
      <div
        ref={imageRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-64 h-40 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold">
           PHOTO
        </div>
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center opacity-0"
      >
        <h2 className="text-5xl md:text-8xl font-black text-white drop-shadow-2xl">
          NEXT LEVEL
        </h2>
      </div>
    </div>
  )
}