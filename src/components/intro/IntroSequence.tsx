import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../lib/soundEffects';
import { FastForward, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

// Cinematic sequence phases:
// 1: Crewmate A walks across the lobby floor
// 2: Impostor enters, stops, tension HUD ("UNKNOWN CREWMATE DETECTED")
// 3: The Cartoon Kill (Instant lunge, kill strike sound, dead body half + ascending ghost, red flash & camera shake)
// 4: Emergency Meeting Alert (red screen strobe, siren, "EMERGENCY MEETING", "CREWMATE LOST")
// 5: Grand SYNTRIX'26 Reveal ("MISSION REASSIGNED", poster-style logo reveal)
type CinematicPhase = 1 | 2 | 3 | 4 | 5;

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<CinematicPhase>(1);
  const [isCameraShaking, setIsCameraShaking] = useState<boolean>(false);
  const [threatText, setThreatText] = useState<string>('');
  const [isSkipping, setIsSkipping] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        onComplete();
        return;
      }
      // Force sound always active and ensure audio context is ready for intro scene
      soundEngine.setUnmuted();
      soundEngine.initContext();
    }

    // Footsteps as crewmate enters
    const step1 = setTimeout(() => soundEngine.playFootstep(), 400);
    const step2 = setTimeout(() => soundEngine.playFootstep(), 850);
    const step3 = setTimeout(() => soundEngine.playFootstep(), 1300);

    // Phase 1 -> Phase 2: Impostor appears & tension HUD (at 1.7s)
    const tPhase2 = setTimeout(() => {
      setPhase(2);
      setThreatText('UNKNOWN CREWMATE DETECTED');
      soundEngine.playWarningBeep();
    }, 1700);

    const tThreatUpdate = setTimeout(() => {
      setThreatText('THREAT LEVEL: CRITICAL ⚠️');
      soundEngine.playBlip(780);
    }, 2500);

    // Phase 2 -> Phase 3: The Cartoon Kill (at 3.4s)
    const tPhase3 = setTimeout(() => {
      setPhase(3);
      setIsCameraShaking(true);
      // Play authentic, punchy Among Us kill sound!
      soundEngine.playKillStrike();
    }, 3400);

    // Stop camera shake after 350ms
    const tStopShake = setTimeout(() => {
      setIsCameraShaking(false);
    }, 3750);

    // Phase 3 -> Phase 4: Emergency Alert & Siren (at 4.5s)
    const tPhase4 = setTimeout(() => {
      setPhase(4);
      soundEngine.playEmergencyAlarm();
    }, 4500);

    // Phase 4 -> Phase 5: SYNTRIX'26 Grand Reveal (at 6.2s)
    const tPhase5 = setTimeout(() => {
      setPhase(5);
      soundEngine.playMissionReveal();
    }, 6200);

    // Complete intro at 9.2s
    const tFinal = setTimeout(() => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('syntrix26_intro_seen', 'true');
      }
      soundEngine.playWhoosh();
      onComplete();
    }, 9200);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(tPhase2);
      clearTimeout(tThreatUpdate);
      clearTimeout(tPhase3);
      clearTimeout(tStopShake);
      clearTimeout(tPhase4);
      clearTimeout(tPhase5);
      clearTimeout(tFinal);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsSkipping(true);
    soundEngine.playWhoosh();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('syntrix26_intro_seen', 'true');
    }
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: isSkipping ? 0 : 1,
        x: isCameraShaking ? [0, -12, 12, -9, 9, -5, 5, 0] : 0,
        y: isCameraShaking ? [0, 9, -9, 7, -7, 4, -4, 0] : 0,
      }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: isCameraShaking ? 0.35 : 0.4 }}
      onClick={() => {
        soundEngine.initContext();
      }}
      onPointerDown={() => {
        soundEngine.initContext();
      }}
      onPointerMove={() => {
        soundEngine.initContext();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-space-950 select-none cursor-pointer"
    >
      {/* TOP CONTROLS */}
      <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-end pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/40 bg-space-950/85 backdrop-blur-md text-xs font-mono tracking-widest text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/70 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)] group"
          aria-label="Skip cinematic introduction"
        >
          <span>SKIP INTRO</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* ========================================================
          THE AMONG US DROPSHIP LOBBY BACKGROUND STAGE
      ======================================================== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Starfield background */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 30px 40px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 150px 100px, #38bdf8, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 280px 220px, #a855f7, rgba(0,0,0,0))`,
            backgroundSize: '300px 300px',
          }}
        />

        {/* The Exact Lobby Image & Bounds Container */}
        <div className="relative w-full h-full max-w-[1700px] max-h-[96vh] flex items-center justify-center">
          <img
            src="/assets/lobby/lobby.webp"
            alt="Among Us Dropship Lobby"
            className="w-full h-full object-contain max-h-[96vh] drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
          />

          {/* Left Thruster cyan plume */}
          <div className="absolute left-[13%] sm:left-[17%] bottom-[12%] sm:bottom-[15%] w-24 h-28 pointer-events-none">
            <motion.div
              animate={{ scale: [0.95, 1.1, 0.95], opacity: [0.7, 0.95, 0.7] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full rounded-full blur-[14px] bg-cyan-400/80"
            />
          </div>

          {/* Right Thruster cyan plume */}
          <div className="absolute right-[13%] sm:right-[17%] bottom-[12%] sm:bottom-[15%] w-24 h-28 pointer-events-none">
            <motion.div
              animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.95, 0.7, 0.95] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="w-full h-full rounded-full blur-[14px] bg-cyan-400/80"
            />
          </div>

          {/* ========================================================
              CHARACTER STAGE (Anchored directly to the Lobby Floor!)
              Floor area is between left: 32% to 68%, top: 46% to 64%
          ======================================================== */}
          {(phase === 1 || phase === 2 || phase === 3) && (
            <div className="absolute inset-0 pointer-events-none z-20">
              
              {/* CREWMATE A (Cyan Blue Walking Crewmate) */}
              {(phase === 1 || phase === 2) && (
                <motion.div
                  initial={{ left: '26%', top: '50%', opacity: 0, scale: 0.95 }}
                  animate={
                    phase === 1
                      ? {
                          left: '42%',
                          top: ['50%', '48%', '50%'],
                          opacity: 1,
                          scale: 1,
                        }
                      : {
                          left: '42%',
                          top: '50%',
                          opacity: 1,
                          scale: 1,
                        }
                  }
                  transition={
                    phase === 1
                      ? {
                          left: { duration: 1.6, ease: 'easeOut' },
                          top: { duration: 0.4, repeat: Infinity, ease: 'easeInOut' },
                          opacity: { duration: 0.3 },
                        }
                      : { duration: 0.2 }
                  }
                  className="absolute w-20 sm:w-28 md:w-32 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                >
                  <img
                    src="/assets/cinematic/cyan_walking.png"
                    alt="Cyan Crewmate"
                    className="w-full h-auto object-contain filter drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  />
                  {/* Realistic Ground Shadow on the ship floor */}
                  <div className="w-16 sm:w-20 h-3 sm:h-4 bg-black/80 rounded-full blur-[3px] -mt-2" />
                </motion.div>
              )}

              {/* DEAD BODY & ASCENDING GHOST (Appears at Phase 3 Kill) */}
              {phase === 3 && (
                <>
                  {/* The iconic half-body with bone resting on the floor */}
                  <motion.div
                    initial={{ left: '42%', top: '51%', scale: 0.8, opacity: 0 }}
                    animate={{ left: '42%', top: '52%', scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="absolute w-20 sm:w-28 md:w-32 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]"
                  >
                    <img
                      src="/assets/cinematic/cyan_dead_body.png"
                      alt="Dead Crewmate Body"
                      className="w-full h-auto object-contain"
                    />
                    <div className="w-20 sm:w-24 h-4 bg-black/80 rounded-full blur-[3px] -mt-1" />
                  </motion.div>

                  {/* The Cyan Ghost ascending upwards to heaven */}
                  <motion.div
                    initial={{ left: '42%', top: '48%', scale: 0.7, opacity: 0 }}
                    animate={{ left: '44%', top: '28%', scale: 1.05, opacity: [0, 0.9, 0.5] }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    className="absolute w-16 sm:w-22 md:w-26 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]"
                  >
                    <img
                      src="/assets/cinematic/cyan_ghost.png"
                      alt="Crewmate Ghost"
                      className="w-full h-auto object-contain"
                    />
                  </motion.div>
                </>
              )}

              {/* IMPOSTOR B (Red Impostor sneaking in and striking) */}
              {(phase === 2 || phase === 3) && (
                <motion.div
                  initial={{ left: '68%', top: '49%', opacity: 0, scale: 0.95 }}
                  animate={
                    phase === 2
                      ? {
                          left: '56%',
                          top: ['49%', '47.5%', '49%'],
                          opacity: 1,
                          scale: 1,
                        }
                      : {
                          // Lunges directly into the crewmate at left 46%!
                          left: '46%',
                          top: '49%',
                          scale: 1.18,
                          opacity: 1,
                        }
                  }
                  transition={
                    phase === 2
                      ? {
                          left: { duration: 1.4, ease: 'easeOut' },
                          top: { duration: 0.35, repeat: Infinity, ease: 'easeInOut' },
                          opacity: { duration: 0.3 },
                        }
                      : {
                          duration: 0.12,
                          ease: 'backOut',
                        }
                  }
                  className="absolute w-24 sm:w-32 md:w-36 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center drop-shadow-[0_15px_30px_rgba(244,63,94,0.7)]"
                >
                  <img
                    src="/assets/cinematic/red_impostor.png"
                    alt="Red Impostor"
                    className="w-full h-auto object-contain filter drop-shadow-[0_0_18px_rgba(244,63,94,0.7)]"
                  />
                  {/* Impostor Floor Shadow */}
                  <div className="w-20 sm:w-24 h-3 sm:h-4 bg-black/85 rounded-full blur-[3px] -mt-2" />
                </motion.div>
              )}

              {/* Tension HUD during Phase 2 */}
              <AnimatePresence>
                {phase === 2 && threatText && (
                  <motion.div
                    initial={{ opacity: 0, y: -15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-[34%] left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/95 border-2 border-red-500 backdrop-blur-xl text-red-300 font-mono text-xs sm:text-sm tracking-widest shadow-[0_0_30px_rgba(244,63,94,0.6)]"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" />
                    <span className="font-bold">{threatText}</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}

        </div>        {/* Ambient CRT Lighting (Clean and clear, no scanlines) */}
      </div>

      {/* ========================================================
          SCENE 3: CARTOON KILL IMPACT FRAME (Red Flash & Glitch)
      ======================================================== */}
      {phase === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.95, 0.15, 0.8, 0] }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 bg-red-600/70 mix-blend-screen pointer-events-none z-30"
        />
      )}

      {/* ========================================================
          SCENE 4: EMERGENCY MEETING ALERT
      ======================================================== */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div
            key="phase-4-emergency"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="relative z-40 flex flex-col items-center justify-center text-center px-4 max-w-2xl"
          >
            {/* Pulsing Red Emergency Beacon */}
            <div className="relative mb-6">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.9)]"
              >
                <AlertTriangle className="w-12 h-12 sm:w-14 sm:h-14 text-red-500 animate-pulse" />
              </motion.div>
              <div className="absolute -inset-4 rounded-full border border-red-500/40 animate-ping pointer-events-none" />
            </div>

            <motion.h2
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="font-russo text-3xl sm:text-5xl font-black tracking-wider text-red-500 uppercase drop-shadow-[0_0_30px_rgba(239,68,68,0.8)] mb-3"
            >
              DEAD BODY REPORTED!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-chakra text-sm sm:text-base text-red-200 tracking-wider max-w-lg mb-6"
            >
              SECURITY COMPROMISED IN LOWER ENGINE ROOM.
              <br />
              ALL HANDS REPORT TO THE MAIN LOBBY IMMEDIATELY.
            </motion.p>

            <div className="flex flex-col items-center gap-2 font-chakra text-xs text-red-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>OVERRIDE PROTOCOL ENGAGED</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-emerald-400 font-bold tracking-[0.2em]"
              >
                ● ALL SYSTEMS RE-ROUTED TO SYNTRIX'26
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          SCENE 5: GRAND SYNTRIX'26 REVEAL (Matching Poster Aesthetic)
      ======================================================== */}
      <AnimatePresence>
        {phase === 5 && (
          <motion.div
            key="phase-5-syntrix"
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-40 flex flex-col items-center justify-center text-center px-4 max-w-3xl"
          >
            {/* College Autonomous Seal Badge */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/50 bg-space-900/90 backdrop-blur-md text-[11px] sm:text-xs font-cinzel font-bold tracking-widest text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.3)] mb-3"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>PRATHYUSHA ENGINEERING COLLEGE</span>
              <span className="text-cyan-300 font-chakra">(AUTONOMOUS)</span>
            </motion.div>

            {/* SYNTRIX'26 GRAND TITLE */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 140 }}
              className="w-full max-w-md sm:max-w-lg mb-4 flex justify-center"
            >
              <img
                src="/assets/syntrix_logo_official.png"
                alt="SYNTRIX'26"
                className="w-full h-auto object-contain filter drop-shadow-[0_0_35px_rgba(0,240,255,0.7)]"
              />
            </motion.div>

            {/* OFFICIAL THEME SUBTITLE */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="font-rajdhani text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-cyan-200 max-w-xl mb-4 leading-relaxed"
            >
              CELEBRATION OF SOFTWARE FREEDOM DAY &amp; INTERNATIONAL INNOVATION DAY
            </motion.p>

            {/* DATE, TIME & VENUE TELEMETRY BAR */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 py-2.5 px-6 rounded-xl bg-space-950/85 border border-cyan-500/40 backdrop-blur-md font-chakra text-xs text-slate-300 mb-5 w-full max-w-lg shadow-[0_0_25px_rgba(0,240,255,0.2)]"
            >
              <div>
                <span className="block text-[10px] text-cyan-400 uppercase tracking-widest font-mono">DATE</span>
                <span className="font-bold text-white tracking-wider">18-09-2026</span>
              </div>
              <div className="border-x border-white/10">
                <span className="block text-[10px] text-cyan-400 uppercase tracking-widest font-mono">TIME</span>
                <span className="font-bold text-white tracking-wider">09:00 AM</span>
              </div>
              <div>
                <span className="block text-[10px] text-cyan-400 uppercase tracking-widest font-mono">VENUE</span>
                <span className="font-bold text-white tracking-wider">AI&DS BLOCK</span>
              </div>
            </motion.div>

            {/* MISSION INITIALIZED BADGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-chakra font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(0,240,255,0.6)]"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-200" />
              <span>MISSION INITIALIZED · ENTERING LOBBY</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM LOADING TELEMETRY PROGRESS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 z-40">
        <div className="h-1 w-full bg-space-900 rounded-full overflow-hidden border border-cyan-500/30">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 8.8, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_#00f0ff]"
          />
        </div>
        <div className="flex justify-between items-center mt-1.5 font-mono text-[9px] text-cyan-400/80">
          <span>DROPSHIP TELEMETRY</span>
          <span>
            {phase === 1
              ? 'CREWMATE PATROL...'
              : phase === 2
              ? 'ANOMALY DETECTED'
              : phase === 3
              ? 'IMPOSTOR STRIKE'
              : phase === 4
              ? 'EMERGENCY MEETING'
              : 'SYSTEM READY'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
