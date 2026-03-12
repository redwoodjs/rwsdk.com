"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  MessageSquare, 
  BarChart3, 
  Gamepad2, 
  PenLine, 
  Users, 
  ClipboardList,
  MapPin,
  Bell,
  Gavel,
  Terminal,
  PieChart,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    title: 'Chat',
    description: 'Real-time messaging between users',
    icon: MessageSquare,
  },
  {
    title: 'Live Dashboards',
    description: 'Data that updates for everyone simultaneously',
    icon: BarChart3,
  },
  {
    title: 'Multiplayer',
    description: 'Game state synchronized across players',
    icon: Gamepad2,
  },
  {
    title: 'Collaborative Editing',
    description: 'Shared documents and whiteboards',
    icon: PenLine,
  },
  {
    title: 'Presence',
    description: "See who's online and what they're viewing",
    icon: Users,
  },
  {
    title: 'Live Forms',
    description: 'Multi-user form filling and voting',
    icon: ClipboardList,
  },
  {
    title: 'Live Location',
    description: 'Track deliveries, vehicles, or friends on a map',
    icon: MapPin,
  },
  {
    title: 'Instant Notifications',
    description: 'Push alerts for events, messages, or system updates',
    icon: Bell,
  },
  {
    title: 'Live Auctions',
    description: 'Place bids and see price updates instantly',
    icon: Gavel,
  },
  {
    title: 'Pair Programming',
    description: 'Collaborative coding with live cursors and syncing',
    icon: Terminal,
  },
  {
    title: 'Interactive Q&A',
    description: 'Live polling and audience engagement for events',
    icon: PieChart,
  },
  {
    title: 'Financial Tickers',
    description: 'Streaming price updates and market movements',
    icon: TrendingUp,
  },
];

export default function NotificationShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHasAppeared(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  useEffect(() => {
    if (isHovered || !isInView) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, isInView]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  return (
    <div className="w-full flex justify-center pb-24">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[460px] h-32 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          {isInView && [0, 1, 2].map((offset) => {
            const index = (currentIndex + offset) % features.length;
            const feature = features[index];
            const Icon = feature.icon;
            const isTop = offset === 0;
            
            return (
              <motion.div
                key={`${index}-${feature.title}`}
                layout
                className={`absolute top-0 left-0 w-full bg-white dark:bg-[#151312] backdrop-blur-xl border border-zinc-200 dark:border-[#2b2725] rounded-3xl p-5 shadow-2xl ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}`}
                initial={{ 
                  opacity: 0, 
                  y: 80, 
                  scale: 0.8 
                }}
                animate={{ 
                  opacity: 1 - offset * 0.3, 
                  y: offset * 16, 
                  scale: 1 - offset * 0.04,
                  zIndex: 10 - offset
                }}
                exit={{ 
                  opacity: 0, 
                  x: 200, 
                  scale: 0.9,
                  zIndex: 20
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: hasAppeared ? 0 : offset * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  transformOrigin: "top center"
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500) {
                    handleNext();
                  }
                }}
                onClick={() => {
                  if (isTop) handleNext();
                }}
              >
                <div className="flex items-center gap-4 pointer-events-none">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-100 dark:bg-[#0c0a09] rounded-xl flex items-center justify-center border border-zinc-200 dark:border-stone-800/50 text-zinc-500 dark:text-stone-400 group-hover:dark:text-stone-200 transition-colors duration-300">
                    <Icon strokeWidth={1.5} size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-stone-200 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-[#888582] leading-snug font-light text-[15px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
