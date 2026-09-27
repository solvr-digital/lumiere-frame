import React, { useState, useEffect } from 'react';
import { Sliders, Check, Sparkles, X, Type, Palette, Maximize2 } from 'lucide-react';

export const FONT_STYLES = [
  {
    id: 'bodoni',
    name: 'Bodoni Vogue',
    headingFont: "'Bodoni Moda', serif",
    accentFont: "'Cormorant Garamond', serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    desc: 'High-fashion editorial (Vogue / Harper’s Bazaar)',
  },
  {
    id: 'cinzel',
    name: 'Cinzel Roman',
    headingFont: "'Cinzel', serif",
    accentFont: "'Cormorant Garamond', serif",
    bodyFont: "'Montserrat', sans-serif",
    desc: 'Sculptural luxury & royal symmetry (Cartier / Tiffany)',
  },
  {
    id: 'italiana',
    name: 'Italiana Editorial',
    headingFont: "'Italiana', serif",
    accentFont: "'Cormorant Garamond', serif",
    bodyFont: "'Montserrat', sans-serif",
    desc: 'Romantic Tuscan editorial & artistic lightness',
  },
  {
    id: 'syne',
    name: 'Syne Avant-Garde',
    headingFont: "'Syne', sans-serif",
    accentFont: "'Playfair Display', serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    desc: 'Contemporary modern agency & architectural bold',
  }
];

export const COLOR_PALETTES = [
  {
    id: 'rosegold',
    name: 'Rose Gold & Blush',
    accent: '#e2a89d',
    accentLight: '#f9ded8',
    goldGlow: 'rgba(226, 168, 157, 0.35)',
    bgDark: '#0a0809',
    textMain: '#fbf7f6',
    previewColor: '#e2a89d',
  },
  {
    id: 'champagne',
    name: 'Champagne Glow',
    accent: '#e2a89d',
    accentLight: '#f9ded8',
    goldGlow: 'rgba(226, 168, 157, 0.35)',
    bgDark: '#0a0809',
    textMain: '#fbf7f6',
    previewColor: '#f9ded8',
  },
  {
    id: 'platinum',
    name: 'Platinum Ice',
    accent: '#e2e8f0',
    accentLight: '#ffffff',
    goldGlow: 'rgba(255, 255, 255, 0.35)',
    bgDark: '#07080a',
    textMain: '#ffffff',
    previewColor: '#ffffff',
  },
  {
    id: 'bronze',
    name: 'Ochre Bronze',
    accent: '#d9985a',
    accentLight: '#f4dfc7',
    goldGlow: 'rgba(217, 152, 90, 0.35)',
    bgDark: '#080706',
    textMain: '#f9f5ee',
    previewColor: '#d9985a',
  }
];

export const SIZE_SCALES = [
  { id: 'minimal', label: 'Clean & Minimalist', scale: 0.78, desc: 'Quiet whitespace & photo focus' },
  { id: 'balanced', label: 'Balanced (Refined)', scale: 0.88, desc: 'Refined high-fashion proportion' },
  { id: 'grand', label: 'Grand (Cinematic)', scale: 1.05, desc: 'Maximum editorial scale & impact' },
];

