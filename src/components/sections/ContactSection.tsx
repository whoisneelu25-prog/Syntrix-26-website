import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig, type Coordinator } from '../../config/eventConfig';
import { 
  Phone, 
  User, 
  MapPin, 
  Navigation, 
  Radio 
} from 'lucide-react';
import { soundEngine } from '../../lib/soundEffects';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="space-y-12">
        
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            COMMUNICATIONS FREQUENCY // REACH CREW LEADERS
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-300">
            MISSION CONTROL
          </h2>

          <p className="font-space text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Need mission briefing details, entry authorization, or technical guidance? Contact our flight directors directly.
          </p>
        </div>

        {/* COORDINATORS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {eventConfig.coordinators.map((coordinator: Coordinator, idx: number) => {
            const cleanPhone = coordinator.phone.replace(/[^0-9+]/g, '');
            const isStaff = coordinator.role.includes('STAFF');
            const isVC = coordinator.role === 'VC';

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className={`p-6 rounded-2xl bg-space-900/80 border backdrop-blur-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                  isStaff 
                    ? 'border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                    : isVC 
                    ? 'border-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.15)]'
                    : 'border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.1)]'
                }`}
              >
                {/* Subtle top indicator bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  isStaff 
                    ? 'from-purple-500 to-pink-500' 
                    : isVC 
                    ? 'from-pink-500 to-cyan-400' 
                    : 'from-cyan-400 to-blue-500'
                }`} />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${
                      isStaff 
                        ? 'bg-purple-950/80 border-purple-400/40 text-purple-300' 
                        : isVC
                        ? 'bg-pink-950/80 border-pink-400/40 text-pink-300'
                        : 'bg-cyan-950/80 border-cyan-400/30 text-cyan-400'
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-slate-400 uppercase tracking-widest border border-white/5">
                      ACTIVE
                    </span>
                  </div>

                  <div>
                    <span className={`font-mono text-[10px] tracking-wider block font-bold uppercase ${
                      isStaff ? 'text-purple-300' : isVC ? 'text-pink-300' : 'text-cyan-300'
                    }`}>
                      {coordinator.role}
                    </span>
                    <h3 className="font-orbitron text-lg font-bold text-white tracking-wide mt-1">
                      {coordinator.name}
                    </h3>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-white/10">
                  <a
                    href={`tel:${cleanPhone}`}
                    onClick={() => soundEngine.playConfirm()}
                    className={`w-full py-2.5 px-3 rounded-xl border font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isStaff
                        ? 'bg-purple-950/60 border-purple-400/40 text-purple-200 hover:bg-purple-600 hover:text-white'
                        : isVC
                        ? 'bg-pink-950/60 border-pink-400/40 text-pink-200 hover:bg-pink-600 hover:text-white'
                        : 'bg-cyan-950/60 border-cyan-400/30 text-cyan-200 hover:bg-cyan-500 hover:text-black'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="tracking-wider">{coordinator.phone}</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CAMPUS LOCATION TELEMETRY PANEL */}
        <div className="p-6 sm:p-8 rounded-2xl bg-space-900/70 border border-cyan-500/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-400/30 text-cyan-400 shrink-0 mt-1 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase block font-bold">
                PHYSICAL STATION COORDINATES
              </span>
              <h4 className="font-orbitron text-lg sm:text-xl font-bold text-white">
                {eventConfig.collegeName}
              </h4>
              <p className="font-orbitron text-xs sm:text-sm text-cyan-300 font-bold tracking-wider uppercase mt-1">
                {eventConfig.departmentName}
              </p>
              <p className="font-space text-xs text-purple-300 font-semibold tracking-wider uppercase mt-0.5">
                {eventConfig.collegeSubtitle}
              </p>
              <p className="font-space text-sm text-slate-300 mt-1">
                {eventConfig.location} • AI&amp;DS Block Complex
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Prathyusha+Engineering+College"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playBlip(750)}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-orbitron text-xs font-black tracking-widest transition-all flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
            <span>OPEN MAP DIRECTIONS</span>
          </a>
        </div>

      </div>
    </section>
  );
};

