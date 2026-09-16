import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventConfig, type EventItem } from '../../config/eventConfig';
import { EventCard } from './EventCard';
import { soundEngine } from '../../lib/soundEffects';
import { Layers, Cpu, Sparkles, Rocket, Terminal } from 'lucide-react';

interface EventGridProps {
  onViewDetails: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
}

type FilterCategory = 'ALL' | 'Phase 1' | 'Phase 2' | 'Technical' | 'Non-Technical';

export const EventGrid: React.FC<EventGridProps> = ({
  onViewDetails,
  onRegisterClick,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');

  const filteredEvents = eventConfig.events.filter((event) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'Phase 1' || activeFilter === 'Phase 2') {
      return event.phase === activeFilter;
    }
    return event.category === activeFilter;
  });

  const handleFilterChange = (filter: FilterCategory) => {
    soundEngine.playBlip(780);
    setActiveFilter(filter);
  };

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-10">
        
        {/* SECTION HEADER */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-xs tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            OPERATIONAL SECTORS // PHASE 1 &amp; PHASE 2
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400">
            CHOOSE YOUR MISSION
          </h2>

          <p className="font-space text-sm sm:text-base text-slate-300">
            Deploy across two high-octane operational phases orchestrated by the Department of Artificial Intelligence and Data Science.
          </p>

          {/* CREWMATE PATROLLING NEAR TASK BOARD */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 font-mono text-[11px]"
            >
              <img
                src="/assets/theme_crewmates/crewmate_3.png"
                alt="Patrol Crewmate"
                className="w-5 h-5 object-contain"
              />
              <span>CREWMATE ON PATROL // 2 OPERATIONAL PHASES ACTIVE</span>
            </motion.div>
          </div>

          {/* PHASE ROADMAP QUICK SELECTOR TILES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
            {/* Phase 1 Tile */}
            <button
              onClick={() => handleFilterChange(activeFilter === 'Phase 1' ? 'ALL' : 'Phase 1')}
              className={`p-4 rounded-2xl border transition-all text-left group cursor-pointer ${
                activeFilter === 'Phase 1'
                  ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.3)] ring-1 ring-cyan-400'
                  : 'bg-space-900/80 border-cyan-500/30 hover:border-cyan-400/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  PHASE 1
                </span>
                <span className="font-mono text-[11px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                  {activeFilter === 'Phase 1' ? 'FILTER APPLIED ✓' : 'CLICK TO FILTER »'}
                </span>
              </div>
              <h3 className="font-orbitron text-base sm:text-lg font-black text-white group-hover:text-cyan-200 transition-colors">
                PAPER 404 &bull; CRAZY PITCH
              </h3>
              <p className="font-mono text-xs text-cyan-300/80 mt-1">
                Technical Paper Presentation &amp; On-the-Spot Startup Pitch
              </p>
            </button>

            {/* Phase 2 Tile */}
            <button
              onClick={() => handleFilterChange(activeFilter === 'Phase 2' ? 'ALL' : 'Phase 2')}
              className={`p-4 rounded-2xl border transition-all text-left group cursor-pointer ${
                activeFilter === 'Phase 2'
                  ? 'bg-purple-950/90 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.3)] ring-1 ring-purple-400'
                  : 'bg-space-900/80 border-purple-500/30 hover:border-purple-400/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 border border-purple-400/40 text-purple-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  PHASE 2
                </span>
                <span className="font-mono text-[11px] text-slate-400 group-hover:text-purple-300 transition-colors">
                  {activeFilter === 'Phase 2' ? 'FILTER APPLIED ✓' : 'CLICK TO FILTER »'}
                </span>
              </div>
              <h3 className="font-orbitron text-base sm:text-lg font-black text-white group-hover:text-purple-200 transition-colors">
                PROMPT CRAFT &bull; AI CASE FILE
              </h3>
              <p className="font-mono text-xs text-purple-300/80 mt-1">
                AI Prompt Engineering Challenge &amp; AI Forensics Mystery
              </p>
            </button>
          </div>

          {/* CATEGORY & PHASE FILTER TABS */}
          <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-space-900/90 border border-white/10 backdrop-blur-md gap-1">
            <button
              onClick={() => handleFilterChange('ALL')}
              className={`px-3.5 py-2 rounded-lg font-orbitron text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-cyan-400 text-space-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ALL MISSIONS ({eventConfig.events.length})
            </button>

            <button
              onClick={() => handleFilterChange('Phase 1')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-orbitron text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeFilter === 'Phase 1'
                  ? 'bg-cyan-400 text-space-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>PHASE 1 (2)</span>
            </button>

            <button
              onClick={() => handleFilterChange('Phase 2')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-orbitron text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeFilter === 'Phase 2'
                  ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>PHASE 2 (2)</span>
            </button>

            <button
              onClick={() => handleFilterChange('Technical')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-orbitron text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeFilter === 'Technical'
                  ? 'bg-cyan-400 text-space-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>TECHNICAL (3)</span>
            </button>

            <button
              onClick={() => handleFilterChange('Non-Technical')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-orbitron text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeFilter === 'Non-Technical'
                  ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>NON-TECHNICAL (1)</span>
            </button>
          </div>
        </div>

        {/* EVENT CARDS GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={onViewDetails}
              onRegisterClick={onRegisterClick}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};
