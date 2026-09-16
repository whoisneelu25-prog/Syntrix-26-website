import React from 'react';
import { eventConfig } from '../../config/eventConfig';
import { soundEngine } from '../../lib/soundEffects';
import { 
  ArrowUp, 
  Sparkles, 
  Radio,
  ShieldAlert,
  Calendar,
  MapPin
} from 'lucide-react';

interface FooterProps {
  onReplayIntro?: () => void;
  onOpenPosterModal?: () => void;
  onOpenEmergencyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onReplayIntro, 
  onOpenPosterModal,
  onOpenEmergencyModal 
}) => {
  const scrollToTop = () => {
    soundEngine.playBlip(900);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 border-t border-cyan-500/20 bg-space-950/95 backdrop-blur-xl pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* BRAND COLUMN (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-4">
              <img 
                src="/assets/syntrix_logo_official.png" 
                alt="SYNTRIX'26 Official Logo"
                className="h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              />
              <div>
                <span className="font-orbitron font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400 block leading-tight">
                  SYNTRIX'26
                </span>
                <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
                  DROPSHIP MISSION CENTRAL
                </span>
              </div>
            </div>

            <div className="space-y-1 text-slate-300 font-space text-sm">
              <p className="font-bold text-white tracking-wide">
                PRATHYUSHA ENGINEERING COLLEGE
              </p>
              <p className="font-orbitron text-xs text-cyan-300 font-bold tracking-wider uppercase">
                {eventConfig.departmentName}
              </p>
              <p className="text-xs text-purple-300 tracking-wider">
                Celebration of Software Freedom Day &amp; International Innovation Day
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-1 font-mono text-xs text-cyan-300">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-space-900 border border-cyan-500/30">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>18 • 09 • 2026</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-space-900 border border-purple-500/30 text-purple-300">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{eventConfig.venue}</span>
              </div>
            </div>

          </div>

          {/* MISSIONS COLUMN (3 COLS) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-orbitron text-xs font-bold text-cyan-400 uppercase tracking-wider">
              OPERATIONAL TRACKS
            </h4>
            <ul className="font-mono text-xs space-y-2 text-slate-300">
              {eventConfig.events.map((e) => (
                <li key={e.id}>
                  <a
                    href="#events"
                    onClick={() => soundEngine.playBlip(700)}
                    className="hover:text-cyan-300 transition-colors flex items-center justify-between gap-1.5"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-cyan-500">&gt;</span>
                      <span>{e.name}</span>
                    </span>
                    <span className="text-[9px] text-cyan-300/80 bg-space-900 border border-cyan-500/30 px-1.5 py-0.5 rounded font-bold">
                      {e.phase}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS & ACTIONS (4 COLS) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-orbitron text-xs font-bold text-purple-400 uppercase tracking-wider">
              MISSION TELEMETRY
            </h4>
            <div className="space-y-2">
              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  className="w-full py-2 px-3 rounded-lg bg-space-900 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 text-xs font-mono flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>REPLAY LOBBY INTRO</span>
                  </span>
                  <span className="text-[10px]">&gt;</span>
                </button>
              )}

              {onOpenPosterModal && (
                <button
                  onClick={onOpenPosterModal}
                  className="w-full py-2 px-3 rounded-lg bg-space-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-mono flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5" />
                    <span>OFFICIAL POSTER</span>
                  </span>
                  <span className="text-[10px]">&gt;</span>
                </button>
              )}

              {onOpenEmergencyModal && (
                <button
                  onClick={onOpenEmergencyModal}
                  className="w-full py-2 px-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 hover:text-white hover:border-red-400 text-xs font-mono flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span>EMERGENCY BUTTON</span>
                  </span>
                  <span className="text-[10px]">&gt;</span>
                </button>
              )}

              <a
                href={eventConfig.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playConfirm()}
                className="w-full py-2 px-3 rounded-lg bg-cyan-950/50 border border-cyan-400/40 text-cyan-200 hover:text-white hover:border-cyan-300 text-xs font-mono flex items-center justify-between transition-colors block"
              >
                <span>JOIN THE CREW (GOOGLE FORM)</span>
                <span className="text-[10px]">&gt;</span>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div>
            &copy; 2026 SYNTRIX'26. Department of Artificial Intelligence &amp; Data Science, PRATHYUSHA ENGINEERING COLLEGE.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-cyan-300 hover:text-white px-3 py-1.5 rounded-lg bg-space-900 border border-white/10 hover:border-cyan-400 transition-colors"
              aria-label="Return to top of page"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

