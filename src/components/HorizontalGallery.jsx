import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXHIBITION_PHOTOS = [
  {
    id: 'ex-1',
    src: '/images/editorial/editorial-1.jpg',
    title: 'THE COUTURE SHADOW',
    caption: 'Milan Fashion Week • 35mm Analog',
    optics: '1/250s • f/1.8 • ISO 200',
    width: 'w-[280px] sm:w-[360px] md:w-[420px]',
    aspect: 'aspect-[3/4]',
    rotation: '-rotate-1',
    yOffset: 'translate-y-4',
  },
  {
    id: 'ex-2',
    src: '/images/travel/travel-2.jpg',
    title: 'AMALFI STILLNESS',
    caption: 'Tyrrhenian Sea at Dawn',
    optics: '1/1000s • f/5.6 • ISO 100',
    width: 'w-[320px] sm:w-[460px] md:w-[560px]',
    aspect: 'aspect-[16/10]',
    rotation: 'rotate-1',
    yOffset: '-translate-y-6',
  },
  {
    id: 'ex-3',
    src: '/images/editorial/editorial-2.jpg',
    title: 'SILHOUETTE IN OCHRE',
    caption: 'Studio Exploration Vol. IV',
    optics: '1/160s • f/2.0 • ISO 400',
    width: 'w-[260px] sm:w-[340px] md:w-[380px]',
    aspect: 'aspect-[4/5]',
    rotation: 'rotate-2',
    yOffset: 'translate-y-8',
  },
  {
    id: 'ex-4',
    src: '/images/editorial/editorial-3.jpg',
    title: 'THE OBSERVATION',
    caption: 'Natural Light Study • Paris',
    optics: '1/320s • f/1.4 • ISO 160',
    width: 'w-[280px] sm:w-[380px] md:w-[440px]',
    aspect: 'aspect-[1/1]',
    rotation: '-rotate-2',
    yOffset: '-translate-y-4',
  },
  {
    id: 'ex-5',
    src: '/images/fashion/fashion-2.jpg',
    title: 'AVANT-GARDE DRAPE',
    caption: 'Tokyo Textile Biennale',
    optics: '1/500s • f/2.8 • ISO 320',
    width: 'w-[280px] sm:w-[360px] md:w-[420px]',
    aspect: 'aspect-[3/4]',
    rotation: 'rotate-1',
    yOffset: 'translate-y-6',
  },
  {
    id: 'ex-6',
    src: '/images/editorial/editorial-4.jpg',
    title: 'SOLITARY MONOLOGUE',
    caption: 'Monochrome Silver Gelatin',
    optics: '1/200s • f/2.0 • ISO 800',
    width: 'w-[320px] sm:w-[440px] md:w-[520px]',
    aspect: 'aspect-[16/9]',
    rotation: '-rotate-1',
    yOffset: '-translate-y-6',
  },
  {
    id: 'ex-7',
    src: '/images/editorial/editorial-5.jpg',
    title: 'THE TIMELESS GAZE',
    caption: 'Editorial Finale • Haute Joaillerie',
    optics: '1/400s • f/1.4 • ISO 100',
    width: 'w-[280px] sm:w-[360px] md:w-[400px]',
    aspect: 'aspect-[4/5]',
    rotation: 'rotate-2',
    yOffset: 'translate-y-4',
  }
];

export default function HorizontalGallery({ onOpenLightbox }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Precise translation so the last card stays in view without black emptiness
      const getScrollAmount = () => {
        const totalW = track.scrollWidth;
        const viewW = window.innerWidth;
        return -(totalW - viewW + 48);
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Refresh measurements when images load
      const handleImageLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleImageLoad);
      return () => window.removeEventListener('load', handleImageLoad);

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="exhibition"
      ref={containerRef} 
      className="relative w-full bg-[#0a0809] overflow-hidden"
      style={{ height: '280vh' }}
    >
      {/* Background Soft Gallery Illumination */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 30% 50%, rgba(226, 168, 157, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 75% 40%, rgba(255, 255, 255, 0.04) 0%, transparent 50%),
            #0a0809
          `
        }}
      />

      {/* Pinned Viewport Container */}
      <div className="w-screen h-screen relative overflow-hidden flex flex-col justify-between py-10 px-6 md:px-14 select-none z-10">
        
        {/* Gallery Header */}
        <div className="flex items-center justify-between z-20">
          <div>
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-[#e2a89d]">
              EXHIBITION TRACK • 03
            </span>
            <h2 className="font-italiana text-3xl sm:text-5xl tracking-[0.14em] uppercase text-[#fbf7f6] mt-1">
              Curated Chronicles
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-neutral-300 uppercase bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span>SCROLL TO PROGRESS HORIZONTALLY</span>
            <span className="text-[#e2a89d]">→</span>
          </div>
        </div>

        {/* Horizontal Scrolling Track */}
        <div 
          ref={trackRef}
          className="flex items-center gap-10 md:gap-16 my-auto will-change-transform pl-4 pr-16"
          style={{ width: 'max-content' }}
        >
          {EXHIBITION_PHOTOS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox && onOpenLightbox(item.src, item.title, item.caption)}
              data-cursor="view"
              data-cursor-text="EXPAND"
              className={`group relative flex-shrink-0 cursor-pointer transition-transform duration-500 hover:scale-[1.03] ${item.width} ${item.rotation} ${item.yOffset}`}
            >
              {/* Museum Style Mat / Photo Frame */}
              <div className="relative overflow-hidden bg-[#111215] p-2.5 sm:p-3.5 rounded-sm border border-white/15 shadow-[0_15px_50px_rgba(0,0,0,0.85)] group-hover:border-[#e2a89d]/60 transition-colors duration-500">
                
                <div className={`w-full overflow-hidden ${item.aspect} bg-black`}>
                  <img 
                    src={item.src} 
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-95 contrast-110 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Corner Expand Indicator */}
                <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-3.5 h-3.5 text-[#e2a89d]" />
                </div>

                {/* Minimal Editorial Caption Bar */}
                <div className="mt-3 flex items-baseline justify-between px-1">
                  <div>
                    <h3 className="font-serif text-sm md:text-base tracking-[0.1em] text-[#fbf7f6] uppercase group-hover:text-[#e2a89d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-cormorant italic text-xs text-neutral-300">
                      {item.caption}
                    </p>
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-[#e2a89d] uppercase font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Technical Optics Details Reveal on Hover */}
                <div className="mt-1 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                  <span>{item.optics}</span>
                  <span className="text-[#e2a89d]">SILVER PRINT</span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Progress */}
        <div className="flex items-center justify-between z-20 text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">
          <span>01 / 07 CURATED ARCHIVES</span>
          <span className="hidden sm:inline">PHYSICAL EXHIBITION SIMULATION</span>
          <span className="text-[#e2a89d]">LUMIÈRE FRAME STUDIO</span>
        </div>

      </div>
    </section>
  );
}
