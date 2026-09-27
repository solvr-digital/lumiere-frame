import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';

const MASONRY_ITEMS = [
  {
    id: 'm-1',
    src: '/images/portraits/portrait-1.jpg',
    title: 'THE REFLECTIVE SOUL',
    caption: 'Studio Chiaroscuro • 85mm Prime',
    aspect: 'aspect-[3/4]',
    colSpan: 'col-span-1',
  },
  {
    id: 'm-2',
    src: '/images/fashion/fashion-1.jpg',
    title: 'SILK GEOMETRY',
    caption: 'Paris Haute Couture Archive',
    aspect: 'aspect-[4/5]',
    colSpan: 'col-span-1',
  },
  {
    id: 'm-3',
    src: '/images/travel/travel-1.jpg',
    title: 'AMALFI COASTLINE',
    caption: 'Mediterranean Solitude at Twilight',
    aspect: 'aspect-[16/10]',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-1',
  },
  {
    id: 'm-4',
    src: '/images/weddings/wedding-2.jpg',
    title: 'COURTYARD EMBRACE',
    caption: 'Udaipur Royal Palace Celebration',
    aspect: 'aspect-[1/1]',
    colSpan: 'col-span-1',
  },
  {
    id: 'm-5',
    src: '/images/editorial/editorial-10.jpg',
    title: 'THE VEIL OF LIGHT',
    caption: 'Archival Monochrome Study',
    aspect: 'aspect-[3/4]',
    colSpan: 'col-span-1',
  },
  {
    id: 'm-6',
    src: '/images/travel/travel-2.jpg',
    title: 'HORIZONS IN MIST',
    caption: 'Expedition Journal • Hasselblad',
    aspect: 'aspect-[16/9]',
    colSpan: 'col-span-1 md:col-span-2',
  },
  {
    id: 'm-7',
    src: '/images/portraits/portrait-2.jpg',
    title: 'INWARD VISION',
    caption: 'Black & White Silver Gelatin',
    aspect: 'aspect-[4/5]',
    colSpan: 'col-span-1',
  },
  {
    id: 'm-8',
    src: '/images/fashion/fashion-2.jpg',
    title: 'TEXTILE SCULPTURE',
    caption: 'Avant-Garde Architectural Silhouette',
    aspect: 'aspect-[3/4]',
    colSpan: 'col-span-1',
  }
];

export default function MasonryGallery({ onOpenLightbox }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="relative w-full py-28 md:py-36 bg-[#0a0809] text-[#fbf7f6] select-none">
      
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-[#e2a89d] block mb-2">
              CURATED ARCHIVE • 04
            </span>
            <h2 className="font-italiana text-4xl sm:text-6xl tracking-[0.14em] uppercase text-[#fbf7f6]">
              Select Works
            </h2>
          </div>
          <p className="font-cormorant italic text-lg sm:text-xl text-neutral-400 font-light max-w-sm">
            “Each frame is a singular dialogue between the fleeting moment and archival permanence.”
          </p>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {MASONRY_ITEMS.map((item) => {
            const isHovered = hoveredId === item.id;
            const isAnyHovered = hoveredId !== null;

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox && onOpenLightbox(item.src, item.title, item.caption)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor="view"
                data-cursor-text="VIEW"
                className={`group relative overflow-hidden bg-[#111215] border border-white/10 rounded-xs cursor-pointer shadow-2xl transition-all duration-700 ${item.colSpan} ${
                  isAnyHovered && !isHovered ? 'opacity-40 filter grayscale contrast-90' : 'opacity-100'
                }`}
              >
                {/* Image Container */}
                <div className={`w-full overflow-hidden ${item.aspect} bg-black`}>
                  <img 
                    src={item.src} 
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Corner Expand Lens */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4 text-[#e2a89d]" />
                </div>

                {/* Hover Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                  <span className="font-mono text-[9px] tracking-widest text-[#e2a89d] uppercase">
                    ORIGINAL ARCHIVE
                  </span>
                  <h3 className="font-serif text-lg tracking-[0.1em] text-[#fbf7f6] uppercase mt-1">
                    {item.title}
                  </h3>
                  <p className="font-cormorant italic text-sm text-neutral-300">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
