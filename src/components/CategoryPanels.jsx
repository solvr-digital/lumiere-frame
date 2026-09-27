import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    id: 'weddings',
    num: '01',
    title: 'WEDDINGS',
    tagline: 'Love, documented honestly.',
    description: 'Intimate ceremonies, stolen glances, and grand celebrations captured without intrusion.',
    image: '/images/weddings/wedding-1.jpg',
    subImage: '/images/weddings/wedding-2.jpg',
    location: 'LAKE COMO • UDAIPUR • PROVENCE',
    aspect: 'PORTRAIT & MOMENTUM',
  },
  {
    id: 'portraits',
    num: '02',
    title: 'PORTRAITS',
    tagline: 'People, beyond the pose.',
    description: 'Chiaroscuro lighting, subtle gestures, and soulful eyes reflecting the unseen depth of character.',
    image: '/images/portraits/portrait-2.jpg',
    subImage: '/images/portraits/portrait-1.jpg',
    location: 'NEW DELHI • NEW YORK • LONDON',
    aspect: 'BLACK & WHITE • MEDIUM FORMAT',
  },
  {
    id: 'fashion',
    num: '03',
    title: 'FASHION',
    tagline: 'Form, movement and couture.',
    description: 'Editorial campaigns blending sculptural architecture, flowing textiles, and theatrical light.',
    image: '/images/fashion/fashion-1.jpg',
    subImage: '/images/fashion/fashion-2.jpg',
    location: 'PARIS HAUTE COUTURE • MILAN',
    aspect: '35MM ANALOG & DIGITAL',
  },
  {
    id: 'travel',
    num: '04',
    title: 'TRAVEL',
    tagline: 'The world in quiet stillness.',
    description: 'Expeditions into remote terrains, misty mountain dawns, and timeless coastal horizons.',
    image: '/images/travel/travel-1.jpg',
    subImage: '/images/travel/travel-2.jpg',
    location: 'AMALFI COAST • KYOTO • ICELAND',
    aspect: 'EXPEDITION CHRONICLES',
  },
];

