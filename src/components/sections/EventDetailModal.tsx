import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EventItem } from '../../config/eventConfig';
import { CrewmateGraphic } from '../ui/CrewmateGraphic';
import { soundEngine } from '../../lib/soundEffects';
import { 
  X, 
  Users, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  BookOpen,
  Info
} from 'lucide-react';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegister: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegister,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playBlip(500);
        onClose();
      }
    };

    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* BACKDROP BLUR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundEngine.playBlip(500);
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* MODAL DIALOG CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-space-950/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden z-10 my-8 hud-corner-all"
        >
          {/* TOP TERMINAL HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-space-900/90">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded font-mono text-[10px] tracking-wider uppercase font-bold border ${
                event.category === 'Non-Technical'
                  ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                  : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
              }`}>
                {event.category} MISSION
              </span>
              <span className="font-mono text-xs text-slate-400">
                // DOSSIER ID: {event.id.toUpperCase()}
              </span>
            </div>

            <button
              onClick={() => {
                soundEngine.playBlip(500);
                onClose();
              }}
              className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 hover:bg-space-850 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MODAL BODY CONTENT */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
            
            {/* HERO TITLE & CREWMATE BADGE */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <h3 className="font-orbitron text-2xl sm:text-4xl font-black text-white text-glow-cyan">
                  {event.name}
                </h3>
                <p className="font-space text-sm text-cyan-300 font-semibold tracking-wide">
                  {event.tagline}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3 bg-space-900/60 p-2 rounded-xl border border-white/10 self-start sm:self-center">
                <CrewmateGraphic
                  color={event.category === 'Non-Technical' ? 'red' : 'cyan'}
                  size={52}
                  isFloating={true}
                  hasJetpackFlames={false}
                  glow={false}
                />
                <div className="font-mono text-[11px] text-right">
                  <span className="block text-slate-400 uppercase">STATUS</span>
                  <span className="text-emerald-400 font-bold">READY</span>
                </div>
              </div>
            </div>

            {/* TELEMETRY SPECS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-space-900/70 border border-white/10">
                <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-slate-400 uppercase">TEAM SIZE</span>
                </div>
                <span className="font-bold text-white">{event.teamSize}</span>
              </div>

              <div className="p-3 rounded-xl bg-space-900/70 border border-white/10">
                <div className="flex items-center gap-1.5 text-purple-400 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-slate-400 uppercase">DURATION</span>
                </div>
                <span className="font-bold text-white">{event.duration}</span>
              </div>

              <div className="p-3 rounded-xl bg-space-900/70 border border-white/10">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-slate-400 uppercase">ELIGIBILITY</span>
                </div>
                <span className="font-bold text-white truncate block">{event.eligibility}</span>
              </div>

              <div className="p-3 rounded-xl bg-space-900/70 border border-white/10">
                <div className="flex items-center gap-1.5 text-rose-400 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-slate-400 uppercase">VENUE</span>
                </div>
                <span className="font-bold text-white truncate block">{event.venue || 'Seminar Hall'}</span>
              </div>
            </div>

            {/* ABOUT THE MISSION */}
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-orbitron text-xs sm:text-sm font-bold tracking-wider text-cyan-300 uppercase">
                <Info className="w-4 h-4" />
                <span>ABOUT THIS MISSION</span>
              </h4>
              <p className="font-space text-sm sm:text-base text-slate-300 leading-relaxed bg-space-900/40 p-4 rounded-xl border border-white/5">
                {event.fullDescription}
              </p>
            </div>

            {/* MISSION RULES SECTION */}
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-orbitron text-xs sm:text-sm font-bold tracking-wider text-purple-300 uppercase">
                <BookOpen className="w-4 h-4" />
                <span>CREWMATE RULES &amp; DIRECTIVES</span>
              </h4>

              {event.rules && event.rules.length > 0 ? (
                <ul className="space-y-2 font-mono text-xs sm:text-sm text-slate-300">
                  {event.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-space-900/50 border border-white/5">
                      <span className="font-bold text-cyan-400 shrink-0">[{index + 1}]</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-200 font-mono text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Rules will be revealed soon... Stand by for mission telemetry transmission.</span>
                </div>
              )}
            </div>

            {/* IMPORTANT INSTRUCTIONS */}
            {event.importantInstructions && event.importantInstructions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-orbitron text-xs sm:text-sm font-bold tracking-wider text-amber-300 uppercase flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>IMPORTANT INSTRUCTIONS</span>
                </h4>
                <div className="space-y-1.5 font-mono text-xs text-slate-300">
                  {event.importantInstructions.map((instruction, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* MODAL FOOTER */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-space-900/90 border-t border-cyan-500/20">
            <span className="font-mono text-xs text-slate-400">
              PRATHYUSHA ENGINEERING COLLEGE • SYNTRIX'26
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  soundEngine.playBlip(500);
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white font-orbitron text-xs font-semibold"
              >
                CLOSE
              </button>

              <button
                onClick={() => {
                  soundEngine.playConfirm();
                  onRegister(event);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-space-950 font-orbitron text-xs font-black tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>REGISTER NOW</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
