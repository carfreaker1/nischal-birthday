import React, { useState } from 'react';
import { Compass, Flame, Shield, MapPin, Sparkles } from 'lucide-react';
import { ASSETS } from '../data/assetsData';

export default function BikingSection({ onSelectImage }) {
  const [tiltIndex, setTiltIndex] = useState(null);
  const [tiltPos, setTiltPos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX || (e.touches && e.touches[0].clientX) || 0) - rect.left) / rect.width - 0.5;
    const y = ((e.clientY || (e.touches && e.touches[0].clientY) || 0) - rect.top) / rect.height - 0.5;
    setTiltIndex(idx);
    setTiltPos({ x: x * 16, y: -y * 16 });
  };

  const handlePointerLeave = () => {
    setTiltIndex(null);
    setTiltPos({ x: 0, y: 0 });
  };

  return (
    <section className="py-12 px-5">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill border border-pink-400/30 text-pink-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>Adventure & Freedom</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          The Biking Chronicles 🏍️
        </h3>
        <p className="text-xs text-pink-200/80 max-w-xs mx-auto font-light leading-relaxed">
          Wind in her hair, thrill in her pulse, and miles of breathtaking freedom. Here's to more epic rides and horizons!
        </p>
      </div>

      {/* Biking Cards */}
      <div className="space-y-6">
        {ASSETS.biking.map((bike, idx) => {
          const isTilting = tiltIndex === idx;
          return (
            <div
              key={idx}
              className="perspective-container"
              onMouseMove={(e) => handlePointerMove(e, idx)}
              onTouchMove={(e) => handlePointerMove(e, idx)}
              onMouseLeave={handlePointerLeave}
              onClick={() => onSelectImage(bike.url, bike.title)}
            >
              <div
                className="relative rounded-3xl overflow-hidden glass-panel border border-pink-400/30 p-3 shadow-xl transition-transform duration-200 ease-out cursor-pointer group"
                style={{
                  transform: isTilting
                    ? `rotateY(${tiltPos.x}deg) rotateX(${tiltPos.y}deg) scale(1.02)`
                    : 'rotateY(0deg) rotateX(0deg) scale(1)'
                }}
              >
                {/* Photo */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-pink-950/40">
                  <img
                    src={bike.url}
                    alt={bike.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-pill text-[10px] font-bold text-pink-200 border border-pink-300/30 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>On The Road</span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <h4 className="text-base font-bold text-white mb-0.5 flex items-center justify-between">
                      <span>{bike.title}</span>
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </h4>
                    <p className="text-xs text-pink-200/90 font-light leading-snug">
                      {bike.desc}
                    </p>
                  </div>
                </div>

                {/* Sub info banner */}
                <div className="mt-2.5 px-2 flex items-center justify-between text-[11px] text-pink-300/80 font-medium">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-pink-400" />
                    Biker Spirit
                  </span>
                  <span className="text-[10px] text-pink-400 uppercase tracking-wider">
                    Tap to view full
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
