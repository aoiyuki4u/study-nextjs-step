"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Expanding(){
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["0 1", "0.9 0"] 
  });

  const width = useTransform(scrollYProgress, [0.2, 0.6], ["30%", "100%"]);
  const height = useTransform(scrollYProgress, [0.2, 0.6], ["30%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0.2, 0.6], ["40px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  return (
    <div ref={targetRef} className="relative h-[200vh] bg-white">
      <div className="sticky top-0 flex h-[100vh] w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{
            width,
            height,
            borderRadius
          }}
          className="relative h-[100vh] overflow-hidden bg-black"
        >
          <motion.div 
            className="absolute inset-0 bg-[url('https://picsum.photos/2000/2000')] bg-cover bg-center opacity-80"
          />
          <motion.div
            style={{opacity}}
            className="relative z-10 flex flex-col h-screen items-center justify-center"
          >
            <h2 className="text-[8vw] font-black leading-none text-center">Section Title</h2>
            <p className="mt-6 text-lg tracking-[0.3em]">Section Desc Section Desc Section Desc Section Desc</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


