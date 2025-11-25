
import React, { useState, useRef, useEffect } from 'react';
import { Key, Stars, Volume2, VolumeX } from 'lucide-react';
import { generateTeacherMessage } from '../services/geminiService';
import MessageModal from './MessageModal';
import RoseGarden from './RoseGarden';
import CinematicIntro from './CinematicIntro';
import BookOfLife from './BookOfLife';
import { AppState } from '../types';

const Hero: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [message, setMessage] = useState<string>('');
  const [iconSvg, setIconSvg] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRoses, setShowRoses] = useState(false);
  const [showCinematic, setShowCinematic] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Static Name as requested
  const teacherName = "Nazlı Demirel";

  // Emotional Piano Track URL (Reliable Source)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio object with a reliable emotional piano track
    // Alternative: https://cdn.pixabay.com/audio/2022/10/05/audio_68629e8c14.mp3
    audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Watch for Cinematic finish to open the modal safely
  // NOTE: The Cinematic component now handles the waiting logic internally based on the 'ready' prop.
  // We only close it when it tells us it's fully done via onComplete.
  const handleCinematicComplete = () => {
    setShowCinematic(false);
    setState(AppState.SUCCESS);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = 0.5;
      setIsMuted(false);
      // If we are in a state where music should be playing, play it
      if (showCinematic || state === AppState.SUCCESS) {
        audioRef.current.play().catch(e => console.error("Play failed:", e));
      }
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleGenerate = async () => {
    // 1. Play Music (Must be triggered by user interaction)
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio autoplay prevented by browser. Waiting for interaction.", error);
        });
      }
    }

    // 2. Start the visual journey immediately
    setShowCinematic(true);
    setState(AppState.LOADING);
    setShowRoses(false);
    setIsApiReady(false); // Reset ready state

    try {
      // 3. Start the API call in parallel
      const result = await generateTeacherMessage();
      setMessage(result.message);
      setIconSvg(result.iconSvg);
      setIsApiReady(true); // Signal that API is done
    } catch (error) {
      console.error(error);
      setState(AppState.ERROR);
      setShowCinematic(false);
    }
  };

  const closeModal = () => {
    setState(AppState.IDLE);
    setShowRoses(false);
    // Keep music playing for ambience
  };

  const handleBloomRoses = () => {
    setState(AppState.IDLE);
    setShowRoses(false);
    setTimeout(() => {
      setShowRoses(true);
    }, 100);
  };

  const handleResetApp = () => {
    setShowRoses(false);
    setState(AppState.IDLE);
    // Softly fade out music
    if (audioRef.current) {
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.volume = 0.5; // Reset volume for next time
          clearInterval(fadeOut);
        }
      }, 100);
    }
  };

  // MAIN APP SCREEN (Direct View)
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pb-20 pt-10">
      
      {/* Audio Control */}
      <button 
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 p-3 bg-black/20 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-black/40 transition-all"
        title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Cinematic Intro Overlay - NOW RECEIVES READY PROP */}
      {showCinematic && (
        <CinematicIntro 
          ready={isApiReady} 
          onComplete={handleCinematicComplete} 
        />
      )}

      {/* Wrapper to fade out content when roses are showing */}
      <div className={`transition-all duration-1000 ease-in-out flex flex-col items-center justify-center w-full ${showRoses ? 'opacity-0 blur-sm pointer-events-none' : 'opacity-100'}`}>
        
        {/* Animated Title Section */}
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-block p-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-accent to-orange-200 mb-2 drop-shadow-sm">
              Öğretmenler Günü
            </h1>
            <h2 className="text-xl md:text-3xl font-hand text-white tracking-wide">
              Kutlu Olsun
            </h2>
          </div>
        </div>

        {/* Main Action Card */}
        <div className="max-w-md w-full bg-indigo-950/40 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 shadow-2xl animate-fade-in-up relative overflow-visible" style={{ animationDelay: '0.2s' }}>
          
          {/* NEW: Book of Life Animation floating above */}
          <div className="-mt-24 mb-4">
             <BookOfLife />
          </div>

          <p className="text-3xl mb-8 font-serif font-bold relative tracking-wider text-gold-accent drop-shadow-md">
            {teacherName}
            <br />
            <span className="mt-4 block relative group">
               <span className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-1000"></span>
               <span className="relative block text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-gold-accent font-serif tracking-widest not-italic animate-shine uppercase">
                 SEN HER ŞEYİNLE ÖĞRETMENSİN
               </span>
            </span>
          </p>

          <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button
                onClick={handleGenerate}
                disabled={state === AppState.LOADING || showCinematic}
                className={`
                  relative w-full py-5 px-8 rounded-full text-xl font-serif tracking-wider shadow-2xl
                  transition-all duration-500 transform hover:scale-[1.02]
                  flex items-center justify-center gap-3 overflow-hidden border border-white/10
                  ${(state === AppState.LOADING || showCinematic)
                    ? 'bg-indigo-900 cursor-wait' 
                    : 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white hover:text-gold-accent'}
                `}
              >
                {(state === AppState.LOADING || showCinematic) ? (
                  <>
                    <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                    <Stars className="w-5 h-5 text-purple-300 animate-pulse" />
                    <span className="text-purple-200">
                      Yolculuk Başlıyor...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></span>
                    <Stars className="w-5 h-5 text-yellow-200 animate-spin-slow" />
                    <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] text-sm md:text-lg">Kartı Aç</span>
                    <Key className="w-5 h-5 text-yellow-200 group-hover:rotate-45 transition-transform duration-300" />
                  </>
                )}
              </button>
          </div>
          
          <p className="mt-4 text-purple-300/60 text-xs font-hand tracking-widest uppercase">
            {state === AppState.LOADING ? "Kalbinin sesini dinle..." : "Dokun ve Hisset"}
          </p>

          {state === AppState.ERROR && (
             <p className="mt-4 text-red-300 text-sm">Büyü bozuldu, lütfen tekrar dene.</p>
          )}
        </div>

        {/* Decor Elements */}
        <div className="absolute bottom-10 text-white/40 font-sans text-sm animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p>Veysi Engin / frozee&lt;3</p>
        </div>

      </div>

      {/* Background Effects - Pass the reset handler */}
      {showRoses && <RoseGarden onReset={handleResetApp} />}

      {/* Modal */}
      <MessageModal 
        isOpen={state === AppState.SUCCESS} 
        onClose={closeModal} 
        message={message} 
        iconSvg={iconSvg}
        onBloomRoses={handleBloomRoses}
      />

      {showConfetti && <ConfettiOverlay />}
      
    </div>
  );
};

// Simple Confetti Overlay Component
const ConfettiOverlay: React.FC = () => {
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    animDelay: Math.random() * 2 + 's',
    color: ['#FFD700', '#FFA500', '#FF69B4', '#9370DB'][Math.floor(Math.random() * 4)] // Gold, Orange, Pink, Purple
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-20px] w-3 h-3 rounded-full animate-fall shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{
            left: p.left,
            backgroundColor: p.color,
            animationDuration: '3s',
            animationDelay: p.animDelay,
            animationTimingFunction: 'ease-out'
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg) scale(0.5); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg) scale(1); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-fill-mode: forwards;
        }
        .animate-spin-slow {
            animation: spin 4s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
