import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../lib/soundEffects';
import { X, Sparkles, ExternalLink, Download } from 'lucide-react';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playBlip(500);
        onClose();
      }
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
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundEngine.playBlip(500);
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-2xl bg-space-950 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.25)] z-10 my-8 hud-corner-all"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-space-900 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-orbitron text-xs font-bold tracking-wider text-cyan-300">
                OFFICIAL SYNTRIX'26 POSTER
              </span>
            </div>
            <button
              onClick={() => {
                soundEngine.playBlip(500);
                onClose();
              }}
              className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
              aria-label="Close poster view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Poster Image Container */}
          <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl group max-w-md">
              <img
                src="/assets/syntrix-poster.jpg"
                alt="SYNTRIX'26 Official Poster - Prathyusha Engineering College"
                className="w-full h-auto object-contain rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-widest bg-space-950/90 px-4 py-2 rounded-full border border-cyan-400">
                  Prathyusha Engineering College · 18-09-2026
                </span>
              </div>
            </div>
          </div>

          {/* Footer with Actions */}
          <div className="px-6 py-3.5 bg-space-900 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-slate-400">
              PRATHYUSHA ENGINEERING COLLEGE // SYNTRIX'26
            </span>

            <div className="flex items-center gap-2">
              <a
                href="/assets/syntrix-poster.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-space-850 border border-cyan-500/30 text-cyan-300 font-orbitron text-xs font-bold flex items-center gap-1.5 hover:border-cyan-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>OPEN FULL RESOLUTION</span>
              </a>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-space-950 font-orbitron text-xs font-bold flex items-center gap-1.5 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PRINT / SAVE</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
