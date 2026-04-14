"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FollowPath() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.7 1", "1 1"] //start : 0, end : 1
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yPos = useTransform(scrollYProgress, [0, 1], [50, 350]);

  return(
    <div ref={containerRef} className="h-[150vh] flex flex-col items-center p-20 bg-white">
      <div className="sticky top-1/5">
        <p className="text-center text-gray-400 mb-8">Scroll Down</p>
        <svg width="200" height="400" viewBox="0 0 200 400" className="overflow-visible">
          <line x1="100" y1="50" x2="100" y2="350" stroke="#f1f5f9" strokeWidth="4" />
          <motion.path
            d="M 100 50 L 100 350"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength }}
          />
          <motion.circle
            cx="100"
            style={{ cy: yPos }}
            r="12"
            fill="white"
            stroke="#3b82f6"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>
  )
}