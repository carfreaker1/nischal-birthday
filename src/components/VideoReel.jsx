import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';
import { ASSETS } from '../data/assetsData';

export default function VideoReel({ onVideoPlay, onVideoPause }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      if (onVideoPause) onVideoPause();
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      if (onVideoPlay) onVideoPlay();
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-12 px-5 text-center">
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill border border-pink-400/30 text-pink-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
        <Film className="w-3.5 h-3.5 text-pink-400" />
        <span>Celebration In Motion</span>
      </div>
      <h3 className="text-3xl font-bold text-white mb-2">
        Moments in Motion 🎬
      </h3>
      <p className="text-xs text-pink-200/80 max-w-xs mx-auto font-light leading-relaxed mb-6">
        Every smile, every movement captured in time. Tap below to watch her candid moments!
      </p>

      {/* Video Container */}
      <div className="relative max-w-sm mx-auto rounded-3xl overflow-hidden glass-panel border-2 border-pink-400/40 p-2 shadow-2xl glow-box-pink">
        <div
          className="relative w-full aspect-[9/16] max-h-[460px] rounded-2xl overflow-hidden bg-black cursor-pointer group"
          onClick={toggleVideoPlay}
        >
          <video
            ref={videoRef}
            src={ASSETS.video}
            playsInline
            loop
            onEnded={() => {
              setIsPlaying(false);
              if (onVideoPause) onVideoPause();
            }}
            className="w-full h-full object-cover"
          />

          {/* Dark overlay when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-xl shadow-pink-500/50 group-hover:scale-110 active:scale-95 transition-all">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
              <span className="mt-3 text-xs font-semibold text-pink-100 tracking-wider uppercase">
                Tap to Play Reel
              </span>
            </div>
          )}

          {/* Floating Controls Overlay when playing */}
          {isPlaying && (
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white bg-black/40 hover:bg-black/60 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* Bottom tag */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-full glass-pill text-[10px] font-bold text-pink-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              Nischal's Reel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
