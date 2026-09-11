import React, { useState } from 'react';
import { eventConfig } from '../../config/eventConfig';
import { Radio, ChevronRight, X } from 'lucide-react';
import { soundEngine } from '../../lib/soundEffects';

export const AnnouncementBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const config = eventConfig.announcement;

  if (!config || !config.enabled || !config.message || dismissed) {
    return null;
  }

  return (
    <div className="relative z-30 pt-16 sm:pt-20 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-950/80 via-space-900/90 to-purple-950/80 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)] text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400 text-space-950 font-orbitron font-extrabold text-[10px] tracking-wider uppercase shrink-0 animate-pulse">
            <Radio className="w-3 h-3" />
            {config.badgeText || 'TRANSMISSION'}
          </span>
          <span className="font-mono text-cyan-200 truncate tracking-wide">
            {config.message}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {config.actionText && config.actionUrl && (
            <a
              href={config.actionUrl}
              onClick={() => soundEngine.playBlip(780)}
              className="inline-flex items-center gap-1 font-mono text-xs font-bold text-cyan-300 hover:text-white underline underline-offset-4 decoration-cyan-400/60"
            >
              <span>{config.actionText}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => {
              soundEngine.playBlip(500);
              setDismissed(true);
            }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
