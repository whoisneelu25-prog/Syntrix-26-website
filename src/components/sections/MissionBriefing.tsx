import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { HUDPanel } from '../ui/HUDPanel';
import { 
  Radio, 
  MapPin, 
  Calendar, 
  Terminal, 
  Target,
  CheckCircle2
} from 'lucide-react';

export const MissionBriefing: React.FC = () => {
  return (
    <section id="briefing" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-10">
        
        {/* SECTION HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            DIRECTIVE BROADCAST // PROTOCOL PEC-2026
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-300">
            MISSION BRIEFING
          </h2>

          <p className="font-mono text-xs sm:text-sm text-slate-400 tracking-wider uppercase max-w-xl mx-auto">
            Official operational parameters for all arriving crewmates
          </p>
        </div>

        {/* KEY HUD TELEMETRY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -3 }}
            className="p-4 rounded-xl bg-space-900/90 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)] flex flex-col items-center text-center"
          >
            <MapPin className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">LOCATION</span>
            <span className="font-orbitron font-extrabold text-xs sm:text-sm text-white">{eventConfig.venue}</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="p-4 rounded-xl bg-space-900/90 border border-purple-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)] flex flex-col items-center text-center"
          >
            <Calendar className="w-4 h-4 text-purple-400 mb-1" />
            <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">DATE</span>
            <span className="font-orbitron font-extrabold text-xs sm:text-sm text-purple-200">18.09.2026</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="p-4 rounded-xl bg-space-900/90 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)] flex flex-col items-center text-center"
          >
            <Target className="w-4 h-4 text-cyan-300 mb-1" />
            <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">OBJECTIVE</span>
            <span className="font-orbitron font-extrabold text-[11px] sm:text-xs text-cyan-300">INNOVATE • CREATE • SOLVE</span>
          </motion.div>
        </div>

        {/* TERMINAL DOSSIER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: TRANSMISSION MESSAGE (7 COLS) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <HUDPanel title="CREWMATE DIRECTIVE" code="TX-2026.SFD" glowColor="cyan">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                  <Terminal className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                  <p>
                    <span className="font-bold uppercase tracking-wider text-white">WELCOME, CREWMATE.</span>
                    <br />
                    Your mission is to explore groundbreaking ideas, challenge computational creativity, and deploy engineering mastery across four classified sectors.
                  </p>
                </div>

                <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    In celebration of <strong className="text-cyan-300 font-medium">Software Freedom Day</strong> &amp; <strong className="text-purple-300 font-medium">International Innovation Day</strong>, the <strong className="text-cyan-300 font-semibold">{eventConfig.departmentTitle}</strong> at <span className="text-white font-semibold">Prathyusha Engineering College</span> opens the dropship lobby for <span className="text-cyan-400 font-orbitron font-bold">SYNTRIX'26</span>.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
                    The championship unfolds across two distinct operational tracks:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                      <span className="text-cyan-400 font-bold uppercase block text-[10px] tracking-wider mb-0.5">PHASE 1 TRACK</span>
                      <span className="text-white font-semibold block text-xs">PAPER 404 &bull; CRAZY PITCH</span>
                      <span className="text-[10px] text-slate-400">Research Presentation &amp; Startup Pitch</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30">
                      <span className="text-purple-400 font-bold uppercase block text-[10px] tracking-wider mb-0.5">PHASE 2 TRACK</span>
                      <span className="text-white font-semibold block text-xs">PROMPT CRAFT &bull; AI CASE FILE</span>
                      <span className="text-[10px] text-slate-400">Prompt Engineering &amp; Cyber Mystery</span>
                    </div>
                  </div>
                </div>

                {/* MISSION OBJECTIVES */}
                <div className="pt-2 border-t border-cyan-500/20 space-y-2">
                  <span className="block font-mono text-[11px] text-cyan-400 tracking-wider uppercase font-bold">
                    PRIMARY PROTOCOLS:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Defend Software Freedom</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Synthesize High-Impact Solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Solve Under Strict Time Limits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Pitch The Impossible Like A Unicorn</span>
                    </div>
                  </div>
                </div>
              </div>
            </HUDPanel>
          </motion.div>

          {/* RIGHT: CREWMATE TERMINAL WORKSTATION (5 COLS) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="h-full rounded-2xl bg-space-950/90 border border-cyan-500/30 p-6 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group">
              {/* Terminal Background Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-widest">
                      LOBBY TERMINAL 01
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">SYSTEM ID: PEC-SYNTRIX</span>
                </div>

                {/* Animated Crewmates at Work (Duo) */}
                <div className="py-4 flex items-center justify-center gap-4 sm:gap-8">
                  {/* Primary Cyan Crewmate */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative flex flex-col items-center"
                  >
                    <img
                      src="/assets/theme_crewmates/crewmate_1.png"
                      alt="Crewmate Working at Terminal"
                      className="w-20 sm:w-24 h-auto object-contain filter drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                    />
                    <div className="w-16 h-2.5 bg-black/80 rounded-full blur-[2px] mt-1" />
                    <div className="absolute -top-3 -right-2 px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-400 text-[9px] font-mono text-cyan-300 animate-pulse whitespace-nowrap">
                      ONLINE 💻
                    </div>
                  </motion.div>

                  {/* Halloween Cat Crewmate Companion */}
                  <motion.div
                    animate={{ y: [-4, 2, -4], rotate: [-2, 2, -2] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    className="relative flex flex-col items-center"
                  >
                    <img
                      src="/assets/carnival_crew/crew_cat_orange.png"
                      alt="Cat Crewmate Companion"
                      className="w-20 sm:w-24 h-auto object-contain filter drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]"
                    />
                    <div className="w-16 h-2.5 bg-black/80 rounded-full blur-[2px] mt-1" />
                    <div className="absolute -top-3 -left-2 px-2 py-0.5 rounded bg-amber-950/90 border border-amber-400 text-[9px] font-mono text-amber-300 whitespace-nowrap">
                      ASSISTING 🐱
                    </div>
                  </motion.div>
                </div>

                <div className="p-3 rounded-xl bg-space-900/80 border border-cyan-500/20 font-mono text-xs text-slate-300 space-y-1">
                  <div className="text-cyan-400 font-bold">&gt; MISSION TELEMETRY NOMINAL</div>
                  <div className="text-slate-400 text-[11px]">&gt; FOUR MISSION PATHS DETECTED</div>
                  <div className="text-emerald-400 text-[11px]">&gt; CHOOSE YOUR ASSIGNMENT BELOW</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-400 relative z-10">
                <span>{eventConfig.venue} HQ</span>
                <span className="text-cyan-400 font-bold">18-09-2026</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
