import React, { useState, useRef } from 'react';
import ButterfliesCanvas from './components/ButterfliesCanvas';
import AudioPlayer from './components/AudioPlayer';
import { playAudio } from './audio';
import EntranceModal from './components/EntranceModal';
import HeroSection from './components/HeroSection';
import Cake3D from './components/Cake3D';
import BikingSection from './components/BikingSection';
import FamilyTribute from './components/FamilyTribute';
import VideoReel from './components/VideoReel';
import MemoriesGallery from './components/MemoriesGallery';
import WishesSection from './components/WishesSection';
import ImageModal from './components/ImageModal';
import { Cake, Sparkles, Heart, Compass, Users, Camera, Film } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const audioRef = useRef(null);
  const cakeSectionRef = useRef(null);
  const memoriesSectionRef = useRef(null);
  const bikingSectionRef = useRef(null);
  const familySectionRef = useRef(null);

  // When user clicks the entrance surprise card
  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      playAudio(audioRef.current).catch(() => setIsPlaying(false));
    }
  };

  const scrollToCake = () => {
    cakeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMemories = () => {
    memoriesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectImage = (url, title) => {
    setSelectedImage({ url, title });
  };

  const handleVideoPlay = () => {
    // Optionally lower background music volume when playing video
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = 0.25;
    }
  };

  const handleVideoPause = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = 1.0;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#140411] text-white selection:bg-pink-500 selection:text-white">
      {/* 3D Realtime Flying Butterflies */}
      <ButterfliesCanvas />

      {/* Background Sound Player */}
      <AudioPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />

      {/* First-touch Entrance Gateway for Mobile Autoplay & Surprise */}
      {!hasEntered && <EntranceModal onEnter={handleEnter} />}

      {/* Mobile-first Phone Experience Shell */}
      <div className="mobile-view-wrapper pb-24">
        {/* Floating Top Header Brand */}
        <header className="sticky top-0 z-30 pt-3 pb-2 px-5 glass-panel border-b border-pink-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping"></span>
            <span className="font-cursive text-xl font-bold text-pink-200">
              Nischal Sharma 🌸
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-pink-300/80 px-2.5 py-1 rounded-full glass-pill border border-pink-400/30">
            Happy Birthday 🎉
          </span>
        </header>

        {/* 1. Hero Section */}
        <HeroSection
          scrollToCake={scrollToCake}
          scrollToMemories={scrollToMemories}
        />

        {/* 2. 3D Cake Room */}
        <section
          ref={cakeSectionRef}
          className="py-10 px-4 text-center border-t border-pink-500/10"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill border border-pink-400/30 text-pink-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <Cake className="w-3.5 h-3.5 text-pink-400" />
            <span>Interactive 3D Stage</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">
            Cut The Birthday Cake 🎂
          </h3>
          <p className="text-xs text-pink-200/80 max-w-xs mx-auto font-light leading-relaxed mb-4">
            A strawberry rose velvet cake crafted in 3D. Rotate it and tap to blow the candles!
          </p>

          <Cake3D />
        </section>

        {/* 3. Biking Adventure Section */}
        <div ref={bikingSectionRef}>
          <BikingSection onSelectImage={handleSelectImage} />
        </div>

        {/* 4. Family Tribute (Mom & Dad) */}
        <div ref={familySectionRef}>
          <FamilyTribute onSelectImage={handleSelectImage} />
        </div>

        {/* 5. Moments In Motion Video Reel */}
        <VideoReel
          onVideoPlay={handleVideoPlay}
          onVideoPause={handleVideoPause}
        />

        {/* 6. Polaroid Golden Moments Album */}
        <div ref={memoriesSectionRef}>
          <MemoriesGallery onSelectImage={handleSelectImage} />
        </div>

        {/* 7. Sibling Letter & Wishes */}
        <WishesSection />

        {/* Aesthetic Footer */}
        <footer className="pt-8 pb-12 px-5 text-center border-t border-pink-500/20">
          <div className="flex items-center justify-center gap-1.5 text-pink-400 mb-2">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
            <span className="font-cursive text-xl text-pink-200 font-bold">
              Forever Blessed & Loved
            </span>
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
          </div>
          <p className="text-[11px] text-pink-300/70">
            Specially created for <strong>Nischal Sharma</strong> on her Birthday.
          </p>
          <p className="text-[9px] text-pink-400/50 uppercase tracking-widest mt-1">
            ✨ Wishing you a lifetime of laughter, health, and epic journeys ✨
          </p>
        </footer>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[390px] w-[92%] glass-panel rounded-full px-4 py-2.5 flex items-center justify-around border border-pink-400/40 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-0.5 text-pink-200 hover:text-white"
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-[9px] font-medium">Home</span>
        </button>

        <button
          onClick={scrollToCake}
          className="flex flex-col items-center gap-0.5 text-pink-200 hover:text-white"
        >
          <Cake className="w-4 h-4 text-pink-400" />
          <span className="text-[9px] font-medium">3D Cake</span>
        </button>

        <button
          onClick={() => bikingSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-0.5 text-pink-200 hover:text-white"
        >
          <Compass className="w-4 h-4 text-pink-400" />
          <span className="text-[9px] font-medium">Biking</span>
        </button>

        <button
          onClick={() => familySectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-0.5 text-pink-200 hover:text-white"
        >
          <Users className="w-4 h-4 text-pink-400" />
          <span className="text-[9px] font-medium">Family</span>
        </button>

        <button
          onClick={scrollToMemories}
          className="flex flex-col items-center gap-0.5 text-pink-200 hover:text-white"
        >
          <Camera className="w-4 h-4 text-pink-400" />
          <span className="text-[9px] font-medium">Album</span>
        </button>
      </nav>

      {/* High-res Image Modal */}
      <ImageModal
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
