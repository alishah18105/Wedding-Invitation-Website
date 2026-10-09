import React from 'react';

/**
 * Classical Mughal Floral & Arch Ornaments in antique gold
 */

export const GoldDivider: React.FC<{ className?: string; subtitle?: string }> = ({
  className = '',
  subtitle,
}) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A059]" />
    <svg
      className="w-5 h-5 text-[#C5A059] flex-shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
      <circle cx="12" cy="12" r="1.5" className="fill-[#FBF5B7]" />
    </svg>
    {subtitle && (
      <span className="font-serif-luxury uppercase tracking-[0.25em] text-xs text-[#997A35] px-2 font-medium">
        {subtitle}
      </span>
    )}
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A059]" />
  </div>
);

export const MughalArchDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center my-6 ${className}`}>
    <svg
      viewBox="0 0 400 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm h-8 text-[#C5A059]"
    >
      <path
        d="M10 16 H150 C165 16, 175 6, 185 6 C193 6, 196 2, 200 2 C204 2, 207 6, 215 6 C225 6, 235 16, 250 16 H390"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="200" cy="2" r="2.5" fill="#DAA520" />
      <circle cx="185" cy="6" r="1.5" fill="#DAA520" />
      <circle cx="215" cy="6" r="1.5" fill="#DAA520" />
      <path
        d="M190 14 C195 18, 205 18, 210 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="200" cy="18" r="1" fill="#DAA520" />
    </svg>
  </div>
);

export const HangingLantern: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}> = ({ className = '', size = 'md', glow = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-16',
    md: 'w-8 h-24',
    lg: 'w-12 h-36',
  };

  return (
    <div className={`flex flex-col items-center ${glow ? 'lantern-glow' : ''} ${className}`}>
      {/* Chain */}
      <div className="w-[1px] h-10 bg-gradient-to-b from-[#C5A059]/40 via-[#DAA520] to-[#997A35]" />
      {/* Hanging ring */}
      <div className="w-2.5 h-2.5 border border-[#DAA520] rounded-full -mb-1 bg-[#2C241D]/10" />
      {/* Lantern Body */}
      <svg
        viewBox="0 0 60 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} drop-shadow-md`}
      >
        {/* Top Dome */}
        <path
          d="M30 5 C34 5 44 18 42 26 H18 C16 18 26 5 30 5 Z"
          fill="url(#goldGrad)"
          stroke="#997A35"
          strokeWidth="1.2"
        />
        {/* Lantern Cage Frame */}
        <path
          d="M18 26 L12 55 L20 85 L30 92 L40 85 L48 55 L42 26 Z"
          fill="#FFF9E6"
          fillOpacity="0.45"
          stroke="#997A35"
          strokeWidth="1.5"
        />
        {/* Inner Candle Glow */}
        <ellipse cx="30" cy="55" rx="10" ry="16" fill="url(#warmGlow)" />
        <path
          d="M30 42 C29 47 27 50 30 56 C33 50 31 47 30 42 Z"
          fill="#FFF5CC"
        />

        {/* Intricate Filigree Grid */}
        <line x1="30" y1="26" x2="30" y2="92" stroke="#B38728" strokeWidth="1" />
        <line x1="12" y1="55" x2="48" y2="55" stroke="#B38728" strokeWidth="1" />
        <line x1="18" y1="26" x2="30" y2="55" stroke="#B38728" strokeWidth="0.8" opacity="0.6" />
        <line x1="42" y1="26" x2="30" y2="55" stroke="#B38728" strokeWidth="0.8" opacity="0.6" />
        <line x1="12" y1="55" x2="30" y2="92" stroke="#B38728" strokeWidth="0.8" opacity="0.6" />
        <line x1="48" y1="55" x2="30" y2="92" stroke="#B38728" strokeWidth="0.8" opacity="0.6" />

        {/* Bottom Pendant Finial */}
        <path
          d="M26 92 H34 L31 106 C30.5 109 29.5 109 29 106 L26 92 Z"
          fill="url(#goldGrad)"
          stroke="#997A35"
          strokeWidth="1"
        />
        <circle cx="30" cy="112" r="2.5" fill="#DAA520" />

        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBF5B7" />
            <stop offset="50%" stopColor="#DAA520" />
            <stop offset="100%" stopColor="#8A6715" />
          </linearGradient>
          <radialGradient id="warmGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFDE6A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFA040" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFA040" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export const CornerFloralFiligree: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const rotationMap = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  };

  return (
    <div
      className={`pointer-events-none select-none text-[#C5A059] ${rotationMap[position]} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 sm:w-28 sm:h-28 opacity-75"
      >
        <path
          d="M4 4 H60 C40 4 30 20 30 40 V96"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 8 H52 C35 8 26 22 26 38 V92"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <circle cx="12" cy="12" r="3" fill="#B38728" />
        <path
          d="M26 26 Q35 15 48 20 Q40 32 26 26 Z"
          fill="#997A35"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M26 26 Q15 35 20 48 Q32 40 26 26 Z"
          fill="#997A35"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
};
