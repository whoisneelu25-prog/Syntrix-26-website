import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../lib/soundEffects';
import { Dices, X, UserCheck } from 'lucide-react';
import { CrewmateGraphic } from './CrewmateGraphic';

interface CrewCustomizerProps {
  onClose?: () => void;
}

const SUIT_COLORS: Array<'cyan' | 'purple' | 'red' | 'emerald' | 'amber'> = [
  'cyan',
  'purple',
  'red',
  'emerald',
  'amber',
];

const TOTAL_HATS = 36;

export const CrewCustomizer: React.FC<CrewCustomizerProps> = ({ onClose }) => {
  const [suitIndex, setSuitIndex] = useState<number>(0);
  const [hatId, setHatId] = useState<number>(1);
  const [clickCount, setClickCount] = useState<number>(0);
  const [dialogText, setDialogText] = useState<string | null>(null);

  const handleRandomize = () => {
    soundEngine.playBlip(750);
    const nextSuit = Math.floor(Math.random() * SUIT_COLORS.length);
    const nextHat = Math.floor(Math.random() * TOTAL_HATS) + 1;
    setSuitIndex(nextSuit);
    setHatId(nextHat);
  };

  const handleCrewmateClick = () => {
    soundEngine.playBlip(920);
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      setDialogText("LOOKING A BIT SUS... 👀");
    } else if (newCount === 6) {
      setDialogText("NOTHING SUSPICIOUS HERE! 🤫");
    } else if (newCount === 9) {
      setDialogText("ARE YOU THE IMPOSTOR? 🚨");
    } else if (newCount >= 12) {
      setDialogText("ALL CLEAR! REPORT TO AI&DS BLOCK 🚀");
    }
  };

  const currentColor = SUIT_COLORS[suitIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="relative w-full max-w-sm p-5 rounded-2xl bg-space-950/90 border border-cyan-500/40 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,240,255,0.2)] hud-corner-all text-slate-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-cyan-400" />
          <span className="font-orbitron font-bold text-xs tracking-wider text-cyan-300 uppercase">
            CREW SELECT &amp; CUSTOMIZER
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close Customizer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Crewmate Preview Box */}
      <div
        onClick={handleCrewmateClick}
        className="relative flex flex-col items-center justify-center py-6 px-4 rounded-xl bg-space-900/80 border border-white/10 cursor-pointer group hover:border-cyan-400/40 transition-all overflow-hidden"
        title="Click crewmate to inspect"
      >
        {/* Background Aura */}
        <div className="absolute inset-0 bg-radial-vignette opacity-50" />

        {/* Hat Accessory (Layered on top of crewmate head) */}
        <motion.div
          key={`hat-${hatId}`}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="relative z-20 mb-[-24px] pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
        >
          <img
            src={`/assets/hats/hat_${hatId}.png`}
            alt={`Hat Accessory ${hatId}`}
            className="w-14 h-14 object-contain"
          />
        </motion.div>

        {/* Scalable Vector Crewmate with glow */}
        <div className="relative z-10">
          <CrewmateGraphic
            color={currentColor}
            size={110}
            isFloating={true}
            hasJetpackFlames={true}
          />
        </div>

        {/* Interactive Speech Bubble */}
        <AnimatePresence>
          {dialogText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-cyan-950/95 border border-cyan-400 font-mono text-[10px] text-cyan-200 tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.4)] whitespace-nowrap"
            >
              {dialogText}
            </motion.div>
          )}
        </AnimatePresence>

        <span className="text-[10px] font-mono text-cyan-400/60 mt-3 group-hover:text-cyan-300 transition-colors">
          Click crewmate to inspect ({clickCount} clicks)
        </span>
      </div>

      {/* Controls Bar */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={handleRandomize}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-space-950 font-orbitron font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
        >
          <Dices className="w-4 h-4" />
          <span>RANDOMIZE</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playBlip(600);
            setSuitIndex((prev) => (prev + 1) % SUIT_COLORS.length);
          }}
          className="px-3 py-2 rounded-xl bg-space-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-mono text-xs tracking-wider uppercase transition-colors"
          title="Cycle suit color"
        >
          COLOR
        </button>

        <button
          onClick={() => {
            soundEngine.playBlip(680);
            setHatId((prev) => (prev % TOTAL_HATS) + 1);
          }}
          className="px-3 py-2 rounded-xl bg-space-900 border border-purple-500/30 hover:border-purple-400 text-purple-300 font-mono text-xs tracking-wider uppercase transition-colors"
          title="Cycle hat"
        >
          HAT
        </button>
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-3 pt-2 border-t border-white/10">
        <span>SUIT: {currentColor.toUpperCase()}</span>
        <span>ACCESSORY #{hatId} OF 36</span>
      </div>
    </motion.div>
  );
};
