import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';

export default function FullscreenLightbox({ 
  isOpen, 
  onClose, 
  currentImage, 
  items = [], 
  currentIndex = 0,
  onNavigate 
}) {
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Keyboard navigation: ESC to close, Left/Right arrows to navigate
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate && onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate && onNavigate((currentIndex + 1) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !currentImage) return null;

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      // Swipe left -> next
      onNavigate && onNavigate((currentIndex + 1) % items.length);
    } else if (diff < -50) {
      // Swipe right -> prev
      onNavigate && onNavigate((currentIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-[#0a0809]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-10 select-none animate-fadeIn"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Lightbox Header Bar */}
      <div className="flex items-center justify-between w-full z-20">
        
        {/* Brand & Counter */}
        <div className="flex items-center gap-4">
          <span className="font-italiana text-lg tracking-[0.25em] text-[#fbf7f6]">
            LUMIÈRE FRAME
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#e2a89d]" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#e2a89d]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length || 1).padStart(2, '0')}
          </span>
        </div>

        {/* Action Controls (Close button) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-3 rounded-full bg-white/10 hover:bg-[#e2a89d] border border-white/20 hover:border-[#e2a89d] text-white hover:text-black transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        
        {/* Navigation Arrow Left */}
        {items.length > 1 && (
          <button
            onClick={() => onNavigate && onNavigate((currentIndex - 1 + items.length) % items.length)}
            aria-label="Previous Photograph"
            className="absolute left-2 md:left-6 z-20 p-3.5 rounded-full bg-black/60 hover:bg-[#e2a89d] border border-white/20 hover:border-[#e2a89d] text-white hover:text-black transition-all duration-300 backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Central Expanded Photograph */}
        <div className="relative max-w-5xl max-h-[75vh] p-2 bg-[#111215] border border-white/10 rounded-sm shadow-[0_0_80px_rgba(0,0,0,0.9)]">
          <img 
            src={currentImage.src} 
            alt={currentImage.title || 'Lumière Frame Archive'}
            className="max-w-full max-h-[72vh] object-contain mx-auto transition-all duration-500 will-change-transform"
          />
        </div>

        {/* Navigation Arrow Right */}
        {items.length > 1 && (
          <button
            onClick={() => onNavigate && onNavigate((currentIndex + 1) % items.length)}
            aria-label="Next Photograph"
            className="absolute right-2 md:right-6 z-20 p-3.5 rounded-full bg-black/60 hover:bg-[#e2a89d] border border-white/20 hover:border-[#e2a89d] text-white hover:text-black transition-all duration-300 backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

      </div>

      {/* Bottom Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4 z-20">
        <div>
          <h3 className="font-italiana text-xl md:text-2xl tracking-[0.15em] text-[#fbf7f6] uppercase">
            {currentImage.title || 'Untitled Archive'}
          </h3>
          <p className="font-cormorant italic text-sm text-[#e2a89d]">
            {currentImage.caption || 'Fine Art Photography'}
          </p>
        </div>

        <div className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase text-right">
          <span>ORIGINAL 35MM / MEDIUM FORMAT</span>
          <span className="block text-[#e2a89d]">AVAILABLE IN ARCHIVAL PIGMENT PRINT</span>
        </div>
      </div>

    </div>
  );
}
