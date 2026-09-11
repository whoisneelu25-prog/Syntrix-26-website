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
  ShieldAlert 
} from 'lucide-react';
import { soundEngine } from '../../lib/soundEffects';

interface HeroSectionProps {
  onOpenPosterModal?: () => void;
  onOpenRegisterModal?: () => void;
  onOpenEmergencyModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onOpenPosterModal,
  onOpenRegisterModal,
  onOpenEmergencyModal
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

      <div className="relative max-w-4xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-6"
        >
          {/* INSTITUTION STATUS BADGE (POSTER SERIF STYLING) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-space-950/85 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-cyan-200 uppercase">
              {eventConfig.collegeName}
            </span>
            <span className="hidden sm:inline font-chakra text-[11px] text-purple-300 font-semibold tracking-wider">
              {eventConfig.collegeSubtitle}
            </span>
          </div>

          {/* MAIN POSTER TITLE */}
          <div className="space-y-2">
            <motion.h1
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="font-russo text-6xl sm:text-8xl lg:text-9xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400 text-glow-cyan leading-[1.02]"
            >
              {eventConfig.eventName}
            </motion.h1>

            <div className="inline-block px-4 py-1 rounded-md bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-transparent border-l-4 border-r-4 border-cyan-400">
              <p className="font-chakra text-xs sm:text-sm font-bold tracking-[0.25em] text-cyan-300 uppercase">
                {eventConfig.eventTagline}
              </p>
            </div>
          </div>

          {/* THEME STATEMENT (POSTER STYLING) */}
          <p className="font-rajdhani text-base sm:text-lg lg:text-xl text-slate-200 font-bold tracking-wide uppercase max-w-2xl mx-auto leading-snug border-t border-b border-white/10 py-3">
            {eventConfig.eventTheme}
          </p>

          {/* EVENT TELEMETRY STRIP (Date, Time, Venue) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-2xl bg-space-950/85 border border-cyan-500/30 backdrop-blur-md shadow-hud-card font-chakra text-xs max-w-2xl mx-auto">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">DATE</span>
                <span className="font-bold text-white text-xs sm:text-sm">18-09-2026</span>
                <span className="block text-[10px] text-cyan-400 font-semibold">FRIDAY</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 border-y sm:border-y-0 sm:border-x border-white/10 py-2 sm:py-0 px-0 sm:px-3">
              <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">TIME</span>
                <span className="font-bold text-white text-xs sm:text-sm">{eventConfig.time}</span>
                <span className="block text-[10px] text-purple-400 font-semibold">08:30 REPORT</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">VENUE</span>
                <span className="font-bold text-white text-xs sm:text-sm">{eventConfig.venue}</span>
                <span className="block text-[10px] text-rose-400 font-semibold">SEMINAR HALL</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS ROW (CLEANLY ALIGNED, ZERO OVERLAPPING) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
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

            <button
              onClick={() => {
                soundEngine.playConfirm();
                if (onOpenRegisterModal) {
                  onOpenRegisterModal();
                } else {
                  window.location.href = '#register';
                }
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              REGISTER NOW
            </button>

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
