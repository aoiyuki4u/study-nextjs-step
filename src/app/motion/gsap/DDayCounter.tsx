"use client";
import { useEffect, useState, useRef } from "react";

interface DDayProps {
  targetDate: string;
}

export default function DDayCounter({ targetDate = "2026-12-31 23:59:59" }: DDayProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeEntries = Object.entries(timeLeft);

  return (
    <div ref={containerRef} className="flex justify-center items-center py-10">
      {timeEntries.map(([label, value], index) => (
        <div key={label} className="flex items-center">
          <div className="time-unit text-center">
            <div className="text-6xl font-bold font-mono tracking-tighter text-amber-50 px-2">
              {String(value).padStart(2, "0")}
            </div>
            <div className="text-xs uppercase text-gray-500 mt-2">{label}</div>
          </div>
          
          {index < timeEntries.length - 1 && (
            <div className="text-4xl font-bold text-amber-50/30 mb-6">:</div>
          )}
        </div>
      ))}
    </div>
  )
}