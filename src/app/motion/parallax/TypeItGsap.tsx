"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypeIt from "typeit"; 
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '700'],
});

gsap.registerPlugin(ScrollTrigger);

export default function TypeItGsap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const instanceRef = useRef<any>(null);
  

  useEffect(() => {
    if (!spanRef.current || !containerRef.current) return;

    // if (instanceRef.current) {
    //   instanceRef.current.destroy();
    // }

    instanceRef.current = new TypeIt(spanRef.current, {
      speed: 50,
      cursorChar: "😀",
      cursorSpeed: 1000,
      lifeLike: true,
      // afterComplete: (instance: any) => {
      //   instance.destroy();
      // }
    })
    .type("Gsap Hellow gggg")
    .pause(300)
    .delete(1)
    .type("yyy")
    .break({ delay: 100 })
    .type("Typinggg")
    .break({ delay: 100 })
    .type("Typinggg")
    .move(-3)
    .type("!!!")
    .move(null, { to: "END" })
    .go();

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        instanceRef.current.reset().go();
      },
      // onEnterBack: () => {
      //   instanceRef.current.go();
      // },
      // onLeave: () => {
      //   instanceRef.current.freeze();
      // },
      // onLeaveBack: () => {
      //   instanceRef.current.freeze();
      // }
    });
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`h-[30vh] flex items-center justify-center ${spaceGrotesk.className}`}>
      <p className="font-bold text-gray-900 text-[2rem] leading-relaxed">
        <span ref={spanRef} />
      </p>
    </div>
  );
}