import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventConfig, type EventItem } from '../../config/eventConfig';
import { EventCard } from './EventCard';
import { soundEngine } from '../../lib/soundEffects';
import { Layers, Cpu, Sparkles } from 'lucide-react';

interface EventGridProps {
  onViewDetails: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
}

type FilterCategory = 'ALL' | 'Technical' | 'Non-Technical';

export const EventGrid: React.FC<EventGridProps> = ({
  onViewDetails,
  onRegisterClick,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');

  const filteredEvents = eventConfig.events.filter((event) => {
    if (activeFilter === 'ALL') return true;
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-xs tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            OPERATIONAL SECTORS // 4 ACTIVE MISSIONS
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400">
            CHOOSE YOUR MISSION
          </h2>

          <p className="font-space text-sm sm:text-base text-slate-300">
            Select an operational track. Review the briefing intel, assemble your crewmates, and prepare for deployment.
          </p>

          {/* CATEGORY FILTER TABS */}
          <div className="inline-flex p-1 rounded-xl bg-space-900/90 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => handleFilterChange('ALL')}
              className={`px-4 py-2 rounded-lg font-orbitron text-xs font-bold tracking-wider transition-all ${
                activeFilter === 'ALL'
                  ? 'bg-cyan-400 text-space-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ALL MISSIONS ({eventConfig.events.length})
            </button>

            <button
              onClick={() => handleFilterChange('Technical')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-orbitron text-xs font-bold tracking-wider transition-all ${
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
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-orbitron text-xs font-bold tracking-wider transition-all ${
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
