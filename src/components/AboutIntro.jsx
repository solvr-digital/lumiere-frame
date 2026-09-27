import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutIntro() {
  const containerRef = useRef(null);
  const pinSectionRef = useRef(null);
  const portraitRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        }
      });

      // 1. Portrait scales gently and shifts with parallax depth
      tl.to(portraitRef.current, {
        scale: 1.1,
        yPercent: -12,
        ease: 'none',
      }, 0);

      // 2. Typography shifts horizontally with editorial staggering
      tl.to(line1Ref.current, {
        x: -40,
        ease: 'none',
      }, 0);

      tl.to(line2Ref.current, {
        x: 50,
        ease: 'none',
      }, 0);

      tl.to(line3Ref.current, {
        x: -40,
        ease: 'none',
      }, 0);

      tl.to(line4Ref.current, {
        x: 60,
        color: '#f5ebd2',
        ease: 'none',
      }, 0);

      // 3. Subtext smoothly rises into view
      tl.fromTo(subtextRef.current, {
        opacity: 0.4,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        ease: 'power1.out',
      }, 0.2);

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={containerRef} 
      className="relative w-full h-screen bg-[#0a0809] text-[#fbf7f6] overflow-hidden flex items-center justify-center select-none"
    >
      <div 
        ref={pinSectionRef} 
        className="w-full h-full relative overflow-hidden flex items-center justify-center select-none"
      >
        {/* Ambient Luxury Background with Champagne Glow (Prevents raw black screen) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, rgba(226, 168, 157, 0.12) 0%, rgba(20, 20, 26, 0.6) 45%, #0a0809 85%),
              radial-gradient(circle at 80% 20%, rgba(226, 168, 157, 0.05) 0%, transparent 40%)
            `
          }}
        />

        {/* Prominent Editorial Portrait (Always visible from frame 1) */}
        <div 
          ref={portraitRef}
          data-cursor="view"
          data-cursor-text="PORTRAIT"
          className="absolute z-10 w-[min(42vw,480px)] h-[min(68vh,660px)] rounded-sm overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.85)] border border-white/10 will-change-transform pointer-events-auto"
        >
          <img 
            src="/images/portraits/portrait-1.jpg" 
            alt="Lumière Frame Portrait Editorial"
            className="w-full h-full object-cover grayscale contrast-120 hover:grayscale-0 transition-all duration-700"
            loading="eager"
          />
          {/* Subtle warm vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Foreground Massive Typography (Always visible and legible) */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pointer-events-none">
          
          <span className="font-mono text-xs tracking-[0.4em] uppercase text-theme-accent mb-4 drop-shadow">
            PHILOSOPHY • 01
          </span>

          <h2 className="flex flex-col font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.14em] uppercase leading-[1.05] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            <span ref={line1Ref} className="will-change-transform text-[#fbf7f6] font-bold">
              WE DON'T JUST
            </span>
            <span ref={line2Ref} className="will-change-transform font-bold text-white">
              TAKE PHOTOGRAPHS.
            </span>
            <span ref={line3Ref} className="will-change-transform text-[#fbf7f6] font-bold">
              WE PRESERVE
            </span>
            <span ref={line4Ref} className="will-change-transform font-cormorant italic font-light lowercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-theme-accent">
              feeling.
            </span>
          </h2>

          <div 
            ref={subtextRef} 
            className="mt-6 max-w-lg mx-auto will-change-transform"
          >
            <p className="font-cormorant italic text-lg sm:text-xl md:text-2xl text-neutral-300 font-light leading-relaxed drop-shadow">
              “Light is our ink, time is our paper. We seek the honest pause between the grand gestures.”
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
