"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LineChart() {
  const data = [40, 60, 45, 90, 55, 80, 20];
  const points = data.map((val, i) => `${i * 50},${200 - val}`).join(' L '); //Line
  const pathData = `M ${points}`; // 시작점 M

  return(
    <div className="p-10 bg-white">
      <svg width="350" height="200" viewBox="0 0 350 200" className="overflow-visible">
        {[0, 50, 100, 150, 200].map((tick) => (
          <line key={tick} x1="0" y1={tick} x2="300" y2={tick} stroke="#999" strokeWidth="1" />
        ))}
        <motion.path
          d={pathData}
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2 }}
        />
        {data.map((val, i) => (
          <motion.circle
            key={i}
            cx={i * 50}
            cy={200 - val}
            r="5"
            fill="white"
            stroke="#10b981"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: i * 0.3, 
              duration: 0.5,
              ease: "backOut"
            }}
          />
        ))}
      </svg>
    </div>
  )
}