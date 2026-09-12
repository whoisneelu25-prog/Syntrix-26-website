// Web Audio API Procedural Synthesizer for sci-fi UI ambience and interactions
// 100% procedurally synthesized, zero external audio files, zero copyright issues

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false; // Enabled by default; resumes on user gesture
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientSubOsc: OscillatorNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('syntrix26_audio_enabled');
      // If user specifically saved 'false', respect it. Otherwise default to enabled (true)
      this.isMuted = saved === 'false';

      // Auto-unlock AudioContext on first user interaction (gesture, pointer, touch, scroll)
      const unlockAudio = () => {
        this.initContext();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('pointermove', unlockAudio);
        window.removeEventListener('scroll', unlockAudio);
        window.removeEventListener('wheel', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { once: true, passive: true });
      window.addEventListener('keydown', unlockAudio, { once: true, passive: true });
      window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
      window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
      window.addEventListener('pointermove', unlockAudio, { once: true, passive: true });
      window.addEventListener('scroll', unlockAudio, { once: true, passive: true });
      window.addEventListener('wheel', unlockAudio, { once: true, passive: true });

      // Eagerly try to start context on load
      this.initContext();
    }
  }

  public initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('syntrix26_audio_enabled', (!this.isMuted).toString());
    }
    if (!this.isMuted) {
      this.initContext();
      this.playConfirm();
    } else {
      this.stopAmbient();
    }
    return !this.isMuted;
  }

  public setUnmuted() {
    this.isMuted = false;
    if (typeof window !== 'undefined') {
      localStorage.setItem('syntrix26_audio_enabled', 'true');
    }
    this.initContext();
  }

  public getIsAudioEnabled(): boolean {
    return !this.isMuted;
  }

  public startAmbient() {
    // Disabled: Continuous background drone/hum sound completely removed as requested
    this.stopAmbient();
  }

  public stopAmbient() {
    try {
      if (this.ambientOsc) {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
        this.ambientOsc = null;
      }
      if (this.ambientSubOsc) {
        this.ambientSubOsc.stop();
        this.ambientSubOsc.disconnect();
        this.ambientSubOsc = null;
      }
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
    } catch {
      this.ambientOsc = null;
      this.ambientSubOsc = null;
      this.ambientGain = null;
    }
  }

  // Futuristic blip for hover or small button
  public playBlip(freq: number = 880) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.07);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // ignore
    }
  }

  // Sci-fi crewmate footstep
  public playFootstep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + Math.random() * 30, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.06);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }

  // Warning Radar alert for Impostor encounter
  public playWarningBeep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [440, 880].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0.05, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.11);
      });
    } catch {
      // ignore
    }
  }

  // Authentic Among Us Kill Sound (Sharp slice blade + heavy body impact thump + noise crunch)
  public playKillStrike() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Layer 1: High metallic blade swipe / slice ("SWISSH/SHING")
      const sliceOsc = this.ctx.createOscillator();
      const sliceGain = this.ctx.createGain();
      const sliceFilter = this.ctx.createBiquadFilter();

      sliceOsc.type = 'sawtooth';
      sliceOsc.frequency.setValueAtTime(1800, now);
      sliceOsc.frequency.exponentialRampToValueAtTime(280, now + 0.18);

      sliceFilter.type = 'bandpass';
      sliceFilter.frequency.setValueAtTime(1400, now);
      sliceFilter.frequency.exponentialRampToValueAtTime(400, now + 0.18);
      sliceFilter.Q.setValueAtTime(4, now);

      sliceGain.gain.setValueAtTime(0.08, now);
      sliceGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      sliceOsc.connect(sliceFilter);
      sliceFilter.connect(sliceGain);
      sliceGain.connect(this.ctx.destination);
      sliceOsc.start(now);
      sliceOsc.stop(now + 0.19);

      // Layer 2: Heavy cartoon body impact "THUD" (crewmate collapsing to floor)
      const thudOsc = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();

      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(180, now + 0.04);
      thudOsc.frequency.exponentialRampToValueAtTime(36, now + 0.3);

      thudGain.gain.setValueAtTime(0.12, now + 0.04);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      thudOsc.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thudOsc.start(now + 0.04);
      thudOsc.stop(now + 0.33);

      // Layer 3: Noise squish / impact crunch burst
      const bufferSize = this.ctx.sampleRate * 0.12; // 120ms of noise
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(700, now);
      noiseFilter.frequency.linearRampToValueAtTime(180, now + 0.12);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.09, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noiseNode.start(now);
      noiseNode.stop(now + 0.13);

      // Layer 4: Deep sub-bass shockwave rumble
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(95, now + 0.02);
      subOsc.frequency.exponentialRampToValueAtTime(24, now + 0.38);

      subGain.gain.setValueAtTime(0.1, now + 0.02);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now + 0.02);
      subOsc.stop(now + 0.41);

    } catch {
      // ignore
    }
  }

  // Authentic Emergency meeting klaxon / alert siren
  public playEmergencyAlarm() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // 3 iconic Among Us alarm pulses
      for (let p = 0; p < 3; p++) {
        const pStart = now + p * 0.32;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(920, pStart);
        osc.frequency.linearRampToValueAtTime(680, pStart + 0.22);

        gain.gain.setValueAtTime(0.09, pStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, pStart + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(pStart);
        osc.stop(pStart + 0.29);
      }
    } catch {
      // ignore
    }
  }

  // Grand futuristic mission initialized fanfare
  public playMissionReveal() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Epic sci-fi arpeggio: C5 -> E5 -> G5 -> B5 -> C6
      const chord = [523.25, 659.25, 783.99, 987.77, 1046.5];
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.05, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.52);
      });
    } catch {
      // ignore
    }
  }

  // Sci-fi confirm chime for major actions/modals
  public playConfirm() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.035, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.26);
      });
    } catch {
      // ignore
    }
  }

  // Sci-fi whoosh for transitions / intro finish
  public playWhoosh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.35);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.linearRampToValueAtTime(1200, now + 0.35);
      filter.Q.setValueAtTime(3, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new SoundEngine();
