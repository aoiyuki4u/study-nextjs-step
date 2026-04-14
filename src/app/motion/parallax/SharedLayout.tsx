"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
//React 트리에서 컴포넌트가 제거될 때 애니메이션 효과를 적용

const items = [
  { id: '1', category: 'category 1', title: 'Title 1', desc: 'desc 1', color: 'bg-blue-500' },
  { id: '2', category: 'category 1', title: 'TitleTitle 2', desc: 'desc Title 2', color: 'bg-red-500' },
  { id: '3', category: 'category 1', title: 'TitleTitleTitle 3', desc: 'desc Title 3', color: 'bg-orange-500' },
  { id: '4', category: 'category 1', title: 'TitleTitleTitleTitle 4', desc: 'desc Title 4', color: 'bg-purple-500' },
  { id: '5', category: 'category 1', title: 'TitleTitle 5', desc: 'desc Title 5', color: 'bg-gray-500' },
  { id: '6', category: 'category 1', title: 'TitleTitleTitle 6', desc: 'desc Title 6', color: 'bg-skyblue' },
];

export default function SharedLayout() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 ml-2 text-gray-800">Shared Layout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.button
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className={`cursor-pointer overflow-hidden rounded-3xl shadow-lg ${item.color} h-[400px] relative text-left p-6`}
          >
            <motion.p 
              layoutId={`category-${item.id}`}
              className="text-white/70 text-sm font-semibold uppercase"
            >
              {item.category}
            </motion.p>
            <motion.h2 
              layoutId={`title-${item.id}`}
              className="text-white text-2xl font-bold mt-1"
            >
              {item.title}
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
              className="flexed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
              <motion.div
                layoutId={`card-${selectedId}`}
                className="bg-white w-full max-w-2xl h-full max-h-[80vh] rounded-[32px] overflow-hidden relative shadow-2xl flex flex-col"
              >
                <div className={`relative h-1/2 p-8 flex flex-col justify-end ${items.find(i => i.id === selectedId)?.color}`}>
                  <motion.p 
                    layoutId={`category-${selectedId}`}
                    className="text-white/70 text-sm font-semibold uppercase"
                  >
                    {items.find(i => i.id === selectedId)?.category}
                  </motion.p>
                  <motion.h2 
                    layoutId={`title-${selectedId}`}
                    className="text-white text-3xl font-bold mt-1"
                  >
                    {items.find(i => i.id === selectedId)?.title}
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
                    {items.find(i => i.id === selectedId)?.desc}
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


