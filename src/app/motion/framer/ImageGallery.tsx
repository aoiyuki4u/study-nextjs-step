"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Props {
  ImageGalleryID: string;
  MotionType?: "default" | "stagger";
}

export default function ImageGallery({ ImageGalleryID, MotionType }: Props) {
  const { imgTabCate, imgTabItems, isImgTabLoading, fetchImgTabData } = useStore();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    fetchImgTabData();
  }, [fetchImgTabData]);

  // const categories = ["All", "category 1", "category 2", "category 3"];
  // const items = [
  //   { id: 1, category: "category 1", title: "title 1", color: "bg-emerald-400" },
  //   { id: 2, category: "category 2", title: "title 2", color: "bg-slate-400" },
  //   { id: 3, category: "category 3", title: "title 3", color: "bg-sky-400" },
  //   { id: 4, category: "category 1", title: "title 4", color: "bg-blue-400" },
  //   { id: 5, category: "category 2", title: "title 5", color: "bg-zinc-400" },
  //   { id: 6, category: "category 3", title: "title 6", color: "bg-neutral-800" },
  // ];

  const filteredItems = activeTab === "All" 
    ? imgTabItems 
    : imgTabItems.filter(item => item.category === activeTab);

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: MotionType === "stagger" ? 0.1 : 0,
      },
    },
  };
  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.6 }
    },
  };

  return (
    <section className="py-20 bg-white px-10">
      <div className="flex justify-center gap-4 mb-12">
        {imgTabCate.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`relative px-6 py-2 text-sm font-bold transition-colors
              ${activeTab === cat? "text-white" : "text-slate-400"}  
            `}
          >
            {activeTab === cat && (
              <motion.div
                layoutId={ImageGalleryID}
                className="absolute inset-0 bg-black rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>
      <motion.div
        layout
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={`gallery-${item.id}-${index}`}
              variants={itemVariants}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`h-64 ${item.color} rounded-3xl p-8 text-white shadow-xl`}
            >
              <h3 className="text-2xl font-black">{item.title}</h3>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex p-10">
        <ul>
          <li>layout : 리액트에서 데이터가 바뀌어 순서가 변할 때, 요소가 "순간이동" 하지 않고 자신의 바뀐 좌표를 계산해서 부드럽게 이동</li>
          <li>AnimatePresence : 내부의 컴포넌트가 사라지려고 할 때, 잠시 삭제를 보류하고 그 컴포넌트의 exit 애니메이션이 끝날 때까지 기다려 줌</li>
          <li>mode="popLayout" : 리스트에서 아이템이 사라질 때, 그 자리를 지키고 있다가 사라지는 게 아니라 "공간을 비워주며" 사라짐</li>
          <li>mode="wait" : 이전 요소가 완전히 사라진 후에 다음 요소가 나타남</li>
        </ul>
      </div>
    </section>
  )
}