import React, { useState } from 'react';
import { Sparkles, Heart, Crown, Cake, Compass } from 'lucide-react';
import { ASSETS } from '../data/assetsData';

export default function HeroSection({ scrollToCake, scrollToMemories }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX || (e.touches && e.touches[0].clientX) || 0) - rect.left) / rect.width - 0.5;
    const y = ((e.clientY || (e.touches && e.touches[0].clientY) || 0) - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative pt-12 pb-10 px-5 flex flex-col items-center text-center overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Birthday Queen Tiara Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-pill border border-pink-400/40 text-pink-200 text-xs font-medium tracking-widest uppercase mb-4 shadow-sm animate-float">
        <Crown className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
        <span>Birthday Queen • October 2026</span>
        <Sparkles className="w-3.5 h-3.5 text-pink-300" />
      </div>

      {/* Main Birthday Greetings */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-1">
        Happy Birthday
      </h1>
      <h2 className="font-cursive text-5xl sm:text-6xl font-bold shimmer-text glow-text-pink mb-4">
        Nischal Sharma
      </h2>

      <p className="text-sm sm:text-base text-pink-200/90 font-light max-w-xs sm:max-w-md mx-auto leading-relaxed mb-7">
        Celebrating the brightest smile, the biggest heart, and the coolest adventurer today! Wishing you an unforgettable year ahead. ✨
      </p>

      {/* 3D Parallax Tilt Photo Frame */}
      <div
        className="perspective-container relative w-64 sm:w-72 aspect-[4/5] mx-auto mb-8 cursor-pointer group"
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <div
          className="w-full h-full rounded-3xl p-2.5 glass-panel border-2 border-pink-300/40 shadow-2xl transition-transform duration-200 ease-out preserve-3d"
          style={{
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            boxShadow: '0 25px 50px -12px rgba(255, 91, 142, 0.4)'
          }}
        >
          {/* Inner Photo */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <img
              src={ASSETS.heroPhoto}
              alt="Nischal Sharma"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Gradient Overlay & Tag */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-left">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-pink-300 flex items-center gap-1">
                <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                The Star of the Day
              </span>
              <p className="text-white font-medium text-sm">Nischal Sharma</p>
            </div>
          </div>

          {/* Floating 3D Badge */}
          <div
            className="absolute -bottom-3 -right-2 px-3 py-1.5 rounded-xl glass-panel border border-pink-300/60 shadow-lg flex items-center gap-1.5 text-xs font-bold text-white bg-pink-600/80"
            style={{ transform: 'translateZ(30px)' }}
          >
            <span>Forever Charming</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          </div>
        </div>
      </div>

      {/* Quick Navigation Action Pills */}
      <div className="flex items-center gap-3">
        <button
          onClick={scrollToCake}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-md shadow-pink-500/30 hover:shadow-pink-500/50 active:scale-95 transition-all"
        >
          <Cake className="w-4 h-4" />
          <span>Cut 3D Cake</span>
        </button>

        <button
          onClick={scrollToMemories}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-pink-200 glass-pill hover:bg-pink-500/20 active:scale-95 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>View Moments</span>
        </button>
      </div>
    </section>
  );
}
