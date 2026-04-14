"use client";
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

export default function SwiperBase(){
  interface SwiperBase {
    id: number;
    title: string;
    desc: string;
  }
  const data: SwiperBase[] = [
    { id: 1, title: "Swiper 1", desc: "Desc 1" },
    { id: 2, title: "Swiper 2", desc: "Desc 2" },
    { id: 3, title: "Swiper 3", desc: "Desc 3" },
    { id: 4, title: "Swiper 4", desc: "Desc 4" },
    { id: 5, title: "Swiper 5", desc: "Desc 5" },
    { id: 6, title: "Swiper 6", desc: "Desc 6" },
  ];
  return (   
    <div className="w-full py-20 bg-white">
      <Swiper
        spaceBetween={50}
        grabCursor={true}
        navigation
        // centeredSlides={true}
        slidesPerView={2.5}
        // pagination={true}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        slideToClickedSlide={true}
        modules={[Navigation, Pagination]}
        // modules={[EffectCoverflow, Pagination, Autoplay]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="w-[300px] bg-white border rounded-2xl shadow-xl">
            <div className="flex items-center justify-center min-h-[200px] text-gray-800 text-2xl font-bold">
              {item.title}
            </div>
          </SwiperSlide>
        ))}
        <div className="m-5">
          <div className="flex justify-center items-center custom-pagination"></div>
        </div>
      </Swiper>
    </div>
  )
}


