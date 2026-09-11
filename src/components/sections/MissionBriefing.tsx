import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { HUDPanel } from '../ui/HUDPanel';
import { 
  Radio, 
  MapPin, 
  Calendar, 
  School, 
  Terminal, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const MissionBriefing: React.FC = () => {
  return (
    <section id="briefing" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-10">
        
        {/* SECTION HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase">
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
                <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 font-mono text-xs">
                  <Terminal className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                  <p>
                    <span className="font-bold uppercase tracking-wider text-white">WELCOME, CREWMATE.</span>
                    <br />
                    Your mission is to explore groundbreaking ideas, challenge your computational creativity, and prove your engineering mastery.
                  </p>
                </div>

                <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    In commemoration of <strong className="text-cyan-300 font-medium">Software Freedom Day</strong> and <strong className="text-purple-300 font-medium">International Innovation Day</strong>, <span className="text-white font-semibold">Prathyusha Engineering College</span> invites visionary minds to participate in <span className="text-cyan-400 font-orbitron font-bold">SYNTRIX'26</span>.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
                    Whether you are unveiling research in <strong className="text-slate-200">PAPER 404</strong>, steering algorithmic cognition in <strong className="text-slate-200">PROMPT CRAFT</strong>, deciphering digital forensics in <strong className="text-slate-200">AI CASE FILE</strong>, or delivering wild pitch rhetoric in <strong className="text-slate-200">CRAZY PITCH</strong> — your task is clear: innovate without constraints.
                  </p>
                </div>

                {/* MISSION OBJECTIVES LIST */}
                <div className="pt-2 border-t border-cyan-500/20 space-y-2">
                  <span className="block font-mono text-[11px] text-cyan-400 tracking-wider uppercase font-bold">
                    CORE MISSION OBJECTIVES:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Defend Open-Source Freedom</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Synthesize High-Impact Solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Overcome System Anomalies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Showcase Disruptive Pitch Power</span>
                    </div>
                  </div>
                </div>
              </div>
            </HUDPanel>
          </motion.div>

          {/* RIGHT: SECTOR PARAMETERS & TELEMETRY (5 COLS) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-4"
          >
            {/* PARAMETER 1: DATE & DAY */}
            <div className="p-4 rounded-xl bg-space-900/80 border border-cyan-500/25 backdrop-blur-md flex items-center gap-4 hover:border-cyan-400/50 transition-colors">
              <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-400/30 text-cyan-400 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  EVENT DATE // LAUNCH WINDOW
                </span>
                <span className="font-orbitron font-bold text-white text-base sm:text-lg tracking-wider">
                  18 SEPTEMBER 2026
                </span>
                <span className="block font-mono text-xs text-cyan-300 font-semibold">
                  FRIDAY • 09:00 AM ONWARD
                </span>
              </div>
            </div>

            {/* PARAMETER 2: LOCATION & VENUE */}
            <div className="p-4 rounded-xl bg-space-900/80 border border-purple-500/25 backdrop-blur-md flex items-center gap-4 hover:border-purple-400/50 transition-colors">
              <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-400/30 text-purple-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  MISSION COORDINATES // VENUE
                </span>
                <span className="font-orbitron font-bold text-white text-base sm:text-lg tracking-wider">
                  {eventConfig.venue}
                </span>
                <span className="block font-mono text-xs text-purple-300">
                  Main Academic Block
                </span>
              </div>
            </div>

            {/* PARAMETER 3: COLLEGE IDENTITY */}
            <div className="p-4 rounded-xl bg-space-900/80 border border-cyan-500/25 backdrop-blur-md flex items-center gap-4 hover:border-cyan-400/50 transition-colors">
              <div className="p-3 rounded-xl bg-space-850 border border-cyan-400/30 text-cyan-400 shrink-0">
                <School className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  HOST STATION // INSTITUTION
                </span>
                <span className="font-orbitron font-bold text-white text-sm sm:text-base leading-snug">
                  {eventConfig.collegeName}
                </span>
                <span className="block font-mono text-[11px] text-slate-400">
                  {eventConfig.collegeSubtitle} • {eventConfig.location}
                </span>
              </div>
            </div>

            {/* STATUS ALERT */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>All registered crewmates will be awarded official Mission Certificates.</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
