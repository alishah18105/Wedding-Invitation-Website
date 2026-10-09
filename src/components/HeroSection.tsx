import React from 'react';
import { Play, Pause, Calendar, MapPin, ChevronDown, Sparkles, Heart } from 'lucide-react';
import desktopBg from '../assets/images/luxury_wedding_bg_1791545288117.jpg';
import portraitBg from '../assets/images/luxury_wedding_portrait_1791545317807.jpg';

interface HeroSectionProps {
  onScrollToCeremony: () => void;
  onScrollToRsvp: () => void;
  onOpenCardModal: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToCeremony,
  onScrollToRsvp,
  onOpenCardModal,
  isMusicPlaying,
  onToggleMusic,
}) => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-8 sm:py-16 selection:bg-[#D4AF37]/30">
      {/* Background artwork with responsive switch */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Desktop / Landscape image */}
        <img
          src={desktopBg}
          alt="Royal Wedding Arch Background"
          className="hidden sm:block w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Mobile / Portrait image */}
        <img
          src={portraitBg}
          alt="Royal Wedding Arch Background Mobile"
          className="block sm:hidden w-full h-full object-cover object-center"
        />
        {/* Warm ambient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D070C]/25 via-transparent to-[#FDFBF7]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#FFF9ED]/30 to-[#F5EADB]/70" />
      </div>

      {/* Floating Audio & Quick Controls Top Bar */}
      <header className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFDF9]/85 backdrop-blur-md border border-[#D4AF37]/40 shadow-sm text-xs font-serif-luxury tracking-widest text-[#5B1020]">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
          <span>BARAAT CEREMONY</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMusic}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-md text-xs font-serif-luxury text-[#5B1020] hover:bg-white transition-all duration-300 focus:outline-none"
            title={isMusicPlaying ? 'Pause Wedding Music' : 'Play Wedding Music'}
            aria-label={isMusicPlaying ? 'Pause Wedding Music' : 'Play Wedding Music'}
            aria-pressed={isMusicPlaying}
          >
            {isMusicPlaying ? (
              <Pause className="w-3.5 h-3.5 text-[#C5A059]" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#C5A059]" />
            )}
            <span className="font-medium tracking-wide">Wedding Music</span>
          </button>

          {/* Quick Digital Card Viewer */}
          <button
            onClick={onOpenCardModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5B1020] text-[#F3E5AB] hover:bg-[#430D14] border border-[#D4AF37]/60 shadow-sm text-xs font-serif-luxury tracking-wider transition-all"
            title="View Official Invitation Card"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FBF5B7]" />
            <span className="hidden sm:inline">Invitation Card</span>
            <span className="sm:hidden">Card</span>
          </button>
        </div>
      </header>

      {/* Main Glassmorphic Floral Invitation Card */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center mt-12 sm:mt-16">
        <div className="card-luxury rounded-3xl p-6 sm:p-12 border-2 border-[#D4AF37]/60 gold-border-glow relative overflow-hidden backdrop-blur-md">
          {/* Corner Floral Ornaments */}
          <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-[#C5A059]/70 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-[#C5A059]/70 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-[#C5A059]/70 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-[#C5A059]/70 rounded-br-xl pointer-events-none" />

          {/* 1. Islamic Invocation */}
          <div className="mb-4 sm:mb-6">
            <p className="font-arabic text-2xl sm:text-3xl text-[#5B1020] font-normal leading-relaxed drop-shadow-xs">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-[10px] sm:text-xs font-serif-luxury tracking-[0.2em] text-[#8C6D23] uppercase mt-1">
              In the Name of Allah, the Most Beneficent, the Most Merciful
            </p>
          </div>

          {/* 2. Elder's Blessing & Host Request */}
          <div className="space-y-1.5 max-w-lg mx-auto mb-5 text-[#430D14]/90 font-serif-luxury">
            <p className="text-xs sm:text-sm tracking-wide italic text-[#701A24]">
              &ldquo;And of His signs is that He created for you from yourselves mates that you may find tranquility in them...&rdquo;
            </p>
            <p className="text-lg leading-relaxed pt-2 font-bold">
              Mr &amp; Mrs Syed Sultan Mehmood
            </p>
            <p className="text-[12px] text-[#665230] uppercase tracking-[0.16em]">
              cordially request the honour of your company to grace the Baraat ceremony of their beloved daughter
            </p>
          </div>

          {/* 3. The Couple's Calligraphy Names */}
          <div className="my-6 sm:my-8 py-2 relative">
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#5B1020] leading-none drop-shadow-sm select-none tracking-normal">
                Neha
              </h1>

              <div className="flex items-center justify-center gap-3 my-1 sm:my-2 w-48">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
                <span className="font-serif-luxury text-xl sm:text-2xl text-[#C5A059] italic px-2">
                  &amp;
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              </div>

              <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#5B1020] leading-none drop-shadow-sm select-none tracking-normal">
                Irfan
              </h1>
            </div>
          </div>

          {/* 4. Ceremony Details & Badges */}
          <div className="space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/50 shadow-xs text-xs font-serif-luxury tracking-widest uppercase text-[#8C6D23]">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Sunday, December 27th, 2026</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-[#5C4A3A] font-serif-luxury">
              <span className="flex items-center gap-1.5 font-medium text-[#430D14]">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                Royal Sapphire
              </span>
              <span>•</span>
              <span>Karachi, Pakistan</span>
            </div>
          </div>

          {/* 5. CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={onScrollToCeremony}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#5B1020] to-[#78172C] text-[#FFF9E6] hover:from-[#430D14] hover:to-[#5B1020] transition-all shadow-md hover:shadow-lg text-xs sm:text-sm font-serif-luxury tracking-widest uppercase flex items-center justify-center gap-2 border border-[#C5A059]/40 group"
            >
              <span>Ceremony Schedule</span>
              <ChevronDown className="w-4 h-4 text-[#F3E5AB] group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onScrollToRsvp}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#FAF5EB] hover:bg-[#F3EAD8] text-[#5B1020] transition-all border border-[#C5A059] text-xs sm:text-sm font-serif-luxury tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 text-[#5B1020]" />
              <span>Share Your Du&apos;as</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={onScrollToCeremony}
          className="mt-6 inline-flex flex-col items-center gap-1 text-[#8C6D23] hover:text-[#5B1020] transition-colors text-xs font-serif-luxury tracking-widest uppercase animate-bounce focus:outline-none"
          aria-label="Scroll down to ceremony itinerary"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-[#C5A059]" />
        </button>
      </div>
    </section>
  );
};
