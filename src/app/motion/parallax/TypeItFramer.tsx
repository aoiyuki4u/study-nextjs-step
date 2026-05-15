"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TypeIt from "typeit"; 
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '700'],
});

export default function TypeItFramer() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const instanceRef = useRef<any>(null);

  const initTypeIt = () => {
    if (!spanRef.current) return;

    if (instanceRef.current) {
      instanceRef.current.reset();
    }

    instanceRef.current = new TypeIt(spanRef.current, {
      speed: 50,
      cursorChar: "*",
      cursorSpeed: 1000,
      lifeLike: true,
      afterComplete: (instance: any) => {
        instance.destroy();
      }
    })
    .type("Framer Hellow ggg")
    .pause(300)
    .delete(1)
    .type("yyy")
    .break({ delay: 100 })
    .type("Typing")
    .break({ delay: 100 })
    .type("Typing")
    .move(-3)
    .type("!!!")
    .move(null, { to: "END" })
    .go();
  }

  return (
    <div className={`h-[30vh] flex items-center justify-center ${spaceGrotesk.className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        onViewportEnter={(entry) => {
          if (entry && entry.boundingClientRect.top > 0) {
            initTypeIt();
          }
        }}
      >
        <p className="font-bold text-gray-900 text-[2rem] leading-relaxed">
          <span ref={spanRef} />
        </p>
      </motion.div>
    </div>
  );
}