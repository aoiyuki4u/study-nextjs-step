"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface Props {
  layoutGroupId: string;
}

export default function TabFramerGsap({ layoutGroupId }: Props) {
    const tabData = [
        { id: "Menu 1", content: "Motion + GSAP" },
        { id: "Menu 2", content: "content 2" },
        { id: "Menu 3", content: "content 3" },
        { id: "Menu 4", content: "content 4" },
    ];

    const [activeTab, setactiveTab] = useState(tabData[0]);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", delay: 0.1 }
            );
        }
    }, [activeTab]);

    return(
        <div className="flex flex-col items-center py-10 bg-white shadow-inner mt-10">
            <nav className="flex gap-2 p-2 bg-slate-100 rounded-2xl">
                {tabData.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setactiveTab(tab)}
                        className={`relative px-6 py-2 text-sm font-semibold transition-colors duration-300
                            ${activeTab.id === tab.id ? "text-white" : "text-slate-500 hover:text-slate-800"}    
                        `}
                    >
                        {activeTab.id === tab.id && (
                            <motion.div
                                layoutId={layoutGroupId}
                                className="absolute inset-0 bg-indigo-500 rounded-xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                style={{ zIndex: 0 }}
                            />
                        )}
                        <span className="relative z-10">{tab.id}</span>
                    </button>
                ))}
            </nav>

            <div className="w-full h-24 flex items-center justify-center px-4">
                <div
                    key={activeTab.id}
                    ref={textRef} // GSAP가 조절할 타겟
                    className="text-slate-600 leading-relaxed"
                >
                    {activeTab.content}
                </div>
            </div>
        </div>
    )
}