import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Heart, Send, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GoldDivider } from './Ornaments';

interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

export const VenueAndRsvpSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [duaMessage, setDuaMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Slider State (3 cards per page)
  const [pageIndex, setPageIndex] = useState(0);
  const CARDS_PER_PAGE = 3;

  // Guestbook Blessings (initially empty; only displays real user submissions)
  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    try {
      const saved = localStorage.getItem('neha_irfan_wedding_blessings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const fullVenueAddress = 'Royal Sapphire Banquet, Near Munawar Chowrangi, Block 1 Gulistan-e-Johar, Karachi, Pakistan';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullVenueAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleDuaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !duaMessage.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Celebratory golden confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#5B1020', '#C5A059', '#FAF5EB'],
      });

      const newBlessing: Blessing = {
        id: String(Date.now()),
        name: fullName.trim(),
        relation: 'Family & Friends',
        message: duaMessage.trim(),
        date: 'Just now',
      };

      const updated = [newBlessing, ...blessings];
      setBlessings(updated);
      setPageIndex(0); // Show newest submission first

      try {
        localStorage.setItem('neha_irfan_wedding_blessings', JSON.stringify(updated));
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  // Pagination calculation
  const totalPages = Math.ceil(blessings.length / CARDS_PER_PAGE);
  const displayedBlessings = blessings.slice(
    pageIndex * CARDS_PER_PAGE,
    pageIndex * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const handlePrevPage = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section id="venue-rsvp" className="relative py-16 sm:py-24 px-4 bg-[#F7F3EB] overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-40" />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-xs sm:text-sm font-serif-luxury tracking-[0.25em] text-[#8C6D23] uppercase">
            Destination &amp; Blessings
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#5B1020] font-normal mt-1 mb-2">
            Venue &amp; Warm Du&apos;as
          </h2>
          <GoldDivider subtitle="Karachi, Pakistan" />
        </div>

        {/* 1. Venue Details Card */}
        <div className="card-luxury rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-lg">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-serif-luxury uppercase tracking-wider text-[#997A35]">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Grand Banquet Location</span>
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#5B1020] font-medium">
                  Royal Sapphire
                </h3>
                <p
                  style={{ fontFamily: 'system-ui' }}
                  className="text-sm text-[#430D14]/80 font-normal"
                >
                  Near Munawar Chowrangi, Block 1 Gulistan-e-Johar, Karachi.
                </p>
              </div>

              {/* Action Buttons for Venue */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <a
                  href="https://maps.google.com/?q=Royal+Sapphire+Near+Munawar+Chowrangi+Block+1+Gulistan-e-Johar+Karachi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#5B1020] hover:bg-[#430D14] text-[#FFF9E6] text-xs font-serif-luxury tracking-wider uppercase transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#F3E5AB]" />
                  <span>Open in Maps</span>
                </a>

                <button
                  onClick={handleCopyAddress}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF5EB] hover:bg-[#F2E8D5] text-[#5B1020] border border-[#C5A059] text-xs font-serif-luxury tracking-wider uppercase transition-colors shadow-sm"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Share Your Du'as Section */}
        <div className="card-luxury rounded-2xl p-6 sm:p-10 border border-[#D4AF37]/40 shadow-lg relative">
          <div className="text-center max-w-lg mx-auto mb-8">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#5B1020]">
              Share Your Du&apos;as
            </h3>
            <p className="text-xs sm:text-sm text-[#665230] font-serif-luxury tracking-wide mt-1">
              Send your warm prayers and blessings to Neha &amp; Irfan as they embark on this blessed journey together.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 px-4 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#FAF3E0] border-2 border-[#C5A059] text-[#5B1020] mx-auto flex items-center justify-center">
                <Heart className="w-8 h-8 fill-[#5B1020]" />
              </div>
              <h4 className="font-serif-luxury text-2xl text-[#5B1020]">
                JazakAllah Khair! Your Du&apos;a Has Been Shared
              </h4>
              <p className="text-xs sm:text-sm text-[#5C4A3A] leading-relaxed">
                Thank you for showering Neha &amp; Irfan with your heartfelt prayers. Your warm words will be cherished forever!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setDuaMessage('');
                }}
                className="inline-block mt-4 text-xs font-serif-luxury uppercase tracking-widest text-[#8C6D23] hover:text-[#5B1020] underline underline-offset-4"
              >
                Send another du&apos;a
              </button>
            </div>
          ) : (
            <form onSubmit={handleDuaSubmit} className="space-y-5 max-w-xl mx-auto">
              {/* Full Name & Phone inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-serif-luxury uppercase tracking-wider text-[#8C6D23] font-medium">
                    Your Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="e.g. Asad &amp; Hina Malik"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#D4AF37]/35 text-xs sm:text-sm text-[#430D14] placeholder:text-[#997A35]/40 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-serif-luxury uppercase tracking-wider text-[#8C6D23] font-medium">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#D4AF37]/35 text-xs sm:text-sm text-[#430D14] placeholder:text-[#997A35]/40 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              {/* Warm Du'a textarea */}
              <div className="space-y-1.5">
                <label htmlFor="duaMessage" className="block text-xs font-serif-luxury uppercase tracking-wider text-[#8C6D23] font-medium">
                  Warm Du&apos;a &amp; Blessing for Neha &amp; Irfan *
                </label>
                <textarea
                  id="duaMessage"
                  rows={4}
                  required
                  placeholder="Share a heartfelt prayer or sweet congratulatory wish for the couple..."
                  value={duaMessage}
                  onChange={(e) => setDuaMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#D4AF37]/35 text-xs sm:text-sm text-[#430D14] placeholder:text-[#997A35]/40 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#5B1020] to-[#78172C] text-[#FFF9E6] hover:from-[#430D14] hover:to-[#5B1020] text-xs sm:text-sm font-serif-luxury tracking-widest uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 mx-auto border border-[#C5A059]/40"
                >
                  <Send className="w-3.5 h-3.5 text-[#F3E5AB]" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit your dua or blessing'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 3. Wall of Du'as & Blessings with 3-Card Slider */}
        <div>
          <div className="text-center mb-6">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#5B1020]">
              Wall of Du&apos;as &amp; Warm Wishes
            </h3>
            <p className="text-xs text-[#8C6D23] uppercase tracking-widest mt-1">
              Prayers from Loved Ones Across the World
            </p>
          </div>

          {blessings.length === 0 ? (
            <div className="bg-[#FFFDF9] rounded-2xl p-8 border border-[#D4AF37]/30 text-center max-w-md mx-auto shadow-sm">
              <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-2 animate-pulse" />
              <p className="font-serif-luxury text-base text-[#5B1020]">
                Be the first to share a warm du&apos;a and blessing!
              </p>
              <p className="text-xs text-[#665230] mt-1">
                Your heartfelt message will appear here for Neha &amp; Irfan.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Grid of up to 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {displayedBlessings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#FFFDF9] rounded-xl p-5 border border-[#D4AF37]/30 shadow-sm flex flex-col justify-between hover:border-[#D4AF37]/60 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif-luxury font-semibold text-sm text-[#5B1020]">
                          {b.name}
                        </span>
                        <span className="text-[10px] text-[#997A35] font-serif-luxury tracking-wider">
                          {b.relation}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5C4A3A] italic leading-relaxed">
                        &ldquo;{b.message}&rdquo;
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between text-[10px] text-[#8C6D23]">
                      <span>{b.date}</span>
                      <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]/20" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls (when there are more than 3 cards) */}
              {blessings.length > CARDS_PER_PAGE && (
                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={handlePrevPage}
                    className="p-2 rounded-full bg-[#FAF5EB] hover:bg-[#F2E8D5] text-[#5B1020] border border-[#C5A059]/50 transition-colors shadow-sm focus:outline-none"
                    aria-label="Previous blessings"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#8C6D23]" />
                  </button>

                  <div className="flex items-center gap-1.5 text-xs font-serif-luxury text-[#8C6D23]">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPageIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          pageIndex === idx
                            ? 'bg-[#5B1020] w-6'
                            : 'bg-[#D4AF37]/40 hover:bg-[#D4AF37]'
                        }`}
                        aria-label={`Go to page ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    className="p-2 rounded-full bg-[#FAF5EB] hover:bg-[#F2E8D5] text-[#5B1020] border border-[#C5A059]/50 transition-colors shadow-sm focus:outline-none"
                    aria-label="Next blessings"
                  >
                    <ChevronRight className="w-4 h-4 text-[#8C6D23]" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Traditional Closing Hospitality Footer Note */}
        <div className="text-center pt-8 border-t border-[#D4AF37]/30 max-w-lg mx-auto space-y-3">
          <p className="font-arabic text-xl sm:text-2xl text-[#5B1020]">
            جَزَاكُمُ اللَّهُ خَيْرًا
          </p>
          <p className="font-serif-luxury text-xs sm:text-sm text-[#665230] leading-relaxed">
            We all eagerly look forward to celebrating this special occasion with you. Your presence will make our joy even greater!
          </p>
          <p className="text-[11px] font-serif-luxury uppercase tracking-[0.25em] text-[#8C6D23]">
            Baraat of Neha &amp; Irfan • Karachi 2026
          </p>
        </div>
      </div>
    </section>
  );
};
