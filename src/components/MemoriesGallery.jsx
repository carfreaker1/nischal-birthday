import React, { useState } from 'react';
import { Camera, Sparkles, Heart, Eye } from 'lucide-react';
import { ASSETS } from '../data/assetsData';

export default function MemoriesGallery({ onSelectImage }) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [likedPhotos, setLikedPhotos] = useState({});

  const toggleLike = (e, idx) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, ASSETS.portraits.length));
  };

  return (
    <section className="py-12 px-5">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill border border-pink-400/30 text-pink-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
          <Camera className="w-3.5 h-3.5 text-pink-400" />
          <span>Timeless Memories</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          Golden Moments Album ✨
        </h3>
        <p className="text-xs text-pink-200/80 max-w-xs mx-auto font-light leading-relaxed">
          A tapestry of laughter, beauty, and memories that brighten every single day.
        </p>
      </div>

      {/* Polaroid & Card Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {ASSETS.portraits.slice(0, visibleCount).map((item, idx) => {
          const isLiked = !!likedPhotos[idx];
          return (
            <div
              key={idx}
              onClick={() => onSelectImage(item.url, item.caption)}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-pink-300/30 p-2 shadow-lg cursor-pointer hover:border-pink-400/60 transition-all duration-300 active:scale-95"
            >
              {/* Polaroid Photo Frame */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-pink-950/40">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Floating Heart / Like Button */}
                <button
                  onClick={(e) => toggleLike(e, idx)}
                  aria-label="Like photo"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full glass-pill flex items-center justify-center transition-transform active:scale-125"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isLiked ? 'text-rose-500 fill-rose-500' : 'text-white/80'
                    }`}
                  />
                </button>

                {/* Caption on Bottom */}
                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <p className="text-[11px] font-semibold text-white truncate flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-pink-300 shrink-0" />
                    <span>{item.caption}</span>
                  </p>
                </div>
              </div>

              {/* Sub-bar */}
              <div className="mt-1.5 px-1 flex items-center justify-between text-[10px] text-pink-300/70">
                <span>Memory #{idx + 1}</span>
                <span className="flex items-center gap-0.5 text-pink-400">
                  <Eye className="w-2.5 h-2.5" />
                  View
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More Button */}
      {visibleCount < ASSETS.portraits.length && (
        <div className="mt-8 text-center">
          <button
            onClick={handleShowMore}
            className="px-6 py-2.5 rounded-full text-xs font-bold text-pink-100 glass-pill border border-pink-400/40 hover:bg-pink-500/20 active:scale-95 transition-all shadow-md"
          >
            Load More Memories ({ASSETS.portraits.length - visibleCount} left) 📸
          </button>
        </div>
      )}
    </section>
  );
}
