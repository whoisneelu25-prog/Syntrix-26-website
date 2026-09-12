import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../lib/soundEffects';
import { ShieldAlert, Zap, RotateCcw, AlertTriangle, Radio } from 'lucide-react';

interface ImpostorKillCorridorProps {
  onEmergencyReport?: () => void;
}

export const ImpostorKillCorridor: React.FC<ImpostorKillCorridorProps> = ({
  onEmergencyReport
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasKilled, setHasKilled] = useState<boolean>(false);
  const [reportActive, setReportActive] = useState<boolean>(false);
  const [isManualPlaying, setIsManualPlaying] = useState<boolean>(false);

  // Monitor scroll progress across this corridor section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Derived transforms for fluid scroll parallax
  // 0.0 - 0.35: Crewmate walks towards electrical box
  // 0.35 - 0.50: Impostor creeps out of vent
  // 0.50+: Kill strike moment
  const crewmateX = useTransform(scrollYProgress, [0.1, 0.45], [-80, 0]);
  const ventSteamOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.2, 0.8, 0.1]);

  // Trigger kill when user scrolls into the strike zone (~48% of the container)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress >= 0.46 && !hasKilled && !isManualPlaying) {
        executeKillSequence();
      } else if (progress < 0.18 && hasKilled) {
        // Reset when user scrolls far back up, so scrolling down can trigger it again!
        setHasKilled(false);
        setReportActive(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, hasKilled, isManualPlaying]);

  const executeKillSequence = () => {
    setHasKilled(true);
    soundEngine.playKillStrike();

    // After kill, enable emergency report prompt
    setTimeout(() => {
      setReportActive(true);
    }, 600);
  };

  const handleManualReplay = () => {
    soundEngine.playBlip(700);
    setHasKilled(false);
    setReportActive(false);
    setIsManualPlaying(true);

    // Run automated step replay
    setTimeout(() => {
      executeKillSequence();
      setTimeout(() => {
        setIsManualPlaying(false);
      }, 1200);
    }, 400);
  };

  const handleReportClick = () => {
    soundEngine.playEmergencyAlarm();
    if (onEmergencyReport) {
      onEmergencyReport();
    }
  };

  return (
    <section
      ref={containerRef}
      id="corridor"
      aria-label="Dropship Corridor Anomaly"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden select-none"
    >
      {/* CORRIDOR HUD STATUS HEADER */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-red-500" />
          DECK 03 // ELECTRICAL CORRIDOR TELEMETRY
        </div>

        <h2 className="font-orbitron text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-3">
          <span>ELECTRICAL SHAFT</span>
          <span className="text-red-500 font-mono text-sm px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40">
            {hasKilled ? 'SABOTAGE DETECTED' : 'TASK IN PROGRESS'}
          </span>
        </h2>

        <p className="font-mono text-xs text-slate-400 max-w-lg mx-auto">
          {hasKilled 
            ? '🚨 IMPOSTOR STRUCK IN ELECTRICAL! Report the body before the ship vents!'
            : 'Scroll down as crewmates perform wiring maintenance in Deck 03...'}
        </p>
      </div>

      {/* THE DROPSHIP CORRIDOR STAGE */}
      <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl bg-gradient-to-b from-space-950 via-[#0a0f1d] to-[#050811] border-2 border-cyan-500/30 overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
        
        {/* TOP METALLIC RAFTERS & SECURITY SCANNER */}
        <div className="relative z-10 w-full h-12 bg-space-950/90 border-b border-cyan-500/20 px-4 sm:px-6 flex items-center justify-between font-mono text-[10px] text-cyan-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="tracking-widest">CAM-04 // ELECTRICAL</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Radio className="w-3 h-3 text-red-400 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-red-400">
              {hasKilled ? 'BIO-SIGN TERMINATED' : '1 CREWMATE PRESENT'}
            </span>
          </div>
        </div>

        {/* BACKGROUND WALL DETAILS & VENTILATION PIPES */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical steel wall seams */}
          <div className="w-full h-full flex justify-between px-12 sm:px-24 opacity-20">
            <div className="w-px h-full bg-cyan-400" />
            <div className="w-px h-full bg-cyan-400" />
            <div className="w-px h-full bg-cyan-400" />
            <div className="w-px h-full bg-cyan-400" />
          </div>

          {/* Cyan / Red Ambient Alarm Flashing */}
          <motion.div
            animate={
              hasKilled
                ? { opacity: [0.15, 0.45, 0.15] }
                : { opacity: 0.08 }
            }
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute inset-0 ${hasKilled ? 'bg-red-600/30' : 'bg-cyan-500/10'}`}
          />
        </div>

        {/* LEFT ELECTRICAL PANEL WORKSTATION */}
        <div className="absolute left-6 sm:left-14 bottom-10 z-10 flex flex-col items-center">
          <div className="w-16 sm:w-20 h-28 sm:h-32 rounded-lg bg-space-900 border-2 border-cyan-500/40 p-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] relative">
            {/* Blinking colored wire lights */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[9px] font-mono text-cyan-300">
                <span>WIRES</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="h-1.5 w-full bg-red-500/80 rounded-full animate-pulse" />
              <div className="h-1.5 w-full bg-blue-500/80 rounded-full" />
              <div className="h-1.5 w-full bg-yellow-500/80 rounded-full animate-pulse" />
              <div className="h-1.5 w-full bg-pink-500/80 rounded-full" />
            </div>

            {/* Spark animation */}
            <motion.div
              animate={{ opacity: [0, 1, 0, 0.8, 0], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute -right-2 top-4 text-amber-300"
            >
              <Zap className="w-4 h-4 fill-current drop-shadow-[0_0_8px_#fbbf24]" />
            </motion.div>
          </div>
          <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-1">
            TASK #04
          </span>
        </div>

        {/* RIGHT METALLIC FLOOR VENT (Where Impostor Enters/Exits) */}
        <div className="absolute right-8 sm:right-16 bottom-8 z-10 flex flex-col items-center">
          {/* Steam Cloud rising from vent */}
          <motion.div
            style={{ opacity: ventSteamOpacity }}
            animate={{ y: [0, -20], scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="w-12 h-12 rounded-full bg-cyan-300/30 blur-md pointer-events-none mb-1"
          />

          {/* Vent Grate on floor */}
          <div className="w-24 sm:w-28 h-7 sm:h-8 rounded-lg bg-space-950 border-2 border-slate-700 shadow-inner flex items-center justify-center gap-1 px-2 relative">
            <div className="w-1.5 h-4 bg-black rounded-sm" />
            <div className="w-1.5 h-4 bg-black rounded-sm" />
            <div className="w-1.5 h-4 bg-black rounded-sm" />
            <div className="w-1.5 h-4 bg-black rounded-sm" />
            <div className="w-1.5 h-4 bg-black rounded-sm" />
            <div className="w-1.5 h-4 bg-black rounded-sm" />

            {/* Impostor glowing eyes peeking if not killed yet */}
            {!hasKilled && (
              <motion.div
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
                className="absolute inset-0 flex items-center justify-center gap-3 pointer-events-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
              </motion.div>
            )}
          </div>
          <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mt-1">
            VENTILATION SHAFT
          </span>
        </div>

        {/* CENTER ACTION STAGE (CREWMATE, KILL, GHOST, IMPOSTOR) */}
        <div className="relative w-full h-full flex items-end justify-center pb-8 px-10">
          
          {/* 1. THE VICTIM (Walking & doing task before kill) */}
          {!hasKilled && (
            <motion.div
              style={{ x: crewmateX }}
              className="absolute left-[30%] sm:left-[36%] bottom-10 z-20 flex flex-col items-center cursor-pointer"
              onClick={executeKillSequence}
              title="Click to trigger ambush early!"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Purple Pumpkin Crewmate (From user's uploaded Halloween set!) */}
                <img
                  src="/assets/carnival_crew/crew_pumpkin_purple.png"
                  alt="Purple Pumpkin Crewmate"
                  className="w-20 sm:w-24 md:w-28 h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                />

                {/* Speech Bubble */}
                <div className="absolute -top-7 -right-10 px-2 py-0.5 rounded-md bg-cyan-950/90 border border-cyan-400 text-[10px] font-mono text-cyan-300 shadow-md whitespace-nowrap">
                  Just fixing wires... 🛠️
                </div>
              </motion.div>

              {/* Floor Shadow */}
              <div className="w-16 sm:w-20 h-3 bg-black/80 rounded-full blur-[2px] mt-1" />
            </motion.div>
          )}

          {/* 2. POST-KILL: DEAD BODY & TUMBLING PUMPKIN HAT */}
          {hasKilled && (
            <div className="absolute left-[30%] sm:left-[36%] bottom-9 z-20 flex flex-col items-center">
              {/* Dead body with bone */}
              <motion.div
                initial={{ scale: 0.8, y: -20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="relative flex flex-col items-center"
              >
                <img
                  src="/assets/cinematic/cyan_dead_body.png"
                  alt="Dead Crewmate Body"
                  className="w-20 sm:w-24 md:w-28 h-auto object-contain filter drop-shadow-[0_10px_25px_rgba(239,68,68,0.5)]"
                />

                {/* Tumbling Pumpkin Hat beside body */}
                <motion.img
                  initial={{ x: 0, y: -40, rotate: 0 }}
                  animate={{ x: 35, y: 10, rotate: 45 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  src="/assets/carnival_crew/pumpkin_hat.png"
                  alt="Knocked off pumpkin hat"
                  className="absolute right-0 bottom-0 w-10 sm:w-12 h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                />
              </motion.div>

              {/* Ground Shadow */}
              <div className="w-20 sm:w-24 h-3.5 bg-black/90 rounded-full blur-[2px] mt-1" />
            </div>
          )}

          {/* 3. POST-KILL: ASCENDING PINK GHOST */}
          <AnimatePresence>
            {hasKilled && (
              <motion.div
                initial={{ left: '34%', bottom: '70px', opacity: 0, scale: 0.6 }}
                animate={{
                  left: '37%',
                  bottom: ['80px', '220px'],
                  opacity: [0, 0.95, 0.7, 0.4],
                  scale: [0.8, 1.1, 1],
                  rotate: [-3, 3, -3]
                }}
                transition={{ duration: 3.5, ease: 'easeOut', repeat: Infinity }}
                className="absolute z-25 pointer-events-none flex flex-col items-center"
              >
                <img
                  src="/assets/carnival_crew/crew_ghost_pink.png"
                  alt="Pink Ghost Crewmate Ascending"
                  className="w-16 sm:w-20 h-auto object-contain filter drop-shadow-[0_0_20px_rgba(244,114,182,0.8)]"
                />
                <span className="font-mono text-[9px] text-pink-300 tracking-wider uppercase mt-1">
                  👻 GHOST HOVERING
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. THE RED IMPOSTOR (Emerges, Strikes, Escapes) */}
          <AnimatePresence>
            {hasKilled ? (
              // Post-kill: Impostor laughs and jumps back into vent on right
              <motion.div
                initial={{ left: '48%', bottom: '40px', scale: 1.15, opacity: 1 }}
                animate={{
                  left: ['48%', '75%', '85%'],
                  bottom: ['40px', '50px', '32px'],
                  scale: [1.15, 0.9, 0.3],
                  opacity: [1, 0.9, 0]
                }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="absolute z-30 pointer-events-none flex flex-col items-center"
              >
                <img
                  src="/assets/cinematic/red_impostor.png"
                  alt="Red Impostor Venting"
                  className="w-24 sm:w-28 md:w-32 h-auto object-contain filter drop-shadow-[0_0_25px_rgba(239,68,68,0.85)]"
                />
                <div className="px-2 py-0.5 rounded bg-red-950/90 border border-red-500 text-[10px] font-mono text-red-300 font-bold">
                  HEHEHE... 😈
                </div>
              </motion.div>
            ) : (
              // Pre-kill: Impostor sneaking closer from right side vent
              <motion.div
                initial={{ left: '78%', bottom: '38px', opacity: 0 }}
                animate={{ left: '55%', bottom: '38px', opacity: 1 }}
                transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="absolute z-20 flex flex-col items-center"
              >
                <img
                  src="/assets/cinematic/red_impostor.png"
                  alt="Red Impostor Stalking"
                  className="w-20 sm:w-24 md:w-28 h-auto object-contain filter drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]"
                />
                <div className="w-18 h-3 bg-black/80 rounded-full blur-[2px] mt-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 5. SLASH IMPACT SHOCKWAVE VFX (Flashes during strike) */}
          <AnimatePresence>
            {hasKilled && !reportActive && (
              <motion.div
                initial={{ scale: 0.2, opacity: 1, rotate: -30 }}
                animate={{ scale: 2.2, opacity: 0, rotate: 15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute left-[38%] bottom-16 z-40 pointer-events-none"
              >
                {/* Neon Red Slash Arc */}
                <div className="w-36 h-2 bg-gradient-to-r from-transparent via-red-500 to-white rounded-full shadow-[0_0_25px_#ff0033]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM FLOOR HAZARD STRIPING & FOOTER BAR */}
        <div className="relative z-10 w-full h-8 bg-space-950/95 border-t border-cyan-500/20 px-4 flex items-center justify-between font-mono text-[9px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="uppercase tracking-widest text-slate-300">
              HAZARD CORRIDOR // SCROLL TO ADVANCE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleManualReplay}
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>REPLAY AMBUSH</span>
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE EMERGENCY REPORT MODAL TRIGGER */}
      <AnimatePresence>
        {reportActive && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Pulsing Emergency Report Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleReportClick}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-orbitron font-black text-sm tracking-wider uppercase border-2 border-red-400 shadow-[0_0_35px_rgba(239,68,68,0.7)] flex items-center gap-3 cursor-pointer animate-bounce"
            >
              <ShieldAlert className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '3s' }} />
              <span>REPORT DEAD BODY (CALL EMERGENCY MEETING)</span>
            </motion.button>

            {/* Replay Button */}
            <button
              onClick={handleManualReplay}
              className="px-4 py-3 rounded-2xl bg-space-900/90 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET ENCOUNTER</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
