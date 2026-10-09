import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);

    // Fire gentle golden sparkle confetti
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#F3E5AB', '#5B1020', '#C5A059'],
    });

    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21070B] transition-opacity duration-700 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.18)_0%,_rgba(33,7,11,0.98)_70%)] pointer-events-none" />

      {/* Royal Envelope Container */}
      <div className="relative max-w-lg w-full min-h-[460px] sm:min-h-[480px] rounded-2xl bg-[#FBF8F0] shadow-[0_25px_70px_rgba(0,0,0,0.7)] border-2 border-[#D4AF37] flex flex-col items-center justify-center p-6 sm:p-10 text-center overflow-hidden my-auto">
        {/* Envelope Flap Lines (decorative) */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#F2E8D5] to-transparent pointer-events-none" />

        {/* Outer Filigree Border */}
        <div className="absolute inset-2.5 sm:inset-3 border border-[#C5A059]/40 rounded-xl pointer-events-none" />

        {/* Top Islamic Invocation */}
        <p className="font-arabic text-2xl sm:text-3xl text-[#5B1020] mb-1 relative z-10 leading-relaxed">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="font-serif-luxury text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C6D23] mb-3 sm:mb-4 relative z-10 font-medium">
          Royal Wedding Invitation
        </p>

        {/* Couple Title */}
        <div className="relative z-10 my-1 sm:my-2">
          <h1 className="font-script text-5xl sm:text-6xl text-[#5B1020] leading-none">
            Neha &amp; Irfan
          </h1>
          <p className="font-serif-luxury text-xs sm:text-sm text-[#8C6D23] uppercase tracking-[0.2em] mt-2">
            The Baraat Ceremony
          </p>
        </div>

        {/* Royal Wax Seal Button */}
        <div className="relative z-20 mt-4 sm:mt-6">
          <button
            onClick={handleOpen}
            className="group relative flex flex-col items-center justify-center focus:outline-none"
            aria-label="Open Royal Wedding Invitation"
          >
            {/* Wax seal circle */}
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#7A1325] via-[#5B1020] to-[#38060D] border-2 border-[#D4AF37] shadow-[0_8px_25px_rgba(91,16,32,0.6)] group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all flex flex-col items-center justify-center text-[#F3E5AB]">
              <Sparkles className="w-5 h-5 text-[#FBF5B7] animate-pulse mb-0.5" />
              <span className="font-cinzel text-[11px] font-bold tracking-widest text-[#FBF5B7]">
                OPEN
              </span>
            </div>

            <span className="mt-3 text-xs sm:text-sm font-serif-luxury uppercase tracking-wider sm:tracking-widest text-[#7A1325] group-hover:text-[#38060D] transition-colors font-semibold px-2 text-center">
              Unfold the Movement of Love
            </span>
          </button>
        </div>

        {/* Quick Skip button */}
        <button
          onClick={onOpen}
          className="absolute bottom-2.5 right-4 text-[11px] font-serif-luxury uppercase tracking-wider text-[#997A35] hover:text-[#5B1020] transition-colors"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};
