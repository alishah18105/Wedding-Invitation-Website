/**
 * Cinematic South Asian Royal Wedding Ambient Synthesizer
 * Synthesizes a soft, romantic Pakistani & Indian wedding instrumental:
 * - Warm Tanpura drone & orchestral string swells
 * - Gentle, rhythmic tabla heartbeat cadence (Dha-Dhin-Dhin-Dha)
 * - Shimmering santoor / sitar resonant arpeggios
 * - Romantic bansuri flute melody in Raag Yaman / Pahadi
 */

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private volume = 0.55;
  private nextBeatTime = 0;
  private currentStep = 0;
  private tempo = 68; // Slow, romantic South Asian wedding tempo (BPM)
  private melodyIndex = 0;
  private timerId: number | null = null;

  // Scale: Raag Yaman / Pahadi (D Major / Lydian: D, E, F#, G#, A, B, C#)
  // Expressive romantic wedding melodic theme notes
  private readonly melodyMotifs = [
    // Phrase 1: Romantic entrance theme (Sa -> Ga -> Pa -> Ni -> Sa')
    [
      { pitch: 293.66, dur: 1.2, glide: 0.2 }, // D4 (Sa)
      { pitch: 369.99, dur: 1.4, glide: 0.3 }, // F#4 (Ga)
      { pitch: 440.00, dur: 1.8, glide: 0.4 }, // A4 (Pa)
      { pitch: 554.37, dur: 1.0, glide: 0.2 }, // C#5 (Ni)
      { pitch: 587.33, dur: 2.2, glide: 0.5 }, // D5 (High Sa)
    ],
    // Phrase 2: Graceful descending love motif (Sa' -> Ni -> Dha -> Pa -> Ga -> Re -> Sa)
    [
      { pitch: 587.33, dur: 1.0, glide: 0.2 }, // D5
      { pitch: 554.37, dur: 0.9, glide: 0.2 }, // C#5
      { pitch: 493.88, dur: 1.1, glide: 0.3 }, // B4 (Dha)
      { pitch: 440.00, dur: 1.6, glide: 0.4 }, // A4 (Pa)
      { pitch: 369.99, dur: 1.4, glide: 0.3 }, // F#4 (Ga)
      { pitch: 329.63, dur: 1.0, glide: 0.2 }, // E4 (Re)
      { pitch: 293.66, dur: 2.5, glide: 0.6 }, // D4 (Sa)
    ],
    // Phrase 3: Santoor/Flute soaring celebration
    [
      { pitch: 440.00, dur: 1.2, glide: 0.3 }, // A4 (Pa)
      { pitch: 493.88, dur: 1.2, glide: 0.3 }, // B4 (Dha)
      { pitch: 587.33, dur: 1.8, glide: 0.4 }, // D5 (Sa')
      { pitch: 659.25, dur: 1.4, glide: 0.3 }, // E5 (Re')
      { pitch: 739.99, dur: 2.2, glide: 0.5 }, // F#5 (Ga')
    ],
    // Phrase 4: Peaceful resolution with elder's blessing feel
    [
      { pitch: 739.99, dur: 1.0, glide: 0.3 },
      { pitch: 659.25, dur: 1.1, glide: 0.3 },
      { pitch: 587.33, dur: 1.6, glide: 0.4 },
      { pitch: 440.00, dur: 1.4, glide: 0.3 },
      { pitch: 369.99, dur: 1.2, glide: 0.3 },
      { pitch: 293.66, dur: 3.0, glide: 0.7 },
    ],
  ];

  // Santoor arpeggio notes (crystalline, harp-like cascade)
  private readonly santoorPitches = [
    293.66, 369.99, 440.00, 587.33, 739.99, 880.00,
    587.33, 440.00, 369.99, 293.66,
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.initContext();
    if (this.isPlaying || !this.ctx || !this.masterGain) return;
    this.isPlaying = true;

    // Smooth cinematic master fade-in
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(this.volume, now + 2.5);

    // 1. Start Tanpura & Royal Orchestral String Drone
    this.startRoyalDrone();

    // 2. Start Rhythmic Scheduler (Gentle Heartbeat Tabla + Santoor + Flute)
    this.nextBeatTime = now + 0.5;
    this.currentStep = 0;
    this.melodyIndex = 0;
    this.scheduleLoop();
  }

  /**
   * 1. Warm Royal Tanpura Drone & Soft Orchestral String Bed
   */
  private startRoyalDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Sa (D2: 73.42Hz, D3: 146.83Hz) and Pa (A2: 110Hz, A3: 220Hz)
    const droneFrequencies = [73.42, 110.0, 146.83, 220.0, 293.66];

    droneFrequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Alternate warm saw/triangle and sine for orchestral warmth
      osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Warm acoustic lowpass
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(idx === 0 ? 180 : 380, this.ctx.currentTime);

      const level = idx === 0 ? 0.15 : 0.05 / idx;
      gain.gain.setValueAtTime(level, this.ctx.currentTime);

      // Subtle LFO shimmer/vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.15 + idx * 0.08;
      lfoGain.gain.value = 0.6;
      lfo.connect(osc.frequency);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.activeNodes.push(osc, lfo, gain);
    });
  }

  /**
   * 2. Gentle Tabla Baya (Deep bass pitch-drop kick)
   */
  private playBaya(time: number, isAccented = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    // Classic Baya glide: starts around 85Hz and bends down to 55Hz
    const startFreq = isAccented ? 92 : 82;
    const endFreq = isAccented ? 54 : 50;
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.28);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, time);

    const level = isAccented ? 0.22 : 0.14;
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(level, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.42);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.45);
  }

  /**
   * 3. Gentle Tabla Dayan (Soft tuned metallic rim tap)
   */
  private playDayan(time: number, soft = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const band = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(293.66, time); // Tuned to Sa (D4)

    band.type = 'bandpass';
    band.frequency.setValueAtTime(587.33, time);
    band.Q.setValueAtTime(6.0, time);

    const level = soft ? 0.04 : 0.08;
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(level, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);

    osc.connect(band);
    band.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  /**
   * 4. Shimmering Santoor Pluck (Crystalline hammered dulcimer/harp)
   */
  private playSantoorPluck(freq: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    // Bright acoustic ping filter
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 2.2, time);
    filter.Q.setValueAtTime(3.5, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.07, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 1.25);
  }

  /**
   * 5. Romantic Bansuri / Shehnai Flute Melody Note
   */
  private playFluteNote(pitch: number, time: number, duration: number, glideTime: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    // Gentle portamento glide into note
    osc.frequency.setValueAtTime(pitch * 0.96, time);
    osc.frequency.exponentialRampToValueAtTime(pitch, time + glideTime);

    // Warm breathy lowpass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(pitch * 2.5, time);

    // Flute breath envelope (gentle attack, romantic swell, sweet decay)
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.09, time + duration * 0.25);
    gain.gain.setValueAtTime(0.09, time + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    // Flute vibrato (natural 5Hz singer vibrato)
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.value = 5.2;
    vibratoGain.gain.setValueAtTime(0.001, time);
    // Vibrato enters gently after note starts
    vibratoGain.gain.linearRampToValueAtTime(pitch * 0.015, time + duration * 0.4);

    vibrato.connect(osc.frequency);
    vibrato.start(time);
    vibrato.stop(time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  /**
   * Main rhythmic & musical cycle scheduler
   */
  private scheduleLoop = () => {
    if (!this.isPlaying || !this.ctx) return;

    const secondsPerBeat = 60.0 / this.tempo;
    const lookAhead = 0.2; // 200ms lookahead

    while (this.nextBeatTime < this.ctx.currentTime + lookAhead) {
      const beat = this.currentStep % 8; // 8-beat cycle (Traditional Keherwa / Tintal feel)
      const t = this.nextBeatTime;

      // --- Tabla Pattern ---
      // Beat 0: Sam (Root Dha - deep baya + dayan)
      // Beat 2: Dayan tap
      // Beat 4: Khali (Light baya)
      // Beat 6: Dayan tap
      if (beat === 0) {
        this.playBaya(t, true);
        this.playDayan(t, false);
      } else if (beat === 2) {
        this.playDayan(t, true);
      } else if (beat === 4) {
        this.playBaya(t, false);
      } else if (beat === 6) {
        this.playDayan(t, false);
      }

      // --- Santoor Shimmer ---
      // Delicate harp-like arpeggios on alternating bars
      if (this.currentStep % 16 === 0 || this.currentStep % 16 === 8) {
        const chordOffset = (this.currentStep / 8) % this.santoorPitches.length;
        for (let i = 0; i < 4; i++) {
          const p = this.santoorPitches[(chordOffset + i) % this.santoorPitches.length];
          this.playSantoorPluck(p, t + i * (secondsPerBeat * 0.45));
        }
      }

      // --- Flute Melody ---
      // Plays expressive phrases every 8 beats
      if (beat === 0 && this.currentStep % 16 === 0) {
        const motif = this.melodyMotifs[this.melodyIndex % this.melodyMotifs.length];
        this.melodyIndex++;

        let noteTime = t + 0.2;
        motif.forEach((note) => {
          this.playFluteNote(note.pitch, noteTime, note.dur, note.glide);
          noteTime += note.dur + 0.15;
        });
      }

      this.currentStep++;
      this.nextBeatTime += secondsPerBeat;
    }

    this.timerId = window.setTimeout(this.scheduleLoop, 100);
  };

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.volume, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      this.activeNodes.forEach((node) => {
        try {
          if (node instanceof AudioNode) {
            node.disconnect();
          }
        } catch {
          // ignore
        }
      });
      this.activeNodes = [];
      this.isPlaying = false;
    }, 1250);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain && this.isPlaying) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }
}

export const weddingAudio = new WeddingAudioPlayer();
