import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialSection({ onOpenLightbox }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textColRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Parallax vertical movement of editorial image
      gsap.fromTo(imageRef.current, {
        yPercent: -15,
        scale: 1.12,
      }, {
        yPercent: 15,
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      });

      // Horizontal slight drift of typography
      gsap.fromTo(textColRef.current, {
        xPercent: -8,
      }, {
        xPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Metadata fade-in
      gsap.fromTo(metaRef.current, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: metaRef.current,
          start: 'top 85%',
        }
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-28 md:py-40 bg-[#0a0809] text-[#fbf7f6] overflow-hidden select-none"
    >
      {/* Background Soft Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 75% 50%, rgba(226, 168, 157, 0.05) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Magazine-Style Asymmetrical Image */}
          <div className="lg:col-span-6 relative">
            <div 
              onClick={() => onOpenLightbox && onOpenLightbox('/images/editorial/editorial-6.jpg', 'THE ART OF OBSERVATION', 'Editorial Study • 35mm Analog')}
              data-cursor="view"
              data-cursor-text="EXPAND"
              className="relative overflow-hidden rounded-xs bg-[#111215] aspect-[4/5] sm:aspect-[3/4] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] cursor-pointer group"
            >
              <img 
                ref={imageRef}
                src="/images/editorial/editorial-6.jpg" 
                alt="Editorial Photography Study"
                className="w-full h-full object-cover filter brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-700 will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Museum Corner Frame Tag */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#e2a89d] uppercase">
                <span>VOL. 26 • CHAPTER IV</span>
                <span>SILVER GELATIN</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Large Editorial Typography */}
          <div ref={textColRef} className="lg:col-span-6 flex flex-col justify-center will-change-transform">
            
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-theme-accent uppercase mb-6">
              <span className="w-8 h-[1px] bg-theme-accent" />
              <span>EDITORIAL FEATURE</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-[0.14em] uppercase leading-[0.98] text-[#fbf7f6] font-bold">
              THE<br />
              <span className="font-cormorant italic font-light text-theme-accent lowercase text-4xl sm:text-6xl md:text-7xl">
                art of
              </span><br />
              OBSERVATION.
            </h2>

            <p className="font-cormorant italic text-xl sm:text-2xl text-neutral-300 font-light mt-8 leading-relaxed max-w-lg">
              “Photography is not the assertion of the photographer’s ego upon the subject; it is the patient surrender to the light that already exists.”
            </p>

            <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light mt-4 max-w-md leading-relaxed">
              We work with natural and controlled light to sculpt geometry, emotion, and architectural stillness into permanent archival memory.
            </p>

            {/* Editorial Metadata Block */}
            <div 
              ref={metaRef} 
              className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 font-mono text-[10px] tracking-widest uppercase text-neutral-400"
            >
              <div>
                <span className="text-[#e2a89d] block mb-1">STUDIO</span>
                <span>LUMIÈRE FRAME</span>
              </div>
              <div>
                <span className="text-[#e2a89d] block mb-1">CHRONICLE</span>
                <span>EDITORIAL 2026</span>
              </div>
              <div>
                <span className="text-[#e2a89d] block mb-1">ORIGIN</span>
                <span>INDIA / GLOBAL</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
