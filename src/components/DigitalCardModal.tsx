import React, { useState, useEffect } from 'react';
import { X, Share2, Printer, Check, Sparkles, Download } from 'lucide-react';
import fallbackCardImg from '../assets/images/official_wedding_card_1791561155668.jpg';

interface DigitalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalCardModal: React.FC<DigitalCardModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [cardSrc, setCardSrc] = useState<string>('/card.png');

  useEffect(() => {
    // Check if custom user uploaded card exists in localStorage
    try {
      const stored = localStorage.getItem('user_custom_wedding_card');
      if (stored) {
        setCardSrc(stored);
      } else {
        // Test if /card.png loads; fallback to bundled asset
        const testImg = new Image();
        testImg.src = '/card.png';
        testImg.onload = () => setCardSrc('/card.png');
        testImg.onerror = () => setCardSrc(fallbackCardImg);
      }
    } catch {
      setCardSrc(fallbackCardImg);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Neha & Irfan — Baraat Ceremony Invitation',
          text: 'Cordially inviting you to the royal Baraat ceremony of Neha & Irfan at Royal Sapphire, Karachi.',
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = cardSrc;
    link.download = 'Neha_and_Irfan_Baraat_Wedding_Card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#2C241D]/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Royal Card Modal Container */}
      <div className="relative z-10 w-full max-w-lg bg-[#FAF6EE] rounded-2xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden max-h-[95vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#5B1020] text-[#FFF9E6] border-b border-[#D4AF37]/50">
          <div className="flex items-center gap-2 text-xs font-serif-luxury tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB]" />
            <span>Official Wedding Card</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#FFF9E6] hover:bg-white/10 transition-colors ml-1"
              aria-label="Close invitation card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Invitation Card Body */}
        <div className="p-3 sm:p-6 overflow-y-auto flex items-center justify-center bg-[#F4EFE6]/70">
          <div className="printable-card relative max-w-md w-full rounded-xl overflow-hidden shadow-xl border border-[#D4AF37]/50 bg-[#FDFBF7]">
            <img
              src={cardSrc}
              alt="Official Baraat Wedding Invitation Card of Neha & Irfan"
              className="w-full h-auto object-contain block mx-auto select-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3 bg-[#EFE8DA] border-t border-[#D4AF37]/35 text-xs">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#5B1020] hover:bg-[#430D14] text-[#FFF9E6] font-serif-luxury tracking-wider uppercase transition-colors shadow-xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadImage}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-[#FAF5EB] hover:bg-[#FFFDF9] text-[#5B1020] border border-[#C5A059] font-serif-luxury tracking-wider uppercase transition-colors shadow-xs"
              title="Download High-Res Card Image"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Save &amp; Download</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#FAF5EB] hover:bg-[#FFFDF9] text-[#5B1020] border border-[#C5A059] font-serif-luxury tracking-wider uppercase transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
