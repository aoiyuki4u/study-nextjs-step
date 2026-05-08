"use client";
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image'

export default function ScalableImage(){
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const centerWidth = useTransform(scrollYProgress, [0, 1], ["20vw", "100vw"]);

  return (
    <div className="bg-[#1a1a1a]">    
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div className='flex items-center justify-center w-full h-full gap-4 px-4'>
            <div className="relatve z-10 flex items-center gap-4">
              <div className='w-[18vw] rounded-xl overflow-hidden'>
                <Image
                  src="https://picsum.photos/350/450"
                  alt=""
                  width={350}
                  height={450}
                  className='h-auto w-full'
                />
              </div>
              <div className='w-[18vw] flex flex-col gap-4'>
                <div className='rounded-xl overflow-hidden'>
                  <Image
                    src="https://picsum.photos/350/350"
                    alt=""
                    width={350}
                    height={350}
                    className='w-full'
                  />
                </div>
                <div className='rounded-xl overflow-hidden'>
                  <Image
                    src="https://picsum.photos/350/250"
                    alt=""
                    width={350}
                    height={250}
                    className='w-full'
                  />
                </div>
              </div>
            </div>
            <motion.div
              style={{width:centerWidth}}
              className='w-[20vw] relative shrink-0 z-20 overflow-hidden rounded-xl h-full'>
                <Image
                    src="https://picsum.photos/1920/1600"
                    alt=""
                    width={1920}
                    height={1600}
                    className='absolute inset-0 w-full h-full object-cover'
                  />
            </motion.div>
            <div className="relatve z-10 flex items-center gap-4">
              <div className='w-[18vw] flex flex-col gap-4'>
                <div className='rounded-xl overflow-hidden'>
                  <Image
                    src="https://picsum.photos/350/250"
                    alt=""
                    width={350}
                    height={250}
                    className='w-full'
                  />
                </div>
                <div className='rounded-xl overflow-hidden'>
                  <Image
                    src="https://picsum.photos/350/350"
                    alt=""
                    width={350}
                    height={350}
                    className='w-full'
                  />
                </div>
              </div>
              <div className='w-[18vw] rounded-xl overflow-hidden'>
                <Image
                  src="https://picsum.photos/350/450"
                  alt=""
                  width={350}
                  height={450}
                  className='w-full'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


