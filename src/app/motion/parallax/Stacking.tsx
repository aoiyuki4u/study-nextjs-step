"use client";
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function Stacking(){
  const containerRef = useRef<HTMLDivElement>(null);;
  const {scrollYProgress} = useScroll({target:containerRef});
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div className="bg-[#1a1a1a]">    
      <div ref={containerRef} className="relative h-[150vh] overflow-hidden">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div 
            style={{ scale }}
            className="absolute inset-0 z-0 bg-[url('https://picsum.photos/2000/2000')] bg-cover bg-center"
          />
          <motion.div 
            style={{ y: textY }}
            className="relative z-10 flex h-full flex-col items-center justify-center text-white"
          >
            <h1 className="text-[15vw] font-bold leading-none tracking-tighter">Stacking</h1>
            <p className="mt-5 text-xl uppercase tracking-[0.5em]">Stacking Stacking Stacking</p>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
        </div>
      </div>
    </div>
  )
}


