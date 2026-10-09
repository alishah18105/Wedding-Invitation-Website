import React, { useEffect, useRef, useState } from 'react';
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoplayAttemptedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let interactionAttempted = false;
    const removeInteractionListeners = () => {
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
    const handleUserInteraction = () => {
      if (interactionAttempted) return;
      interactionAttempted = true;
      removeInteractionListeners();
      void playAudio();
    };
    const handlePlaying = () => removeInteractionListeners();
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'NotAllowedError') return;
        console.error('Unable to play wedding music.', error);
      }
    };

    audio.volume = 0.3;
    window.addEventListener('pointerdown', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    audio.addEventListener('playing', handlePlaying);

    if (!autoplayAttemptedRef.current) {
      autoplayAttemptedRef.current = true;
      void playAudio();
    }

    return () => {
      removeInteractionListeners();
      audio.removeEventListener('playing', handlePlaying);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'NotAllowedError') return;
        console.error('Unable to play wedding music.', error);
      });
    } else {
      audio.pause();
    }
  };

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
        loop
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
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
        onToggleMusic={toggleMusic}
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
