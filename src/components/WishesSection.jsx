import React, { useState } from 'react';
import { Heart, Sparkles, Send, Gift, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WishesSection() {
  const [loveCount, setLoveCount] = useState(24);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [userWish, setUserWish] = useState('');
  const [wishesList, setWishesList] = useState([
    {
      author: 'Family & Brother',
      msg: 'To the best sister in the universe: May your life always be surrounded by peace, crazy joy, and endless love! 🎂💖'
    },
    {
      author: 'Admirer of your Spirit',
      msg: 'Keep riding fearless and shining brighter than the stars! Happy Birthday Nischal! 🏍️✨'
    }
  ]);

  const handleSendLove = () => {
    setLoveCount((c) => c + 1);

    // Floating heart particle
    const id = Date.now();
    const newHeart = {
      id,
      x: 35 + Math.random() * 30
    };
    setFloatingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1800);

    // Micro confetti
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#ff5b8e', '#ff9ebb', '#ffd700']
    });
  };

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!userWish.trim()) return;
    setWishesList((prev) => [
      { author: 'With Love', msg: userWish.trim() },
      ...prev
    ]);
    setUserWish('');

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.85 }
    });
  };

  return (
    <section className="py-12 px-5 text-center relative overflow-hidden">
      {/* Floating hearts container */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-16 text-rose-400 text-2xl animate-floatUp"
            style={{ left: `${heart.x}%` }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill border border-pink-400/30 text-pink-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
        <PartyPopper className="w-3.5 h-3.5 text-yellow-300" />
        <span>Celebration Blessings</span>
      </div>

      <h3 className="text-3xl font-bold text-white mb-2">
        A Letter to My Sister 💌
      </h3>
      <p className="text-xs text-pink-200/80 max-w-xs mx-auto font-light leading-relaxed mb-6">
        No matter how fast time flies or how far you ride, you will always be cherished, protected, and loved beyond words.
      </p>

      {/* Heartfelt Note Card */}
      <div className="p-6 rounded-3xl glass-panel border border-pink-400/40 text-left glow-box-pink mb-8 relative">
        <div className="absolute top-4 right-4 text-pink-400/40">
          <Sparkles className="w-6 h-6" />
        </div>
        <p className="font-cursive text-2xl text-pink-200 font-bold mb-3">
          Dear Nischal,
        </p>
        <p className="text-xs sm:text-sm text-pink-100/90 leading-relaxed font-light mb-4">
          Having a sister like you is a blessing that words can never completely capture. Your courage to ride open highways, your infectious laughter that fills the home, and the gentle kindness you carry makes you one in a billion.
        </p>
        <p className="text-xs sm:text-sm text-pink-100/90 leading-relaxed font-light mb-4">
          May God grant you the happiness you bring to others tenfold, and may all your dreams, journeys, and ambitions take flight effortlessly!
        </p>
        <div className="text-right">
          <span className="font-cursive text-xl text-pink-300 font-bold">
            Forever your biggest cheerleader ❤️
          </span>
        </div>
      </div>

      {/* Love counter button */}
      <div className="flex flex-col items-center mb-10">
        <button
          onClick={handleSendLove}
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-pink-300/40"
        >
          <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
          <span>Send Love & Hugs ({loveCount})</span>
        </button>
        <span className="text-[10px] text-pink-300/70 tracking-wider uppercase mt-2">
          Tap repeatedly to shower love!
        </span>
      </div>

      {/* Leave a quick birthday wish input */}
      <div className="p-5 rounded-2xl glass-panel border border-pink-400/30 text-left mb-6">
        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Add Your Birthday Wish for Nischal</span>
        </h4>
        <form onSubmit={handleAddWish} className="flex gap-2">
          <input
            type="text"
            value={userWish}
            onChange={(e) => setUserWish(e.target.value)}
            placeholder="Write a sweet message..."
            className="flex-1 bg-black/40 border border-pink-400/30 rounded-xl px-3 py-2 text-xs text-white placeholder-pink-300/50 focus:outline-none focus:border-pink-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold hover:bg-pink-600 active:scale-95 transition-all flex items-center gap-1 shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>

        {/* Wishes List */}
        <div className="mt-4 space-y-2.5">
          {wishesList.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-pink-950/30 border border-pink-400/20 text-xs"
            >
              <span className="font-semibold text-pink-300 block mb-0.5">
                {item.author}:
              </span>
              <p className="text-pink-100/90 font-light">{item.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
