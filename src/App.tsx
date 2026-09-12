import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { eventConfig, type EventItem } from './config/eventConfig';
import { soundEngine } from './lib/soundEffects';

// The Primary Living Environment
import { LobbyBackground } from './components/ui/LobbyBackground';
import { LobbyHUDOverlay } from './components/ui/LobbyHUDOverlay';

// Cinematic Intro sequence
import { IntroSequence } from './components/intro/IntroSequence';

// Layout & Sections
import { Navbar } from './components/layout/Navbar';
import { AnnouncementBanner } from './components/sections/AnnouncementBanner';
import { HeroSection } from './components/sections/HeroSection';
import { MissionBriefing } from './components/sections/MissionBriefing';
import { EventGrid } from './components/sections/EventGrid';
import { EventDetailModal } from './components/sections/EventDetailModal';
import { RulesSection } from './components/sections/RulesSection';
import { CountdownSection } from './components/sections/CountdownSection';
import { PrizeSection } from './components/sections/PrizeSection';
import { RegistrationSection } from './components/sections/RegistrationSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';

// Modals & Easter Eggs
import { RegistrationNoticeModal } from './components/sections/RegistrationNoticeModal';
import { PosterModal } from './components/sections/PosterModal';
import { EmergencyMeetingModal } from './components/ui/EmergencyMeetingModal';
import { CrewCustomizer } from './components/ui/CrewCustomizer';

export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const introSeen = sessionStorage.getItem('syntrix26_intro_seen');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return introSeen !== 'true' && !prefersReducedMotion;
    }
    return true;
  });

  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const eventParam = urlParams.get('event');
      if (eventParam) {
        return eventConfig.events.find(e => e.id === eventParam) || null;
      }
    }
    return null;
  });

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState<boolean>(false);
  const [noticeEventName, setNoticeEventName] = useState<string | undefined>(undefined);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState<boolean>(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isCrewCustomizerOpen, setIsCrewCustomizerOpen] = useState<boolean>(false);

  const handleIntroComplete = () => {
    soundEngine.stopAmbient();
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    soundEngine.setUnmuted();
    soundEngine.playWhoosh();
    setShowIntro(true);
  };

  const handleOpenRegisterNotice = (eventName?: string) => {
    setNoticeEventName(eventName);
    setIsNoticeModalOpen(true);
  };

  const handleCardRegisterClick = (event: EventItem) => {
    const targetUrl = event.registrationLink || eventConfig.registrationLink;
    if (!targetUrl || targetUrl.includes('YOUR_GOOGLE_FORM')) {
      handleOpenRegisterNotice(event.name);
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleViewEventDetails = (event: EventItem) => {
    setSelectedEventModal(event);
  };

  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 font-inter antialiased overflow-x-hidden">
      
      {/* 1. CINEMATIC AMONG US TO SYNTRIX'26 OPENING SEQUENCE */}
      <AnimatePresence>
        {showIntro && (
          <IntroSequence onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* 2. THE PERSISTENT AMONG US DROPSHIP LOBBY (PRIMARY WORLD BACKGROUND) */}
      <LobbyBackground interactive={true} />

      {/* 3. FIXED LOBBY TELEMETRY HUD OVERLAY (SLIM TOP LASER LINE & PROGRESS METER) */}
      <LobbyHUDOverlay />

      {/* 4. STICKY GAME HUD NAVIGATION */}
      <Navbar
        onOpenRegisterModal={() => handleOpenRegisterNotice()}
        onReplayIntro={handleReplayIntro}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      />

      {/* 5. CONFIGURABLE ANNOUNCEMENT BANNER */}
      <AnnouncementBanner />

      {/* 6. MAIN LOBBY CONTENT SECTIONS */}
      <main className="relative z-10 space-y-4">
        {/* LOBBY // HERO */}
        <HeroSection
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
          onOpenRegisterModal={() => handleOpenRegisterNotice()}
          onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          onOpenCrewCustomizer={() => setIsCrewCustomizerOpen(true)}
        />

        {/* MISSION BRIEFING // CENTRAL AREA */}
        <MissionBriefing />

        {/* TASK BOARD // CHOOSE YOUR MISSION */}
        <EventGrid
          onViewDetails={handleViewEventDetails}
          onRegisterClick={handleCardRegisterClick}
        />

        {/* CREWMATE RULEBOOK // DATABASE ACCORDION */}
        <RulesSection />

        {/* MISSION TIMER // SPACESHIP COUNTDOWN */}
        <CountdownSection />

        {/* MISSION REWARDS (AUTO-HIDES IF EMPTY) */}
        <PrizeSection />

        {/* JOIN THE CREW // REGISTRATION TASK TERMINAL */}
        <RegistrationSection
          onOpenNoticeModal={() => handleOpenRegisterNotice()}
        />

        {/* MISSION CONTROL // CONTACT TELEMETRY */}
        <ContactSection />
      </main>


      {/* 8. FLOATING CREW SELECT BUTTON (BOTTOM RIGHT) */}
      <div className="fixed bottom-4 right-4 z-30">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            soundEngine.playBlip(750);
            setIsCrewCustomizerOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-space-950/90 border border-cyan-400/50 text-cyan-300 font-orbitron text-xs font-bold tracking-wider backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:border-cyan-300 hover:text-white transition-all cursor-pointer group"
          title="Customize Your Crewmate"
          aria-label="Open Crew Select Customizer"
        >
          <img
            src="/assets/theme_crewmates/crewmate_1.png"
            alt="Crew Customizer"
            className="w-5 h-5 object-contain group-hover:rotate-12 transition-transform"
          />
          <span className="hidden sm:inline">CREW SELECT</span>
        </motion.button>
      </div>

      {/* 9. FUTURISTIC LOBBY FOOTER */}
      <Footer
        onReplayIntro={handleReplayIntro}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      />

      {/* 10. MODALS & EASTER EGGS */}
      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEventModal}
        onClose={() => setSelectedEventModal(null)}
        onRegister={handleCardRegisterClick}
      />

      {/* Safe Registration Fallback Modal */}
      <RegistrationNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        eventName={noticeEventName}
      />

      {/* Official Poster Showcase Modal */}
      <PosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
      />

      {/* Emergency Meeting Modal Easter Egg */}
      <EmergencyMeetingModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      {/* Crew Customizer Modal */}
      <AnimatePresence>
        {isCrewCustomizerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setIsCrewCustomizerOpen(false)}
            />
            <div className="relative z-10 w-full max-w-sm">
              <CrewCustomizer onClose={() => setIsCrewCustomizerOpen(false)} />
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;

