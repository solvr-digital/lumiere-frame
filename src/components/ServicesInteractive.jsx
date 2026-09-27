import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    id: 's-1',
    num: '01',
    title: 'WEDDING',
    scope: 'Destination Nuptials & Ceremonies',
    image: '/images/editorial/services-wedding.jpg',
  },
  {
    id: 's-2',
    num: '02',
    title: 'EDITORIAL',
    scope: 'Magazine Features & High Fashion',
    image: '/images/editorial/services-editorial.jpg',
  },
  {
    id: 's-3',
    num: '03',
    title: 'PORTRAIT',
    scope: 'Private Commissions & Soulful Noir',
    image: '/images/editorial/services-portrait.jpg',
  },
  {
    id: 's-4',
    num: '04',
    title: 'FASHION',
    scope: 'Couture Campaigns & Lookbooks',
    image: '/images/editorial/services-fashion.jpg',
  },
  {
    id: 's-5',
    num: '05',
    title: 'EVENTS',
    scope: 'Gala Evenings & Private Soirées',
    image: '/images/editorial/services-events.jpg',
  },
  {
    id: 's-6',
    num: '06',
    title: 'COMMERCIAL',
    scope: 'Global Brands & Architectural Spaces',
    image: '/images/editorial/services-commercial.jpg',
  }
];

export default function ServicesInteractive({ onOpenLightbox }) {
  const [activeItem, setActiveItem] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full py-28 md:py-36 bg-[#0a0809] text-[#fbf7f6] select-none overflow-hidden"
    >
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 mb-16">
        <span className="font-mono text-xs tracking-[0.4em] uppercase text-[#e2a89d] block mb-2">
          PRACTICE • 05
        </span>
        <h2 className="font-italiana text-4xl sm:text-6xl tracking-[0.14em] uppercase text-[#fbf7f6]">
          Services & Commissions
        </h2>
      </div>

      {/* Floating Image Preview that follows cursor */}
      {activeItem && (
        <div 
          className="hidden lg:block fixed pointer-events-none z-30 w-72 h-96 rounded-sm overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] transition-transform duration-150 ease-out will-change-transform"
          style={{
            top: mousePos.y - 190,
            left: mousePos.x + 40,
          }}
        >
          <img 
            src={activeItem.image} 
            alt={activeItem.title}
            className="w-full h-full object-cover filter brightness-95 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] tracking-widest text-[#e2a89d] uppercase">
            <span>{activeItem.scope}</span>
          </div>
        </div>
      )}

      {/* Interactive Service Accordion/Rows */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 divide-y divide-white/10 border-t border-b border-white/10">
        {SERVICES.map((service) => {
          const isActive = activeItem?.id === service.id;

          return (
            <div
              key={service.id}
              onMouseEnter={() => setActiveItem(service)}
              onMouseLeave={() => setActiveItem(null)}
              onClick={() => onOpenLightbox && onOpenLightbox(service.image, service.title, service.scope)}
              data-cursor="pointer"
              className="group relative py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-colors duration-500 hover:bg-white/[0.02] px-4"
            >
              {/* Left: Number & Title */}
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className={`font-mono text-sm tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-[#e2a89d]' : 'text-neutral-500'
                }`}>
                  {service.num}
                </span>

                <h3 className={`font-italiana text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] uppercase transition-all duration-500 ${
                  isActive ? 'text-[#e2a89d] translate-x-4' : 'text-[#fbf7f6]'
                }`}>
                  {service.title}
                </h3>
              </div>

              {/* Right: Scope & Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-6 pl-12 md:pl-0">
                <span className="font-cormorant italic text-base sm:text-lg text-neutral-400 group-hover:text-white transition-colors">
                  {service.scope}
                </span>

                <div className={`w-10 h-10 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'border-[#e2a89d] bg-[#e2a89d] text-black scale-110' : 'text-neutral-400'
                }`}>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Expanding Underline */}
              <div className={`absolute bottom-0 left-0 h-[1px] bg-[#e2a89d] transition-all duration-500 ${
                isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`} />
            </div>
          );
        })}
      </div>

    </section>
  );
}
