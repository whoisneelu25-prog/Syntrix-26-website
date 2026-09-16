import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { Clock, Rocket, CheckCircle2, Flame } from 'lucide-react';

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [missionState, setMissionState] = useState<'UPCOMING' | 'IN_PROGRESS' | 'COMPLETE'>('UPCOMING');

  useEffect(() => {
    // 18 September 2026 09:00 AM IST
    const targetDate = new Date(eventConfig.countdownDate).getTime();
    const eventDurationMs = 8 * 60 * 60 * 1000; // 8 hour event window

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setMissionState('UPCOMING');
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else if (difference <= 0 && Math.abs(difference) <= eventDurationMs) {
        setMissionState('IN_PROGRESS');
      } else {
        setMissionState('COMPLETE');
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days, color: 'text-cyan-400', border: 'border-cyan-400/30' },
    { label: 'HOURS', value: timeLeft.hours, color: 'text-sky-400', border: 'border-sky-400/30' },
    { label: 'MINUTES', value: timeLeft.minutes, color: 'text-purple-400', border: 'border-purple-400/30' },
    { label: 'SECONDS', value: timeLeft.seconds, color: 'text-rose-400', border: 'border-rose-400/30' },
  ];

  return (
    <section id="countdown" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-b from-space-900/90 via-space-850/80 to-space-950/95 border border-cyan-500/30 p-8 sm:p-12 backdrop-blur-xl shadow-[0_0_60px_rgba(0,240,255,0.15)] hud-corner-all overflow-hidden text-center space-y-8">
        
        {/* BACKGROUND RADAR RINGS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-cyan-500/10 border-dashed animate-radar-sweep pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-purple-500/10 pointer-events-none" />

        {/* SECTION HEADER */}
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            SYNCHRONIZED STATION CLOCK // T-MINUS
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400">
            {missionState === 'UPCOMING'
              ? 'COUNTDOWN TO LAUNCH'
              : missionState === 'IN_PROGRESS'
              ? 'MISSION IN PROGRESS'
              : 'MISSION COMPLETE'}
          </h2>

          <p className="font-mono text-xs sm:text-sm text-slate-400 tracking-wider">
            TARGET: 18 SEPTEMBER 2026 • 09:00 AM IST • REPORT TO SEMINAR HALL • EVENTS IN AI&amp;DS BLOCK
          </p>
        </div>

        {/* TIME UNITS READOUT OR STATUS BADGE */}
        {missionState === 'UPCOMING' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto relative z-10">
            {timeUnits.map((unit) => (
              <motion.div
                key={unit.label}
                whileHover={{ scale: 1.03 }}
                className={`p-5 sm:p-6 rounded-2xl bg-space-950/80 border ${unit.border} backdrop-blur-md flex flex-col items-center justify-center shadow-lg relative group overflow-hidden`}
              >
                {/* Glow bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-70 group-hover:opacity-100 transition-opacity" />

                <span className={`font-orbitron text-4xl sm:text-6xl font-black ${unit.color} text-glow-cyan tracking-tight`}>
                  {String(unit.value).padStart(2, '0')}
                </span>

                <span className="font-mono text-xs sm:text-sm tracking-widest uppercase text-slate-400 mt-2 font-bold">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* MISSION IN PROGRESS STATE */}
        {missionState === 'IN_PROGRESS' && (
          <div className="py-8 relative z-10 flex flex-col items-center justify-center space-y-4">
            <div className="p-4 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-400 animate-bounce">
              <Flame className="w-10 h-10" />
            </div>
            <h3 className="font-orbitron text-3xl font-black text-emerald-400 tracking-wider">
              ALL SYSTEMS ONLINE // MISSION ACTIVE
            </h3>
            <p className="font-space text-slate-300 max-w-md">
              SYNTRIX'26 is currently underway! Report to Seminar Hall — all events take place in the AI&amp;DS Block.
            </p>
          </div>
        )}

        {/* MISSION COMPLETE STATE */}
        {missionState === 'COMPLETE' && (
          <div className="py-8 relative z-10 flex flex-col items-center justify-center space-y-4">
            <div className="p-4 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-orbitron text-3xl font-black text-cyan-300 tracking-wider">
              MISSION OBJECTIVES ACCOMPLISHED
            </h3>
            <p className="font-space text-slate-300 max-w-md">
              SYNTRIX'26 mission has concluded. Congratulations to all victorious crewmates and participants. See you in the next sector!
            </p>
          </div>
        )}

        {/* FOOTER CALLOUT */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400 relative z-10">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-cyan-400" />
            <span>CREWMATE REGISTRATIONS CLOSING PRIOR TO COMMENCEMENT</span>
          </div>

          <a
            href="#register"
            className="text-cyan-300 hover:text-white font-bold tracking-wider uppercase underline underline-offset-4 decoration-cyan-400"
          >
            SECURE YOUR MISSION PASS &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
