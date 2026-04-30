"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
//AnimatePresence: React 트리에서 컴포넌트가 제거될 때 애니메이션 효과를 적용
import Loading from "@/app/components/common/Loading";


export default function SharedLayout() {
  const { sharedItems, isSharedLoading, fetchSharedItems } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchSharedItems();
  }, [fetchSharedItems]);

  useEffect(() => {
    const lenisInstance = (window as any).lenis;
    if (selectedId) {
      lenisInstance?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenisInstance?.start();
      document.body.style.overflow = "auto";
    }
    return () => {
      lenisInstance?.start();
    };
  }, [selectedId]);

  const selectedItem = sharedItems.find(i => String(i.id) === String(selectedId));

  if (isSharedLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 ml-2 text-gray-800">Shared Layout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sharedItems.map((item) => (
          <motion.button
            key={item.id}
            layoutId={`card-${String(item.id)}`}
            onClick={() => setSelectedId(String(item.id))}
            className={`cursor-pointer overflow-hidden rounded-3xl shadow-lg ${item.color || "bg-orange-500" } h-[400px] relative text-left p-6`}
          >
            <motion.p 
              layoutId={`category-${String(item.id)}`}
              className="text-white/70 text-sm font-semibold uppercase"
            >
              {item.category || "NO Category" }
            </motion.p>
            <motion.h2 
              layoutId={`title-${String(item.id)}`}
              className="text-white text-2xl font-bold mt-1"
            >
              {item.title || "NO Title" }
            </motion.h2>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              onClick={()=> setSelectedId(null)}
              // className="fixed inset-0 z-40 bg-black/60 overflow-hidden backdrop-blur-sm"
              // backdrop-blur-sm : backdrop-filter Gpu 성능 이슈로 제거
              className="fixed inset-0 bg-black/40 z-40"
              style={{
                background: `radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)`,
              }}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center radial-gradient p-4 md:p-12">
              <motion.div
                layoutId={`card-${selectedId}`}
                data-lenis-prevent
                className="bg-white w-full max-w-2xl h-full max-h-[80vh] rounded-[32px] overflow-hidden relative shadow-2xl flex flex-col"
              >
                <div className={`relative h-1/2 p-8 flex flex-col justify-end ${selectedItem?.color || 'bg-orange-500'}`}>
                  <motion.p 
                    layoutId={`category-${selectedId}`}
                    className="text-white/70 text-sm font-semibold uppercase"
                  >
                    {/* {sharedItems.find(i => i.id === selectedId)?.category} */}
                    {selectedItem?.category || "NO Category"}
                  </motion.p>
                  <motion.h2 
                    layoutId={`title-${selectedId}`}
                    className="text-white text-3xl font-bold mt-1"
                  >
                    {/* {sharedItems.find(i => i.id === selectedId)?.title} */}
                    {selectedItem?.title || "NO Title"}
                  </motion.h2>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 overflow-y-auto flex-1 bg-white"
                >
                  <p className="text-gray-600 leading-relaxed text-lg font-medium mb-4">
                    {/* {sharedItems.find(i => i.id === selectedId)?.desc} */}
                    {selectedItem?.desc || "NO Desc"}
                  </p>                  
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


