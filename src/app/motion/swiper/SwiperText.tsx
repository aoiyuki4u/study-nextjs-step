"use client";
import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function SwiperText(){
  interface SwiperText {
    id: number;
    title: string;
    desc: string;
  }
  const data: SwiperText[] = [
    { id: 1, title: "Swiper 1", desc: "Desc 1" },
    { id: 2, title: "Swiper 2", desc: "Desc 2" },
    { id: 3, title: "Swiper 3", desc: "Desc 3" },
    { id: 4, title: "Swiper 4", desc: "Desc 4" },
    { id: 5, title: "Swiper 5", desc: "Desc 5" },
    { id: 6, title: "Swiper 6", desc: "Desc 6" },
  ];
  const swiperRef = useRef<SwiperCore | null>(null);
  // const svgPathRef = useRef<SVGPathElement>(null);
  // const shapes = [
  //   "M20,10 Q50,10 80,10 Q80,50 80,90 Q50,90 20,90 Q20,50 20,10 Z",
  //   "M50,10 Q80,50 50,90 Q20,50 50,10 Z",
  //   "M50,10 L90,90 L10,90 Z",
  // ];

  const animateText = (swiper:SwiperCore) => {
    gsap.to('.slide-text', {
      opacity:0,
      y:20,
      duration:0.3,
      overwrite:'auto' //이전 ani 덮기
    })
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;
    
    const activeText = activeSlide.querySelector('.slide-text');
    if(activeText){
      gsap.to(activeText, {
        opacity:1,
        y:0,
        duration:0.6,
        ease:"power3.out",
        delay:0.2
      })
    }
    // if (svgPathRef.current) {
    //   gsap.to(svgPathRef.current, {
    //     attr: { d: shapes[swiper.realIndex % shapes.length] },
    //     duration: 0.5,
    //     ease: "power2.inOut"
    //   });
    // }
  }

  useEffect(()=>{
    if(swiperRef.current){
      animateText(swiperRef.current)
    }
  }, []);

  
  return (   
    <div className="w-full min-h-screen bg-slate-600 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={40}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            animateText(swiper);
          }}
        >
          {data.map((item, i) => (
            <SwiperSlide
              key={item.id}
              className='py-10'
            >
              <motion.div
                whileHover={{
                  scale:1.03,
                  y:-10,
                  transition:{duration:0.3}
                }}
                className="w-full h-[450px] bg-neutral-800 rounded-3xl p-8 flex flex-col justify-end overflow-hidden"
              >
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" /> */}
                <div className="slide-text opacity-0 translate-y-[20px] relative z-20">
                  <span className="text-sm font-mono text-emerald-400 mb-2 block tracking-widest">
                    {item.desc}
                  </span>
                  <h2 className="text-4xl font-extrabold tracking-tight leading-tight">                    
                    {item.title}
                  </h2>
                </div>
              </motion.div>              
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </Swiper>
        {/* <div className="mt-10 flex flex-col items-center">
          <svg width="100" height="100" viewBox="0 0 100 100" className="fill-emerald-400">
            <path ref={svgPathRef} d={shapes[0]} />
          </svg>
          <p className="mt-2 text-sm font-mono opacity-50">SHAPE INDICATOR</p>
        </div> */}
      </div>
    </div>
  )
}


