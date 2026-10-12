import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc } from 'lucide-react';
import { ASSETS } from '../data/assetsData';
import { playAudio, prepareAudio } from '../audio';

export default function AudioPlayer({ isPlaying, setIsPlaying, audioRef }) {
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    playAudio(audioRef.current).catch(() => {
      // Browsers may require the entrance button's user gesture.
    });
  }, [audioRef]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      playAudio(audioRef.current).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${ASSETS.song}#t=${ASSETS.songStart}`}
        preload="auto"
        onLoadedMetadata={() => prepareAudio(audioRef.current)}
        onPlaying={() => { setIsPlaying(true); setAudioError(false); }}
        onPause={() => setIsPlaying(false)}
        onError={() => { setIsPlaying(false); setAudioError(true); }}
        onEnded={() => playAudio(audioRef.current).catch(() => setIsPlaying(false))}
      />

      {/* Floating Audio Dock on Top / Fixed Pill */}
      <div className="fixed bottom-24 right-4 z-40 flex items-center gap-2">
        <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-2.5 shadow-lg border border-pink-400/40 animate-fadeIn">
          {/* Rotating Vinyl Icon */}
          <div
            className={`w-7 h-7 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-white ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            <Disc className="w-4 h-4" />
          </div>

          {/* Song Info & Equalizer */}
          <div className="flex flex-col pr-1">
            <span className="text-[11px] font-semibold text-pink-100 tracking-wider flex items-center gap-1">
              <span>{ASSETS.songName}</span>
              {isPlaying && (
                <span className="flex items-end gap-[2px] h-3 ml-1">
                  <span className="w-[2px] h-full bg-pink-400 animate-pulse"></span>
                  <span className="w-[2px] h-2 bg-pink-300 animate-bounce"></span>
                  <span className="w-[2px] h-3 bg-pink-500 animate-pulse"></span>
                </span>
              )}
            </span>
            <span role="status" className="text-[9px] text-pink-300/80">{audioError ? 'Unable to load song' : 'Birthday Melody'}</span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="w-7 h-7 rounded-full bg-pink-500/30 hover:bg-pink-500/50 flex items-center justify-center text-pink-100 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="w-6 h-6 rounded-full hover:bg-pink-500/20 flex items-center justify-center text-pink-300 transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </>
  );
}
