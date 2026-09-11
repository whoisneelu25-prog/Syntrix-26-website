import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig, type PrizeItem } from '../../config/eventConfig';
import { Trophy, Award, Medal, Sparkles } from 'lucide-react';

export const PrizeSection: React.FC = () => {
  const prizes = eventConfig.prizes;

  // IMPORTANT: Automatically hides if no prize information exists in eventConfig
  if (!prizes || prizes.length === 0) {
    return null;
  }

  const getTrophyIcon = (place: string) => {
    if (place.includes('1') || place.toLowerCase().includes('first')) {
      return <Trophy className="w-8 h-8 text-amber-400" />;
    }
    if (place.includes('2') || place.toLowerCase().includes('second')) {
      return <Award className="w-8 h-8 text-slate-300" />;
    }
    return <Medal className="w-8 h-8 text-amber-700" />;
  };

  return (
    <section id="rewards" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="space-y-10">
        
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-xs tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            MISSION INCENTIVES // BOUNTY
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-400">
            MISSION REWARDS
          </h2>

          <p className="font-space text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Honoring exceptional crewmates with prestigious trophies, certificates, and mission accolades.
          </p>
        </div>

        {/* PRIZES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prizes.map((prize: PrizeItem, index: number) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-space-900/80 border border-amber-500/30 backdrop-blur-md flex flex-col items-center text-center space-y-4 shadow-[0_4px_25px_rgba(245,158,11,0.1)]"
            >
              <div className="p-4 rounded-2xl bg-space-950 border border-amber-500/30">
                {getTrophyIcon(prize.place)}
              </div>

              <div>
                <span className="font-orbitron text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {prize.place}
                </span>
                <h3 className="font-orbitron text-2xl font-black text-white mt-1">
                  {prize.reward}
                </h3>
              </div>

              {prize.perks && prize.perks.length > 0 && (
                <ul className="pt-3 border-t border-white/10 w-full font-mono text-xs text-slate-300 space-y-1.5 text-left">
                  {prize.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">&gt;</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
