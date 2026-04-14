"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextMask() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() =>{
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        backgroundSize: "200% 200%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [])

  return (
    <section ref={sectionRef} className="h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      <h1
        ref={textRef}
        className="text-[15vw] font-black uppercase leading-none tracking-tighter"
        style={{
          backgroundImage: "url('//images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070')",
          backgroundSize: "120% 120%",
          backgroundPosition: "center",
          
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Mountain
      </h1>
    </section>
  )
}