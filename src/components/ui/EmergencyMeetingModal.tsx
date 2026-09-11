import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../lib/soundEffects';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';

interface EmergencyMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyMeetingModal: React.FC<EmergencyMeetingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playEmergencyAlarm();
      // Throw festive cyberpunk confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#8b5cf6', '#f43f5e', '#ffffff'],
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVoteReady = () => {
    soundEngine.playConfirm();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#00f0ff', '#3b82f6', '#a855f7'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop with red emergency strobe */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          className="relative z-10 w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-space-950/95 border-2 border-red-500/60 shadow-[0_0_50px_rgba(244,63,94,0.4)] text-center text-slate-100 overflow-hidden hud-corner-all"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Dismiss Emergency Meeting"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Emergency Alert Header Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center"
              >
                <ShieldAlert className="w-10 h-10 text-red-400 animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-orbitron text-2xl sm:text-3xl font-black tracking-widest text-red-400 text-glow-magenta uppercase mb-2">
            EMERGENCY MEETING!
          </h2>

          <p className="font-mono text-sm tracking-wider text-cyan-300 uppercase mb-5">
            CREWMATE ALERT CALLED IN THE LOBBY
          </p>

          {/* Core Question */}
          <div className="py-4 px-6 rounded-2xl bg-space-900/90 border border-red-500/30 mb-6">
            <span className="font-space text-lg sm:text-xl font-bold text-white tracking-wide block mb-1">
              WHO'S READY FOR SYNTRIX'26?
            </span>
            <span className="font-mono text-xs text-slate-400">
              PRATHYUSHA ENGINEERING COLLEGE · 18-09-2026 · SEMINAR HALL
            </span>
          </div>

          {/* Action Vote Button */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleVoteReady}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-space-950 font-orbitron font-extrabold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I'M READY · REPORT TO MISSION</span>
            </button>

            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl bg-space-900 border border-white/20 hover:border-white/40 text-slate-300 font-mono text-xs tracking-wider uppercase transition-colors"
            >
              RETURN TO LOBBY
            </button>
          </div>

          <div className="mt-5 text-[10px] font-mono text-slate-500">
            EASTER EGG UNLOCKED · DROPSHIP TELEMETRY NOMINAL
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
