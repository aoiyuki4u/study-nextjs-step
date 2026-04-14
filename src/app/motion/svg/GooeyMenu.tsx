"use client";
import { motion } from 'framer-motion';

export default function GooeyMenu() {
  return(
    <div className="p-20 bg-white flex items-center justify-center">
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
              result="goo" 
            />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: 'url(#goo)' }} className="relative flex gap-10">
        <motion.div
          whileHover={{ x: 40 }}
          className="w-16 h-16 bg-blue-500 rounded-full"
        />
        <motion.div
          whileHover={{ x: -40 }}
          className="w-16 h-16 bg-blue-500 rounded-full"
        />
      </div>
    </div>
  )
}