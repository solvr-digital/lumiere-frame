import React from 'react';
import { ArrowUpRight, Instagram, Globe, Mail } from 'lucide-react';

export default function FinalSectionAndFooter({ onNavigate }) {
  return (
    <div id="contact" className="relative w-full bg-[#0a0809] text-[#fbf7f6] overflow-hidden">
      
      {/* FINAL DRAMATIC CTA SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-8 md:px-16 py-28 overflow-hidden">
        
        {/* Background Atmosphere Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/images/hero/hero-reveal.jpg" 
            alt="Lumière Frame Finale"
            className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0809] via-transparent to-[#0a0809]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <span className="font-mono text-xs tracking-[0.4em] uppercase text-theme-accent mb-6">
            COMMISSIONS & ENQUIRIES
          </span>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] uppercase leading-[1.05] drop-shadow-2xl font-bold">
            LET'S CREATE<br />
            <span className="font-cormorant italic font-light text-theme-accent lowercase text-4xl sm:text-6xl md:text-7xl">
              something
            </span><br />
            TIMELESS.
          </h2>

          <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light mt-8 max-w-md leading-relaxed">
            Available for editorial campaigns, destination weddings, and private portrait commissions worldwide.
          </p>

          <a
            href="mailto:hello@lumiereframe.com"
            data-cursor="pointer"
            className="group mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#e2a89d] hover:bg-white text-black font-sans text-xs tracking-[0.3em] uppercase font-semibold transition-all duration-300 shadow-[0_0_35px_rgba(226,168,157,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          <div className="mt-8 flex items-center gap-4 text-xs font-mono tracking-widest text-[#e2a89d]">
            <span>BASED IN INDIA</span>
            <span>•</span>
            <span>AVAILABLE WORLDWIDE</span>
          </div>

        </div>

      </section>

      {/* EDITORIAL MINIMAL FOOTER */}
      <footer className="border-t border-white/10 bg-[#050507] px-8 md:px-16 py-16 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          
          {/* Brand Left */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-italiana text-2xl md:text-3xl tracking-[0.25em] text-[#fbf7f6]">
                LUMIÈRE FRAME
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e2a89d]" />
            </div>
            <p className="font-cormorant italic text-sm tracking-[0.25em] text-[#b0a89a] mt-2 font-light">
              Stories, captured in light.
            </p>
            <p className="font-mono text-[10px] text-neutral-400 mt-6 tracking-widest uppercase">
              hello@lumiereframe.com
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-10 font-sans text-xs tracking-[0.25em] uppercase text-neutral-400">
            {['Work', 'About', 'Worlds', 'Exhibition', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate(item.toLowerCase() === 'work' ? 'hero' : item.toLowerCase());
                }}
                className="hover:text-[#e2a89d] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Socials & Copyright */}
          <div className="flex flex-col md:items-end gap-3 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#e2a89d] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#e2a89d] transition-colors">Behance</a>
              <a href="#" className="hover:text-[#e2a89d] transition-colors">Pinterest</a>
            </div>
            <span className="text-neutral-400 text-[10px] mt-2">
              © 2026 LUMIÈRE FRAME. ALL RIGHTS RESERVED.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
