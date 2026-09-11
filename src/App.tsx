import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import { QRScannerSection } from './components/sections/QRScannerSection';
import { PrizeSection } from './components/sections/PrizeSection';
import { RegistrationSection } from './components/sections/RegistrationSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';

// Modals & Easter Eggs
import { RegistrationNoticeModal } from './components/sections/RegistrationNoticeModal';
import { PosterModal } from './components/sections/PosterModal';
import { EmergencyMeetingModal } from './components/ui/EmergencyMeetingModal';

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

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    soundEngine.playWhoosh();
    setShowIntro(true);
  };

  const handleOpenRegisterNotice = (eventName?: string) => {
    setNoticeEventName(eventName);
    setIsNoticeModalOpen(true);
  };

  const handleCardRegisterClick = (event: EventItem) => {
    const targetUrl = event.registrationLink || eventConfig.googleFormUrl;
    if (!targetUrl || targetUrl === 'YOUR_GOOGLE_FORM_LINK_HERE') {
      handleOpenRegisterNotice(event.name);
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
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
        />

        {/* MISSION BRIEFING // CENTRAL AREA */}
        <MissionBriefing />

        {/* TASK BOARD // CHOOSE YOUR MISSION */}
        <EventGrid
          onViewDetails={(event) => setSelectedEventModal(event)}
          onRegisterClick={handleCardRegisterClick}
        />

        {/* CREWMATE RULEBOOK // DATABASE ACCORDION */}
        <RulesSection />

        {/* MISSION TIMER // SPACESHIP COUNTDOWN */}
        <CountdownSection />

        {/* MISSION REWARDS (AUTO-HIDES IF EMPTY) */}
        <PrizeSection />

        {/* SCANNER STATION // OFFICIAL QR PASS & REAL-TIME SCANNER */}
        <QRScannerSection
          onOpenNoticeModal={() => handleOpenRegisterNotice()}
        />

        {/* JOIN THE CREW // 4-STEP AMONG US TASK */}
        <RegistrationSection
          onOpenNoticeModal={() => handleOpenRegisterNotice()}
        />

        {/* MISSION CONTROL // CONTACT TELEMETRY */}
        <ContactSection />
      </main>

      {/* 7. FUTURISTIC LOBBY FOOTER */}
      <Footer
        onReplayIntro={handleReplayIntro}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      />

      {/* 8. MODALS & EASTER EGGS */}
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

    </div>
  );
}

export default App;
