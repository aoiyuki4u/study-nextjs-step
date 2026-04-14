"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MorphingIcon() {
  const [isToggled, setIsToggled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const stopPath = "M 160 100 L 160 160 L 100 160 L 40 160 L 40 100 L 40 40 L 100 40 L 160 40 Z";
  const playPath = "M 180 100 L 100 146 L 60 169 L 60 100 L 60 31 L 100 54 L 180 100 L 180 100 Z";

  const sunPath = "M 100 20 A 80 80 0 1 1 99.99 20 Z";
  const moonPath = "M 120 40 C 90 40 70 70 70 100 C 70 130 90 160 120 160 C 110 150 100 130 100 100 C 100 70 110 50 120 40 Z";
  const rayLength = 320;

  return(
    <div className="flex gap-6 p-10 bg-gray-50">
      <div>
        <div 
          className="cursor-pointer bg-white p-4 shadow-md"
          onClick={() => setIsToggled(!isToggled)}
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            <motion.path
              animate={{ d: isToggled ? playPath : stopPath }}
              fill={isToggled ? "#f43f5e" : "#3b82f6"}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                type: "spring", 
                bounce: 0.4 
              }}
            />
          </svg>
        </div>
      </div>

      <div>
        <motion.div 
        className="cursor-pointer bg-white p-6 rounded-full shadow-lg border border-gray-100 flex items-center justify-center"
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        >
          <svg width="100" height="100" viewBox="0 0 200 200" className="overflow-visible">
            <motion.g
              animate={{ opacity: isDarkMode ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <line
                  key={angle}
                  x1="100"
                  y1="10"
                  x2="100"
                  y2="40"
                  stroke="#fbbf24"
                  strokeWidth="6"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 100 100)`}
                  style={{
                    strokeDasharray: `${rayLength}`,
                    strokeDashoffset: `${isDarkMode ? rayLength : 0}`,
                    transition: `stroke-dashoffset 0.6s ease ${i * 0.1}s`,
                  }}
                />
              ))}
            </motion.g>
            <motion.path
              fill={isDarkMode ? "#60a5fa" : "#fbbf24"}
              stroke="none"
              animate={{ 
                d: isDarkMode ? moonPath : sunPath,
                rotate: isDarkMode ? -20 : 0
              }}
              transition={{ 
                duration: 0.6, 
                ease: "circOut",
                type: "spring", 
                bounce: 0.3 
              }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}