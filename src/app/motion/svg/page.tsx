"use client";
import { motion } from "framer-motion";
import Base from '@/app/motion/svg/Base';
import Spotlight from '@/app/motion/svg/Spotlight';
import ScrollProgress from '@/app/motion/svg/ScrollProgress';
import FollowPath from '@/app/motion/svg/FollowPath';
import LineChart from '@/app/motion/svg/LineChart';
import GooeyMenu from '@/app/motion/svg/GooeyMenu';
import LottieBase from '@/app/motion/svg/LottieBase';
import MorphingIcon from '@/app/motion/svg/MorphingIcon';




export default function Page(){
  return (
    <main className="bg-slate-900">
      <section>
        <MorphingIcon />
      </section>
      <section>
        <LottieBase />
      </section>
      <section>
        <GooeyMenu />
      </section>
      <section>
        <LineChart />
      </section>
      <section>
        <FollowPath />
      </section>
      <section>
        <ScrollProgress />
      </section>
      <section>
        <Spotlight />
      </section>
      <section>
        <Base />
      </section>
      
      <div className="h-[100vh] bg-slate-900" />
    </main>
  )
}


