import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Square, ChevronUp, ChevronDown, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../lib/soundEffects';

interface MissionProgressHUDProps {
  hasViewedMissions?: boolean;
  hasReadRules?: boolean;
  hasClickedRegister?: boolean;
}

export const MissionProgressHUD: React.FC<MissionProgressHUDProps> = ({
  hasViewedMissions = false,
  hasReadRules = false,
  hasClickedRegister = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isCelebrated, setIsCelebrated] = useState<boolean>(false);

  // Task states
  const task1 = true; // Enter Lobby (always true once on site)
  const task2 = hasViewedMissions;
  const task3 = hasReadRules;
  const task4 = hasClickedRegister;
  const allCoreDone = task1 && task2 && task3 && task4;
  const task5 = allCoreDone; // Complete Mission

  const completedCount = (task1 ? 1 : 0) + (task2 ? 1 : 0) + (task3 ? 1 : 0) + (task4 ? 1 : 0) + (task5 ? 1 : 0);
  const progressPercent = (completedCount / 5) * 100;

  useEffect(() => {
    if (allCoreDone && !isCelebrated) {
      setIsCelebrated(true);
      soundEngine.playMissionReveal();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#10b981', '#8b5cf6', '#ffffff'],
        });
      } catch {
        // ignore
      }
    }
  }, [allCoreDone, isCelebrated]);

  const tasks = [
    { id: 't1', label: 'ENTER LOBBY', done: task1 },
    { id: 't2', label: 'VIEW MISSIONS', done: task2 },
    { id: 't3', label: 'READ RULES', done: task3 },
    { id: 't4', label: 'REGISTER', done: task4 },
    { id: 't5', label: 'COMPLETE MISSION', done: task5 },
  ];

  return (
    <aside
      aria-label="Mission Progress HUD"
      className="fixed bottom-4 left-4 z-30 font-mono select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-space-950/90 border border-cyan-500/40 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.8)] overflow-hidden w-64 sm:w-72"
      >
        {/* AMONG US ICONIC TOP TASK BAR */}
        <div className="bg-space-900 px-3.5 py-2 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
              TOTAL TASKS COMPLETED
            </span>
          </div>

          <button
            onClick={() => {
              soundEngine.playBlip(700);
              setIsOpen(!isOpen);
            }}
            className="p-1 rounded hover:bg-white/10 text-cyan-400 hover:text-white transition-colors cursor-pointer"
            title={isOpen ? "Minimize HUD" : "Expand HUD"}
            aria-label="Toggle Mission HUD"
          >
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* GREEN GLOWING TASK PROGRESS BAR */}
        <div className="h-2 w-full bg-space-950 border-b border-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_10px_#10b981]"
          />
        </div>

        {/* EXPANDED TASK LIST */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 space-y-2.5"
            >
              {/* TASKS CHECKLIST */}
              <div className="space-y-1.5 text-xs">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-2 py-1 px-1.5 rounded transition-colors ${
                      task.done ? 'text-emerald-300 bg-emerald-950/20' : 'text-slate-400'
                    }`}
                  >
                    {task.done ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className={`text-[11px] font-semibold tracking-wider ${task.done ? 'line-through opacity-80' : ''}`}>
                      {task.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CELEBRATION BADGE IF ALL DONE */}
              {task5 && (
                <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-amber-300 font-bold">
                  <Trophy className="w-3 h-3 text-amber-400 animate-bounce" />
                  <span>ALL TASKS COMPLETED! REPORT TO HQ</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </aside>
  );
};
