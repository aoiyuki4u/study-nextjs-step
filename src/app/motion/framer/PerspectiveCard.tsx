"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function PerspectiveCard(){
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 }); //Stiffness 스프링
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 }); //Damping 마찰력
  const rotateX = useTransform(mouseYSpring, [0, 1], [20, -20]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    //카드 내 마우스 위치를 0에서 1 사이의 비율로 계산
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5); // 중앙으로 복귀
    y.set(0.5);
  };

  return (   
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200 p-4">
      <div style={{ perspective: '1200px' }} className="w-full max-w-[400px]">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative h-[500px] w-full cursor-pointer rounded-[30px] bg-white shadow-[0_50px_100px_rgba(0,0,0,0.2)]"
        >
          {/* 카드 내부 컨텐츠 */}
          <div 
            style={{ 
              transform: 'translateZ(60px)',
              transformStyle: 'preserve-3d' 
            }}
            className="flex h-full flex-col items-center justify-center p-10 text-center"
          >
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black">
              Perspective<br />Card
            </h2>
            <p className="mt-4 text-gray-500">Move your mouse over me!</p>
            
            <div 
              style={{ transform: 'translateZ(40px)' }}
              className="mt-10 rounded-full bg-black px-6 py-2 text-sm font-bold text-white shadow-lg"
            >
              Get Started
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}