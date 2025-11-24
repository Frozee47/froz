
import React, { useEffect, useState } from 'react';

interface CinematicIntroProps {
  ready: boolean;
  onComplete: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ ready, onComplete }) => {
  const [stage, setStage] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [waitingMode, setWaitingMode] = useState(false);

  // EFSANEVİ SENARYO - RUHUN MİMARI
  const sentences = [
    "Evren, büyük bir sessizlikle başlar...",
    "Ta ki bir ses, karanlığa ışık olana dek.",
    "O ses, bir çocuğun kalbine dokunur...",
    "Ve orada, sonsuz bir bahçe filizlenir.",
    "Ruhun mimarı, eserinle yüzleşme vakti."
  ];

  useEffect(() => {
    const durationPerSentence = 4000; // Biraz daha uzun okuma süresi

    const interval = setInterval(() => {
      setStage((prev) => {
        if (prev >= sentences.length - 1) {
          clearInterval(interval);
          setWaitingMode(true);
          return prev;
        }
        return prev + 1;
      });
    }, durationPerSentence);

    return () => clearInterval(interval);
  }, [sentences.length]);

  useEffect(() => {
    if (waitingMode && ready) {
       const exitTimeout = setTimeout(() => {
         setOpacity(0);
         setTimeout(() => {
           onComplete();
         }, 2000); 
       }, 1500);
       return () => clearTimeout(exitTimeout);
    }
  }, [waitingMode, ready, onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1500 ease-out overflow-hidden"
      style={{ opacity: opacity }}
    >
      {/* BACKGROUND: AURORA & COSMOS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#020617]"></div>
        {/* Aurora Borealis Effect */}
        <div className="aurora-container">
            <div className="aurora aurora-1"></div>
            <div className="aurora aurora-2"></div>
            <div className="aurora aurora-3"></div>
        </div>
        {/* Stars */}
        <div className="stars-overlay"></div>
      </div>

      <style>{`
        /* AURORA ANIMATION */
        .aurora-container {
            position: absolute;
            inset: 0;
            filter: blur(60px);
            opacity: 0.5;
            z-index: 1;
        }
        .aurora {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 180deg at 50% 50%, #2e026d 0deg, #000000 120deg, #1e1b4b 180deg, #4c1d95 260deg, #2e026d 360deg);
            animation: rotateAurora 20s linear infinite;
        }
        .aurora-2 {
            background: conic-gradient(from 0deg at 50% 50%, #000000 0deg, #4338ca 120deg, #000000 240deg, #312e81 360deg);
            animation: rotateAurora 25s linear infinite reverse;
            opacity: 0.6;
        }
        .aurora-3 {
             background: radial-gradient(circle at center, rgba(253, 224, 71, 0.1) 0%, transparent 50%);
             animation: pulseGold 5s ease-in-out infinite;
        }

        @keyframes rotateAurora {
            0% { transform: rotate(0deg) scale(1.2); }
            100% { transform: rotate(360deg) scale(1.2); }
        }
        @keyframes pulseGold {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.5); opacity: 0.6; }
        }

        .stars-overlay {
            position: absolute;
            inset: 0;
            background-image: 
                radial-gradient(1px 1px at 10% 10%, #fff, transparent),
                radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.8), transparent),
                radial-gradient(1px 1px at 50% 50%, #fff, transparent),
                radial-gradient(2px 2px at 80% 80%, rgba(255,255,255,0.7), transparent);
            background-size: 500px 500px;
            opacity: 0.5;
            z-index: 2;
        }

        /* CINEMATIC TEXT TRANSITIONS */
        .cinematic-text {
          filter: blur(10px);
          transform: scale(0.9);
          opacity: 0;
          transition: all 2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cinematic-text.active {
          filter: blur(0px);
          transform: scale(1);
          opacity: 1;
        }
        .cinematic-text.exit {
          filter: blur(20px);
          transform: scale(1.1);
          opacity: 0;
          transition: all 1.5s ease-in;
        }

        .shine-text {
            background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 200% auto;
            animation: shine 5s linear infinite;
        }
        @keyframes shine {
            to { background-position: 200% center; }
        }
      `}</style>

      {/* Text Container */}
      <div className="relative z-20 max-w-4xl px-6 text-center h-60 flex items-center justify-center">
        {sentences.map((text, index) => (
          <div
            key={index}
            className={`
              absolute w-full flex flex-col items-center justify-center
              cinematic-text
              ${index === stage && !waitingMode ? 'active' : ''}
              ${index < stage ? 'exit' : ''}
            `}
          >
            <p className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-wide leading-tight shine-text drop-shadow-[0_0_15px_rgba(253,224,71,0.3)]">
              {text}
            </p>
            {index === sentences.length - 1 && (
                <div className="mt-8 w-32 h-[1px] bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-50"></div>
            )}
          </div>
        ))}

        {/* Loading Spinner / Waiting Message */}
        {waitingMode && !ready && (
           <div className="absolute flex flex-col items-center justify-center gap-4 animate-pulse">
             <div className="w-16 h-16 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin"></div>
             <p className="text-lg font-serif text-yellow-100/60 tracking-[0.2em] uppercase">
               İlham Bekleniyor...
             </p>
           </div>
        )}
      </div>
    </div>
  );
};

export default CinematicIntro;
