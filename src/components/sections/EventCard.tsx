import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileCode2':
        return <FileCode2 className="w-6 h-6 text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-transform" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-sky-400 group-hover:scale-110 group-hover:rotate-6 transition-transform" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-6 h-6 text-purple-400 group-hover:scale-110 group-hover:rotate-6 transition-transform" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-pink-400 group-hover:scale-110 group-hover:-rotate-12 transition-transform" />;
      default:
        return <Terminal className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getTheme = (id: string, category: string) => {
    if (category === 'Non-Technical') {
      return {
        border: 'border-pink-500/30 hover:border-pink-400/80 shadow-[0_4px_30px_rgba(236,72,153,0.15)] hover:shadow-[0_0_35px_rgba(236,72,153,0.35)]',
        badgeBg: 'bg-pink-950/80 border-pink-500/40 text-pink-300',
        crewColor: 'red' as const,
        accentText: 'text-pink-400',
        cornerColor: 'border-pink-400',
        glowColor: 'from-pink-500/20 to-purple-600/20',
      };
    }
    if (id === 'paper-404') {
      return {
        border: 'border-purple-500/30 hover:border-purple-400/80 shadow-[0_4px_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]',
        badgeBg: 'bg-purple-950/80 border-purple-500/40 text-purple-300',
        crewColor: 'purple' as const,
        accentText: 'text-purple-400',
        cornerColor: 'border-purple-400',
        glowColor: 'from-purple-500/20 to-blue-600/20',
      };
    }
    if (id === 'promptcraft' || id === 'prompt-craft') {
      return {
        border: 'border-sky-500/30 hover:border-sky-400/80 shadow-[0_4px_30px_rgba(56,189,248,0.15)] hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]',
        badgeBg: 'bg-sky-950/80 border-sky-500/40 text-sky-300',
        crewColor: 'cyan' as const,
        accentText: 'text-sky-400',
        cornerColor: 'border-sky-400',
        glowColor: 'from-sky-500/20 to-cyan-600/20',
      };
    }
    return {
      border: 'border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_4px_30px_rgba(0,240,255,0.15)] hover:shadow-[0_0_35px_rgba(0,240,255,0.35)]',
      badgeBg: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300',
      crewColor: 'cyan' as const,
      accentText: 'text-cyan-400',
      cornerColor: 'border-cyan-400',
      glowColor: 'from-cyan-500/20 to-blue-600/20',
    };
  };

  const theme = getTheme(event.id, event.category);

  const handleCardClick = () => {
    soundEngine.playConfirm();
    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      onViewDetails(event);
    }, 280);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => {
        setIsHovered(true);
        soundEngine.playBlip(720);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl bg-space-900/90 backdrop-blur-xl border p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden ${theme.border}`}
    >
      {/* SCANLINE SWEEP ANIMATION */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden">
        <div className="w-full h-24 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent -translate-y-full group-hover:translate-y-[450px] transition-transform duration-1000 ease-in-out" />
      </div>

      {/* BACKGROUND NEON GLOW PULSE */}
      <div className={`absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br ${theme.glowColor} rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`} />

      {/* CORNER BRACKET DECORATIONS */}
      <div className={`absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 ${theme.cornerColor} rounded-tl-sm pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 ${theme.cornerColor} rounded-tr-sm pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 ${theme.cornerColor} rounded-bl-sm pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 ${theme.cornerColor} rounded-br-sm pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity`} />

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
          <div className="p-2.5 rounded-xl bg-space-950 border border-white/10 group-hover:border-cyan-400/40 shrink-0 transition-colors shadow-inner">
            {getIcon(event.iconName)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-orbitron text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-wide leading-tight">
              {event.name}
            </h3>
            <p className="font-mono text-[11px] text-cyan-300 font-semibold tracking-wider uppercase mt-1 leading-snug">
              {event.tagline || event.subtitle}
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="font-space text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4 mt-2">
          {event.shortDescription}
        </p>

        {/* QUICK TELEMETRY CHIPS */}
        <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-t border-white/5 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{event.teamSize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">{event.duration}</span>
          </div>
        </div>

        {/* DYNAMIC HUD STATUS INDICATOR (NO LINE OVERLAPS) */}
        <div className="py-2 px-3 mb-2 rounded-lg bg-space-950/90 border border-white/10 font-mono text-[10px] sm:text-[11px] flex items-center justify-between gap-2 overflow-hidden min-h-[34px]">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isInitializing ? 'bg-amber-400 animate-ping' : isHovered ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`} />
            <span className="text-slate-400 font-bold tracking-wider">STATUS:</span>
          </div>
          <span className={`font-bold tracking-wider whitespace-nowrap truncate text-right ${isInitializing ? 'text-amber-300' : isHovered ? 'text-cyan-300' : 'text-emerald-300'}`}>
            {isInitializing
              ? '[ INITIALIZING... ]'
              : isHovered
              ? '[ READY TO DEPLOY ]'
              : '[ MISSION READY ]'}
          </span>
        </div>
      </div>

      {/* CARD ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 mt-auto">
        <button
          onClick={handleCardClick}
          className="w-full py-2.5 px-3 rounded-xl bg-space-950 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-950/50 hover:border-cyan-400 font-orbitron text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(0,240,255,0.15)] cursor-pointer"
        >
          <span>VIEW MISSION</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => {
            soundEngine.playConfirm();
            onRegisterClick(event);
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white hover:from-purple-500 hover:to-rose-500 font-orbitron text-xs font-black tracking-wider transition-all flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(217,70,239,0.35)] cursor-pointer"
        >
          <span>REGISTER</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
