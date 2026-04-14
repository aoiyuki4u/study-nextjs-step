"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  layoutGroupId: string;
}

export default function TabNavigation({ layoutGroupId }: Props) {
    const tabData = [
        { id: "Menu 1", content: "Motion" },
        { id: "Menu 2", content: "content 2" },
        { id: "Menu 3", content: "content 3" },
        { id: "Menu 4", content: "content 4" },
    ];
    const [activeTab, setActiveTab] = useState(tabData[0]);

    return(
        <div className="flex flex-col items-center py-10 bg-white shadow-inner mt-10">
            <nav className="flex gap-2 p-2 bg-slate-100 rounded-2xl">
                {tabData.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-6 py-2 text-sm font-semibold transition-colors duration-300
                            ${activeTab.id === tab.id ? "text-white" : "text-slate-500 hover:text-slate-800"}    
                        `}
                    >
                        {activeTab.id === tab.id && (
                            <motion.div
                                layoutId={layoutGroupId} // 부드럽게 이동
                                className="absolute inset-0 bg-indigo-500 rounded-xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                style={{ zIndex: 0 }}
                            />
                        )}
                        <span className="relative z-10">{tab.id}</span>
                    </button>
                ))}
            </nav>

            <div className="w-full min-h-[100px] flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab.id}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-600 leading-relaxed"
                    >
                        {activeTab.content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}