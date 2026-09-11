import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { soundEngine } from '../../lib/soundEffects';
import { Volume2, VolumeX, Menu, X, Rocket, Sparkles, UserPlus } from 'lucide-react';
import { NeonButton } from '../ui/NeonButton';

interface NavbarProps {
  onOpenRegisterModal: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegisterModal, onReplayIntro }) => {
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
    if (eventConfig.googleFormUrl === 'YOUR_GOOGLE_FORM_LINK_HERE') {
      onOpenRegisterModal();
    } else {
      window.open(eventConfig.googleFormUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-space-950/85 backdrop-blur-md border-b border-cyan-500/25 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* BRAND LOGO */}
            <a
              href="#hero"
              onClick={() => soundEngine.playBlip(800)}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-9 h-9 rounded-lg bg-space-900 border border-cyan-400/40 flex items-center justify-center group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                <Rocket className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-orbitron font-black text-lg sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400">
                    {eventConfig.eventName}
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                    LOBBY
                  </span>
                </div>
                <p className="text-[9px] font-mono tracking-widest text-slate-400 hidden sm:block">
                  PRATHYUSHA ENG COLLEGE
                </p>
              </div>
            </a>

            {/* DESKTOP GAME NAV LINKS */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-space-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
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
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* SYSTEM ONLINE BADGE */}
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-space-900/80 border border-emerald-500/30 font-mono text-[10px] text-emerald-300">
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

              {/* Replay Intro Button */}
              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-purple-500/30 bg-space-900/60 text-purple-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all"
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
                className="hidden sm:inline-flex"
                icon={<UserPlus className="w-3.5 h-3.5" />}
              >
                JOIN THE CREW
              </NeonButton>

              {/* MOBILE HAMBURGER BUTTON */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl border border-cyan-500/30 bg-space-900/80 text-cyan-300 hover:text-white"
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
              className="md:hidden border-b border-cyan-500/20 bg-space-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleNavClick}
                    className="px-4 py-2.5 rounded-lg font-orbitron text-xs font-bold tracking-wider text-slate-200 hover:text-cyan-300 hover:bg-space-900 border border-transparent hover:border-cyan-500/20"
                  >
                    {link.label}
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
                  className="w-full"
                >
                  JOIN THE CREW
                </NeonButton>

                {onReplayIntro && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onReplayIntro();
                    }}
                    className="w-full py-2 rounded-lg font-mono text-xs text-purple-300 border border-purple-500/30 hover:bg-purple-950/30 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    REPLAY CINEMATIC INTRO
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
