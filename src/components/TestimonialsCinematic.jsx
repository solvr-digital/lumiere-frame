import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 't-1',
    quote: 'Lumière Frame did not merely photograph our wedding in Lake Como; they translated our unspoken emotion into museum-grade art. Looking at the frames brings back the exact fragrance of the air.',
    author: 'Elena & Marcus Vance',
    role: 'Lake Como Nuptials',
    year: '2025',
  },
  {
    id: 't-2',
    quote: 'Working with Aryan is witnessing a master sculptor of light. His ability to find silence amidst the frenetic energy of Milan Fashion Week produced our most successful campaign cover to date.',
    author: 'Sophie Laurent',
    role: 'Creative Director, Maison de Soie',
    year: '2026',
  },
  {
    id: 't-3',
    quote: 'In an era saturated with generic digital photos, Lumière Frame preserves the authentic gravity, soul, and dignity of portraiture. An unforgettable artistic experience.',
    author: 'Devendra Singhania',
    role: 'Private Portrait Commission',
    year: '2025',
  }
];

export default function TestimonialsCinematic() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => setCurrentIdx((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrentIdx((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[currentIdx];

  return (
    <section className="relative w-full py-28 md:py-40 bg-[#0a0809] text-[#fbf7f6] select-none overflow-hidden">
      
      {/* Background Soft Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(226, 168, 157, 0.05) 0%, transparent 55%)'
        }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-14 flex flex-col items-center text-center relative z-10">
        
        {/* Quote Icon */}
        <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center mb-8 text-[#e2a89d]">
          <Quote className="w-5 h-5" />
        </div>

        {/* Large Quotation */}
        <div className="min-h-[220px] sm:min-h-[200px] flex items-center justify-center">
          <blockquote className="font-cormorant italic font-light text-2xl sm:text-3xl md:text-4xl text-[#fbf7f6] leading-relaxed max-w-4xl transition-all duration-500">
            “{t.quote}”
          </blockquote>
        </div>

        {/* Author Details */}
        <div className="mt-8 flex flex-col items-center">
          <h4 className="font-italiana text-xl sm:text-2xl tracking-[0.15em] text-[#e2a89d] uppercase">
            {t.author}
          </h4>
          <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase mt-1">
            {t.role} • {t.year}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="mt-12 flex items-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous Testimonial"
            className="p-3 rounded-full border border-white/15 hover:border-[#e2a89d] hover:bg-[#e2a89d] hover:text-black text-white transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="font-mono text-xs tracking-widest text-[#e2a89d] px-2">
            0{currentIdx + 1} / 0{TESTIMONIALS.length}
          </div>

          <button
            onClick={next}
            aria-label="Next Testimonial"
            className="p-3 rounded-full border border-white/15 hover:border-[#e2a89d] hover:bg-[#e2a89d] hover:text-black text-white transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </section>
  );
}
