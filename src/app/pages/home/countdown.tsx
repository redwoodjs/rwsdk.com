"use client";

import { useState, useEffect } from "react";

export function Countdown() {
    const targetDate = new Date("2026-03-07T15:00:00Z").getTime();

    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    if (!isMounted) {
        return null; // Avoid hydration mismatch on first render
    }

    return (
        <div className="mt-16 flex flex-col items-center justify-center animate-fade-in relative z-20">
            <div className="font-mono text-sm  tracking-widest mb-4 opacity-80">
                v1.0 shipping on the 7th of March:
            </div>
            <div className="flex gap-4 sm:gap-6 text-[#f27d26] font-mono text-2xl sm:text-3xl md:text-4xl bg-[#2b1810] border border-[#4a2b1f] px-6 md:px-8 py-4 md:py-5 rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                    <span className="font-medium">{timeLeft.days.toString().padStart(2, '0')}</span>
                    <span className="text-[0.65rem] md:text-xs text-[#d4b8a8] mt-1 md:mt-2 opacity-70 tracking-widest">DAYS</span>
                </div>
                <div className="text-[#4a2b1f] font-light mt-1">:</div>
                <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                    <span className="font-medium">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[0.65rem] md:text-xs text-[#d4b8a8] mt-1 md:mt-2 opacity-70 tracking-widest">HRS</span>
                </div>
                <div className="text-[#4a2b1f] font-light mt-1">:</div>
                <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                    <span className="font-medium">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[0.65rem] md:text-xs text-[#d4b8a8] mt-1 md:mt-2 opacity-70 tracking-widest">MIN</span>
                </div>
                <div className="text-[#4a2b1f] font-light mt-1">:</div>
                <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                    <span className="font-medium">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[0.65rem] md:text-xs text-[#d4b8a8] mt-1 md:mt-2 opacity-70 tracking-widest">SEC</span>
                </div>
            </div>
        </div>
    );
}

function calculateTimeLeft(targetDate: number) {
    const difference = targetDate - new Date().getTime();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}
