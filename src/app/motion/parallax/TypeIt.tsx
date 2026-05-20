"use client";

import { useEffect, useRef } from "react";
import TypeIt from "typeit"; 
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '700'],
});

export default function TypingComponent() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    if (!spanRef.current) return;

    const instance = new TypeIt(spanRef.current, {
      speed: 50,
      cursorChar: "|",
      cursorSpeed: 1000,
      lifeLike: true,
      waitUntilVisible: false,
      // afterComplete: (instance: any) => {
      //   instance.destroy();
      // }
    })
    .type("Hellow ggg")
    .pause(300)
    .delete(1)
    .type("yyy")
    .break({ delay: 100 })
    .break({ delay: 100 })
    .type("Typing")
    .move(-3)
    .type("!!!")
    .move(null, { to: "END" })
    .go();

    instanceRef.current = instance;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!instanceRef.current || !spanRef.current) return;
        if (entry.isIntersecting) {
          // entry.boundingClientRect.top>0:위에서 진입 
          // entry.boundingClientRect.top<0:아래서 진입
          const isComingFromBottom = entry.boundingClientRect.top > 0;
          if (isComingFromBottom) {
            instanceRef.current.reset().go();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(spanRef.current);

    return () => {
      observer.disconnect();
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`h-[30vh] flex items-center justify-center ${spaceGrotesk.className}`}>
      <p className="font-bold text-gray-900 text-[2rem] leading-relaxed">
        <span ref={spanRef} />
      </p>
    </div>
  );
}