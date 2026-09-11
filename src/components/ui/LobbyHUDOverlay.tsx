import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export const LobbyHUDOverlay: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgressPercent(Math.min(100, Math.round(latest * 100)));
      setIsVisible(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* 1. SLIM LASER PROGRESS LINE AT VERY TOP OF VIEWPORT (Under Navbar) */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-space-950/50">
        <motion.div
          style={{ width: `${progressPercent}%` }}
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_#00f0ff]"
        />
      </div>

      {/* 2. DISCREET FLOATING TELEMETRY PILL (ONLY VISIBLE ON SCROLL, NEVER OVERLAPS HERO) */}
      <aside
        aria-label="Mission Progress Indicator"
        className={`fixed bottom-4 right-6 z-30 pointer-events-auto transition-all duration-300 ${
          isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-space-950/90 border border-cyan-500/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] font-chakra text-[11px] text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="tracking-widest uppercase font-bold text-slate-300">MISSION PROGRESS</span>
          <span className="font-mono font-black text-cyan-400">{progressPercent}%</span>
        </div>
      </aside>
    </>
  );
};
