"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.5 1", "1 1"] //start : 0, end : 1
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return(
    <div ref={containerRef} className="h-[200vh] p-30 bg-slate-50 flex flex-col items-center">
      <div className="sticky top-1/5">
        <p className="text-center text-gray-400 mb-8">Scroll Down</p>
        <svg width="200" height="400" viewBox="0 0 200 400" className="drop-shadow-xl">
          <path
            d="M 100 0 L 100 400"
            stroke="#e2e8f0"
            strokeWidth="4"
            fill="none"
          />
          <motion.path
            d="M 100 0 L 100 400"
            stroke="#3b82f6"
            strokeWidth="8"
            // strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
      </div>
    </div>
  )
}