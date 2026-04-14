"use client";
import { motion } from "framer-motion"

export default function Stagger(){
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.5 },
    visible: { y: 0, opacity: 1, scale: 1, rotate: 180 },
  };
  return (   
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-20">
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        // animate="visible"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="grid grid-cols-2 gap-4 p-8 bg-white rounded-3xl shadow-lg"
      >
        {[1, 2, 3, 4].map((i) => (
          <motion.li
            key={i}
            variants={itemVariants}
            className="w-20 h-20 bg-indigo-500 rounded-lg list-none"
          />
        ))}
      </motion.ul>
      <ul className="ml-10 space-y-2 text-slate-600">
          <li>initial="hidden" 문자열 지정</li>
          <li>Stagger: 엇갈림 효과</li>
          <li>transition: 애니메이션의 속도, 지연 시간, 효과(Spring, Tween 등)</li>
          <li>viewport : once(반복), amount(위치)</li>
        </ul>
    </div>
  )
}


