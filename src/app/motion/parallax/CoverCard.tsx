"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CoverCard(){
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [250, -200]);

  return (
    <div ref={ref} className="relative z-20 min-h-screen bg-[#1a1a1a] px-10 py-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          <motion.div
            style={{ y }}
            className="aspect-[3/4] bg-zinc-800 bg-[url('https://picsum.photos/2000/1500')] bg-cover bg-center"
          />
          <div className="flex flex-col justify-center text-white">
            <h2 className="text-5xl font-light italic">Section Title</h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Section Desc Section Desc Section Desc Section Desc
              Section Desc Section Desc Section Desc Section Desc
              Section Desc Section Desc Section Desc Section Desc
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


