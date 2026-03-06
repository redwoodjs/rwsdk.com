"use client";

import { useState, useEffect } from "react";
import Constants from "src/lib/Constants";

export function Countdown() {
    const targetDate = new Date("2026-03-11T15:00:00Z").getTime();

    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="mt-16 flex flex-col items-center justify-center animate-fade-in relative z-20">
            <div className="font-mono text-sm tracking-widest mb-4 opacity-80 text-charcoal dark:text-dark-secondary">
                v1.0 shipping on the 7th of March
            </div>
            <div className="flex gap-4 sm:gap-6 text-[#f27d26] dark:text-dark-accent font-mono text-2xl sm:text-3xl md:text-4xl bg-[#2b1810] dark:bg-dark-panel border border-[#4a2b1f] dark:border-dark-border px-6 md:px-8 py-4 md:py-5 rounded-2xl shadow-2xl transition-colors duration-200">
                <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                    <span className="font-medium" suppressHydrationWarning>{timeLeft.days.toString().padStart(2, '0')}</span>
                    <span className="text-[0.65rem] md:text-xs text-[#d4b8a8] dark:text-dark-secondary mt-1 md:mt-2 opacity-70 tracking-widest">DAYS</span>
                </div>
                <div className="text-[#4a2b1f] font-light mt-1 opacity-50">:</div>
                <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                    <span className="font-medium" suppressHydrationWarning>{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[0.65rem] md:text-xs text-[#d4b8a8] dark:text-dark-secondary mt-1 md:mt-2 opacity-70 tracking-widest">HRS</span>
                </div>
                <div className="text-[#4a2b1f] font-light mt-1 opacity-50">:</div>
                <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                    <span className="font-medium" suppressHydrationWarning>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[0.65rem] md:text-xs text-[#d4b8a8] dark:text-dark-secondary mt-1 md:mt-2 opacity-70 tracking-widest">MIN</span>
                </div>
                <div className="text-[#4a2b1f] font-light mt-1 opacity-50">:</div>
                <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                    <span className="font-medium" suppressHydrationWarning>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[0.65rem] md:text-xs text-[#d4b8a8] dark:text-dark-secondary mt-1 md:mt-2 opacity-70 tracking-widest">SEC</span>
                </div>
            </div>
            <div className="font-mono text-sm tracking-widest mt-6 opacity-80 text-charcoal dark:text-dark-secondary">
                Wanna help? <a href={Constants.GITHUB_REPO} target="_blank" rel="noreferrer" className="text-dark-accent hover:text-dark-primary transition-colors underline decoration-dark-accent/40 hover:decoration-dark-primary/40 dark:hover:decoration-dark-primary/40 underline-offset-4">Star us!</a>
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
