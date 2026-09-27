import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio synthetic luxury camera shutter sound
  const playShutterSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Audio not allowed or unsupported
    }
  };

  const toggleSound = () => {
    playShutterSound();
    setIsAudioActive(!isAudioActive);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 select-none ${
          scrolled 
            ? 'py-4 bg-[#0a0809]/80 backdrop-blur-xl border-b border-white/5' 
            : 'py-7 md:py-9 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Brand Logo & Editorial Subtitle */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              onNavigate && onNavigate('hero');
            }}
            className="group flex flex-col cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-italiana text-xl md:text-2xl tracking-[0.22em] text-[#fbf7f6] group-hover:text-[#e2a89d] transition-colors duration-300">
                LUMIÈRE FRAME
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2a89d] opacity-80" />
            </div>
            <span className="font-cormorant italic text-[11px] md:text-xs tracking-[0.25em] text-[#b0a89a] font-light">
              Stories, captured in light.
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { id: 'about', label: '01 / About' },
              { id: 'categories', label: '02 / Worlds' },
              { id: 'exhibition', label: '03 / Exhibition' },
              { id: 'contact', label: 'Inquire' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate(link.id);
                }}
                className="group relative font-sans text-xs tracking-[0.25em] uppercase text-neutral-300 hover:text-white transition-colors duration-300 py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#e2a89d] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Editorial Edition & Shutter Sound Toggle */}
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex flex-col text-right font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
              <span>EDITION 2026</span>
              <span className="text-[#e2a89d]">35MM & MEDIUM FORMAT</span>
            </div>

            <button
              onClick={toggleSound}
              aria-label="Toggle camera atmosphere audio"
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-[#e2a89d]/40 hover:bg-[#e2a89d]/10 text-neutral-300 hover:text-[#e2a89d] transition-all duration-300"
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-[#e2a89d]" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0a0809]/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center px-10 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-[11px] tracking-[0.4em] text-[#e2a89d] uppercase font-mono mb-2">Navigation</span>
          {[
            { id: 'hero', label: 'Opening' },
            { id: 'about', label: 'Philosophy' },
            { id: 'categories', label: 'The Four Worlds' },
            { id: 'exhibition', label: 'Photo Exhibition' },
            { id: 'contact', label: 'Inquiries' },
          ].map((item, idx) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate && onNavigate(item.id);
              }}
              className="font-italiana text-3xl sm:text-4xl tracking-wider text-neutral-200 hover:text-[#e2a89d] transition-colors"
            >
              <span className="text-xs text-[#e2a89d]/60 mr-4 font-mono">0{idx + 1}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