export default function StyleCustomizer({
  fontStyle = 'syne',
  setFontStyle,
  colorPalette = 'rosegold',
  setColorPalette,
  sizeScale = 'minimal',
  setSizeScale
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Apply CSS variables dynamically to document element
  useEffect(() => {
    const selectedFont = FONT_STYLES.find(f => f.id === fontStyle) || FONT_STYLES[0];
    const selectedColor = COLOR_PALETTES.find(c => c.id === colorPalette) || COLOR_PALETTES[0];
    const selectedSize = SIZE_SCALES.find(s => s.id === sizeScale) || SIZE_SCALES[0];

    const root = document.documentElement;
    root.style.setProperty('--font-primary-heading', selectedFont.headingFont);
    root.style.setProperty('--font-primary-accent', selectedFont.accentFont);
    root.style.setProperty('--font-primary-body', selectedFont.bodyFont);

    root.style.setProperty('--color-theme-accent', selectedColor.accent);
    root.style.setProperty('--color-theme-light', selectedColor.accentLight);
    root.style.setProperty('--color-theme-text', selectedColor.textMain);
    root.style.setProperty('--color-theme-bg', selectedColor.bgDark);
    root.style.setProperty('--color-theme-glow', selectedColor.goldGlow);

    root.style.setProperty('--scale-typography', String(selectedSize.scale));
  }, [fontStyle, colorPalette, sizeScale]);

  return (
    <>
      {/* Floating Trigger Badge in Bottom-Left */}
      <div className="fixed bottom-6 left-6 z-[990] select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Style Customizer"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/80 hover:bg-[#111215] border border-white/20 hover:border-[#e2a89d] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300"
        >
          <Sliders className="w-3.5 h-3.5 text-[#e2a89d] group-hover:rotate-45 transition-transform" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-200 group-hover:text-[#e2a89d] transition-colors">
            Typography & Style
          </span>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLOR_PALETTES.find(c => c.id === colorPalette)?.accent }} />
        </button>
      </div>

      {/* Slide-out Customizer Drawer */}
      <div 
        className={`fixed bottom-20 left-6 z-[995] w-[min(92vw,400px)] bg-[#0d0e12]/95 border border-white/15 rounded-sm p-6 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] select-none transition-all duration-400 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#e2a89d]" />
            <h3 className="font-serif text-sm tracking-[0.2em] text-[#fbf7f6] uppercase font-medium">
              Style Atelier
            </h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. FONT STYLE (Typeface selection) */}
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2.5">
            <Type className="w-3.5 h-3.5 text-[#e2a89d]" />
            <span className="font-mono text-[10px] tracking-widest text-[#e2a89d] uppercase">
              Heading Typeface
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {FONT_STYLES.map((f) => (
              <button
                key={f.id}
                onClick={() => setFontStyle(f.id)}
                className={`p-2.5 rounded-xs border text-left transition-all duration-200 ${
                  fontStyle === f.id
                    ? 'border-[#e2a89d] bg-[#e2a89d]/15 text-white'
                    : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/30'
                }`}
              >
                <span className="block text-xs font-semibold" style={{ fontFamily: f.headingFont }}>
                  {f.name}
                </span>
                <span className="block text-[8px] font-mono text-neutral-400 mt-1 line-clamp-1">
                  {f.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. COLOR PALETTE */}
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2.5">
            <Palette className="w-3.5 h-3.5 text-[#e2a89d]" />
            <span className="font-mono text-[10px] tracking-widest text-[#e2a89d] uppercase">
              Palette & Accents
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {COLOR_PALETTES.map((c) => (
              <button
                key={c.id}
                onClick={() => setColorPalette(c.id)}
                className={`flex items-center gap-2.5 p-2 rounded-xs border transition-all duration-200 ${
                  colorPalette === c.id
                    ? 'border-[#e2a89d] bg-[#e2a89d]/15 text-white'
                    : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/30'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: c.previewColor }} />
                <span className="text-[11px] font-sans truncate">
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. FONT SIZING SCALE */}
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2.5">
            <Maximize2 className="w-3.5 h-3.5 text-[#e2a89d]" />
            <span className="font-mono text-[10px] tracking-widest text-[#e2a89d] uppercase">
              Typography Scale
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xs">
            {SIZE_SCALES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSizeScale(s.id)}
                className={`flex-1 py-1.5 px-2 text-[10px] font-mono tracking-wider uppercase rounded-xs transition-all duration-200 ${
                  sizeScale === s.id
                    ? 'bg-[#e2a89d] text-black font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>
        </div>

        {/* Live Active Preview Tag */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
          <span>REAL-TIME HOT SWAP</span>
          <span className="text-[#e2a89d]">ACTIVE</span>
        </div>

      </div>
    </>
  );
}
