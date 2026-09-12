import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig, type EventItem } from '../../config/eventConfig';
import { soundEngine } from '../../lib/soundEffects';
import { 
  BookOpen, 
  ChevronDown, 
  ShieldCheck, 
  FileCode2, 
  Terminal, 
  BrainCircuit, 
  Rocket,
  AlertCircle
} from 'lucide-react';

export const RulesSection: React.FC = () => {
  // Track open accordion index or null
  const [openEventId, setOpenEventId] = useState<string | null>(eventConfig.events[0]?.id || null);

  const toggleAccordion = (id: string) => {
    soundEngine.playBlip(750);
    setOpenEventId(prev => (prev === id ? null : id));
  };

  const getEventIcon = (name: string) => {
    switch (name) {
      case 'FileCode2':
        return <FileCode2 className="w-5 h-5 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-sky-400" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-purple-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-rose-400" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="rulebook" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="space-y-10">
        
        {/* SECTION HEADER */}
        <div className="text-center space-y-3">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            STANDARD OPERATING PROCEDURES // CODEX
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-300">
            CREWMATE RULEBOOK
          </h2>

          <p className="font-space text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Essential directives and protocols governing each SYNTRIX'26 mission. Review the manual before deploying.
          </p>
        </div>

        {/* ACCORDION HANDBOOK LIST */}
        <div className="space-y-4">
          {eventConfig.events.map((event: EventItem) => {
            const isOpen = openEventId === event.id;

            return (
              <div
                key={event.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-md ${
                  isOpen
                    ? 'bg-space-900/90 border-cyan-400/50 shadow-[0_4px_25px_rgba(0,240,255,0.1)]'
                    : 'bg-space-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                {/* ACCORDION TRIGGER HEADER */}
                <button
                  onClick={() => toggleAccordion(event.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 rounded-xl bg-space-950 border border-white/10 shrink-0">
                      {getEventIcon(event.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-orbitron text-base sm:text-lg font-black text-white">
                          {event.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                          event.category === 'Non-Technical'
                            ? 'bg-rose-950/70 border-rose-500/30 text-rose-300'
                            : 'bg-cyan-950/70 border-cyan-500/30 text-cyan-300'
                        }`}>
                          {event.category}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-slate-400 mt-0.5">
                        {event.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline font-mono text-xs font-semibold text-cyan-300 uppercase">
                      {isOpen ? '[ HIDE RULES ]' : '[ VIEW RULES ]'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="p-1 rounded-lg bg-space-950 border border-white/10 text-cyan-400"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </button>

                {/* ACCORDION EXPANDABLE BODY */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/10 space-y-4 font-mono text-xs sm:text-sm">
                        
                        {/* Summary Description */}
                        <p className="font-space text-slate-300 leading-relaxed text-sm">
                          {event.fullDescription}
                        </p>

                        {/* Rules List or Graceful Fallback */}
                        {event.rules && event.rules.length > 0 ? (
                          <div className="space-y-2">
                            <span className="block font-orbitron text-xs text-cyan-400 font-bold uppercase tracking-wider">
                              OFFICIAL MISSION PROTOCOLS:
                            </span>
                            <div className="space-y-2">
                              {event.rules.map((rule, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-space-950/60 border border-white/5 text-slate-200">
                                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{rule}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-purple-200 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-purple-400 shrink-0" />
                            <div>
                              <span className="font-bold block uppercase font-orbitron text-xs text-white">
                                MISSION BRIEFING PENDING
                              </span>
                              <span className="text-slate-300 text-xs">
                                Rules will be revealed soon... Stand by for mission telemetry transmission.
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Topic Directive if present */}
                        {event.topic && (
                          <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono">
                            <span className="text-cyan-400 font-bold uppercase block text-[10px]">MISSION TOPIC:</span>
                            <span className="text-white font-semibold">{event.topic}</span>
                          </div>
                        )}

                        {/* Event Quick Specs */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-400 border-t border-white/5 font-mono">
                          <div>
                            <span className="text-slate-500 uppercase block text-[10px]">TEAM SIZE</span>
                            <span className="text-white font-bold">{event.teamSize}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 uppercase block text-[10px]">ROUND</span>
                            <span className="text-white font-bold">{event.round || 'Single Round'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 uppercase block text-[10px]">TIME</span>
                            <span className="text-white font-bold">{event.duration}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 uppercase block text-[10px]">VENUE</span>
                            <span className="text-white font-bold">{event.venue || 'AI&DS Block'}</span>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
