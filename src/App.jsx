import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroCinematic from './components/HeroCinematic';
import AboutIntro from './components/AboutIntro';
import CategoryPanels from './components/CategoryPanels';
import HorizontalGallery from './components/HorizontalGallery';
import FullscreenImageReveals from './components/FullscreenImageReveals';
import EditorialSection from './components/EditorialSection';
import MasonryGallery from './components/MasonryGallery';
import PhotographerBio from './components/PhotographerBio';
import ServicesInteractive from './components/ServicesInteractive';
import AwardsMarquee from './components/AwardsMarquee';
import TestimonialsCinematic from './components/TestimonialsCinematic';
import SocialStrip from './components/SocialStrip';
import FinalSectionAndFooter from './components/FinalSectionAndFooter';
import FullscreenLightbox from './components/FullscreenLightbox';
import StyleCustomizer from './components/StyleCustomizer';

gsap.registerPlugin(ScrollTrigger);

// Gallery items pool for lightbox navigation
const ALL_GALLERY_ITEMS = [
  { src: '/images/hero/hero-main.jpg', title: 'EDITORIAL PROLOGUE', caption: 'Vogue Archive • 35mm Analog' },
  { src: '/images/weddings/wedding-1.jpg', title: 'LAKE COMO CEREMONY', caption: 'Intimate Vows in Italy' },
  { src: '/images/weddings/wedding-2.jpg', title: 'THE EMBRACE', caption: 'Udaipur Palace Courtyard' },
  { src: '/images/portraits/portrait-2.jpg', title: 'CHIAROSCURO SOUL', caption: 'Studio Portrait • Medium Format' },
  { src: '/images/portraits/portrait-1.jpg', title: 'THE GAZE', caption: 'Silver Gelatin Print' },
  { src: '/images/fashion/fashion-1.jpg', title: 'HAUTE COUTURE SHIFT', caption: 'Paris Runway Editorial' },
  { src: '/images/fashion/fashion-2.jpg', title: 'AVANT-GARDE DRAPE', caption: 'Tokyo Fashion Biennale' },
  { src: '/images/travel/travel-1.jpg', title: 'COASTAL DAWN', caption: 'Amalfi Solitude' },
  { src: '/images/travel/travel-2.jpg', title: 'TYRRHENIAN HORIZON', caption: 'Leica M11 Chronograph' },
  { src: '/images/editorial/editorial-1.jpg', title: 'COUTURE SHADOW', caption: 'Milan Exhibition' },
  { src: '/images/editorial/editorial-2.jpg', title: 'SILHOUETTE IN OCHRE', caption: 'Studio Studies Vol. IV' },
  { src: '/images/editorial/editorial-3.jpg', title: 'NATURAL LIGHT STUDY', caption: 'Parisian Morning' },
  { src: '/images/editorial/editorial-4.jpg', title: 'SOLITARY MONOLOGUE', caption: 'Monochrome Stillness' },
  { src: '/images/editorial/editorial-5.jpg', title: 'THE TIMELESS GAZE', caption: 'High Fashion Archive' },
  { src: '/images/editorial/editorial-6.jpg', title: 'THE ART OF OBSERVATION', caption: 'Editorial Feature • Milan' },
  { src: '/images/editorial/editorial-7.jpg', title: 'CHRONICLES OF SHADOW', caption: 'Architectural Study' },
  { src: '/images/editorial/editorial-8.jpg', title: 'THE RADIANT HOUR', caption: 'Golden Hour Reflection' },
  { src: '/images/editorial/editorial-9.jpg', title: 'ETERNAL DIALOGUE', caption: 'Medium Format Noir' },
  { src: '/images/editorial/editorial-10.jpg', title: 'THE VEIL OF LIGHT', caption: 'Archival Monochrome' },
  { src: '/images/portraits/photographer.jpg', title: 'BEHIND THE LENS', caption: 'Principal Photographer Portrait' },
];

export default function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [fontStyle, setFontStyle] = useState('syne'); // Default to Syne Avant-Garde
  const [colorPalette, setColorPalette] = useState('rosegold'); // Default to Rose Gold & Blush Cream
  const [sizeScale, setSizeScale] = useState('minimal'); // Default to Clean & Minimalist
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll and connect to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleOpenLightbox = (src, title, caption) => {
    let idx = ALL_GALLERY_ITEMS.findIndex((item) => item.src === src);
    if (idx === -1) {
      ALL_GALLERY_ITEMS.push({ src, title, caption });
      idx = ALL_GALLERY_ITEMS.length - 1;
    }
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const handleNavigateSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.4 });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0809] text-[#fbf7f6] overflow-x-hidden">
      
      {/* 35mm Film Grain Overlay */}
      <div className="film-grain" />

      {/* Luxury Interactive Cursor */}
      <CustomCursor />

      {/* Brand Navigation */}
      <Navbar onNavigate={handleNavigateSection} />

      {/* Main Content Sections */}
      <main>
        {/* 1. HERO: Cinematic Opening with Expanding Image & Split Typography */}
        <HeroCinematic />

        {/* 2. ABOUT: Philosophy with Staggered Word Reveal & Warm Ambient Spotlight */}
        <AboutIntro />

        {/* 3. CATEGORIES: Four Major Worlds (Weddings, Portraits, Fashion, Travel) */}
        <CategoryPanels onOpenLightbox={handleOpenLightbox} />

        {/* 4. EXHIBITION: Vertical Scroll driving Horizontal Photo Track */}
        <HorizontalGallery onOpenLightbox={handleOpenLightbox} />

        {/* 5. FULLSCREEN REVEALS: Mask Wipes, Aperture Expansion, and Blur to Sharp */}
        <FullscreenImageReveals onOpenLightbox={handleOpenLightbox} />

        {/* 6. EDITORIAL: Magazine-Style Asymmetrical Feature with Metadata */}
        <EditorialSection onOpenLightbox={handleOpenLightbox} />

        {/* 7. MASONRY GALLERY: Responsive Grid with Hover Focus Dimming */}
        <MasonryGallery onOpenLightbox={handleOpenLightbox} />

        {/* 8. AWARDS & PUBLICATIONS: Infinite Luxury Marquee Ticker */}
        <AwardsMarquee />

        {/* 9. PHOTOGRAPHER: Behind The Lens, Bio, Credentials, and Global Commission Badges */}
        <PhotographerBio onNavigate={handleNavigateSection} />

        {/* 10. SERVICES: Interactive Commission Accordion with Cursor-Following Image Previews */}
        <ServicesInteractive onOpenLightbox={handleOpenLightbox} />

        {/* 11. TESTIMONIALS: High-Fashion Client Quotations with Fluid Slider */}
        <TestimonialsCinematic />

        {/* 12. SOCIAL STRIP: Instagram Visual Journey Grid */}
        <SocialStrip onOpenLightbox={handleOpenLightbox} />

        {/* 13. FINALE & FOOTER: Dramatic "LET'S CREATE SOMETHING TIMELESS." CTA + Minimal Black Footer */}
        <FinalSectionAndFooter onNavigate={handleNavigateSection} />
      </main>

      {/* Fullscreen Lightbox Modal */}
      <FullscreenLightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentImage={ALL_GALLERY_ITEMS[lightboxIndex]}
        items={ALL_GALLERY_ITEMS}
        currentIndex={lightboxIndex}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />

      {/* Floating Style Studio: Live Typeface, Palette & Scale Switcher */}
      <StyleCustomizer 
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        colorPalette={colorPalette}
        setColorPalette={setColorPalette}
        sizeScale={sizeScale}
        setSizeScale={setSizeScale}
      />

    </div>
  );
}
