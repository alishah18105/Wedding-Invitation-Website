import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ExternalLink, Sparkles, Shirt } from 'lucide-react';
import { GoldDivider } from './Ornaments';

const WEDDING_DATE = new Date('2026-12-27T21:00:00+05:00'); // Sunday, Dec 27, 2026 9:00 PM Pakistan Time

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CeremonySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent('Baraat Ceremony — Neha & Irfan');
    const details = encodeURIComponent(
      'Cordially invited to celebrate the Baraat ceremony of Neha & Irfan at Royal Sapphire, Karachi. Schedule: Arrival of Guests 9:00 PM, Nikkah 9:30 PM, Royal Dinner 10:30 PM, Rukhsati & Du’as 11:30 PM. Attire: Traditional Pakistani Formal.'
    );
    const location = encodeURIComponent('Royal Sapphire, Karachi, Pakistan');
    // 2026-12-27T21:00:00+05:00 = 16:00:00 UTC
    const dates = '20261227T160000Z/20261227T200000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  const itineraryItems = [
    {
      time: '09:00 PM',
      title: 'Arrival of Guests & Welcoming',
      desc: 'Warm reception of distinguished guests and family with fragrant rosewater, attar, and royal hospitality.',
      tag: 'Arrival',
    },
    {
      time: '09:30 PM',
      title: 'Solemnization of Nikkah',
      desc: 'The sacred Nikkah ceremony and exchange of solemn vows under the divine blessings of Allah Almighty.',
      tag: 'Nikkah',
    },
    {
      time: '10:30 PM',
      title: 'Royal Dinner & Feast',
      desc: 'Exquisite multi-course Pakistani Mughlai banquet, Dum Biryani, succulent kebabs, and traditional celebratory delicacies.',
      tag: 'Dinner',
    },
    {
      time: '11:30 PM',
      title: 'Rukhsati & Du’as',
      desc: 'Quranic blessings and heartfelt prayers of elders as the bride embarks on her new journey with grace and love.',
      tag: 'Rukhsati',
    },
  ];

  return (
    <section id="ceremony" className="relative py-16 sm:py-24 px-4 bg-[#FBF8F2] overflow-hidden">
      {/* Background soft ornamentation */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-40" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm font-serif-luxury tracking-[0.25em] text-[#8C6D23] uppercase">
            Auspicious Celebration
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#5B1020] font-normal mt-1 mb-2">
            The Baraat Ceremony
          </h2>
          <GoldDivider subtitle="Schedule & Countdown" />
          <p className="text-xs sm:text-sm text-[#5C4A3A] max-w-md mx-auto leading-relaxed">
            Join us for an evening filled with joy, laughter, festive celebration, heartfelt laughter and memories to cherish forever.
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="card-luxury rounded-2xl p-6 sm:p-8 mb-12 border border-[#D4AF37]/40 shadow-lg text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#F3E5AB]/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#F3E5AB]/30 rounded-full blur-2xl pointer-events-none" />

          <p className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C6D23] mb-4">
            {timeLeft.isPast ? 'Ceremony Has Commenced' : 'Counting Down To The Joyous Occasion'}
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#F7F1E5] border border-[#D4AF37]/35 shadow-sm"
              >
                <span className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-semibold text-[#5B1020] tabular-nums leading-none">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-serif-luxury uppercase tracking-wider text-[#8C6D23] mt-1.5 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Add to Calendar Action Row */}
          <div className="mt-6 pt-5 border-t border-[#D4AF37]/25 flex items-center justify-center">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF5EB] hover:bg-[#F2E8D5] text-[#5B1020] border border-[#C5A059] text-xs sm:text-sm font-serif-luxury tracking-wider transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Add to Google Calendar</span>
              <ExternalLink className="w-3 h-3 text-[#8C6D23]" />
            </a>
          </div>
        </div>

        {/* Ceremony Itinerary Timeline */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#5B1020]">
              Evening Schedule
            </h3>
            <p className="text-xs text-[#8C6D23] uppercase tracking-widest mt-1">
              Sunday, December 27th, 2026
            </p>
          </div>

          <div className="relative border-l-2 border-[#D4AF37]/40 ml-4 sm:ml-32 pl-6 sm:pl-8 space-y-8">
            {itineraryItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#FAF5EB] border-2 border-[#C5A059] group-hover:scale-125 group-hover:bg-[#5B1020] transition-all flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] group-hover:bg-[#FAF5EB]" />
                </div>

                {/* Desktop time callout */}
                <div className="hidden sm:block absolute -left-36 top-1 text-right w-24">
                  <span
                    style={{ fontFamily: 'system-ui', fontSize: '12px' }}
                    className="font-semibold text-[#5B1020]"
                  >
                    {item.time}
                  </span>
                </div>

                {/* Content Box */}
                <div className="bg-[#FFFDF9] rounded-xl p-4 sm:p-5 border border-[#D4AF37]/25 shadow-sm hover:border-[#D4AF37]/60 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span
                      style={{ fontFamily: 'system-ui', fontSize: '12px' }}
                      className="sm:hidden font-semibold text-[#8C6D23] flex items-center gap-1"
                    >
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                    <h4 className="font-serif-luxury text-lg sm:text-xl text-[#430D14] font-medium">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-serif-luxury uppercase tracking-widest text-[#997A35] bg-[#FAF3E0] px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C4A3A] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Royal Attire & Dress Code Guide */}
        <div className="card-luxury rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/35 shadow-md flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-[#FAF3E0] border border-[#D4AF37] flex items-center justify-center flex-shrink-0 text-[#8C6D23]">
            <Shirt className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <h4 className="font-serif-luxury text-xl text-[#5B1020] font-medium">
                Dress Code: Traditional Pakistani Formal
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#5C4A3A] leading-relaxed">
              We encourage our esteemed guests to grace the occasion with us in beautiful traditional Pakistani attire. Gentlemen may wear shalwar kameez, sherwanis, prince suits or waist coats, while ladies are welcome to wear elegant ghararas, shararas, lehengas. Your presence and beautiful attire will make our special occasion even more memorable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
