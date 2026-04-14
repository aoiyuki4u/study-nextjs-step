"use client";
import SwiperBase from '@/app/motion/swiper/SwiperBase';
import SwiperText from '@/app/motion/swiper/SwiperText';


export default function Page(){
  return (
    <main className="bg-slate-900">
      <section>
        <SwiperBase />
      </section>
      <section>
        <SwiperText />
      </section>
      
      
      <div className="h-[100vh] bg-slate-900" />
    </main>
  )
}


