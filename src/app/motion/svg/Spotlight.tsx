"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Spotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(80);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return(
    <div 
      className="relative w-full h-screen bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseDown={() => setRadius(150)}
      onMouseUp={() => setRadius(80)}
      onMouseLeave={() => setRadius(80)}
    >
      <svg width="100%" height="100%" className="select-none">
        <defs>
          <clipPath id="spotlight">
            <motion.circle
              cx={mousePos.x}
              cy={mousePos.y}
              r="80"
              animate={{ r: radius }}
              transition={{ type: 'spring', damping: 15, stiffness: 150 }}
            />
          </clipPath>
        </defs>
        <text
          x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          fontSize="80" fontWeight="black" fill="#1e293b"
        >
          Spotlight
        </text>
        <text
          x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          fontSize="80" fontWeight="black" fill="#60a5fa"
          clipPath="url(#spotlight)"
        >
          Spotlight
        </text>
      </svg>
    </div>
  )
}