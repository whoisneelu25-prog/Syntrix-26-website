import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LobbyBackgroundProps {
  interactive?: boolean;
}

export const LobbyBackground: React.FC<LobbyBackgroundProps> = ({ interactive = true }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  // Subtle vertical camera drift as user scrolls
  const lobbyY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const lobbyScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1.04]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || !interactive) return;
      // Normalized between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, isMobile]);

  // Parallax offsets (gentle and smooth)
  const bgOffsetX = isMobile ? 0 : mousePos.x * 12;
  const bgOffsetY = isMobile ? 0 : mousePos.y * 10;
  const fgOffsetX = isMobile ? 0 : mousePos.x * 20;
  const fgOffsetY = isMobile ? 0 : mousePos.y * 16;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ perspective: 1200 }}
    >
      {/* 1. DEEP SPACE VOID BEHIND THE SPACESHIP (visible outside ship windows) */}
      <div className="absolute inset-0 bg-[#02040b]">
        {/* Distant space nebulae */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.25) 0%, rgba(139, 92, 246, 0.18) 35%, transparent 70%)',
          }}
        />

        {/* Ambient star points */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 25px 35px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 120px 80px, #38bdf8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 210px 170px, #a855f7, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 320px 260px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 450px 120px, #00f0ff, rgba(0,0,0,0))`,
            backgroundSize: '400px 400px',
          }}
        />

        {/* Occasional mini cruising shuttle in the far distance */}
        <motion.div
          animate={{
            x: ['-10vw', '110vw'],
            y: ['15vh', '25vh'],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-2 h-1 bg-cyan-300/60 rounded-full shadow-[0_0_8px_#00f0ff] opacity-40"
        />
      </div>

      {/* 2. THE MAIN AMONG US DROPSHIP LOBBY (Centerpiece Environment) */}
      <motion.div
        style={{
          x: bgOffsetX,
          y: bgOffsetY,
          translateY: lobbyY,
          scale: lobbyScale,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 80 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-full h-full max-w-[1700px] max-h-[1400px] flex items-center justify-center">
          
          {/* THE LOBBY IMAGE (Pure clean artwork, zero artificial AI filters) */}
          <img
            src="/assets/lobby/lobby.webp"
            alt="Among Us Dropship Lobby - SYNTRIX'26 Headquarters"
            className="w-full h-full object-contain max-h-[92vh] drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
            loading="eager"
          />

          {/* DYNAMIC ENVIRONMENTAL EFFECTS LAYERED ON TOP OF LOBBY */}

          {/* LEFT JET ENGINE THRUSTER PLUME (Glowing Cyan Flame) */}
          <div className="absolute left-[13%] sm:left-[17%] bottom-[12%] sm:bottom-[15%] w-20 sm:w-28 h-24 sm:h-32 pointer-events-none opacity-85">
            <motion.div
              animate={{
                scale: [0.94, 1.08, 0.96],
                opacity: [0.75, 0.95, 0.75],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full rounded-full blur-[14px]"
              style={{
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.9) 0%, rgba(56, 189, 248, 0.5) 45%, transparent 75%)',
              }}
            />
          </div>

          {/* RIGHT JET ENGINE THRUSTER PLUME (Glowing Cyan Flame) */}
          <div className="absolute right-[13%] sm:right-[17%] bottom-[12%] sm:bottom-[15%] w-20 sm:w-28 h-24 sm:h-32 pointer-events-none opacity-85">
            <motion.div
              animate={{
                scale: [1.06, 0.95, 1.05],
                opacity: [0.95, 0.75, 0.95],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="w-full h-full rounded-full blur-[14px]"
              style={{
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.9) 0%, rgba(56, 189, 248, 0.5) 45%, transparent 75%)',
              }}
            />
          </div>

          {/* CENTRAL HATCH / CEILING SKYLIGHT GLOW */}
          <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-48 sm:w-72 h-16 sm:h-24 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full rounded-full blur-[20px] bg-cyan-400/20"
            />
          </div>

          {/* LAPTOP CRATE CONSOLE SCREEN LIGHT (Left Station) */}
          <div className="absolute left-[38%] top-[34%] w-10 h-10 pointer-events-none">
            <motion.div
              animate={{
                opacity: [0.4, 0.85, 0.5, 0.9, 0.4],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full rounded-full blur-[8px] bg-emerald-400/50"
            />
          </div>

          {/* RIGHT BOX BEACON (Hat box station) */}
          <div className="absolute right-[37%] top-[35%] w-8 h-8 pointer-events-none">
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="w-full h-full rounded-full blur-[6px] bg-purple-400/40"
            />
          </div>

          {/* OCCASIONAL BACKGROUND CORRIDOR CREWMATE WALKING ACROSS TOP HATCH */}
          <motion.div
            animate={{
              x: ['-200%', '300%'],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 12,
            }}
            className="absolute top-[27%] left-[45%] w-7 h-11 pointer-events-none opacity-60 filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
          >
            <img
              src="/assets/crewmates/crew_5.png"
              alt="Background Crewmate"
              className="w-full h-full object-contain animate-bounce"
              style={{ animationDuration: '0.6s' }}
            />
          </motion.div>

        </div>
      </motion.div>

      {/* 3. CLEAN AMBIENT SPACE VIGNETTE (NO SCANLINES, NO AI FILTERS) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02040b]/70 pointer-events-none" />

      {/* Parallax Foreground Micro-Dust */}
      <motion.div
        style={{
          x: fgOffsetX,
          y: fgOffsetY,
        }}
        className="absolute inset-0 pointer-events-none opacity-40"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 70px 90px, rgba(0,240,255,0.8), transparent),
                              radial-gradient(1px 1px at 180px 220px, rgba(168,85,247,0.7), transparent),
                              radial-gradient(1px 1px at 340px 140px, rgba(255,255,255,0.8), transparent)`,
            backgroundSize: '360px 360px',
          }}
        />
      </motion.div>
    </div>
  );
};
