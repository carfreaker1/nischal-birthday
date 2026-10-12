import React from 'react';
import { X, Sparkles, Heart } from 'lucide-react';

export default function ImageModal({ selectedImage, onClose }) {
  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm sm:max-w-md w-full glass-panel border border-pink-400/40 rounded-3xl p-3 shadow-2xl glow-box-pink flex flex-col items-center animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close image modal"
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg hover:bg-pink-700 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* High-res Image */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/50">
          <img
            src={selectedImage.url}
            alt={selectedImage.title || 'Memory'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Caption */}
        <div className="w-full px-2 pt-3 pb-1 text-center">
          <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span>{selectedImage.title || 'Cherished Memory'}</span>
          </h4>
          <p className="text-[11px] text-pink-200/70 mt-1 font-light">
            Happy Birthday Nischal Sharma 🌸
          </p>
        </div>
      </div>
    </div>
  );
}
