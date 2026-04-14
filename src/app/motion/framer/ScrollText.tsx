"use client";
import { motion, Variants } from "framer-motion"

export default function ScrollText(){
  const textItems = [
    { text: '1'},
    { text: '2'},
    { text: '3'},
    { text: '4'},
    { text: '5'},
    { text: '6'},
    { text: '7'},
    { text: '8'},
    { text: '9'},
    { text: '10'},
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const wordVariants : Variants = {
    hidden: { opacity: 0, y: 20 }, // 아래에서 위로 나타남
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // 부드러운 Bezier 곡선
      },
    },
  };
  return (   
    <div className="flex items-center justify-center p-10">
      <motion.div
        className="text-center max-w-4xl flex flex-wrap justify-center gap-x-3 gap-y-1"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
      >
        {textItems.map((item, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            // className="text-6xl md:text-7xl font-bold leading-tight"
            className="text-6xl md:text-7xl font-bold text-amber-100"
          >
            {item.text}
          </motion.span>
        ))}
        
      </motion.div>
    </div>
  )
}


