import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig, type Coordinator } from '../../config/eventConfig';
import { 
  Headphones, 
  Mail, 
  Phone, 
  User, 
  MapPin, 
  Send,
  Navigation
} from 'lucide-react';
import { soundEngine } from '../../lib/soundEffects';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="space-y-12">
        
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase">
            <Headphones className="w-3.5 h-3.5 text-cyan-400" />
            COMMUNICATIONS FREQUENCY // REACH CREW LEADERS
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-300">
            CONTACT MISSION CONTROL
          </h2>

          <p className="font-space text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Need mission clarification or technical assistance? Establish direct contact with our event flight directors.
          </p>
        </div>

        {/* CONTACT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* DYNAMIC COORDINATORS */}
          {eventConfig.coordinators.map((coordinator: Coordinator, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-space-900/80 border border-white/10 hover:border-cyan-400/40 backdrop-blur-md transition-all duration-300 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-space-950 border border-cyan-500/30 text-cyan-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-wider block font-bold">
                    {coordinator.role}
                  </span>
                  <h3 className="font-orbitron text-base font-bold text-white">
                    {coordinator.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Phone: {coordinator.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Email: {coordinator.email}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* OFFICIAL MISSION CONTROL EMAIL CARD */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-space-900/90 to-purple-950/60 border border-purple-500/40 backdrop-blur-md transition-all duration-300 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-purple-950 border border-purple-400/40 text-purple-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-purple-300 uppercase tracking-wider block font-bold">
                    CENTRAL DISPATCH
                  </span>
                  <h3 className="font-orbitron text-base font-bold text-white">
                    Official Event Email
                  </h3>
                </div>
              </div>

              <p className="font-space text-xs text-slate-300 mb-2">
                Send queries regarding paper submissions, scheduling, or campus transport.
              </p>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-cyan-300 select-all">
                {eventConfig.officialEmail}
              </div>
            </div>

            <a
              href={`mailto:${eventConfig.officialEmail}`}
              onClick={() => soundEngine.playConfirm()}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-orbitron text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>TRANSMIT MESSAGE</span>
            </a>
          </motion.div>

        </div>

        {/* CAMPUS LOCATION TELEMETRY PANEL */}
        <div className="p-6 sm:p-8 rounded-2xl bg-space-900/60 border border-cyan-500/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-400/30 text-cyan-400 shrink-0 mt-1">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase block font-bold">
                PHYSICAL STATION COORDINATES
              </span>
              <h4 className="font-orbitron text-lg font-bold text-white">
                {eventConfig.collegeName} {eventConfig.collegeSubtitle}
              </h4>
              <p className="font-space text-sm text-slate-300 mt-1">
                {eventConfig.location} • Seminar Hall Complex
              </p>
              <p className="font-mono text-xs text-slate-500 mt-1">
                GPS: {eventConfig.collegeCoords.lat}, {eventConfig.collegeCoords.lng}
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Prathyusha+Engineering+College"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playBlip(750)}
            className="px-5 py-2.5 rounded-xl bg-space-950 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 font-orbitron text-xs font-bold tracking-wider transition-all flex items-center gap-2 shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
          >
            <Navigation className="w-4 h-4" />
            <span>OPEN MAP DIRECTIONS</span>
          </a>
        </div>

      </div>
    </section>
  );
};