export default function CategoryPanels({ onOpenLightbox }) {
  const containerRef = useRef(null);
  const pinSectionRef = useRef(null);
  const panelsRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=240%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(CATEGORIES.length - 1, Math.floor(progress * CATEGORIES.length));
            setActiveIdx(idx);
          }
        }
      });

      // Animate transitions between 4 stacked panels
      const panels = panelsRef.current;

      // Panel 1 wipes over Panel 0 (from progress 0.10 to 0.35)
      if (panels[1]) {
        tl.fromTo(panels[1], {
          clipPath: 'inset(0% 0% 0% 100%)',
          xPercent: 10,
        }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          xPercent: 0,
          ease: 'power1.inOut',
          duration: 1,
        }, 0.2);

        if (panels[0]) {
          tl.to(panels[0], {
            scale: 0.96,
            opacity: 0.85,
            ease: 'power1.inOut',
            duration: 1,
          }, 0.2);
        }
      }

      // Panel 2 wipes over Panel 1 (from progress 0.45 to 0.70)
      if (panels[2]) {
        tl.fromTo(panels[2], {
          clipPath: 'inset(0% 0% 0% 100%)',
          xPercent: 10,
        }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          xPercent: 0,
          ease: 'power1.inOut',
          duration: 1,
        }, 1.2);

        if (panels[1]) {
          tl.to(panels[1], {
            scale: 0.96,
            opacity: 0.85,
            ease: 'power1.inOut',
            duration: 1,
          }, 1.2);
        }
      }

      // Panel 3 wipes over Panel 2 (from progress 0.75 to 1.00)
      if (panels[3]) {
        tl.fromTo(panels[3], {
          clipPath: 'inset(0% 0% 0% 100%)',
          xPercent: 10,
        }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          xPercent: 0,
          ease: 'power1.inOut',
          duration: 1,
        }, 2.2);

        if (panels[2]) {
          tl.to(panels[2], {
            scale: 0.96,
            opacity: 0.85,
            ease: 'power1.inOut',
            duration: 1,
          }, 2.2);
        }
      }

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="categories"
      ref={containerRef} 
      className="relative w-full h-screen bg-[#0a0809] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Pinned Fullscreen Stage */}
      <div 
        ref={pinSectionRef} 
        className="w-full h-full relative overflow-hidden flex items-center justify-center"
      >
        
        {/* Floating Category Number & Nav Indicator */}
        <div className="absolute top-10 right-10 z-40 flex items-baseline gap-2 font-mono text-sm tracking-widest text-[#e2a89d] bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <span className="text-2xl font-italiana text-[#fbf7f6]">{CATEGORIES[activeIdx].num}</span>
          <span className="text-neutral-400">/ 04</span>
        </div>

        {/* 4 Layered Category Panels */}
        {CATEGORIES.map((cat, idx) => (
          <div
            key={cat.id}
            ref={(el) => (panelsRef.current[idx] = el)}
            className="absolute inset-0 w-full h-full overflow-hidden flex items-center will-change-[clip-path,transform]"
            style={{ 
              zIndex: idx + 1,
              clipPath: idx === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)'
            }}
          >
            {/* Background Fullscreen Image (Vivid, Bright, No black void) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={cat.image} 
                alt={cat.title}
                className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-105"
                loading="eager"
              />
              {/* Soft bottom vignette for text legibility while keeping image bright */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0809]/90 via-[#0a0809]/30 to-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 max-w-7xl w-full mx-auto px-8 md:px-16 flex flex-col justify-between h-[85vh]">
              
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs tracking-[0.4em] text-[#e2a89d] uppercase">
                  WORLD {cat.num}
                </span>
                <span className="w-12 h-[1px] bg-[#e2a89d]/40" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-300 uppercase hidden sm:inline">
                  {cat.location}
                </span>
              </div>

              {/* Center Hero Information */}
              <div className="max-w-2xl">
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.14em] uppercase text-[#fbf7f6] font-bold drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                  {cat.title}
                </h2>
                
                <p className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-theme-accent font-light mt-3 drop-shadow">
                  “{cat.tagline}”
                </p>

                <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light mt-4 max-w-md leading-relaxed drop-shadow">
                  {cat.description}
                </p>

                {/* View Story Action Button */}
                <button
                  onClick={() => onOpenLightbox && onOpenLightbox(cat.image, cat.title, cat.tagline)}
                  data-cursor="view"
                  data-cursor-text="OPEN"
                  className="group mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 hover:bg-[#e2a89d] border border-white/25 hover:border-[#e2a89d] backdrop-blur-md transition-all duration-300 pointer-events-auto"
                >
                  <span className="font-sans text-xs tracking-[0.25em] uppercase text-white group-hover:text-black font-medium transition-colors">
                    Explore Gallery
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#e2a89d] group-hover:text-black transition-colors" />
                </button>
              </div>

              {/* Bottom Secondary Preview Thumbnail & Metadata */}
              <div className="flex items-end justify-between w-full">
                
                {/* Secondary Preview Floating Card */}
                <div 
                  onClick={() => onOpenLightbox && onOpenLightbox(cat.subImage, cat.title, 'Curated Preview')}
                  data-cursor="view"
                  data-cursor-text="VIEW"
                  className="relative group hidden sm:flex items-center gap-4 bg-black/60 border border-white/20 p-2.5 rounded-sm backdrop-blur-md cursor-pointer hover:border-[#e2a89d]/80 transition-colors pointer-events-auto"
                >
                  <div className="w-16 h-20 overflow-hidden rounded-xs">
                    <img 
                      src={cat.subImage} 
                      alt={`${cat.title} detail`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col pr-3">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-[#e2a89d] uppercase">
                      SECONDARY FRAME
                    </span>
                    <span className="font-serif text-xs text-[#fbf7f6]">
                      Click to expand
                    </span>
                  </div>
                </div>

                {/* Technical Optics Badge */}
                <div className="font-mono text-[10px] tracking-[0.3em] text-neutral-300 uppercase text-right">
                  <span className="text-[#e2a89d] block">{cat.aspect}</span>
                  <span>LIMITED ARCHIVE PRINT</span>
                </div>

              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
