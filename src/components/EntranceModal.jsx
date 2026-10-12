import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ASSETS } from '../data/assetsData';

export default function EntranceModal({ onEnter }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Start music in the click handler so mobile browsers retain user activation.
    onEnter();

    // Confetti fanfare
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff5b8e', '#ffd700', '#ff9ebb', '#ffffff']
    });

  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative max-w-sm w-full p-8 rounded-3xl glass-panel border border-pink-400/40 text-center glow-box-pink flex flex-col items-center">
        {/* Glowing floating gift badge */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full blur-xl opacity-75 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 flex items-center justify-center text-white shadow-2xl border-2 border-pink-200/50 animate-float">
            <Gift className="w-10 h-10 animate-bounce" />
          </div>
        </div>

        <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          A Royal Celebration Awaits
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
        </span>

        <h2 className="font-cursive text-4xl sm:text-5xl text-pink-100 font-bold mb-2">
          Dearest Nischal,
        </h2>

        <p className="text-sm text-pink-200/80 mb-6 font-light leading-relaxed">
          Someone made something truly special just for you. Tap below to turn on the music and enter your magical 3D birthday world! ✨
        </p>

        {/* Enter Button */}
        <button
          onClick={handleOpen}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-500/40 hover:shadow-pink-500/60 active:scale-95 transition-all duration-300 border border-pink-200/30 text-base"
        >
          <Music className="w-5 h-5 animate-pulse" />
          <span>Open Birthday Surprise 💖</span>
        </button>

        <p className="mt-4 text-[10px] text-pink-300/60 tracking-wider uppercase">
          🎵 Plays "{ASSETS.songName}" from 0:27 with 3D effects
        </p>
      </div>
    </div>
  );
}
