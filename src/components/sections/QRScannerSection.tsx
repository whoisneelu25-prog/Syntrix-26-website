import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { soundEngine } from '../../lib/soundEffects';
import { 
  QrCode, 
  Camera, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  ScanLine, 
  Smartphone,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRScannerSectionProps {
  onOpenNoticeModal?: () => void;
}

export const QRScannerSection: React.FC<QRScannerSectionProps> = ({ onOpenNoticeModal }) => {
  const [activeTab, setActiveTab] = useState<'qr-card' | 'camera-scanner'>('qr-card');
  const [isCopied, setIsCopied] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanSuccess, setScanSuccess] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const registrationUrl = 
    eventConfig.googleFormUrl && eventConfig.googleFormUrl !== 'YOUR_GOOGLE_FORM_LINK_HERE'
      ? eventConfig.googleFormUrl
      : `${typeof window !== 'undefined' ? window.location.origin : 'https://prathyusha.edu.in'}/#register`;

  const handleCopyLink = () => {
    soundEngine.playConfirm();
    navigator.clipboard.writeText(registrationUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch(() => {});
  };

  const handleDownloadQR = () => {
    soundEngine.playConfirm();
    const link = document.createElement('a');
    link.href = '/assets/syntrix_registration_qr.png';
    link.download = 'SYNTRIX26_Registration_QR.png';
    link.click();
  };

  const startCamera = async () => {
    soundEngine.playBlip(780);
    setCameraError(null);
    setScanSuccess(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } else {
        setCameraError('Camera access not supported on this browser or platform.');
      }
    } catch {
      setCameraError('Camera permission denied or unavailable. Use the QR code to scan with your phone!');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleSimulateScan = () => {
    soundEngine.playConfirm();
    setScanSuccess('CREWMATE PASS VERIFIED // READY FOR SYNTRIX\'26 DEPLOYMENT');
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#38bdf8', '#a855f7', '#10b981'],
      });
    } catch {
      // ignore
    }
  };

  const handleDirectRegister = () => {
    soundEngine.playConfirm();
    if (eventConfig.googleFormUrl === 'YOUR_GOOGLE_FORM_LINK_HERE') {
      if (onOpenNoticeModal) onOpenNoticeModal();
    } else {
      window.open(eventConfig.googleFormUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="qr-scanner" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative rounded-3xl bg-space-950/85 border border-cyan-500/30 p-8 sm:p-12 backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.15)] hud-corner-all overflow-hidden">
        
        {/* SECTION HEADER */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 font-mono text-xs tracking-widest uppercase">
            <QrCode className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>MOBILE ENROLLMENT TERMINAL // SCAN STATION</span>
          </div>

          <h2 className="font-russo text-3xl sm:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400">
            OFFICIAL MISSION QR PORTAL
          </h2>

          <p className="font-rajdhani text-base sm:text-lg text-slate-300 font-medium max-w-xl mx-auto">
            Scan with any smartphone camera for rapid mobile registration, pass verification, and paperless entry at Prathyusha Seminar Hall.
          </p>

          {/* TAB SWITCHER */}
          <div className="pt-3 flex justify-center">
            <div className="inline-flex p-1 rounded-xl bg-space-900 border border-white/10">
              <button
                onClick={() => {
                  soundEngine.playBlip(700);
                  stopCamera();
                  setActiveTab('qr-card');
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-chakra text-xs font-bold tracking-wider transition-all ${
                  activeTab === 'qr-card'
                    ? 'bg-cyan-400 text-space-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>OFFICIAL QR PASS</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playBlip(700);
                  setActiveTab('camera-scanner');
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-chakra text-xs font-bold tracking-wider transition-all ${
                  activeTab === 'camera-scanner'
                    ? 'bg-cyan-400 text-space-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>LIVE PASS SCANNER</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: OFFICIAL QR CODE DISPLAY */}
        {activeTab === 'qr-card' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: INTERACTIVE QR CODE TERMINAL (5 COLS) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative p-6 rounded-3xl bg-space-900/90 border-2 border-cyan-400/40 shadow-[0_0_35px_rgba(0,240,255,0.25)] flex flex-col items-center group">
                
                {/* CORNER RETICLES */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                {/* LASER SCANNING BEAM */}
                <motion.div
                  animate={{ y: [0, 220, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-6 top-6 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f0ff] z-20 pointer-events-none"
                />

                {/* THE QR CODE IMAGE */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-space-950 p-2 flex items-center justify-center border border-cyan-500/30">
                  <img
                    src="/assets/syntrix_registration_qr.png"
                    alt="SYNTRIX'26 Official Registration QR Code"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-cyan-300">
                  <ScanLine className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="tracking-widest uppercase font-bold">SCAN WITH MOBILE CAMERA</span>
                </div>
              </div>
            </div>

            {/* RIGHT: INSTRUCTIONS & ACTIONS (7 COLS) */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 font-mono text-xs">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>DIRECT REGISTRATION TELEMETRY</span>
              </div>

              <h3 className="font-russo text-2xl sm:text-3xl text-white tracking-wide">
                INSTANT MISSION BOARDING PASS
              </h3>

              <p className="font-rajdhani text-base text-slate-300 leading-relaxed">
                Scan this code using Google Lens, iOS Camera, or any QR scanning app to open the official registration portal instantly on your device without typing the URL.
              </p>

              {/* THREE STEP PROCESS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-slate-300 pt-2">
                <div className="p-3 rounded-xl bg-space-900/80 border border-white/10 text-left">
                  <span className="font-bold text-cyan-400 block mb-1">01 // POINT</span>
                  <span className="text-slate-400 text-[11px]">Open smartphone camera and aim at the QR code above.</span>
                </div>
                <div className="p-3 rounded-xl bg-space-900/80 border border-white/10 text-left">
                  <span className="font-bold text-purple-400 block mb-1">02 // TAP</span>
                  <span className="text-slate-400 text-[11px]">Tap the notification link to launch the registration portal.</span>
                </div>
                <div className="p-3 rounded-xl bg-space-900/80 border border-white/10 text-left">
                  <span className="font-bold text-emerald-400 block mb-1">03 // DEPLOY</span>
                  <span className="text-slate-400 text-[11px]">Submit team details and claim your digital pass.</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
                <button
                  onClick={handleDownloadQR}
                  className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-space-900 border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 font-chakra text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                >
                  <Download className="w-4 h-4" />
                  <span>SAVE QR PASS</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-space-900 border border-purple-500/40 hover:border-purple-300 text-purple-300 font-chakra text-xs font-bold tracking-wider uppercase transition-all"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? 'LINK COPIED!' : 'COPY PORTAL LINK'}</span>
                </button>

                <button
                  onClick={handleDirectRegister}
                  className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-space-950 font-chakra text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                >
                  <span>DIRECT ACCESS</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LIVE CAMERA SCANNER VIEW */}
        {activeTab === 'camera-scanner' && (
          <div className="flex flex-col items-center max-w-xl mx-auto space-y-6">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-space-900 border-2 border-cyan-500/40 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(0,240,255,0.2)]">
              
              {/* Video Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
              />

              {/* Placeholder when camera is inactive */}
              {!cameraActive && (
                <div className="p-8 text-center space-y-3">
                  <Smartphone className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
                  <span className="font-russo text-lg text-white block">
                    SPACESHIP OPTICAL SCANNER
                  </span>
                  <p className="font-rajdhani text-sm text-slate-400 max-w-xs mx-auto">
                    Activate camera feed to scan participant badges, QR tickets, and event credentials.
                  </p>
                  <button
                    onClick={startCamera}
                    className="mt-2 inline-flex items-center gap-2 py-2.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-space-950 font-chakra text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  >
                    <Camera className="w-4 h-4" />
                    <span>ACTIVATE CAMERA</span>
                  </button>
                </div>
              )}

              {/* Viewfinder Target Overlays when camera is active */}
              {cameraActive && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-cyan-400/80 rounded-2xl relative animate-pulse">
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-300" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-300" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-300" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-300" />
                  </div>
                  <motion.div
                    animate={{ y: [-90, 90, -90] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-44 h-0.5 bg-cyan-400 shadow-[0_0_10px_#00f0ff]"
                  />
                </div>
              )}
            </div>

            {/* Error Message */}
            {cameraError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 font-mono text-xs w-full">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{cameraError}</span>
              </div>
            )}

            {/* Success Banner */}
            <AnimatePresence>
              {scanSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 font-chakra text-sm font-bold w-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{scanSuccess}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              {cameraActive ? (
                <button
                  onClick={stopCamera}
                  className="py-2.5 px-5 rounded-xl bg-space-900 border border-red-500/40 text-red-300 font-chakra text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  DEACTIVATE CAMERA
                </button>
              ) : null}

              <button
                onClick={handleSimulateScan}
                className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-space-900 border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 font-chakra text-xs font-bold tracking-wider uppercase transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>TEST PASS VERIFICATION</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
