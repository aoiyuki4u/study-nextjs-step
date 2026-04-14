"use client";
import { motion } from "framer-motion";
import Stagger from '@/app/motion/framer/Stagger';
import TabNavigation from '@/app/motion/framer/TabNavigation';
import TabFramerGsap from '@/app/motion/framer/TabFramerGsap';
import ImageGallery from '@/app/motion/framer/ImageGallery';
import ScrollText from '@/app/motion/framer/ScrollText';
import ColorWipe from '@/app/motion/framer/ColorWipe';
import PerspectiveCard from '@/app/motion/framer/PerspectiveCard';

export default function Page(){
  return (
    <main className="bg-slate-900">

      <section className="flex h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-1/2 h-1/2 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl cursor-pointer"
        >
          <ul>
            <li>initial: 애니메이션이 시작될 때의 상태 (초기값)</li>
            <li>animate: 애니메이션이 완료되었을 때의 상태 (최종값)</li>
            <li>transition: 애니메이션의 속도, 지연 시간, 효과(Spring, Tween 등)</li>
            <li>whileHover / whileTap: 마우스를 올리거나 클릭했을 때의 반응</li>
          </ul>
        </motion.div>
      </section>

      <section>
        <PerspectiveCard />
      </section>

      <section>
        <ColorWipe />
      </section>

      <section>
        <ScrollText />
      </section>

      <section>
        <Stagger />
      </section>

      <section>
        <TabNavigation layoutGroupId="active-pill" />
      </section>

      <section>
        <TabFramerGsap layoutGroupId="is-active" />
      </section>

      <section>
        <ImageGallery ImageGalleryID="ImageGalleryID1"/>
      </section>

      <section>
        <ImageGallery ImageGalleryID="ImageGalleryID2" MotionType="stagger" />
      </section>

      
      <div className="h-[100vh] bg-slate-900" />
    </main>
  )
}


