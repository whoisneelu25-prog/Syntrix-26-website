import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { CrewmateGraphic } from '../ui/CrewmateGraphic';
import { NeonButton } from '../ui/NeonButton';
import { CheckSquare, ListTodo, FileText, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../lib/soundEffects';

interface RegistrationSectionProps {
  onOpenNoticeModal: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  onOpenNoticeModal,
}) => {
  const isPlaceholderUrl = eventConfig.googleFormUrl === 'YOUR_GOOGLE_FORM_LINK_HERE';

  const handleRegisterClick = () => {
    soundEngine.playConfirm();
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#38bdf8', '#a855f7', '#f43f5e', '#ffffff'],
      });
    } catch {
      // ignore
    }

    if (isPlaceholderUrl) {
      onOpenNoticeModal();
    } else {
      window.open(eventConfig.googleFormUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const steps = [
    { num: 'STEP 1', title: 'SELECT YOUR EVENT', desc: 'Choose from Paper 404, Prompt Craft, AI Case File, or Crazy Pitch' },
    { num: 'STEP 2', title: 'READ THE RULES', desc: 'Review the official Crewmate Rulebook and eligibility directives' },
    { num: 'STEP 3', title: 'OPEN REGISTRATION PORTAL', desc: 'Fill out your team credentials in the official registration link' },
    { num: 'STEP 4', title: 'REPORT FOR DUTY', desc: 'Arrive at Prathyusha Seminar Hall on 18-09-2026 at 09:00 AM' },
  ];

  return (
    <section id="register" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-b from-space-950/90 via-space-900/80 to-space-950/90 border border-cyan-400/40 p-8 sm:p-14 backdrop-blur-xl shadow-[0_0_60px_rgba(0,240,255,0.2)] hud-corner-all overflow-hidden">
        
        {/* BACKGROUND GLOWS */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* TASK HEADER */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-cyan-500/30 gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-400">
              <ListTodo className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-bold block">
                DROPSHIP STATION TASK // 04-STEPS
              </span>
              <h2 className="font-orbitron text-2xl sm:text-4xl font-black text-white text-glow-cyan">
                TASK: REGISTER FOR SYNTRIX'26
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold uppercase tracking-wider">PORTAL ACTIVE</span>
          </div>
        </div>

        {/* 4-STEP TASK BOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-space-900/80 border border-white/10 hover:border-cyan-400/40 backdrop-blur-md transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-40 group-hover:opacity-100 transition-opacity" />
              
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
                <span>Task Requirement #{idx + 1}</span>
                <ArrowRight className="w-3 h-3 ml-auto" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM TASK SUBMIT BAR */}
        <div className="pt-4 border-t border-cyan-500/20 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="shrink-0 hidden sm:block">
              <CrewmateGraphic
                color="cyan"
                size={55}
                isFloating={true}
                hasJetpackFlames={false}
                glow={false}
              />
            </div>
            <div>
              <span className="font-space text-sm sm:text-base font-semibold text-cyan-200 block">
                "Complete your task, crewmate. The station needs your engineering mind."
              </span>
              <span className="font-mono text-xs text-slate-400">
                Prathyusha Engineering College · Seminar Hall · 18 September 2026
              </span>
            </div>
          </div>

          {/* REGISTER NOW BUTTON */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <NeonButton
              variant="cyan"
              size="lg"
              onClick={handleRegisterClick}
              icon={<FileText className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              REGISTER NOW
            </NeonButton>

            <span className="font-mono text-xs text-slate-400 text-center sm:text-left">
              {isPlaceholderUrl
                ? '⚡ Registration link opening soon'
                : '⚡ Opens Google Form in new tab'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
