import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { soundEngine } from '../../lib/soundEffects';
import { ShieldAlert, X, Mail, Radio } from 'lucide-react';

interface RegistrationNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName?: string;
}

export const RegistrationNoticeModal: React.FC<RegistrationNoticeModalProps> = ({
  isOpen,
  onClose,
  eventName,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-space-950 border border-cyan-500/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.25)] z-10 hud-corner-all p-6 sm:p-8 space-y-5 text-center"
        >
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-1 rounded-lg border border-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              PORTAL TRANSMISSION STATUS
            </div>
            <h3 className="font-orbitron text-xl sm:text-2xl font-black text-white">
              REGISTRATION PORTAL OPENING SOON
            </h3>
            <p className="font-space text-sm text-slate-300 leading-relaxed">
              {eventName ? `Registration for ${eventName} ` : 'SYNTRIX\'26 registration '}
              is currently finalizing mission calibration. The official link will be deployed shortly in <code>eventConfig.ts</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-space-900/80 border border-white/10 font-mono text-xs text-slate-300 text-left space-y-1.5">
            <div className="text-cyan-400 font-bold uppercase">&gt; STATION DIRECTIVE:</div>
            <div>• Crew rosters may be prepared in advance.</div>
            <div>• All slots are allotted on a first-confirmed basis.</div>
            <div>• For urgent coordination, contact Mission Control below.</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`mailto:${eventConfig.officialEmail}`}
              onClick={() => soundEngine.playConfirm()}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-orbitron text-xs font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL COORDINATOR</span>
            </a>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-white/15 text-slate-300 hover:text-white font-orbitron text-xs font-semibold"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
