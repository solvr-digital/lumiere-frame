import React from 'react';

const PUBLICATIONS = [
  'VOGUE',
  'ELLE',
  'ARCHITECTURAL DIGEST',
  'FASHION WEEK',
  'CREATIVE AWARDS',
  'HARPER’S BAZAAR',
  'GQ EDITORIAL',
];

export default function AwardsMarquee() {
  return (
    <section className="relative w-full py-16 bg-[#09090c] border-t border-b border-white/5 overflow-hidden select-none">
      
      {/* Small Header */}
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#e2a89d]">
          ACCOLADES & EDITORIAL FEATURES
        </span>
      </div>

      {/* Infinite Scrolling Marquee Track */}
      <div className="relative flex overflow-x-hidden">
        
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-16 md:gap-24 animate-marquee whitespace-nowrap will-change-transform">
          {PUBLICATIONS.map((pub, idx) => (
            <div key={`pub-1-${idx}`} className="flex items-center gap-16 md:gap-24">
              <span className="font-italiana text-2xl sm:text-4xl md:text-5xl tracking-[0.2em] uppercase text-neutral-400 hover:text-[#e2a89d] transition-colors cursor-default">
                {pub}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e2a89d]/40" />
            </div>
          ))}
        </div>

        {/* Duplicate Track 2 for seamless loop */}
        <div className="flex shrink-0 items-center gap-16 md:gap-24 animate-marquee whitespace-nowrap will-change-transform" aria-hidden="true">
          {PUBLICATIONS.map((pub, idx) => (
            <div key={`pub-2-${idx}`} className="flex items-center gap-16 md:gap-24">
              <span className="font-italiana text-2xl sm:text-4xl md:text-5xl tracking-[0.2em] uppercase text-neutral-400 hover:text-[#e2a89d] transition-colors cursor-default">
                {pub}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e2a89d]/40" />
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
