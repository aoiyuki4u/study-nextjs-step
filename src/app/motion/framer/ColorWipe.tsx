"use client";
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, useMemo } from 'react';

export default function ColorWipe(){
  const targetRef = useRef<HTMLDivElement>(null);
  const content = [
    "Each child in a list should,",
    "have a unique 'key' prop."
  ];

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['0 0.8', '0 0.2'],
  });
  const allWords = useMemo(() => content.flatMap(line => line.split(" ")), []);
  // ㄴ allWords : ['Each', 'child', 'in', 'a', 'list', 'should,', 'have', 'a', 'unique', "'key'", 'prop.']

  return (   
    <div className="flex items-center justify-center p-10">
      <div ref={targetRef} className="h-[100vh] relative w-full flex flex-col items-center justify-start pt-10">
        <div className="sticky w-[100%] top-[20vh] text-center text-6xl md:text-7xl font-bold leading-tight">
          {content.map((line, lineIndex) => (
            <div key={`line-${lineIndex}`} className="flex flex-wrap justify-center gap-x-[0.3em]">
              {line.split(" ").map((word, wordIndex) => {
                const previousLines = content.slice(0, lineIndex);
                console.log(previousLines)
                const prevWordsCount = previousLines.reduce((acc, curr) => acc + curr.split(" ").length, 0);
                const globalIndex = prevWordsCount + wordIndex;

                const start = globalIndex / allWords.length;
                const end = (globalIndex + 1) / allWords.length;
                console.log(start, end)

                return (
                  <Word 
                    key={`word-node-${lineIndex}-${wordIndex}-${word}`} 
                    progress={scrollYProgress} 
                    range={[start, end]}
                  >
                    {word}
                  </Word>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const fillPercent = useTransform(progress, range, ["0%", "100%"]);
  console.log(children)

  const backgroundImage = useTransform(fillPercent, (v) => 
    `linear-gradient(to right, #d46f10 ${v}, #707c85 ${v})`
  );

  return (
    <motion.span
      style={{
        backgroundImage,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        whiteSpace: 'nowrap'
      }}
    >
      {children}
    </motion.span>
  );
}

