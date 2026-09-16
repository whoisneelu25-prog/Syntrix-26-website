import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { NeonButton } from '../ui/NeonButton';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Compass, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert,
  Cpu 
} from 'lucide-react';
import { soundEngine } from '../../lib/soundEffects';

interface HeroSectionProps {
  onOpenPosterModal?: () => void;
  onOpenRegisterModal?: () => void;
  onOpenEmergencyModal?: () => void;
  onOpenCrewCustomizer?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onOpenPosterModal,
  onOpenRegisterModal,
  onOpenEmergencyModal,
  onOpenCrewCustomizer
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* BACKGROUND ORBITAL GUIDES */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[620px] sm:w-[860px] h-[620px] sm:h-[860px] rounded-full border border-cyan-500/10 border-dashed animate-radar-sweep opacity-50" />
        <div className="absolute w-[440px] sm:w-[640px] h-[440px] sm:h-[640px] rounded-full border border-purple-500/15" />
      </div>

      {/* FLOATING ZERO-GRAVITY CREWMATE (DECORATIVE THEMED ANIMATION) */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden lg:flex absolute left-8 xl:left-16 top-1/3 -translate-y-1/2 flex-col items-center pointer-events-none z-10"
      >
        <img
          src="/assets/theme_crewmates/crewmate_1.png"
          alt="Floating Cyan Crewmate"
          className="w-24 2xl:w-28 h-auto object-contain filter drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        />
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-space-950/90 border border-cyan-400/50 text-[9px] font-mono text-cyan-300 text-center uppercase tracking-wider backdrop-blur-md">
          ZERO-G SPECIALIST
        </div>
      </motion.div>

      {/* RIGHT CREWMATE ORBITING */}
      <motion.div
        animate={{
          y: [0, 16, 0],
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
        className="hidden lg:flex absolute right-8 xl:right-16 top-1/3 -translate-y-1/2 flex-col items-center pointer-events-none z-10"
      >
        <img
          src="/assets/carnival_crew/crew_ghost_white.png"
          alt="Flight Navigator"
          className="w-24 2xl:w-28 h-auto object-contain"
        />
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-space-950/90 border border-purple-400/50 text-[9px] font-mono text-purple-300 text-center uppercase tracking-wider backdrop-blur-md">
          NAVIGATOR
        </div>
      </motion.div>

      <div className="relative max-w-4xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-6"
        >
          {/* INSTITUTION & DEPARTMENT STATUS BADGE */}
          <div className="inline-flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-space-950/90 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.2)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-widest text-cyan-100 uppercase">
                {eventConfig.collegeName}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-2 font-chakra text-[10px] sm:text-xs text-purple-300 font-semibold tracking-wider uppercase">
              <span>{eventConfig.collegeSubtitle}</span>
              <span className="text-cyan-400">•</span>
              <span>{eventConfig.location}</span>
            </div>
            {/* DEPARTMENT BADGE */}
            <div className="pt-1.5 mt-0.5 border-t border-cyan-500/20 w-full flex items-center justify-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-orbitron text-[11px] sm:text-xs md:text-sm font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 uppercase">
                {eventConfig.departmentName}
              </span>
            </div>
          </div>

          {/* MAIN OFFICIAL SYNTRIX'26 LOGO (OFFICIAL TRANSPARENT ASSET) */}
          <div className="relative flex flex-col items-center justify-center py-2 sm:py-4">
            {/* Pulsing Multi-Color Radial Background Glow */}
            <div className="absolute w-[90%] max-w-[700px] h-[160px] sm:h-[220px] bg-gradient-to-r from-cyan-500/20 via-purple-600/25 to-pink-500/20 blur-3xl rounded-full pointer-events-none animate-glow-pulse" />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -6, 0]
              }}
              transition={{ 
                scale: { duration: 0.8, ease: 'easeOut' },
                opacity: { duration: 0.8 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative z-10 w-full max-w-[700px] px-2 sm:px-4 group"
            >
              <img
                src="/assets/syntrix_logo_official.png"
                alt="SYNTRIX'26 Official Logo"
                className="w-full h-auto object-contain filter drop-shadow-[0_0_25px_rgba(0,240,255,0.6)] group-hover:drop-shadow-[0_0_40px_rgba(0,240,255,0.85)] transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* THEME STATEMENT (MATCHING POSTER) */}
          <div className="max-w-2xl mx-auto space-y-1 py-2 border-t border-b border-cyan-500/20">
            <p className="font-rajdhani text-sm sm:text-lg lg:text-xl text-cyan-200 font-bold tracking-[0.18em] uppercase leading-snug">
              CELEBRATION OF SOFTWARE FREEDOM DAY
            </p>
            <p className="font-mono text-xs text-purple-400 font-semibold tracking-widest">&amp;</p>
            <p className="font-rajdhani text-sm sm:text-lg lg:text-xl text-purple-200 font-bold tracking-[0.18em] uppercase leading-snug">
              INTERNATIONAL INNOVATION DAY
            </p>
          </div>

          {/* TWO-PHASE MISSION PROTOCOL STRIP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left font-mono">
            <div className="p-3.5 rounded-2xl bg-space-950/90 border border-cyan-500/40 backdrop-blur-md shadow-hud-card">
              <div className="flex items-center justify-between text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  PHASE 1
                </span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-400/40 text-[9px] text-cyan-300">2 MISSIONS</span>
              </div>
              <p className="font-orbitron text-xs sm:text-sm font-black text-white tracking-wide">
                PAPER 404 <span className="text-cyan-400 font-normal">•</span> CRAZY PITCH
              </p>
              <span className="block text-[10px] text-slate-400 mt-1">Presentation &amp; Rapid Startup Pitch</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-space-950/90 border border-purple-500/40 backdrop-blur-md shadow-hud-card">
              <div className="flex items-center justify-between text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  PHASE 2
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-400/40 text-[9px] text-purple-300">2 MISSIONS</span>
              </div>
              <p className="font-orbitron text-xs sm:text-sm font-black text-white tracking-wide">
                PROMPT CRAFT <span className="text-purple-400 font-normal">•</span> AI CASE FILE
              </p>
              <span className="block text-[10px] text-slate-400 mt-1">AI Prompt Orchestration &amp; Cyber Mystery</span>
            </div>
          </div>

          {/* EVENT TELEMETRY STRIP (Date, Time, Venue) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-2xl bg-space-950/90 border border-cyan-500/40 backdrop-blur-md shadow-hud-card font-chakra text-xs max-w-2xl mx-auto">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">DATE</span>
                <span className="font-bold text-white text-xs sm:text-sm">{eventConfig.displayDate}</span>
                <span className="block text-[10px] text-cyan-400 font-semibold">{eventConfig.day}</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 border-y sm:border-y-0 sm:border-x border-white/10 py-2 sm:py-0 px-0 sm:px-3">
              <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">TIME</span>
                <span className="font-bold text-white text-xs sm:text-sm">{eventConfig.time}</span>
                <span className="block text-[10px] text-purple-400 font-semibold">STATION LAUNCH</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">VENUE</span>
                <span className="font-bold text-white text-xs sm:text-sm">{eventConfig.venue}</span>
                <span className="block text-[10px] text-rose-400 font-semibold">PEC CAMPUS</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS ROW (FUTURISTIC MISSION CONSOLE CONTROLS) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <NeonButton
              variant="cyan"
              size="lg"
              href="#briefing"
              icon={<Compass className="w-5 h-5" />}
            >
              ENTER THE MISSION
            </NeonButton>

            <NeonButton
              variant="outline"
              size="lg"
              href="#events"
              icon={<Layers className="w-5 h-5" />}
            >
              VIEW EVENTS
            </NeonButton>

            <a
              href={eventConfig.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                soundEngine.playConfirm();
                if (!eventConfig.googleFormUrl && onOpenRegisterModal) {
                  onOpenRegisterModal();
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-chakra font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(217,70,239,0.4)] hover:shadow-[0_0_35px_rgba(217,70,239,0.7)] cursor-pointer"
            >
              <span>REGISTER NOW</span>
            </a>

            {onOpenPosterModal && (
              <button
                onClick={() => {
                  soundEngine.playConfirm();
                  onOpenPosterModal();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-purple-500/30 bg-purple-950/40 text-purple-300 hover:text-white hover:border-purple-400 font-chakra text-xs font-bold tracking-wider transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>VIEW POSTER</span>
              </button>
            )}

            {onOpenCrewCustomizer && (
              <button
                onClick={() => {
                  soundEngine.playBlip(750);
                  onOpenCrewCustomizer();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:text-white hover:border-cyan-400 font-chakra text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] group"
                title="Crew Select: Customize Hat & Suit"
              >
                <img 
                  src="/assets/theme_crewmates/crewmate_1.png" 
                  alt="Crew Select" 
                  className="w-4 h-4 object-contain group-hover:rotate-12 transition-transform" 
                />
                <span>CREW SELECT</span>
              </button>
            )}

            {onOpenEmergencyModal && (
              <button
                onClick={() => {
                  soundEngine.playEmergencyAlarm();
                  onOpenEmergencyModal();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-red-500/50 bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-white hover:border-red-400 font-chakra text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)] group"
                title="Easter Egg: Emergency Meeting"
              >
                <ShieldAlert className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform animate-pulse" />
                <span>EMERGENCY</span>
              </button>
            )}
          </div>

          {/* MISSIONS BADGE CHIP */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-space-950/80 border border-purple-500/30 font-chakra text-xs text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              🚀 4 MISSIONS // TECH &amp; NON-TECH
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
