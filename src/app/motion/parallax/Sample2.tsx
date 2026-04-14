"use client";
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function Sample2(){
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target:containerRef,
    offset:["0 0", "1 1"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const backgroundColor = useTransform(
    scrollYProgress, 
    [0, 0.5, 1],
    ["#1a1a1a", "#1a1a1a", "#f3f0eb"]
  )

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#ffffff", "#ffffff", "#1a1a1a"]
  );


  return (
    <motion.div ref={containerRef} style={{ backgroundColor }} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x, color: textColor }} className="flex gap-20 px-20 items-end">
          <section className="w-[80vw] shrink-0">
            <h1 className="text-[12vw] font-bold leading-[0.9] tracking-tighter">
              Section 1
            </h1>
            <p className="mt-10 text-xl uppercase tracking-widest">Digital Experience 2026</p>
          </section>

          <div className="w-[40vw] shrink-0 aspect-[3/4] bg-zinc-800 rounded-sm overflow-hidden">
             <div className="w-full h-full hover:scale-105 transition-transform duration-700 bg-[url('https://picsum.photos/1000/500')] bg-cover bg-center" />
          </div>

          <section className="w-[60vw] shrink-0">
             <h2 className="text-6xl font-light mb-8 italic">Section 3</h2>
             <div className="w-full aspect-video bg-zinc-700 bg-[url('https://picsum.photos/1000/500')] bg-cover bg-center" />
          </section>

          <section className="w-[80vw] shrink-0">
            <h1 className="text-[10vw] font-bold text-right uppercase">
              Section 4
            </h1>
          </section>
        </motion.div>
      </div>
    </motion.div>
  )
}


