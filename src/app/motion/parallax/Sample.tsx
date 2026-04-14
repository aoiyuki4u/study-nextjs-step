"use client";
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function Sample(){
  const targetRef = useRef<HTMLDivElement>(null);;
  const {scrollYProgress} = useScroll({target:targetRef});
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  return (
    <div ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{x}} className='flex gap-4 p-20'>  
          <div className="h-[60vh] w-[80vw] bg-gray-800 shrink-0" />
          <div className="h-[60vh] w-[80vw] bg-gray-700 shrink-0" />
          <div className="h-[60vh] w-[80vw] bg-gray-600 shrink-0" />
        </motion.div>
      </div>
    </div>
  )
}


