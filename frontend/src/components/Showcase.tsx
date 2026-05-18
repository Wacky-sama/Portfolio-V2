import { useState } from 'react';
import { showcaseItems } from '../config/showcase-data';
import type { ShowcaseItem } from '../types';

export default function Showcase() {
  const [active, setActive] = useState<ShowcaseItem | null>(null);

  const spanMap: Record<NonNullable<ShowcaseItem['size']>, string> = {
    large: 'md:col-span-2 md:row-span-2',
    wide:  'md:col-span-2',
    tall:  'md:row-span-2',
    normal: '',
  };

  return (
    <section className="mt-16 pb-16 border-b border-gray-600">
      <h2 className="text-2xl font-bold dark:text-gray-100 mb-6">Showcase</h2>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-4">
        {showcaseItems.map((item) => {
          const span = spanMap[item.size ?? 'normal'];
          return (
            <button
              key={item.id}
              onClick={() => setActive(item)}
              className={`group relative overflow-hidden rounded-xl shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${span}`}
              aria-label={`Open ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />

              {/* Gradient overlay — always visible subtly, strengthens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Title bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <span className="text-white text-sm font-semibold drop-shadow-md block">
                  {item.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div
            className="relative max-w-3xl w-full mx-4 rounded-2xl overflow-hidden shadow-2xl animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image}
              alt={active.title}
              className="w-full object-cover max-h-[80vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white font-semibold text-base">{active.title}</p>
            </div>
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}