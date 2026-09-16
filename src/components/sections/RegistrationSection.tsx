import React from 'react';
import { motion } from 'framer-motion';
import { OFFICIAL_REGISTRATION_URL } from '../../config/eventConfig';
import { CheckSquare, Terminal, ExternalLink, Activity, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../lib/soundEffects';

interface RegistrationSectionProps {
  onOpenNoticeModal?: () => void;
  onRegistered?: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  onOpenNoticeModal,
  onRegistered,
}) => {
  const handleRegisterClick = () => {
    soundEngine.playConfirm();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#38bdf8', '#a855f7', '#ec4899', '#ffffff'],
      });
    } catch {
      // ignore
    }

    if (onRegistered) {
      onRegistered();
    }

    if (OFFICIAL_REGISTRATION_URL) {
      window.open(OFFICIAL_REGISTRATION_URL, '_blank', 'noopener,noreferrer');
    } else if (onOpenNoticeModal) {
      onOpenNoticeModal();
    }
  };

  const steps = [
    { num: 'STEP 1', title: 'SELECT YOUR MISSION', desc: 'Choose AI Case File, Prompt Craft, Paper 404, or Crazy Pitch.' },
    { num: 'STEP 2', title: 'READ THE RULES', desc: 'Verify team capacity (duo/trio) and operational directives.' },
    { num: 'STEP 3', title: 'OPEN GOOGLE FORM', desc: 'Submit your crewmate credentials via the official portal.' },
    { num: 'STEP 4', title: 'REPORT TO SEMINAR HALL', desc: 'Arrive and report to Seminar Hall on Friday, 18-09-2026 at 9:00 AM. Events will take place in AI&DS Block.' },
  ];

  return (
    <section id="register" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-b from-space-950 via-space-900/90 to-space-950 border-2 border-cyan-500/50 p-8 sm:p-14 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden">
        
        {/* BACKGROUND AMBIENT NEON GLOWS */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/20 rounded-full blur-[110px] pointer-events-none" />

        {/* TERMINAL CRT SCANLINE OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

        {/* TASK HEADER & TERMINAL BEACON */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-cyan-500/30 gap-4 relative z-10">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-3 rounded-2xl bg-cyan-950/90 border border-cyan-400/50 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <Terminal className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-bold block">
                MISSION TERMINAL // ACCESS GRANTED
              </span>
              <h2 className="font-orbitron text-2xl sm:text-4xl font-black text-white text-glow-cyan">
                REGISTER FOR THE MISSION
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold uppercase tracking-wider">STATUS: ONLINE</span>
          </div>
        </div>

        {/* 4-STEP TASK BOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-space-900/90 border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold tracking-widest">{step.num}</span>
                  <CheckSquare className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="font-orbitron text-sm font-bold text-white tracking-wide">
                  {step.title}
                </h3>
                <p className="font-space text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex items-center gap-1 text-[10px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                <span>Task Protocol #{idx + 1}</span>
                <ArrowRight className="w-3 h-3 ml-auto" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM TASK TERMINAL CONSOLE */}
        <div className="pt-6 border-t border-cyan-500/30 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 bg-space-950/60 p-6 rounded-2xl">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="shrink-0 hidden sm:block">
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="/assets/theme_crewmates/crewmate_2.png"
                  alt="Registration Terminal Crewmate"
                  className="w-16 sm:w-20 h-auto object-contain filter drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                />
              </motion.div>
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-cyan-300 font-mono text-xs uppercase font-bold mb-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>REGISTRATION TERMINAL // READY FOR CREW INPUT</span>
              </div>
              <span className="font-space text-sm sm:text-base font-semibold text-white block">
                &ldquo;Assemble your crew. Complete the mission form to lock your slot.&rdquo;
              </span>
              <span className="font-mono text-xs text-slate-400">
                18 September 2026 • 9:00 AM • Report to Seminar Hall • Events in AI&DS Block • Prathyusha Engineering College
              </span>
            </div>
          </div>

          {/* PROMINENT REGISTER NOW BUTTON */}
          <div className="flex flex-col items-center sm:items-end gap-2 w-full lg:w-auto">
            <button
              onClick={handleRegisterClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-space-950 font-orbitron font-black text-sm sm:text-base tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:shadow-[0_0_50px_rgba(0,240,255,0.9)] flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>REGISTER NOW</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
