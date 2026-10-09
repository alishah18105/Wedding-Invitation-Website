import React from 'react';
import { Heart, Github, Linkedin, Globe, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/alishah18105',
      icon: Github,
      external: true,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/syed-ali-sultan',
      icon: Linkedin,
      external: true,
    },
    {
      name: 'Portfolio',
      href: 'https://personal-portfolio-l1e7.vercel.app/',
      icon: Globe,
      external: true,
    },
    {
      name: 'Email',
      href: 'mailto:alishah18105@gmail.com',
      icon: Mail,
      external: false,
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#F7F3EB] to-[#EFE8DA] border-t border-[#D4AF37]/30 pt-12 pb-10 px-4 overflow-hidden text-center">
      {/* Soft warm ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#F3E5AB]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        {/* 1. Small Elegant Soft Gold Heart Icon */}
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/40 shadow-xs mb-3 text-[#C5A059]">
          <Heart className="w-4 h-4 text-[#C5A059] fill-[#C5A059]/20 stroke-[1.75]" />
        </div>

        {/* 2. Made with love & care */}
        <p className="font-serif-luxury text-base sm:text-lg text-[#5B1020] italic tracking-wide">
          Made with love &amp; care
        </p>

        {/* 3. Wedding invitation website */}
        <p className="text-[11px] sm:text-xs font-serif-luxury uppercase tracking-[0.25em] text-[#8C6D23] mt-1 mb-4 font-medium">
          Wedding invitation website
        </p>

        {/* 4. Delicate Horizontal Divider */}
        <div className="flex items-center justify-center gap-2 w-48 my-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A059] bg-[#FAF5EB]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
        </div>

        {/* 5. Attribution text */}
        <p className="text-[11px] sm:text-xs font-serif-luxury uppercase tracking-[0.2em] text-[#665230] mt-3">
          Designed &amp; Developed by
        </p>

        {/* 6. Prominent Developer Name */}
        <p className="font-serif-luxury text-xl sm:text-2xl font-medium text-[#430D14] tracking-wide mt-1 mb-4">
          Syed Ali Sultan
        </p>

        {/* 7. Four Minimal Clickable Social Icons */}
        <div className="flex items-center justify-center gap-3 my-2">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 rounded-full bg-[#FFFDF9] hover:bg-[#5B1020] border border-[#D4AF37]/40 hover:border-[#5B1020] text-[#665230] hover:text-[#FFF9E6] shadow-2xs flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                aria-label={item.name}
                title={item.name}
              >
                <Icon className="w-4 h-4 stroke-[1.8]" />
              </a>
            );
          })}
        </div>

        {/* 8. Small Muted Copyright Line */}
        <p className="text-[11px] text-[#8C6D23]/80 font-serif-luxury tracking-wider mt-5 pt-4 border-t border-[#D4AF37]/20 w-full">
          &copy; 2026 Syed Ali Sultan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
