import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroCinematic() {
  const containerRef = useRef(null);
  const pinFrameRef = useRef(null);
  const imageFrameRef = useRef(null);
  const heroImgRef = useRef(null);
  const overlayDarkRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const title3Ref = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const metaLeftRef = useRef(null);
  const metaRightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinFrame = pinFrameRef.current;
    if (!container || !pinFrame) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinFrame,
          scrub: 1, // Smooth cinematic scrub
        }
      });

      // 0% -> 100% Scroll Timeline
      // 1. Image Frame expands from centered rectangle to full viewport
      tl.to(imageFrameRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        ease: 'power2.inOut',
      }, 0);

      // 2. Image zooms out from 1.35 to 1.05 with parallax
      tl.to(heroImgRef.current, {
        scale: 1.05,
        ease: 'power1.out',
      }, 0);

      // 3. Dark overlay decreases, revealing photo clarity and brightness
      tl.to(overlayDarkRef.current, {
        opacity: 0.28,
        ease: 'power1.out',
      }, 0);

      // 4. Typography splits apart like opening a luxury magazine
      tl.to(title1Ref.current, {
        xPercent: -30,
        yPercent: -20,
        opacity: 0.15,
        ease: 'power2.out',
      }, 0);

      tl.to(title2Ref.current, {
        scale: 1.25,
        opacity: 0.05,
        ease: 'power2.out',
      }, 0);

      tl.to(title3Ref.current, {
        xPercent: 30,
        yPercent: 20,
        opacity: 0.15,
        ease: 'power2.out',
      }, 0);

      // 5. Initial subtitle and scroll prompt fade out smoothly
      tl.to(subtitleRef.current, {
        opacity: 0,
        y: -30,
        ease: 'power1.out',
      }, 0);

      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
        ease: 'power1.out',
      }, 0);

      // 6. Camera metadata fades in at corners
      tl.fromTo([metaLeftRef.current, metaRightRef.current], {
        opacity: 0,
      }, {
        opacity: 0.75,
        ease: 'power1.in',
      }, 0.3);

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero"
      ref={containerRef} 
      className="relative w-full bg-[#0a0809] text-[#fbf7f6]"
      style={{ height: '240vh' }}
    >
      {/* Pinned Viewport Container */}
      <div 
        ref={pinFrameRef} 
        className="w-screen h-screen relative overflow-hidden flex items-center justify-center select-none"
      >
        
        {/* Expanding Photography Frame */}
        <div 
          ref={imageFrameRef}
          data-cursor="view"
          data-cursor-text="EXPAND"
          className="relative overflow-hidden will-change-[width,height,border-radius] shadow-2xl z-10 flex items-center justify-center"
          style={{
            width: 'min(44vw, 540px)',
            height: 'min(62vh, 680px)',
            borderRadius: '4px',
          }}
        >
          {/* Main Hero Photograph */}
          <img 
            ref={heroImgRef}
            src="/images/hero/hero-main.jpg" 
            alt="Haute Couture Editorial Photography by Lumière Frame"
            className="w-full h-full object-cover object-center will-change-transform scale-[1.35]"
            loading="eager"
          />

          {/* Luxury Vignette & Dark Overlay that brightens on scroll */}
          <div 
            ref={overlayDarkRef}
            className="absolute inset-0 bg-[#0a0809] pointer-events-none transition-opacity duration-300"
            style={{ opacity: 0.65 }}
          />

          {/* Subtle Golden Lens Tint Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(7, 7, 9, 0.75) 100%)'
            }}
          />
        </div>

        {/* Cinematic Split Typography (Overlaid on Viewport) */}
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8 md:p-14">
          
          {/* Top Subtitle */}
          <div 
            ref={subtitleRef}
            className="w-full flex items-center justify-between pt-16 md:pt-12"
          >
            <span className="font-cormorant italic text-xs md:text-sm tracking-[0.35em] text-[#e2a89d] font-light uppercase">
              Photography by Lumière Frame
            </span>
            <span className="hidden md:inline-block font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
              ARCHIVE 2026 • VOL. I
            </span>
          </div>

          {/* Central Massive Heading */}
          <div className="my-auto text-center flex flex-col items-center justify-center">
            <h1 className="flex flex-col items-center font-heading leading-[0.92] tracking-[0.16em] uppercase">
              
              <span 
                ref={title1Ref}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#fbf7f6] font-bold will-change-transform drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
              >
                CAPTURING
              </span>

              <span 
                ref={title2Ref}
                className="font-cormorant italic font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-theme-accent my-1.5 sm:my-2 will-change-transform drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
              >
                Moments
              </span>

              <span 
                ref={title3Ref}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#fbf7f6] font-bold will-change-transform drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
              >
                BEYOND TIME.
              </span>

            </h1>
          </div>

          {/* Bottom Prompt: SCROLL TO EXPLORE ↓ */}
          <div 
            ref={scrollIndicatorRef}
            className="w-full flex flex-col items-center justify-center pb-6 md:pb-8"
          >
            <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#e2a89d] font-light flex items-center gap-2">
              Scroll to explore
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#e2a89d]" />
            </span>
            <span className="w-8 h-[1px] bg-[#e2a89d]/40 mt-3" />
          </div>

          {/* Corner Technical Metadata (Appears on Scroll) */}
          <div 
            ref={metaLeftRef}
            className="absolute bottom-10 left-10 hidden lg:flex flex-col text-[10px] tracking-[0.28em] font-mono text-neutral-400 uppercase pointer-events-none opacity-0"
          >
            <span className="text-[#e2a89d]">OPTICS: 35MM / 85MM PRIME</span>
            <span>SHUTTER: 1/500S • F/1.4</span>
            <span>EMULSION: SILVER GELATIN</span>
          </div>

          <div 
            ref={metaRightRef}
            className="absolute bottom-10 right-10 hidden lg:flex flex-col text-right text-[10px] tracking-[0.28em] font-mono text-neutral-400 uppercase pointer-events-none opacity-0"
          >
            <span className="text-[#e2a89d]">COORDINATES</span>
            <span>28°36'N • 77°12'E</span>
            <span>WORLDWIDE COMMISSIONS</span>
          </div>

        </div>

      </div>
    </section>
  );
}
