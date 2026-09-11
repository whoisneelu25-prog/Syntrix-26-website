import React from 'react';
import { motion } from 'framer-motion';
import type { EventItem } from '../../config/eventConfig';
import { CrewmateGraphic } from '../ui/CrewmateGraphic';
import { soundEngine } from '../../lib/soundEffects';
import { 
  FileCode2, 
  Terminal, 
  BrainCircuit, 
  Rocket, 
  ChevronRight, 
  Users, 
  Clock, 
  ExternalLink
} from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onViewDetails: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onRegisterClick,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'FileCode2':
        return <FileCode2 className="w-6 h-6 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-sky-400" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-6 h-6 text-purple-400" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-rose-400" />;
      default:
        return <Terminal className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getTheme = (id: string, category: string) => {
    if (category === 'Non-Technical') {
      return {
        border: 'hover:border-rose-400/60 shadow-[0_4px_30px_rgba(244,63,94,0.12)]',
        badgeBg: 'bg-rose-950/70 border-rose-500/40 text-rose-300',
        glowColor: 'magenta' as const,
        crewColor: 'red' as const,
        accentText: 'text-rose-400',
        cornerColor: 'border-rose-400',
      };
    }
    if (id === 'paper-404') {
      return {
        border: 'hover:border-cyan-400/60 shadow-[0_4px_30px_rgba(0,240,255,0.12)]',
        badgeBg: 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300',
        glowColor: 'cyan' as const,
        crewColor: 'cyan' as const,
        accentText: 'text-cyan-400',
        cornerColor: 'border-cyan-400',
      };
    }
    if (id === 'prompt-craft') {
      return {
        border: 'hover:border-sky-400/60 shadow-[0_4px_30px_rgba(56,189,248,0.12)]',
        badgeBg: 'bg-sky-950/70 border-sky-500/40 text-sky-300',
        glowColor: 'cyan' as const,
        crewColor: 'cyan' as const,
        accentText: 'text-sky-400',
        cornerColor: 'border-sky-400',
      };
    }
    return {
      border: 'hover:border-purple-400/60 shadow-[0_4px_30px_rgba(168,85,247,0.12)]',
      badgeBg: 'bg-purple-950/70 border-purple-500/40 text-purple-300',
      glowColor: 'purple' as const,
      crewColor: 'purple' as const,
      accentText: 'text-purple-400',
      cornerColor: 'border-purple-400',
    };
  };

  const theme = getTheme(event.id, event.category);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => soundEngine.playBlip(720)}
      className={`group relative rounded-2xl bg-space-900/80 backdrop-blur-md border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 ${theme.border}`}
    >
      {/* CORNER BRACKET DECORATIONS */}
      <div className={`absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 ${theme.cornerColor} rounded-tl-sm pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 ${theme.cornerColor} rounded-tr-sm pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 ${theme.cornerColor} rounded-bl-sm pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 ${theme.cornerColor} rounded-br-sm pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

      {/* TOP HEADER: BADGE & CREWMATE AVATAR */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md font-mono text-[10px] tracking-wider uppercase font-bold border ${theme.badgeBg}`}>
              {event.category}
            </span>
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest hidden sm:inline">
              {event.badge}
            </span>
          </div>

          {/* Miniature Themed Crewmate Icon */}
          <div className="transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
            <CrewmateGraphic
              color={theme.crewColor}
              size={48}
              isFloating={false}
              hasJetpackFlames={false}
              glow={false}
            />
          </div>
        </div>

        {/* EVENT ICON & TITLE */}
        <div className="flex items-start gap-3.5 mb-2.5">
          <div className="p-2.5 rounded-xl bg-space-950 border border-white/10 group-hover:border-white/30 shrink-0 transition-colors">
            {getIcon(event.iconName)}
          </div>
          <div>
            <h3 className="font-orbitron text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-wide">
              {event.name}
            </h3>
            <p className="font-mono text-xs text-slate-400 tracking-wider">
              {event.tagline}
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="font-space text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4 mt-2">
          {event.shortDescription}
        </p>

        {/* QUICK TELEMETRY CHIPS */}
        <div className="grid grid-cols-2 gap-2 pt-2 pb-4 border-t border-white/5 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{event.teamSize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">{event.duration}</span>
          </div>
        </div>
      </div>

      {/* CARD ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 mt-auto">
        <button
          onClick={() => {
            soundEngine.playConfirm();
            onViewDetails(event);
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-space-950 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-950/40 hover:border-cyan-400 font-orbitron text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(0,240,255,0.1)]"
        >
          <span>VIEW INTEL</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => {
            soundEngine.playConfirm();
            onRegisterClick(event);
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-space-950 hover:from-cyan-300 hover:to-blue-400 font-orbitron text-xs font-black tracking-wider transition-all flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(0,240,255,0.35)]"
        >
          <span>REGISTER</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
