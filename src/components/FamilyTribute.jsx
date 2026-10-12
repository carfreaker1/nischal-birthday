import React, { useState } from 'react';
import { Heart, Sparkles, UserCheck, HeartHandshake } from 'lucide-react';
import { ASSETS } from '../data/assetsData';

export default function FamilyTribute({ onSelectImage }) {
  const [activeTab, setActiveTab] = useState('mother'); // 'mother' or 'father'

  const photos = activeTab === 'mother' ? ASSETS.mother : ASSETS.father;

  return (
    <section className="py-12 px-5">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill border border-pink-400/30 text-pink-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Roots of Love</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          Family Heartbeats 💕
        </h3>
        <p className="text-xs text-pink-200/80 max-w-xs mx-auto font-light leading-relaxed">
          The anchors of love, unending blessings, and the warmest smiles that walk beside her every step of life.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex p-1 rounded-2xl glass-panel border border-pink-400/30 max-w-xs mx-auto mb-7">
        <button
          onClick={() => setActiveTab('mother')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === 'mother'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30'
              : 'text-pink-300/80 hover:text-white'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Mom & Nischal</span>
        </button>

        <button
          onClick={() => setActiveTab('father')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === 'father'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30'
              : 'text-pink-300/80 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Dad & Nischal</span>
        </button>
      </div>

      {/* Quote Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-pink-400/30 text-center mb-7 glow-box-pink">
        <p className="font-cursive text-xl text-pink-100 font-bold mb-1">
          {activeTab === 'mother'
            ? '"A mother’s love is the purest light that guides her daughter forever."'
            : '"Behind every fearless daughter is a father who believed in her first."'}
        </p>
        <span className="text-[10px] text-pink-300 tracking-widest uppercase font-medium">
          {activeTab === 'mother' ? '— Forever Mom’s Darling' : '— Daddy’s Pride & Joy'}
        </span>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {photos.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelectImage(item.url, item.title)}
            className="group relative rounded-2xl overflow-hidden glass-panel border border-pink-400/30 p-2 shadow-lg cursor-pointer hover:border-pink-300/60 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-pink-950/40">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              <div className="absolute bottom-2 left-2 right-2 text-left">
                <p className="text-[11px] font-bold text-white line-clamp-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-pink-300 shrink-0" />
                  <span>{item.title}</span>
                </p>
                <p className="text-[9px] text-pink-200/80 font-light line-clamp-2 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
