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
  const [countdown, setCountdown] = React.useState<number>(4);

  useEffect(() => {
    if (isOpen) {
      soundEngine.playEmergencyAlarm();
      setCountdown(4);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#8b5cf6', '#ef4444', '#ffffff'],
        });
      } catch {
        // ignore
      }

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, onClose]);

  const handleReturn = () => {
    soundEngine.playConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* RED STROBE FLASH BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.4, 0.8, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleReturn}
            className="absolute inset-0 bg-red-950/80 backdrop-blur-md"
          />

        {/* GLITCH SCANLINE RED OVERLAY */}
        <div className="absolute inset-0 bg-red-600/15 mix-blend-screen pointer-events-none" />

        {/* MODAL WINDOW */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          className="relative z-10 w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-space-950 border-2 border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.5)] text-center text-slate-100 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleReturn}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss Emergency Meeting"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Emergency Alert Header Icon */}
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.6)]"
            >
              <ShieldAlert className="w-10 h-10 text-red-400 animate-pulse" />
            </motion.div>
          </div>

          {/* SYSTEM ALERT BADGE */}
          <div className="inline-block px-3 py-1 rounded-full bg-red-950/90 border border-red-500/60 font-mono text-xs text-red-300 font-bold tracking-widest uppercase mb-2 animate-pulse">
            🚨 SYSTEM ALERT // EMERGENCY MEETING CALLED
          </div>

          {/* Title */}
          <h2 className="font-orbitron text-3xl sm:text-4xl font-black tracking-widest text-red-500 text-glow-magenta uppercase mb-3">
            EMERGENCY MEETING
          </h2>

          {/* Prompt required fun message */}
          <div className="py-4 px-6 rounded-2xl bg-space-900 border border-red-500/40 mb-5">
            <span className="font-orbitron text-lg sm:text-xl font-black text-white tracking-wide block mb-1">
              &ldquo;WHO TOUCHED THE MISSION FILE?&rdquo;
            </span>
            <span className="font-mono text-xs text-slate-300">
              Dropship Telemetry Logged • AI&DS Block • 18-09-2026
            </span>
          </div>

          {/* Return CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleReturn}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-space-950 font-orbitron font-extrabold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>RETURN TO MISSION ({countdown}s)</span>
            </button>
          </div>

          <div className="mt-4 text-[10px] font-mono text-slate-500">
            AUTO-RETURNING TO DROPSHIP LOBBY IN {countdown} SECONDS...
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
};
