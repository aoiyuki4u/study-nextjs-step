"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImageReveal() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() =>{
    // ScrollTrigger.refresh();
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:containerRef.current,
        start:"top top",
        end:"+=250%",
        // scrub:1, 
        scrub:1, 
        pin:true,
        anticipatePin: 1,
        // pinSpacing: true,
        markers:true,
        refreshPriority: 1,
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
    // return () => {
    //   ScrollTrigger.getAll().forEach((t) => t.kill());
    // }; useGSAP 훅을 사용하면 해당 부분이 필요 없어짐.
    ScrollTrigger.refresh();
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-slate-900">
      <div className="stiky">
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
    </div>
  )
}