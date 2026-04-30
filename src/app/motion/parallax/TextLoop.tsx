"use client";
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
import { wrap } from '@motionone/utils';

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}
function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0); //애니메이션 값의 상태와 속도를 추적하기 위해 MotionValue를 생성
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);//스크롤 속도를 계산 가져옴
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {//스크롤 속도(0~1000)를 0~5로 변환
    clamp: true
  });
  const x = useTransform(baseX, (v) => `${wrap(-20, -70, v)}%`);
  const directionFactor = useRef<number>(1);
  // console.log(directionFactor)
  // console.log(scrollVelocity)
  // console.log(smoothVelocity)
  // console.log(baseVelocity)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  return(
    <div className="overflow-hidden tracking-tighter leading-[0.8] whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-bold uppercase text-[10vw] flex flex-nowrap gap-x-10" style={{ x }}>
        <span>{children}</span>
        <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
          {children}
        </span>
        <span>{children}</span>
        <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
          {children}
        </span>
      </motion.div>
    </div>
  )
}

export default function TextLoop() {
  return (
    <div className="py-20 bg-white overflow-hidden">
      <ParallaxText baseVelocity={-2}>ParallaxText ParallaxText</ParallaxText>
      <ParallaxText baseVelocity={2}>ParallaxText ParallaxText</ParallaxText>
    </div>
  )
}


