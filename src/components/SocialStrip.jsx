import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

const SOCIAL_PHOTOS = [
  '/images/portraits/portrait-1.jpg',
  '/images/fashion/fashion-1.jpg',
  '/images/travel/travel-1.jpg',
  '/images/weddings/wedding-1.jpg',
  '/images/editorial/editorial-2.jpg',
  '/images/editorial/editorial-3.jpg',
];

export default function SocialStrip({ onOpenLightbox }) {
  return (
    <section className="relative w-full py-20 bg-[#060608] border-t border-white/5 overflow-hidden select-none">
      
      {/* Header & CTA */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#e2a89d] block mb-2">
            VISUAL DISPATCHES • @LUMIEREFRAME
          </span>
          <h3 className="font-italiana text-2xl sm:text-4xl tracking-[0.14em] uppercase text-[#fbf7f6]">
            Follow The Visual Journey
          </h3>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#e2a89d] hover:text-white transition-colors"
        >
          <Instagram className="w-4 h-4" />
          <span>JOIN THE ARCHIVE</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 6-Photo Horizontal Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 px-4 md:px-6">
        {SOCIAL_PHOTOS.map((src, idx) => (
          <div
            key={idx}
            onClick={() => onOpenLightbox && onOpenLightbox(src, `DISPATCH 0${idx + 1}`, 'Instagram Visual Journey')}
            data-cursor="view"
            data-cursor-text="INSTA"
            className="group relative overflow-hidden aspect-square rounded-xs bg-[#111215] border border-white/10 cursor-pointer shadow-lg"
          >
            <img 
              src={src} 
              alt={`Social frame ${idx + 1}`}
              className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-115 group-hover:brightness-110 transition-all duration-700 ease-out"
              loading="lazy"
            />
            {/* Instagram Hover Icon */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-[#e2a89d]">
                <Instagram className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
