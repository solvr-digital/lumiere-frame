import React from 'react';
import { ArrowUpRight, Compass, Award, Camera } from 'lucide-react';

export default function PhotographerBio({ onNavigate }) {
  return (
    <section className="relative w-full py-28 md:py-40 bg-[#0a0a0d] text-[#fbf7f6] border-t border-b border-white/5 overflow-hidden select-none">
      
      {/* Background Subtle Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(226, 168, 157, 0.06) 0%, transparent 50%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Author Portrait with Mat Border */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-[#111215] p-3 sm:p-4 rounded-sm border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
              <div className="overflow-hidden aspect-[3/4] bg-black rounded-xs">
                <img 
                  src="/images/portraits/photographer.jpg" 
                  alt="Principal Photographer Lumière Frame"
                  className="w-full h-full object-cover filter grayscale contrast-115 hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between px-1 font-mono text-[10px] tracking-widest uppercase text-neutral-400">
                <span>ARYAN VERMA • FOUNDER</span>
                <span className="text-[#e2a89d]">LEICA AMBASSADOR</span>
              </div>
            </div>
          </div>

          {/* Right: Personal Bio & Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.4em] text-[#e2a89d] uppercase mb-4">
              <span className="w-8 h-[1px] bg-[#e2a89d]" />
              <span>THE ARTIST</span>
            </div>

            <h2 className="font-italiana text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] uppercase text-[#fbf7f6] leading-[1.05]">
              BEHIND THE<br />
              <span className="font-cormorant italic font-light text-[#e2a89d] lowercase text-5xl sm:text-7xl md:text-8xl">
                lens
              </span>
            </h2>

            <blockquote className="font-cormorant italic text-2xl sm:text-3xl text-neutral-200 font-light mt-8 leading-relaxed max-w-xl">
              “I photograph the moments that exist between the obvious — the glance, the movement, the silence, the emotion.”
            </blockquote>

            <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light mt-6 max-w-lg leading-relaxed">
              With over a decade of documenting luxury weddings and high-fashion editorials across Europe, Asia, and the Americas, our vision remains rooted in quiet truth, sculptural elegance, and honest light.
            </p>

            {/* Credential Badges */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#e2a89d]" />
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase">LOCATION</span>
                  <span className="text-white font-serif">Based in India</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-[#e2a89d]" />
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase">AVAILABILITY</span>
                  <span className="text-white font-serif">Worldwide</span>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-[#e2a89d]" />
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase">RECOGNITION</span>
                  <span className="text-[#e2a89d] font-serif">Vogue & Elle</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-10">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate('contact');
                }}
                data-cursor="pointer"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/10 hover:bg-[#e2a89d] border border-white/20 hover:border-[#e2a89d] text-white hover:text-black font-sans text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-lg"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4 text-[#e2a89d] group-hover:text-black transition-colors" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
