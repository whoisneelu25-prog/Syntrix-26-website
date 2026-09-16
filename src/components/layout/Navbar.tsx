import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { soundEngine } from '../../lib/soundEffects';
import { Volume2, VolumeX, Menu, X, Sparkles, UserPlus } from 'lucide-react';
import { NeonButton } from '../ui/NeonButton';

interface NavbarProps {
  onOpenRegisterModal?: () => void;
  onReplayIntro?: () => void;
  onOpenEmergencyModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenRegisterModal, 
  onReplayIntro,
  onOpenEmergencyModal 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(() => soundEngine.getIsAudioEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundEngine.toggleMute();
    setAudioActive(newState);
  };

  const navLinks = [
    { label: 'LOBBY', href: '#hero' },
    { label: 'MISSION', href: '#briefing' },
    { label: 'EVENTS', href: '#events' },
    { label: 'RULES', href: '#rulebook' },
    { label: 'REGISTER', href: '#register' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = () => {
    soundEngine.playBlip(700);
    setMobileMenuOpen(false);
  };

  const handleRegisterClick = () => {
    soundEngine.playConfirm();
    if (eventConfig.googleFormUrl) {
      window.open(eventConfig.googleFormUrl, '_blank', 'noopener,noreferrer');
    } else if (onOpenRegisterModal) {
      onOpenRegisterModal();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-space-950/95 backdrop-blur-xl border-b border-cyan-500/30 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-space-950/80 backdrop-blur-md border-b border-cyan-500/15 py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* BRAND LOGO & DROPSHIP MISSION CENTRAL TELEMETRY */}
            <a
              href="#hero"
              onClick={() => soundEngine.playBlip(800)}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
              aria-label="SYNTRIX'26 Home - Dropship Mission Central"
            >
              <div className="relative h-8 sm:h-9 md:h-10 w-auto flex items-center shrink-0">
                <img
                  src="/assets/syntrix_logo_official.png"
                  alt="SYNTRIX'26"
                  className="h-7 sm:h-8 md:h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.9)] transition-all"
                />
              </div>

              {/* Vertical Sci-Fi Divider */}
              <div className="hidden sm:block h-6 sm:h-7 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent shrink-0" />

              {/* Mission Central & Tech Carnival Telemetry Info */}
              <div className="hidden sm:flex flex-col justify-center shrink-0 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0 shadow-[0_0_6px_#00f0ff]" />
                  <span className="font-orbitron text-[10px] sm:text-[11px] font-extrabold tracking-[0.12em] text-cyan-300 uppercase leading-none whitespace-nowrap group-hover:text-cyan-200 transition-colors">
                    DROPSHIP MISSION CENTRAL
                  </span>
                </div>
                <span className="font-mono text-[8px] sm:text-[9px] font-medium tracking-[0.15em] text-purple-300/90 uppercase leading-none mt-1 pl-3 whitespace-nowrap">
                  DEPT OF ARTIFICIAL INTELLIGENCE &amp; DATA SCIENCE
                </span>
              </div>
            </a>

            {/* DESKTOP GAME NAV LINKS (Visible on lg+ for optimal breathing room) */}
            <nav className="hidden lg:flex items-center space-x-1 lg:space-x-1.5 bg-space-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className="px-3 py-1.5 rounded-full font-orbitron text-[11px] font-bold tracking-wider text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/50 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* RIGHT SIDE ACTIONS */}
            <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
              {/* SYSTEM ONLINE BADGE */}
              <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-space-900/80 border border-emerald-500/30 font-mono text-[10px] text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-widest">SYSTEM ONLINE</span>
              </div>

              {/* Audio Synthesizer Toggle */}
              <button
                onClick={toggleSound}
                className="p-2 rounded-xl border border-cyan-500/30 bg-space-900/80 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/60 transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                title={audioActive ? 'Mute Sci-Fi Audio' : 'Enable Sci-Fi Audio'}
                aria-label="Toggle Audio"
              >
                {audioActive ? (
                  <Volume2 className="w-4 h-4 text-cyan-300 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* Emergency Meeting Easter Egg Trigger */}
              {onOpenEmergencyModal && (
                <button
                  onClick={onOpenEmergencyModal}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-red-500/40 bg-red-950/40 text-red-400 hover:text-white hover:border-red-400 hover:bg-red-900/60 text-xs font-mono transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                  title="EMERGENCY ALERT // DO NOT PRESS"
                  aria-label="Trigger Emergency Meeting Easter Egg"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="hidden xl:inline text-[10px] font-bold tracking-wider">EMERGENCY</span>
                </button>
              )}

              {/* Replay Intro Button */}
              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-purple-500/30 bg-space-900/60 text-purple-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all"
                  title="Replay Opening Cinematic"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>REPLAY INTRO</span>
                </button>
              )}

              {/* JOIN THE CREW CTA */}
              <NeonButton
                variant="cyan"
                size="sm"
                onClick={handleRegisterClick}
                className="hidden sm:inline-flex shrink-0 font-orbitron font-bold text-xs"
                icon={<UserPlus className="w-4 h-4" />}
              >
                JOIN THE CREW
              </NeonButton>

              {/* MOBILE HAMBURGER BUTTON (Visible up to lg) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-cyan-500/30 bg-space-900/80 text-cyan-300 hover:text-white transition-colors"
                aria-label="Open Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU ACCORDION DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-cyan-500/20 bg-space-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-2xl"
            >
              {/* Mission Header inside drawer for mobile */}
              <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-orbitron font-bold text-cyan-300 tracking-wider">DROPSHIP MISSION CENTRAL</span>
                </div>
                <span className="text-purple-300/90 font-medium">Dept of AI &amp; DS</span>
              </div>

              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleNavClick}
                    className="px-4 py-2.5 rounded-lg font-orbitron text-xs font-bold tracking-wider text-slate-200 hover:text-cyan-300 hover:bg-space-900 border border-transparent hover:border-cyan-500/20 transition-all flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-cyan-500/50 font-mono text-[10px]">»</span>
                  </a>
                ))}
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <NeonButton
                  variant="cyan"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleRegisterClick();
                  }}
                  className="w-full font-orbitron font-bold"
                  icon={<UserPlus className="w-4 h-4" />}
                >
                  JOIN THE CREW
                </NeonButton>

                {onReplayIntro && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onReplayIntro();
                    }}
                    className="w-full py-2.5 rounded-lg font-mono text-xs text-purple-300 border border-purple-500/30 hover:bg-purple-950/30 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>REPLAY CINEMATIC INTRO</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
