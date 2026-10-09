import React, { useLayoutEffect, useRef, useState } from 'react';
import { GoldParticles } from './components/GoldParticles';
import { HeroSection } from './components/HeroSection';
import { CeremonySection } from './components/CeremonySection';
import { VenueAndRsvpSection } from './components/VenueAndRsvpSection';
import { Footer } from './components/Footer';
import { DigitalCardModal } from './components/DigitalCardModal';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { Mail, Sparkles } from 'lucide-react';

export default function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicLoading, setIsMusicLoading] = useState(false);
  const [isMusicAutoplayBlocked, setIsMusicAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoplayAttemptedRef = useRef(false);
  const playAttemptInProgressRef = useRef(false);
  const interactionCleanupRef = useRef<(() => void) | null>(null);

  const removeInteractionFallback = () => {
    interactionCleanupRef.current?.();
    interactionCleanupRef.current = null;
  };

  const installInteractionFallback = (audio: HTMLAudioElement) => {
    if (interactionCleanupRef.current) return;

    const handleInteraction = (event: Event) => {
      if (!event.isTrusted || (event instanceof KeyboardEvent && event.repeat)) return;
      if (
        event.target instanceof Element &&
        event.target.closest('[data-music-toggle]')
      ) {
        return;
      }
      if (audio.paused) attemptPlayback(audio);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    interactionCleanupRef.current = () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  };

  function attemptPlayback(audio: HTMLAudioElement) {
    if (!audio.paused || playAttemptInProgressRef.current) return;

    playAttemptInProgressRef.current = true;
    setIsMusicLoading(true);

    void audio.play()
      .then(() => {
        setIsMusicAutoplayBlocked(false);
        removeInteractionFallback();
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          if (audio.paused) {
            setIsMusicAutoplayBlocked(true);
            setIsMusicLoading(false);
            installInteractionFallback(audio);
          }
          return;
        }
        if (error instanceof DOMException && error.name === 'AbortError') return;

        console.error('Unable to play wedding music.', error);
        setIsMusicLoading(false);
      })
      .finally(() => {
        playAttemptInProgressRef.current = false;
      });
  }

  const handleAudioReady = () => {
    if (autoplayAttemptedRef.current) return;
    autoplayAttemptedRef.current = true;

    const audio = audioRef.current;
    if (audio) attemptPlayback(audio);
  };

  const handleToggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      attemptPlayback(audio);
    } else {
      audio.pause();
    }
  };

  useLayoutEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    return removeInteractionFallback;
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#2C241D] font-sans selection:bg-[#D4AF37]/25 selection:text-[#5B1020]">
      {/* 1. Envelope Unsealing Experience on first arrival */}
      {!hasOpenedEnvelope && (
        <EnvelopeIntro
          onOpen={() => {
            setHasOpenedEnvelope(true);
          }}
        />
      )}

      <audio
        ref={audioRef}
        src="/sound.mp3"
        preload="auto"
        autoPlay
        loop
        onCanPlay={handleAudioReady}
        onLoadStart={() => setIsMusicLoading(true)}
        onWaiting={() => setIsMusicLoading(true)}
        onPlaying={() => {
          setIsMusicPlaying(true);
          setIsMusicLoading(false);
          setIsMusicAutoplayBlocked(false);
          removeInteractionFallback();
        }}
        onPause={() => {
          setIsMusicPlaying(false);
          setIsMusicLoading(false);
        }}
        onEnded={() => {
          setIsMusicPlaying(false);
          setIsMusicLoading(false);
        }}
        onError={(event) => {
          setIsMusicLoading(false);
          console.error('Unable to load wedding music.', event.currentTarget.error);
        }}
      />

      {/* 2. Floating Golden Light & Dust Particles Canvas */}
      <GoldParticles />

      {/* 3. Re-open Envelope Seal / View Card quick pill in bottom corner */}
      <aside aria-label="Quick Actions" className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setHasOpenedEnvelope(false)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] backdrop-blur-md text-[#5B1020] border border-[#D4AF37]/50 shadow-md text-xs font-serif-luxury tracking-wider transition-all"
          title="Re-open Royal Envelope"
        >
          <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="hidden sm:inline">Re-open Envelope</span>
        </button>

        <button
          onClick={() => setIsCardModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#5B1020] hover:bg-[#430D14] text-[#F3E5AB] border border-[#D4AF37]/60 shadow-md text-xs font-serif-luxury tracking-wider transition-all"
          title="View Official Invitation Card"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FBF5B7]" />
          <span>Card</span>
        </button>
      </aside>

      {/* SECTION 1 — Animated Invitation Hero */}
      <HeroSection
        onScrollToCeremony={() => scrollToSection('ceremony')}
        onScrollToRsvp={() => scrollToSection('venue-rsvp')}
        onOpenCardModal={() => setIsCardModalOpen(true)}
        isMusicPlaying={isMusicPlaying}
        isMusicLoading={isMusicLoading}
        isMusicAutoplayBlocked={isMusicAutoplayBlocked}
        onToggleMusic={handleToggleMusic}
      />

      {/* SECTION 2 — Baraat Ceremony & Itinerary + Live Countdown */}
      <CeremonySection />

      {/* SECTION 3 — Venue & Location + RSVP & Warm Wishes */}
      <VenueAndRsvpSection />

      {/* FOOTER */}
      <Footer />

      {/* Official Printable / Shareable Digital Invitation Card Modal */}
      <DigitalCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
    </div>
  );
}
