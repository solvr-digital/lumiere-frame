import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'view' | 'pointer'
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check cursor data attribute on hovered target
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        const text = target.getAttribute('data-cursor-text') || 'VIEW';
        setCursorType(type);
        setCursorText(text);
      } else if (e.target.closest('button, a, input, [role="button"]')) {
        setCursorType('pointer');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lerp loop for the outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Center sharp dot */}
      <div 
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#e2a89d] transition-transform duration-75 will-change-transform ${
          cursorType === 'view' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Outer reactive lens */}
      <div 
        ref={cursorRingRef}
        className={`fixed top-0 left-0 will-change-transform flex items-center justify-center transition-all duration-300 ${
          cursorType === 'view'
            ? '-ml-10 -mt-10 w-20 h-20 rounded-full bg-[#0a0809]/80 border border-[#e2a89d]/60 backdrop-blur-md shadow-[0_0_25px_rgba(226,168,157,0.25)] scale-100'
            : cursorType === 'pointer'
            ? '-ml-5 -mt-5 w-10 h-10 rounded-full border border-[#e2a89d]/80 bg-[#e2a89d]/10 scale-110'
            : '-ml-3.5 -mt-3.5 w-7 h-7 rounded-full border border-white/20 scale-100'
        }`}
      >
        {cursorType === 'view' && (
          <span className="font-cormorant italic text-[11px] font-medium tracking-[0.2em] text-[#fbf7f6] uppercase select-none">
            {cursorText || 'VIEW'}
          </span>
        )}
      </div>

    </div>
  );
}
