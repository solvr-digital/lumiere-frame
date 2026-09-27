import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SECTIONS = [
  {
    id: 'reveal-1',
    src: '/images/editorial/editorial-7.jpg',
    direction: 'left-to-right',
    title: 'CHRONICLES OF SHADOW',
    caption: 'Architectural silhouette at dusk',
    num: '01 / MASK REVEAL',
    aspect: 'PORTRAIT STUDY • LEICA M11',
  },
  {
    id: 'reveal-2',
    src: '/images/editorial/editorial-8.jpg',
    direction: 'bottom-to-top',
    title: 'THE RADIANT HOUR',
    caption: 'Golden hour reflection over flowing silk',
    num: '02 / VERTICAL WIPE',
    aspect: 'NATURAL LIGHT • 85MM F/1.4',
  },
  {
    id: 'reveal-3',
    src: '/images/editorial/editorial-9.jpg',
    direction: 'center-outward',
    title: 'ETERNAL DIALOGUE',
    caption: 'High-fashion monochrome chiaroscuro',
    num: '03 / APERTURE EXPANSION',
    aspect: 'MEDIUM FORMAT NOIR',
  }
];

export default function FullscreenImageReveals({ onOpenLightbox }) {
  const containerRef = useRef(null);
  const revealsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      revealsRef.current.forEach((item, index) => {
        if (!item) return;

        const img = item.querySelector('.reveal-img');
        const text = item.querySelector('.reveal-text');
        const overlay = item.querySelector('.reveal-mask');

        // Configure graceful curtain wipes starting as soon as section enters view
        let initialClip = 'inset(0% 30% 0% 0%)'; // left-to-right
        if (index === 1) initialClip = 'inset(25% 0% 0% 0%)'; // bottom-to-top
        if (index === 2) initialClip = 'inset(15% 15% 15% 15%)'; // center-outward

        // Mask reveal timeline (starts immediately on entry, never a black blank void)
        gsap.fromTo(overlay, {
          clipPath: initialClip,
          opacity: 0.8,
        }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1,
          }
        });

        // Image zoom-out & blur reduction
        gsap.fromTo(img, {
          scale: 1.12,
          filter: 'blur(6px)',
        }, {
          scale: 1.02,
          filter: 'blur(0px)',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'bottom 25%',
            scrub: 1,
          }
        });

        // Text reveal
        gsap.fromTo(text, {
          opacity: 0,
          y: 30,
        }, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 1,
          }
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0809] text-[#fbf7f6] select-none overflow-hidden">
      {/* Soft Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(226, 168, 157, 0.05) 0%, transparent 70%)'
        }}
      />
      
      {REVEAL_SECTIONS.map((section, idx) => (
        <section
          key={section.id}
          ref={(el) => (revealsRef.current[idx] = el)}
          className="relative min-h-[75vh] flex items-center justify-center py-8 md:py-14 px-6 md:px-14 overflow-hidden border-b border-white/5"
        >
          {/* Main Reveal Frame */}
          <div 
            onClick={() => onOpenLightbox && onOpenLightbox(section.src, section.title, section.caption)}
            data-cursor="view"
            data-cursor-text="INSPECT"
            className="reveal-mask relative w-full max-w-6xl h-[65vh] sm:h-[75vh] rounded-sm overflow-hidden bg-[#111215] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.9)] cursor-pointer will-change-[clip-path]"
          >
            {/* Inner Image */}
            <img 
              src={section.src} 
              alt={section.title}
              className="reveal-img w-full h-full object-cover object-center filter brightness-95 contrast-110 will-change-transform"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Content Overlaid on Image */}
            <div className="reveal-text absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10 pointer-events-none">
              <div>
                <span className="font-mono text-xs tracking-[0.4em] text-[#e2a89d] uppercase block mb-2">
                  {section.num}
                </span>
                <h3 className="font-italiana text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] uppercase text-[#fbf7f6] drop-shadow-xl">
                  {section.title}
                </h3>
                <p className="font-cormorant italic text-lg sm:text-xl text-neutral-300 font-light mt-2">
                  {section.caption}
                </p>
              </div>

              <div className="font-mono text-[10px] tracking-widest text-[#e2a89d] uppercase bg-black/60 px-4 py-2 rounded-full border border-white/15 backdrop-blur-md self-start md:self-end">
                {section.aspect}
              </div>
            </div>
          </div>
        </section>
      ))}

    </div>
  );
}
